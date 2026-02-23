import HandleError from "../helper/handleError.js";
import User from "../model/userModel.js"
// export const registerUser =async(req,res,next)=>{
//    const {name,email,password,role}=req.body;
//    const user=await User.create({
//     name,
//     email,
//     password,
//     role
//    })
//    res.status(201).json({
//     success:true,
//     user
//    })
// };

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return next(new HandleError("All fields are required", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HandleError("User already exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password, 
      role,
    });

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
};


export const getallregistereduser=async(req,res)=>{
    const alluser=await User.find()

    res.status(201).json({
    success:true,
    alluser
   })
}

// export const loginuUser=async(req,res)=>{
//     const{email,password}=req.body;
//     if(!email || !password){
//         return next(new HandleError("email or password cannot be empty"))
//     }
//     const user=await User.findOne({email,password});
//     res.json({success:true,user})
// }

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HandleError("Email or password cannot be empty", 400));
    }

    const user = await User.findOne({ email }).select("+password");


    if (!user) {
      return next(new HandleError("User not found", 401));
    }

    if (user.password !== password) {
      return next(new HandleError(" Incorrect Password", 401));
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(new HandleError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};
