import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect("mongodb+srv://nurulshifaak_db_user:AOmsa55lxOMEHArv@cluster7.xswdbhg.mongodb.net/?appName=Cluster7").then((data)=>{
    console.log("Database connected successfully",data.connection.host);
}).catch((err)=>{
    console.log("Database connection failed",err.message);
})
}