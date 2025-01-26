import {Router} from "express";
import {UserController} from "../controllers/user.controller";
import {asyncHandler} from "../middleware/async.middleware";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();
const controller = new UserController();

// Public routes
router.post("/", asyncHandler(controller.create.bind(controller)));

// Protected routes
router.get("/me", authMiddleware, asyncHandler(controller.getMe.bind(controller)));
router.get("/:id", asyncHandler(controller.getById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

export default router;
