import express from "express";
import { createproduct, deleteproduct, getallproducts, getsingleproduct, updateproduct,getProductsByCategory } from "../controller/productController.js";
const router=express.Router();

router.route("/products").get(getallproducts).post(createproduct);
router.route("/product/:id").get(getsingleproduct).put(updateproduct).delete(deleteproduct);
router.route("/products/category").get(getProductsByCategory);
export default router;