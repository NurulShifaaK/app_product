import express from "express";
import { addcheckout, getAllOrders, getCheckoutByUser, updateOrderStatus } from "../controller/checkoutController.js";
const router=express.Router();

// router.post("/checkout",addcheckout)
router.route("/checkout").post(addcheckout).get(getAllOrders)
router.get("/checkout/:userid", getCheckoutByUser);
router.put("/checkout/status/:orderId", updateOrderStatus);



export default router;