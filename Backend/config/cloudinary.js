// import {v2 as cloudinary} from "cloudinary";

// cloudinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.CLOUD_API_KEY,
//     api_secret:process.env.CLOUD_API_SECRET,
// })

// console.log(process.env.CLOUDINARY_API_KEY);

// export default cloudinary;


import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

// Add this here as a safety measure for standalone testing
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log("Cloudinary Key:", process.env.CLOUD_API_KEY);

export default cloudinary;