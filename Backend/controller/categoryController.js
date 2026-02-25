import cloudinary from "../config/cloudinary.js";
import Category from "../model/categoryModel.js";
import { Readable } from "stream";

// export const createCategory=async(req,res)=>{
//     try{
//         const {name,description}=req.body;

//           if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image file is required",
//       });
//     }

//         const streamUpload = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "categories" },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );
//         stream.end(req.file.buffer);
//       });
//     };

//      const result = await streamUpload();

//         const category=await Category.create({
//             name,
//             description,
//             image:{
//                 public_id:result.public_id,
//                 url:result.secure_url,
//             }
//         })
//         res.status(201).json({
//             success:true,
//             category
//         })
//     }
//     catch(err){
//         res.status(400).json({
//             success:false,
//             message:err.message,
//         })
//     }
// }


export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // 1. Create a function that handles the stream
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            folder: "categories",
            resource_type: "auto" // This ensures it handles JPG, PNG, etc.
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        // 2. Convert buffer to a readable stream and pipe it to Cloudinary
        Readable.from(fileBuffer).pipe(uploadStream);
      });
    };

    // 3. Execute the upload
    const result = await streamUpload(req.file.buffer);

    // 4. Save to Database
    const category = await Category.create({
      name,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err); // This will show in your terminal
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export const getallcategory=async(req,res)=>{
    try{
        const allcategory=await Category.find();
        res.status(201).json({
            success:true,
            allcategory
        })

    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

// export const deletecategory=async(req,res,next)=>{
//     const id=req.params.id;
//     const category=await Category.findByIdAndDelete(id);
    
//      if (!category) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }


//   await cloudinary.uploader.destroy(category.image.public_id);
//   await category.deleteOne();

//     res.status(200).json({
//         success:true,
//         category,
//     })
// }

export const deletecategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // 1️⃣ Delete image from Cloudinary
    await cloudinary.uploader.destroy(category.image.public_id);

    // 2️⃣ Delete from database
    await category.deleteOne();

    res.status(200).json({
      success: true,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};