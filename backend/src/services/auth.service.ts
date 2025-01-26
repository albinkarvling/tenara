import {supabase, adminSupabase} from "../config/supabase";
import {AppError} from "../middleware/error.middleware";
import {CreateUserPayload, SignUpPayload, User} from "../types/user.types";
import {UserService} from "./user.service";

export class AuthService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async signUp(userData: SignUpPayload): Promise<{
        user: User;
        accessToken: string;
    }> {
        const {data: authData, error: authError} =
            await adminSupabase.auth.admin.createUser({
                email: userData.email,
                password: userData.password,
                email_confirm: true,
                user_metadata: {
                    email_confirmed: true,
                },
            });

        if (authError) throw new AppError(authError.message, authError.status);
        if (!authData.user) {
            throw new AppError("Failed to create user", 500);
        }

        const user = await this.userService.create({
            id: authData.user.id,
            email: userData.email,
            name: userData.name,
        });

        const loginData = await this.signIn(userData.email, userData.password);
        return {user, accessToken: loginData.session.access_token};
    }

    async signIn(email: string, password: string) {
        const {data: authData, error: authError} = await supabase.auth.signInWithPassword(
            {
                email,
                password,
            },
        );

        if (authError) throw new AppError(authError.message, authError.status);

        const userData = await this.userService.getById(authData.user.id);
        return {
            user: userData,
            session: authData.session,
        };
    }

    async signOut() {
        const {error} = await supabase.auth.signOut();
        if (error) throw new AppError(error.message, error.status);
    }
}
