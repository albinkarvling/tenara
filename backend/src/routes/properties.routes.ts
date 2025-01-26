import {Router} from "express";
import {PropertiesController} from "../controllers/properties.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {asyncHandler} from "../middleware/async.middleware";

const controller = new PropertiesController();

const router = Router();

router.get(
    "/landlords/:landlordId/properties",
    authMiddleware,
    asyncHandler(controller.getByLandlordId.bind(controller)),
);

export default router;
