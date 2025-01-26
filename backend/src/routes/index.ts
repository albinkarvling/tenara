import {Router} from "express";
import tenantRoutes from "./tenant.routes";
import authRoutes from "./auth.routes";

const router = Router();

// Mount routes
router.use("/tenants", tenantRoutes);
router.use("", authRoutes);

export default router;
