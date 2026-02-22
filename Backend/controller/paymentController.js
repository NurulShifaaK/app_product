import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id:"rzp_test_SIlTsX3y89gGpE",
  key_secret:"LJa2NJCwvf93Rl7AnUf61ZdQ",
});
console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_1",
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};