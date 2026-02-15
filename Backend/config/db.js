import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.DB_URL).then((data)=>{
    console.log("Database connected successfully",data.connection.host);
}).catch((err)=>{
    console.log("Database connection failed",err.message);
})
}