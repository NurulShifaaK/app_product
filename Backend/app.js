import express from 'express';
import product from './routes/productRoute.js';
import cors from "cors";

const app=express();
app.use(express.json());

app.use(cors({
  origin: "*",  
}));
//Routes
app.use("/api/v1/",product);

export default app;