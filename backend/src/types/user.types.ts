import {Session} from "@supabase/supabase-js";

export type User = {
    id: string;
    email: string;
    name: string;
    created_at: Date;
};

export type CreateUserPayload = {
    id: string;
    email: string;
    name: string;
};

export type SignUpPayload = Omit<CreateUserPayload, "id"> & {
    password: string;
};

export type UpdateUserPayload = {
    name?: string;
    email?: string;
};

export type AuthResponse = {
    user: User;
    session: Session;
};
