import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
 
    name:{
        type:String,
        required:[true,"please enter category name"],
    },
    description:{
        type:String,
    },
    image:{
        public_id:{
            type:String,
            required:true,
        },  
        url:{
            type:String,
            required:true,
        }
    },
})
const Category=mongoose.model("Category",categorySchema)
export default Category;