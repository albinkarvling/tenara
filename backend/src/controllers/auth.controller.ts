import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {AppError} from "../middleware/error.middleware";
import {signInSchema} from "../schemas/auth.schema";
import {AuthUtils} from "../utils/auth.utils";

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
        const {tenant, session} = await this.authService.signIn(email, password);

        AuthUtils.setCookie(res, session.access_token);

        return res.json(tenant);
    }

    async signOut(req: Request, res: Response) {
        await this.authService.signOut();
        AuthUtils.clearCookie(res);
        return res.sendStatus(204);
    }
}
