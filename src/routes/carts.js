import { Router } from "express";
import { getCart, createCart, upgrateCart, upgrateCartByBody, updateQuantityProducts, deleteCart, deleteProductToCart, purchase } from "../controllers/carts.js";
import { applyPolicy } from "../middlewares/auth.js";

const router = Router();


router.get("/:cid", getCart);
router.post("/", createCart);
router.put("/:cid/product/:pid", applyPolicy(['USER']), upgrateCart);
router.put("/:cid", applyPolicy(['USER']), upgrateCartByBody);
router.put("/:cid/products/:pid", applyPolicy(['USER']), updateQuantityProducts);
router.delete("/:cid", deleteCart);
router.delete("/:cid/product/:pid", deleteProductToCart);
router.post("/:cid/purchase", applyPolicy(['USER']), purchase);

export default router;