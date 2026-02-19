import HandleError from "../helper/handleError.js";
import User from "../model/userModel.js"
export const registerUser =async(req,res,next)=>{
   const {name,email,password,role}=req.body;
   const user=await User.create({
    name,
    email,
    password,
    role
   })
   res.status(201).json({
    success:true,
    user
   })
};

export const getallregistereduser=async(req,res)=>{
    const alluser=await User.find()

    res.status(201).json({
    success:true,
    alluser
   })
}

export const loginuUser=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return next(new HandleError("email or password cannot be empty"))
    }
    const user=await User.findOne({email});
    res.json({success:true,user})
}

