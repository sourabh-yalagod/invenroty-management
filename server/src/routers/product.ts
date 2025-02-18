import { Router } from "express";
import { createProduct, getProducts } from "../controller/product";
const router = Router();

router.route("/").post(createProduct);
router.route("/").get(getProducts);
export default router;
