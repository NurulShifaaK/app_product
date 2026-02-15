import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config({path:'Backend/config/config.env'});
const PORT=process.env.PORT || 3000;

//CONTROLLER
connectDB();

//routes

 app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}`);
}) 