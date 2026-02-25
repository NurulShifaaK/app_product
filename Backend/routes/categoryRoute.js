import express from "express";
import { createCategory, deletecategory, getallcategory } from "../controller/categoryController.js";
import upload from "../middleware/multer.js";
const router=express.Router();

router.post("/category",upload.single("image") ,createCategory)
router.get("/category",getallcategory)
router.delete("/category/:id",deletecategory)
export default router;