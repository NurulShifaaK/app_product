import express from "express";
import { deleteUser, getallregistereduser, loginUser, registerUser } from "../controller/UserController.js";

const router=express.Router();

router.route("/register").post(registerUser).get(getallregistereduser)
router.route("/login").post(loginUser)
router.route("/delete/:id").delete(deleteUser)
export default router;