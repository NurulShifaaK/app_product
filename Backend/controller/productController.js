// // import Product from "../model/productModel.js"
// // import errorHandler from "../helper/handleError.js"
// // import APIHelper from "../helper/APIHelper.js"
// // //create
// // export const createproduct = async (req, res) => {
// //     try {
// //         const newproduct = await Product.create(req.body);
// //         res.status(201).json({
// //             success: true,
// //             newproduct
// //         });
// //     } catch (error) {
// //         res.status(400).json({
// //             success: false,
// //             message: error.message
// //         });
// //     }
// // }

// // //get all product
// // //http://localhost:3000/api/v1/products?keyword=samsung
// // export const getallproducts=async(req,res)=>{
// //     //const products=await Product.find();
// //     //console.log(req.query.keyword)
// //     const apiHelper=new APIHelper(Product.find(),req.query).search().filter();
// //      console.log(apiHelper)
// //      const products=await apiHelper.query;
// //     res.status(200).json({
// //         success:true,
// //         products,   
// //     })
// // }

// // //get single product
// // export const getsingleproduct=async(req,res,next)=>{
// // //console.log(req.params.id)
// // const id=req.params.id;
// // let singleproduct=await Product.findById(id);
// // if(!singleproduct){
// //    //return res.status(500).json({success:false, message:"Product not found"})
// //  return next(new errorHandler("product not found",404))
// // }
// // return res.status(200).json({success:true, singleproduct})
// // }


// // //update product

// // export const updateproduct=async(req,res,next)=>{
// //     const id=req.params.id;
// //     const update=await Product.findByIdAndUpdate(id,req.body,{
// //         new:true,
// //         runValidators:true,
// //     });
// //     if(!update){
// //   // return res.status(500).json({success:false, message:"Product not found"})
// //   return next(new errorHandler("product not found",404))
// // }
// //     res.status(200).json({
// //         success:true,
// //         update,
// //     })
// // }

// // //delete
// // export const deleteproduct=async(req,res,next)=>{
// //     const id=req.params.id;
// //     const product=await Product.findByIdAndDelete(id);
// //     if(!product){
// //   // return res.status(500).json({success:false, message:"Product not found"})
// //   return next(new errorHandler("product not found",404))
// // }
// //     res.status(200).json({
// //         success:true,
// //         product,
// //     })
// // }

// // // Get products by category
// // export const getProductsByCategory = async (req, res, next) => {
// //   try {
// //     const { category } = req.query; // e.g., /products/category?category=iPhone

// //     if (!category) {
// //       return res.status(400).json({ success: false, message: "Category is required" });
// //     }

// //     const products = await Product.find({ category });

// //     if (products.length === 0) {
// //       return next(new errorHandler(`No products found in category: ${category}`, 404));
// //     }

// //     res.status(200).json({
// //       success: true,
// //       products,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


// // import Product from "../model/productModel.js";
// // import cloudinary from "../config/cloudinary.js";
// // import { Readable } from "stream";
// // import errorHandler from "../helper/handleError.js";
// // import APIHelper from "../helper/APIHelper.js";


// // // ============================
// // // CREATE PRODUCT
// // // ============================
// // export const createproduct = async (req, res, next) => {
// //   try {
// //     const { name, price, description, category, stock } = req.body;

// //     if (!req.file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Product image is required",
// //       });
// //     }

// //     // Upload image to Cloudinary
// //     const streamUpload = (fileBuffer) => {
// //       return new Promise((resolve, reject) => {
// //         const uploadStream = cloudinary.uploader.upload_stream(
// //           {
// //             folder: "products",
// //             resource_type: "auto",
// //           },
// //           (error, result) => {
// //             if (result) resolve(result);
// //             else reject(error);
// //           }
// //         );

// //         Readable.from(fileBuffer).pipe(uploadStream);
// //       });
// //     };

// //     const result = await streamUpload(req.file.buffer);

// //     const product = await Product.create({
// //       name,
// //       price,
// //       description,
// //       category,
// //       stock,
// //       image: {
// //         public_id: result.public_id,
// //         url: result.secure_url,
// //       },
// //     });

// //     res.status(201).json({
// //       success: true,
// //       product,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


// // // ============================
// // // GET ALL PRODUCTS
// // // ============================
// // export const getallproducts = async (req, res, next) => {
// //   try {
// //     const apiHelper = new APIHelper(Product.find(), req.query)
// //       .search()
// //       .filter();

// //     const products = await apiHelper.query;

// //     res.status(200).json({
// //       success: true,
// //       products,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


// // // ============================
// // // GET SINGLE PRODUCT
// // // ============================
// // export const getsingleproduct = async (req, res, next) => {
// //   try {
// //     const product = await Product.findById(req.params.id);

// //     if (!product) {
// //       return next(new errorHandler("Product not found", 404));
// //     }

// //     res.status(200).json({
// //       success: true,
// //       product,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


// // // ============================
// // // UPDATE PRODUCT
// // // ============================
// // export const updateproduct = async (req, res, next) => {
// //   try {
// //     let product = await Product.findById(req.params.id);

// //     if (!product) {
// //       return next(new errorHandler("Product not found", 404));
// //     }

// //     // If new image uploaded
// //     if (req.file) {
// //       // Delete old image from Cloudinary
// //       await cloudinary.uploader.destroy(product.image.public_id);

// //       // Upload new image
// //       const streamUpload = (fileBuffer) => {
// //         return new Promise((resolve, reject) => {
// //           const uploadStream = cloudinary.uploader.upload_stream(
// //             {
// //               folder: "products",
// //               resource_type: "auto",
// //             },
// //             (error, result) => {
// //               if (result) resolve(result);
// //               else reject(error);
// //             }
// //           );

// //           Readable.from(fileBuffer).pipe(uploadStream);
// //         });
// //       };

// //       const result = await streamUpload(req.file.buffer);

// //       req.body.image = {
// //         public_id: result.public_id,
// //         url: result.secure_url,
// //       };
// //     }

// //     product = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       {
// //         new: true,
// //         runValidators: true,
// //       }
// //     );

// //     res.status(200).json({
// //       success: true,
// //       product,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


// // // ============================
// // // DELETE PRODUCT
// // // ============================
// // // export const deleteproduct = async (req, res, next) => {
// // //   try {
// // //     const product = await Product.findById(req.params.id);

// // //     if (!product) {
// // //       return next(new errorHandler("Product not found", 404));
// // //     }

// // //     // Delete image from Cloudinary
// // //     await cloudinary.uploader.destroy(product.image.public_id);

// // //     // Delete product from DB
// // //     await product.deleteOne();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Product deleted successfully",
// // //     });
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };


// // //delete
// // export const deleteproduct=async(req,res,next)=>{
// //     const id=req.params.id;
// //     const product=await Product.findByIdAndDelete(id);
// //     if(!product){
// //   // return res.status(500).json({success:false, message:"Product not found"})
// //   return next(new errorHandler("product not found",404))
// // }
// //     res.status(200).json({
// //         success:true,
// //         product,
// //     })
// // }

// // // ============================
// // // GET PRODUCTS BY CATEGORY
// // // ============================
// // export const getProductsByCategory = async (req, res, next) => {
// //   try {
// //     const { category } = req.query;

// //     if (!category) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Category is required",
// //       });
// //     }

// //     const products = await Product.find({ category });

// //     if (products.length === 0) {
// //       return next(
// //         new errorHandler(`No products found in category: ${category}`, 404)
// //       );
// //     }

// //     res.status(200).json({
// //       success: true,
// //       products,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };



// import Product from "../model/productModel.js";
// import cloudinary from "../config/cloudinary.js";
// import { Readable } from "stream";
// import errorHandler from "../helper/handleError.js";
// import APIHelper from "../helper/APIHelper.js";

// // Helper function to handle Cloudinary Stream Upload
// const streamUpload = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: "products",
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (result) resolve(result);
//         else reject(error);
//       }
//     );
//     Readable.from(fileBuffer).pipe(uploadStream);
//   });
// };

// // ============================
// // CREATE PRODUCT
// // ============================
// export const createproduct = async (req, res, next) => {
//   try {
//     const { name, price, description, category, categoryType, stock, offerprice } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Product image is required",
//       });
//     }

//     // 1. Upload to Cloudinary
//     const result = await streamUpload(req.file.buffer);

//     // 2. Save to DB using the 'images' array format
//     const product = await Product.create({
//       name,
//       price,
//       offerprice,
//       description,
//       category,
//       categoryType,
//       stock,
//       images: [
//         {
//           public_id: result.public_id,
//           url: result.secure_url,
//         },
//       ],
//     });

//     res.status(201).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================
// // GET ALL PRODUCTS
// // ============================
// export const getallproducts = async (req, res, next) => {
//   try {
//     const apiHelper = new APIHelper(Product.find(), req.query)
//       .search()
//       .filter();

//     const products = await apiHelper.query;

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================
// // GET SINGLE PRODUCT
// // ============================
// export const getsingleproduct = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new errorHandler("Product not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================
// // UPDATE PRODUCT
// // ============================
// export const updateproduct = async (req, res, next) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new errorHandler("Product not found", 404));
//     }

//     // Handle Image Update
//     if (req.file) {
//       // SAFE CHECK: Only attempt deletion if old image exists
//       if (product.images && product.images.length > 0 && product.images[0].public_id) {
//         await cloudinary.uploader.destroy(product.images[0].public_id);
//       }

//       // Upload new image
//       const result = await streamUpload(req.file.buffer);

//       // Set req.body.images so findByIdAndUpdate picks it up
//       req.body.images = [
//         {
//           public_id: result.public_id,
//           url: result.secure_url,
//         },
//       ];
//     }

//     product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================
// // DELETE PRODUCT
// // ============================
// export const deleteproduct = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new errorHandler("Product not found", 404));
//     }

//     // 1. Delete associated image from Cloudinary
//     if (product.images && product.images.length > 0 && product.images[0].public_id) {
//       await cloudinary.uploader.destroy(product.images[0].public_id);
//     }

//     // 2. Remove from Database
//     await product.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================
// // GET PRODUCTS BY CATEGORY
// // ============================
// export const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.query;

//     if (!category) {
//       return res.status(400).json({
//         success: false,
//         message: "Category is required",
//       });
//     }

//     const products = await Product.find({ category });

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


import Product from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";
import errorHandler from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";

// ==========================================
// HELPER: CLOUDINARY STREAM UPLOAD
// ==========================================
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        resource_type: "auto",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

// ============================
// CREATE PRODUCT
// ============================
export const createproduct = async (req, res, next) => {
  try {
    const { name, price, description, category, categoryType, stock, offerprice } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await streamUpload(req.file.buffer);

    // Create product in Database
    // Note: Using "images" (plural) as an array to match your Mongoose Model
    const product = await Product.create({
      name,
      price,
      description,
      category,
      categoryType,
      stock,
      offerprice: offerprice || null,
      images: [
        {
          public_id: result.public_id,
          url: result.secure_url,
        },
      ],
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// ============================
// GET ALL PRODUCTS
// ============================
export const getallproducts = async (req, res, next) => {
  try {
    // Uses your APIHelper for search and filter logic
    const apiHelper = new APIHelper(Product.find(), req.query)
      .search()
      .filter();

    const products = await apiHelper.query;

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// ============================
// GET SINGLE PRODUCT
// ============================
export const getsingleproduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// ============================
// UPDATE PRODUCT
// ============================
export const updateproduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    // If a new image file is provided in the update request
    if (req.file) {
      // 1. Delete old image from Cloudinary (Safe check if images exist)
      if (product.images && product.images.length > 0 && product.images[0].public_id) {
        await cloudinary.uploader.destroy(product.images[0].public_id);
      }

      // 2. Upload new image to Cloudinary
      const result = await streamUpload(req.file.buffer);

      // 3. Update the request body to include the new images array
      req.body.images = [
        {
          public_id: result.public_id,
          url: result.secure_url,
        },
      ];
    }

    // Update product fields in MongoDB
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// ============================
// DELETE PRODUCT
// ============================
export const deleteproduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    // 1. Delete associated image from Cloudinary if it exists
    if (product.images && product.images.length > 0 && product.images[0].public_id) {
      await cloudinary.uploader.destroy(product.images[0].public_id);
    }

    // 2. Delete the product document from Database
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ============================
// GET PRODUCTS BY CATEGORY
// ============================
// export const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.query;

//     if (!category) {
//       return res.status(400).json({
//         success: false,
//         message: "Category is required",
//       });
//     }

//     const products = await Product.find({ category });

//     if (products.length === 0) {
//       return next(
//         new errorHandler(`No products found in category: ${category}`, 404)
//       );
//     }

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// ============================
// GET PRODUCTS BY CATEGORY + FILTERS
// ============================
export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category, categorywears, clothType, colors } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const filter = { category };

    if (categorywears) {
      filter.categorywears = { $regex: categorywears, $options: "i" };
    }

    if (clothType) {
      filter.clothType = { $regex: clothType, $options: "i" };
    }

    if (colors) {
      filter.colors = { $regex: colors, $options: "i" };
    }



    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    next(error);
  }
};