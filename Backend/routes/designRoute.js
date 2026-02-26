import express from "express";
import { createDesignOption, getDesignFilters } from "../controller/designController.js";
import upload from "../middleware/multer.js";
const router = express.Router();



// Public Route: Fetch filters for the sidebar/dropdowns
router.route("/design/filters").get(getDesignFilters);

// Admin Route: Add new design options (Materials, Styles, etc.)
router.route("/admin/design/new").post(upload.single("wearsimage"),createDesignOption);

export default router;