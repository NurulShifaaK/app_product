import express from "express";
import { createOrder } from "../controller/paymentController.js";
const router = express.Router();
  

router.post("/createorder",createOrder)
export default router;