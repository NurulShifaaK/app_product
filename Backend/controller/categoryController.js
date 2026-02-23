import Category from "../model/categoryModel.js";

export const createCategory=async(req,res)=>{
    try{
        const {name,description,image}=req.body;
        const category=await Category.create({
            name,
            description,
            image,
        })
        res.status(201).json({
            success:true,
            category
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

export const getallcategory=async(req,res)=>{
    try{
        const allcategory=await Category.find();
        res.status(201).json({
            success:true,
            allcategory
        })

    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

export const deletecategory=async(req,res,next)=>{
    const id=req.params.id;
    const category=await Category.findByIdAndDelete(id);
    if(!category){
  return next(new errorHandler("category not found",404))
    }
    res.status(200).json({
        success:true,
        category,
    })
}