import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {asyncHandler} from "../middleware/async.middleware";

const router = Router();
const controller = new AuthController();

router.post("/sign-in", asyncHandler(controller.signIn.bind(controller)));
router.post("/sign-out", asyncHandler(controller.signOut.bind(controller)));

export default router;
