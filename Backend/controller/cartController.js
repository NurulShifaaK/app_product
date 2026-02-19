import Cart from "../model/cartModel.js"

export const addcart = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      // create new cart
      cart = await Cart.create({
        sessionId,
        items: [
          {
            product: productId,
            quantity,
          },
        ],
      });
    } else {
      // check if product already exists in cart
      const existingProduct = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const getallcart=async(req,res)=>{
    try{
         const { sessionId } = req.params;

         const cart=await Cart.findOne({sessionId})
         .populate("items.product");
         if(!cart){
            return res.status(404).json({
                sucess:false,
                message:"Cart not found",
            })
         }
      res.status(200).json({
      success: true,
      cart,
    }); 
    }catch(err){
         res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const removeCartItem = async (req, res) => {
  try {
    const { sessionId, productId } = req.params;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove item
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
