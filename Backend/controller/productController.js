import Product from "../model/productModel.js"

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
export const getallproducts=async(req,res)=>{
    const products=await Product.find();
    res.status(200).json({
        success:true,
        products,   
    })
}

//get single product
export const getsingleproduct=async(req,res)=>{
//console.log(req.params.id)
const id=req.params.id;
let singleproduct=await Product.findById(id);
if(!singleproduct){
   return res.status(500).json({success:false, message:"Product not found"})
}
return res.status(200).json({success:true, singleproduct})
}


//update product

export const updateproduct=async(req,res)=>{
    const id=req.params.id;
    const update=await Product.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
    });
    if(!update){
   return res.status(500).json({success:false, message:"Product not found"})
}
    res.status(200).json({
        success:true,
        update,
    })
}