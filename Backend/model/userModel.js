import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";


const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"please enter your name"],
},
email:{
    type:String,
    required:[true,"please enter your email"],
    unique:true,
    validate:[validator.isEmail,"Please enter Valid email"]
},
password:{
    type:String,
    required:[true,"Please enter your passcode"],
    minLength:[8,"Password should be greater than 8 characters"],
    select:false,
},
role: {
  type: String,
  enum: ["USER", "ADMIN", "SUPERADMIN"],   // Only these allowed
  default: "USER",
},

resetPasswordToken:String,
resetPasswordExpire:Date,

},
{timestamps:true}
)




export default mongoose.model("User",userSchema)