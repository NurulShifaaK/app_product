import express from "express";
import { createCategory, deletecategory, getallcategory } from "../controller/categoryController.js";
const router=express.Router();

router.post("/category",createCategory)
router.get("/category",getallcategory)
router.delete("/category/:id",deletecategory)
export default router;