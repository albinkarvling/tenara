import {Response} from "express";

export class AuthUtils {
    static setCookie(res: Response, accessToken: string) {
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }

    static clearCookie(res: Response) {
        res.clearCookie("accessToken");
    }
}
