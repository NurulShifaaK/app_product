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

    // Shipping / Form Details
    shippingDetails: {
      firstname: {
        type: String,
        required: [true, "please enter your name"],
      },

      lastname: {
        type: String,
        required: [true, "please enter your lastname"],
      },

      email: {
        type: String,
        required: [true, "please enter your email"],
      },

      street: {
        type: String,
        required: [true, "please enter your street address"],
      },

      city: {
        type: String,
        required: [true, "please enter your city"],
      },

      state: {
        type: String,
        required: [true, "please enter your state"],
      },

      pincode: {
        type: String,
        required: [true, "please enter your pincode"],
      },

      phoneno: {
        type: String,
        required: [true, "please enter your mobile number"],
      },
    },

    totalamount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      default: "Processing",
    },
status: {
  type: String,
  enum: ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
  default: "Placed",
},

  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;
