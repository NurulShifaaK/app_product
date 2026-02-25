import express from "express";
import { addbanner, deletebannerbyid, getallbanners } from "../controller/bannerController.js";
import upload from "../middleware/multer.js";

const router=express.Router();

router.route("/bannerupload").post(addbanner).get(getallbanners)
router.delete("/bannerupload/:id",deletebannerbyid)

export default router;