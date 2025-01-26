import {Request, Response, NextFunction} from "express";
import {supabase} from "../config/supabase";
import {AppError} from "./error.middleware";

export const getUser = async (accessToken: string) => {
    const {
        data: {user},
        error,
    } = await supabase.auth.getUser(accessToken);
    if (error || !user) throw new AppError("Invalid token", 401);
    return user;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) throw new AppError("No token provided", 401);

        const user = await getUser(accessToken);
        res.locals.userId = user.id;
        next();
    } catch (error) {
        next(error);
    }
};
