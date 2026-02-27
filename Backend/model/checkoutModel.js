import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingDetails: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      phoneno: { type: String, required: true },
    },
    totalamount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;