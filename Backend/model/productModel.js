import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
    },
    description:{ 
        type:String,
        required:[true,"please enter product description"],
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"price cannot exceed 8 characters"],
    },
     offerprice:{
        type:Number,
        default: null,

    },
    ratings:{
        type:Number,
        default:0,  
    },
    images:[{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    }],
    category:{
        type:String,
        required:[true,"please enter product category"],    
    },
    categorywears:{
        type:String,
        required:[true,"please enter product category wears"],    
    },
    clothType:{
        type:String,
        required:[true,"please enter product cloth type"],    
    },

    colors:{
     type:String,
     required:[true,"please enter product colors"],
     default:"Black",
    },

    sizes:{
        type:String,
        required:[true,"please enter product sizes"],
        default:"54",
    },

    stock:{
        type:Number, 
        required:[true,"please enter product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1,   
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            name:{
                type:String,
               
            },
            rating:{
                type:Number,
              
            },
            comment:{
                type:String,
           
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

export default mongoose.model("Product",productSchema)