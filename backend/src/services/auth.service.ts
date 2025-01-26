import {supabase, adminSupabase} from "../config/supabase";
import {AppError} from "../middleware/error.middleware";
import {CreateTenantPayload, SignUpPayload, Tenant} from "../types/tenant.types";
import {TenantService} from "./tenant.service";

export class AuthService {
    private tenantService: TenantService;

    constructor() {
        this.tenantService = new TenantService();
    }

    async signUp(tenantData: SignUpPayload): Promise<{
        tenant: Tenant;
        accessToken: string;
    }> {
        const {data: authData, error: authError} =
            await adminSupabase.auth.admin.createUser({
                email: tenantData.email,
                password: tenantData.password,
                email_confirm: true,
                user_metadata: {
                    email_confirmed: true,
                },
            });

        if (authError) throw new AppError(authError.message, authError.status);
        if (!authData.user) {
            throw new AppError("Failed to create tenant", 500);
        }

        const tenant = await this.tenantService.create({
            id: authData.user.id,
            email: tenantData.email,
            name: tenantData.name,
        });

        const loginData = await this.signIn(tenantData.email, tenantData.password);
        return {tenant, accessToken: loginData.session.access_token};
    }

    async signIn(email: string, password: string) {
        const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) throw new AppError(authError.message, authError.status);

        const tenantData = await this.tenantService.getById(authData.user.id);
        return {
            tenant: tenantData,
            session: authData.session,
        };
    }

    async signOut() {
        const {error} = await supabase.auth.signOut();
        if (error) throw new AppError(error.message, error.status);
    }
}
