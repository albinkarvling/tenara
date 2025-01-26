import {supabase, adminSupabase} from "../config/supabase";
import {AppError} from "../middleware/error.middleware";
import {CreateLandlordPayload, SignUpPayload, Landlord} from "../types/landlord.types";
import {LandlordService} from "./landlord.service";

export class AuthService {
    private landlordService: LandlordService;

    constructor() {
        this.landlordService = new LandlordService();
    }

    async signUp(landlordData: SignUpPayload): Promise<{
        landlord: Landlord;
        accessToken: string;
    }> {
        const {data: authData, error: authError} =
            await adminSupabase.auth.admin.createUser({
                email: landlordData.email,
                password: landlordData.password,
                email_confirm: true,
                user_metadata: {
                    email_confirmed: true,
                },
            });

        if (authError) throw new AppError(authError.message, authError.status);
        if (!authData.user) {
            throw new AppError("Failed to create landlord", 500);
        }

        const landlord = await this.landlordService.create({
            id: authData.user.id,
            email: landlordData.email,
            name: landlordData.name,
        });

        const loginData = await this.signIn(landlordData.email, landlordData.password);
        return {landlord, accessToken: loginData.session.access_token};
    }

    async signIn(email: string, password: string) {
        const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) throw new AppError(authError.message, authError.status);

        const landlordData = await this.landlordService.getById(authData.user.id);
        return {
            landlord: landlordData,
            session: authData.session,
        };
    }

    async signOut() {
        const {error} = await supabase.auth.signOut();
        if (error) throw new AppError(error.message, error.status);
    }
}
