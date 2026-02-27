
import { v2 as cloudinary } from 'cloudinary';
import Design from "../model/designModel.js";

// 1. Create a new Design Option (Admin Only)
export const createDesignOption = async (req, res) => {
    try {
        const { wearsname, clothname, colors } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload an image" });
        }

        // Configuration (Make sure this is inside the controller or in a config file)
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API_KEY, 
            api_secret: process.env.CLOUD_API_SECRET 
        });

        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                // CHANGE THIS LINE: Remove the '.v2'
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "designs" },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Upload Stream Error:", error);
                            return reject(error);
                        }
                        resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });
        };

        const result = await uploadToCloudinary();

        const design = await Design.create({
            wearsname,
            clothname,
            colors,
            wearsimage: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        });

        res.status(201).json({ success: true, design });
    } catch (error) {
        console.error("Final Error Object:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// 2. Get All Design Options (For your Frontend Filters)
export const getDesignFilters = async (req, res) => {
    try {
        const designs = await Design.find();
        
        // Extract unique values for clean filter arrays
        const filters = {
            wearStyles: [...new Set(designs.map(d => d.wearsname).filter(Boolean))],
            fabrics: [...new Set(designs.map(d => d.clothname).filter(Boolean))],
            availableColors: [...new Set(designs.map(d => d.colors).filter(Boolean))],
            rawDetails: designs // Contains the images and full objects
        };

        res.status(200).json({ success: true, filters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};