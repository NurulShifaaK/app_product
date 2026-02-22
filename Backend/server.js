
import dotenv from 'dotenv';
dotenv.config();
// dotenv.config({ path: "./Backend/config/config.env" });
import app from './app.js';
import { connectDB } from './config/db.js';




const PORT=process.env.PORT || 3000;

//CONTROLLER
connectDB();

//routes

 app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}) 