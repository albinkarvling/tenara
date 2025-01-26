import {Session} from "@supabase/supabase-js";

export type Tenant = {
    id: string;
    email: string;
    name: string;
    created_at: Date;
};

export type CreateTenantPayload = {
    id: string;
    email: string;
    name: string;
};

export type SignUpPayload = Omit<CreateTenantPayload, "id"> & {
    password: string;
};

export type UpdateTenantPayload = {
    name?: string;
    email?: string;
};

export type AuthResponse = {
    tenant: Tenant;
    session: Session;
}; 