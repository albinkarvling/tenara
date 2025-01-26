import {adminSupabase, supabase} from "../config/supabase";
import { AppError } from "../middleware/error.middleware";
import {CreateUserPayload, UpdateUserPayload, User} from "../types/user.types";

const PUBLIC_USER_FIELDS = "id, email, name, created_at" as const;

export class UserService {
    async getById(id: string): Promise<User> {
        const {data, error} = await adminSupabase
            .from("users")
            .select(PUBLIC_USER_FIELDS)
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new AppError("User not found", 404);
            }
            throw error;
        }
        return data;
    }

    async create(userData: CreateUserPayload): Promise<User> {
        const {data, error} = await adminSupabase
            .from("users")
            .insert(userData)
            .select(PUBLIC_USER_FIELDS)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new AppError("User already exists", 400);
            }
            throw error;
        }
        return data;
    }

    async update(id: string, userData: UpdateUserPayload): Promise<User> {
        const {data, error} = await supabase
            .from("users")
            .update(userData)
            .eq("id", id)
            .select(PUBLIC_USER_FIELDS)
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id: string): Promise<void> {
        const {error} = await supabase.from("users").delete().eq("id", id);

        if (error) throw error;
    }
}
