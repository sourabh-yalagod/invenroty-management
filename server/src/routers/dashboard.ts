import { getDashboardMatrics } from "../controller/dashboard";
import { Router } from "express";
const router = Router();

router.get("/", getDashboardMatrics);

export default router;
