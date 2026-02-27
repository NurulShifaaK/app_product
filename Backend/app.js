import express from 'express';
import product from './routes/productRoute.js';
import user from './routes/userRoute.js'
import cart from './routes/cartRoute.js'
import checkout from './routes/checkoutRoute.js'
import payment from './routes/paymentRoute.js'
import category from './routes/categoryRoute.js'
import banner from './routes/bannerRoute.js'
import design from './routes/designRoute.js'
import cors from "cors";
import errorMiddleware from './middleware/error.js';
const app=express();
app.use(express.json());

app.use(cors({
  origin: "*",  
}));
//Routes
app.use("/api/v1/",product);
app.use("/api/v1/",user);
app.use("/api/v1/",cart);
app.use("/api/v1/",checkout);
app.use("/api/v1/",payment)
app.use("/api/v1/",category)
app.use("/api/v1/",banner)
app.use("/api/v1",design)


app.use(errorMiddleware);

export default app;