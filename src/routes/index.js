import { Router } from "express";
import authRoutes from "./auth.js";
import whatsappRoutes from "./whatsapp.js";

const router = Router();

router.use("/", authRoutes);
router.use("/", whatsappRoutes);

export default router;