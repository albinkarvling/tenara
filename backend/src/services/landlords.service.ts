import {adminSupabase, supabase} from "../config/supabase";
import {AppError} from "../middleware/error.middleware";
import {CreateLandlordPayload, UpdateLandlordPayload, Landlord} from "../types/landlord.types";
import {LANDLORD_FIELDS} from "../constants/landlord.fields";

export class LandlordService {
    async getById(id: string): Promise<Landlord> {
        const {data, error} = await adminSupabase
            .from("landlords")
            .select(LANDLORD_FIELDS)
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new AppError("Landlord not found", 404);
            }
            throw error;
        }
        return data;
    }

    async create(landlordData: CreateLandlordPayload): Promise<Landlord> {
        const {data, error} = await adminSupabase
            .from("landlords")
            .insert(landlordData)
            .select(LANDLORD_FIELDS)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new AppError("Landlord already exists", 400);
            }
            throw error;
        }
        return data;
    }

    async update(id: string, landlordData: UpdateLandlordPayload): Promise<Landlord> {
        const {data, error} = await supabase
            .from("landlords")
            .update(landlordData)
            .eq("id", id)
            .select(LANDLORD_FIELDS)
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id: string): Promise<void> {
        const {error} = await supabase.from("landlords").delete().eq("id", id);
        if (error) throw error;
    }
} 