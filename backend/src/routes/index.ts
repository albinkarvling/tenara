import {Router} from "express";
import landlordRoutes from "./landlords.routes";
import propertyRoutes from "./properties.routes";
import authRoutes from "./auth.routes";

const router = Router();

// Mount routes
router.use("/landlords", landlordRoutes);
router.use("", propertyRoutes);
router.use("", authRoutes);

export default router;
