import {supabase} from "../config/supabase";
import {AppError} from "../middleware/error.middleware";
import {PROPERTY_FIELDS} from "../constants/property.fields";

export class PropertiesService {
    async getByLandlordId(landlordId: string) {
        const {data, error} = await supabase
            .from("properties")
            .select(PROPERTY_FIELDS.WITH_TENANT_COUNT)
            .eq("landlordId", landlordId);

        if (error) throw new AppError(error.message, 500);
        if (!data) return [];

        return data?.map((property) => {
            const {tenant_registry_records, ...rest} = property;
            return {
                ...rest,
                tenantCount: tenant_registry_records?.[0]?.count ?? 0,
            };
        });
    }

    async getById(id: string, landlordId: string) {
        const {data, error} = await supabase
            .from("properties")
            .select(PROPERTY_FIELDS.WITH_LANDLORD)
            .eq("id", id)
            .eq("landlordId", landlordId)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                throw new AppError("Property not found", 404);
            }
            throw error;
        }
        return data;
    }
}
