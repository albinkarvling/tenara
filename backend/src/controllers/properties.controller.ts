import {Request, Response} from "express";
import {PropertiesService} from "../services/properties.service";
import {AppError} from "../middleware/error.middleware";

export class PropertiesController {
    private propertiesService: PropertiesService;

    constructor() {
        this.propertiesService = new PropertiesService();
    }

    async getByLandlordId(req: Request, res: Response) {
        const paramLandlordId = req.params.landlordId;
        const localsLandlordId = res.locals.userId;
        if (paramLandlordId !== "me" && paramLandlordId !== localsLandlordId) {
            throw new AppError("Unauthorized", 401);
        }

        const properties = await this.propertiesService.getByLandlordId(
            localsLandlordId,
        );
        return res.json(properties);
    }
}
