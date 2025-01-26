import {Router} from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const router = Router();

// Mount user routes
router.use("/users", userRoutes);
router.use("", authRoutes);

export default router;
