import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {AppError} from "../middleware/error.middleware";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async signIn(req: Request, res: Response) {
        const {email, password} = req.body;

        if (!email) throw new AppError("Email is required");
        if (!password) throw new AppError("Password is required");

        const {user, session} = await this.authService.signIn(email, password);
        res.cookie("accessToken", session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return res.json(user);
    }

    async signOut(req: Request, res: Response) {}
}
