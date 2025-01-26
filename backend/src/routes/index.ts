import {Router} from "express";
import landlordRoutes from "./landlord.routes";
import authRoutes from "./auth.routes";

const router = Router();

// Mount routes
router.use("/landlords", landlordRoutes);
router.use("", authRoutes);

export default router;
