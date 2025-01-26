import {Request, Response} from "express";
import {LandlordService} from "../services/landlord.service";
import {AuthService} from "../services/auth.service";
import {AppError} from "../middleware/error.middleware";
import {createLandlordSchema} from "../schemas/landlord.schema";
import {AuthUtils} from "../utils/auth.utils";

export class LandlordController {
    private authService: AuthService;
    private landlordService: LandlordService;

    constructor() {
        this.authService = new AuthService();
        this.landlordService = new LandlordService();
    }

    async getAll(req: Request, res: Response) {
        // implementation
    }

    async getMe(req: Request, res: Response) {
        const landlord = await this.landlordService.getById(res.locals.userId);
        return res.json(landlord);
    }

    async getById(req: Request, res: Response) {
        // implementation
    }

    async create(req: Request, res: Response) {
        const result = createLandlordSchema.safeParse(req.body);
        
        if (!result.success) {
            throw new AppError(result.error.errors[0].message, 400);
        }

        const {accessToken, landlord} = await this.authService.signUp(result.data);

        AuthUtils.setCookie(res, accessToken);

        return res.status(201).json(landlord);
    }

    async update(req: Request, res: Response) {
        // implementation
    }

    async delete(req: Request, res: Response) {
        // implementation
    }
} 