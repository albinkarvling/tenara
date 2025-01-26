import {Session} from "@supabase/supabase-js";

export type Landlord = {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
};

export type CreateLandlordPayload = {
    id: string;
    email: string;
    name: string;
};

export type SignUpPayload = Omit<CreateLandlordPayload, "id"> & {
    password: string;
};

export type UpdateLandlordPayload = {
    name?: string;
    email?: string;
};

export type AuthResponse = {
    landlord: Landlord;
    session: Session;
}; 