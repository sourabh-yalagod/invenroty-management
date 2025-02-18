import { Router } from "express";
import { getExpenses } from "../controller/expense";
const router = Router();
router.route("/").get(getExpenses);
export default router;
