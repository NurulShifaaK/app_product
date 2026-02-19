import Product from "../model/productModel.js"
import errorHandler from "../helper/handleError.js"
import APIHelper from "../helper/APIHelper.js"
//create
export const createproduct = async (req, res) => {
    try {
        const newproduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            newproduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

//get all product
//http://localhost:3000/api/v1/products?keyword=samsung
export const getallproducts=async(req,res)=>{
    //const products=await Product.find();
    //console.log(req.query.keyword)
    const apiHelper=new APIHelper(Product.find(),req.query).search().filter();
     console.log(apiHelper)
     const products=await apiHelper.query;
    res.status(200).json({
        success:true,
        products,   
    })
}

//get single product
export const getsingleproduct=async(req,res,next)=>{
//console.log(req.params.id)
const id=req.params.id;
let singleproduct=await Product.findById(id);
if(!singleproduct){
   //return res.status(500).json({success:false, message:"Product not found"})
 return next(new errorHandler("product not found",404))
}
return res.status(200).json({success:true, singleproduct})
}


//update product

export const updateproduct=async(req,res,next)=>{
    const id=req.params.id;
    const update=await Product.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
    });
    if(!update){
  // return res.status(500).json({success:false, message:"Product not found"})
  return next(new errorHandler("product not found",404))
}
    res.status(200).json({
        success:true,
        update,
    })
}

//delete
export const deleteproduct=async(req,res,next)=>{
    const id=req.params.id;
    const product=await Product.findByIdAndDelete(id);
    if(!product){
  // return res.status(500).json({success:false, message:"Product not found"})
  return next(new errorHandler("product not found",404))
}
    res.status(200).json({
        success:true,
        product,
    })
}

// Get products by category
export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.query; // e.g., /products/category?category=iPhone

    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    const products = await Product.find({ category });

    if (products.length === 0) {
      return next(new errorHandler(`No products found in category: ${category}`, 404));
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};


