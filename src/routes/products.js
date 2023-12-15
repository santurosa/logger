import { Router } from "express";
import { createProducts, deleteProduct, getProductById, getProducts, mocking, upgrateProduct } from "../controllers/products.js";
import { applyPolicy } from "../middlewares/auth.js";

const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post("/mockingproducts", mocking);
router.post("/", applyPolicy(['ADMIN']), createProducts);
router.put("/:pid", applyPolicy(['ADMIN']), upgrateProduct);
router.delete("/:pid", applyPolicy(['ADMIN']), deleteProduct);

export default router;