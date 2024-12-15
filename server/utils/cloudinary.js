import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});
import fs from "fs";
import path from "path";

cloudinary.config({
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    // const localFilePath = file;
    // console.log("localPaht",localFilePath);
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    fs.unlink(file, (err) => {
     return err;
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
    } catch (error) {
        console.log(error);
        
    }
}
