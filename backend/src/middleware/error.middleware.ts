import {NextFunction, Request, Response} from "express";
import {PostgrestError} from "@supabase/supabase-js";

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 400,
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }

    if (error instanceof PostgrestError) {
        return res.status(400).json({
            error: error.message,
            details: error.details,
            hint: error.hint,
        });
    }

    // Default error
    return res.status(500).json({
        error: "Internal server error",
    });
}; 