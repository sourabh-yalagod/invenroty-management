import { Router } from "express";
import { getUsers } from "../controller/user";
const router = Router();

router.route("/").get(getUsers);
export default router;
