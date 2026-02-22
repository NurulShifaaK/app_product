import Checkout from "../model/checkoutModel.js";
import Cart from "../model/cartModel.js";
import { sendEmail } from "../utils/sendEmail.js";
export const addcheckout = async (req, res) => {
  try {
    const {
      userid,
      items,
      personalDetails,
      shippingAddress,
      total
    } = req.body;

    const newcheckout = await Checkout.create({
      userid,

      products: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),

      shippingDetails: {
        firstname: personalDetails.firstName,
        lastname: personalDetails.lastName,
        email: personalDetails.email,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        phoneno: shippingAddress.phone,
      },

      totalamount: total,
    });

    await Cart.findOneAndDelete({ userid });


// console.log("Email function triggered");
// console.log("Sending to:", personalDetails.email);
   sendEmail(
      personalDetails.email,
      "Order Confirmation 🛒",
      `Hi ${personalDetails.firstName},

Your order has been placed successfully!

Order ID: ${newcheckout._id}
Total Amount: ₹${total}

Shipping Address:
${shippingAddress.street},
${shippingAddress.city},
${shippingAddress.state} - ${shippingAddress.pincode}

Thank you for shopping with us 💙`
    ).catch(err => console.log("Email error:", err));

  
    res.status(201).json({
      success: true,
      newcheckout,
    });


  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCheckoutByUser = async (req, res) => {
  try {
    const { userid } = req.params;

    const orders = await Checkout.find({ userid })
      .populate("products.product"); 

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Checkout.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedOrder,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Checkout.find()
      .populate("products.product") 
      .sort({ createdAt: -1 });    

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};




