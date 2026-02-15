import express from "express";
import { createproduct, getallproducts, getsingleproduct, updateproduct } from "../controller/productController.js";
const router=express.Router();

router.route("/products").get(getallproducts).post(createproduct);
router.route("/product/:id").get(getsingleproduct).put(updateproduct);

export default router;