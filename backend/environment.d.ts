declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            SUPABASE_URL: string;
            SUPABASE_KEY: string;
        }
    }
}

export {};
