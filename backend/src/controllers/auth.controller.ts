import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {AppError} from "../middleware/error.middleware";
import {signInSchema} from "../schemas/auth.schema";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async signIn(req: Request, res: Response) {
        const result = signInSchema.safeParse(req.body);
        if (!result.success) {
            throw new AppError(result.error.errors[0].message, 400);
        }

        const {email, password} = result.data;
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
