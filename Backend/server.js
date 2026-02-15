import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT=process.env.PORT || 3000;

//CONTROLLER
connectDB();

//routes

 app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}) 