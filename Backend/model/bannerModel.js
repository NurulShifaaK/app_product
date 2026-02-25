import mongoose from "mongoose";

const bannerSchema=new mongoose.Schema({
     bannnerimg:[{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
     }],

       imgtext:{
                type:String,
              },
        imgsubtext:{
                type:String,
        },      
        floatimg:[
            {
                public_id:{
                    type:String,},  
                url:{
                    type:String,}
            }
                ],      
       bgimg:[
                {
                    public_id:{
                        type:String,
                    },
                    url:{
                        type:String,
                    }
                }
              ] ,
        bgcolor:{
                type:String,
              },
         
})
const Banner=mongoose.model("Banner",bannerSchema);
export default Banner;