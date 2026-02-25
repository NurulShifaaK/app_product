import Banner from "../model/bannerModel.js";

export const addbanner=async(req,res)=>{
    try{
       const banner=await Banner.create(req.body);
       res.status(201).json({message:"Banner added successfully",banner});
    }catch(error){
        res.status(500).json({message:"Error adding banner",error:error.message});
    }
}

export const getallbanners=async(req,res)=>{
    try{
    const banner=await Banner.find();
    res.status(200).json({
        success:true,
        banner,   
    })}catch(error){
        res.status(500).json({message:"Error fetching banners",error:error.message});
    }
}

export const deletebannerbyid=async(req,res)=>{
    try{
        const id=req.params.id;
        const banner=await Banner.findByIdAndDelete(id);
        res.status(200).json({
        success:true,
        banner,   
    })}catch(error){
        res.status(500).json({message:"Error fetching banners",error:error.message});
    }
}