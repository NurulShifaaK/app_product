import express from "express";
import { addcart, getallcart, removeCartItem } from "../controller/cartController.js";

const router=express.Router();

router.route("/addtocart").post(addcart)
router.get("/cart/:sessionId",getallcart);
router.delete("/cart/:sessionId/:productId", removeCartItem);

export default router;