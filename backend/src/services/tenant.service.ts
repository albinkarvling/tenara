import {adminSupabase, supabase} from "../config/supabase";
import {AppError} from "../middleware/error.middleware";
import {CreateTenantPayload, UpdateTenantPayload, Tenant} from "../types/tenant.types";

const PUBLIC_TENANT_FIELDS = "id, email, name, created_at" as const;

export class TenantService {
    async getById(id: string): Promise<Tenant> {
        const {data, error} = await adminSupabase
            .from("tenants")
            .select(PUBLIC_TENANT_FIELDS)
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new AppError("Tenant not found", 404);
            }
            throw error;
        }
        return data;
    }

    async create(tenantData: CreateTenantPayload): Promise<Tenant> {
        const {data, error} = await adminSupabase
            .from("tenants")
            .insert(tenantData)
            .select(PUBLIC_TENANT_FIELDS)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new AppError("Tenant already exists", 400);
            }
            throw error;
        }
        return data;
    }

    // ... rest of the methods
} 