import {Router} from "express";
import {LandlordController} from "../controllers/landlord.controller";
import {asyncHandler} from "../middleware/async.middleware";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();
const controller = new LandlordController();

router.post("/", asyncHandler(controller.create.bind(controller)));
router.get("/me", authMiddleware, asyncHandler(controller.getMe.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

export default router; 