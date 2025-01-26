import {Request, Response} from "express";
import {TenantService} from "../services/tenant.service";
import {AuthService} from "../services/auth.service";
import {AppError} from "../middleware/error.middleware";
import {createTenantSchema} from "../schemas/tenant.schema";
import {AuthUtils} from "../utils/auth.utils";

export class TenantController {
    private authService: AuthService;
    private tenantService: TenantService;

    constructor() {
        this.authService = new AuthService();
        this.tenantService = new TenantService();
    }

    async getAll(req: Request, res: Response) {
        // implementation
    }

    async getMe(req: Request, res: Response) {
        const tenant = await this.tenantService.getById(res.locals.userId);
        return res.json(tenant);
    }

    async getById(req: Request, res: Response) {
        // implementation
    }

    async create(req: Request, res: Response) {
        const result = createTenantSchema.safeParse(req.body);
        
        if (!result.success) {
            throw new AppError(result.error.errors[0].message, 400);
        }

        const {accessToken, tenant} = await this.authService.signUp(result.data);

        AuthUtils.setCookie(res, accessToken);

        return res.status(201).json(tenant);
    }

    async update(req: Request, res: Response) {
        // implementation
    }

    async delete(req: Request, res: Response) {
        // implementation
    }
} 