// import mongoose from "mongoose";

// const designSchema=new mongoose.Schema({
//      wearsname:{
//         type:String,
//      },

//           wearsimage:{
//         public_id:{
//             type:String,
//             required:true,
//         },  
//         url:{
//             type:String,
//             required:true,
//         }
//     },

//     clothname:{
//         type:String,
//     },
//         clothimage:{    
//         public_id:{
//             type:String,
//             required:true,
//         },
//         url:{
//             type:String,
//             required:true,
//         }
//     },

//     colors:{
//         type:String,
//     }
// })

// const Design=mongoose.model("Design",designSchema)
// export default Design;


import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
    wearsname: {
        type: String,
    },
    wearsimage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    clothname: {
        type: String,
    },
    colors: {
        type: String,
    }
});

const Design = mongoose.model("Design", designSchema);
export default Design;