import {Request, Response} from "express";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {AppError} from "../middleware/error.middleware";
import {createUserSchema} from "../schemas/user.schema";

export class UserController {
    private authService: AuthService;
    private userService: UserService;

    constructor() {
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    async getAll(req: Request, res: Response) {
        // implementation
    }

    async getMe(req: Request, res: Response) {
        const user = await this.userService.getById(res.locals.userId);
        return res.json(user);
    }

    async getById(req: Request, res: Response) {
        // implementation
    }

    async create(req: Request, res: Response) {
        const result = createUserSchema.safeParse(req.body);
        
        if (!result.success) {
            throw new AppError(result.error.errors[0].message, 400);
        }

        const {accessToken, user} = await this.authService.signUp(result.data);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return res.status(201).json(user);
    }

    async update(req: Request, res: Response) {
        // implementation
    }

    async delete(req: Request, res: Response) {
        // implementation
    }
}
