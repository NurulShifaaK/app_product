// import express from "express";
// import { createproduct, deleteproduct, getallproducts, getsingleproduct, updateproduct,getProductsByCategory } from "../controller/productController.js";
// const router=express.Router();

// router.route("/products").get(getallproducts).post(createproduct);
// router.route("/product/:id").get(getsingleproduct).put(updateproduct).delete(deleteproduct);
// router.route("/products/category").get(getProductsByCategory);
// export default router;


import express from "express";
import {
  createproduct,
  deleteproduct,
  getallproducts,
  getsingleproduct,
  updateproduct,
  getProductsByCategory,
} from "../controller/productController.js";

// import { upload } from "../middleware/multer.js"; 
import upload from "../middleware/multer.js";

const router = express.Router();

// GET all + CREATE product
router
  .route("/products")
  .get(getallproducts)
  .post(upload.single("image"), createproduct);  

// GET single + UPDATE + DELETE
router
  .route("/product/:id")
  .get(getsingleproduct)
  .put(upload.single("image"), updateproduct)  
  .delete(deleteproduct);

// GET products by category
router.route("/products/category").get(getProductsByCategory);

export default router;