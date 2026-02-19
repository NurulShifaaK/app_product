import express from "express";
import { getallregistereduser, loginuUser, registerUser } from "../controller/UserController.js";

const router=express.Router();

router.route("/register").post(registerUser).get(getallregistereduser)
router.route("/login").post(loginuUser)
export default router;