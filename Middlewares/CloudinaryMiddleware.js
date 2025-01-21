import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Log environment variables for debugging (remove in production)
// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_CLOUD_API_KEY ? "exists" : "missing",
//   api_secret: process.env.CLOUDINARY_API_SECRET ? "exists" : "missing"
// });

const uploadSingleFileToCloudinary = (fieldName) => {
  return async (req, res, next) => {
    try {
      // Configure cloudinary inside the middleware
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      // Verify Cloudinary configuration
      if (!process.env.CLOUDINARY_CLOUD_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
        throw new Error("Cloudinary configuration missing. Please check your environment variables.");
      }

      // If file is already present in the request body, bypass Cloudinary upload
      if (req.body[fieldName]) {
        req[fieldName + "Url"] = req.body[fieldName];
        return next();
      }

      if (!req.file) {
        throw new Error(`No ${fieldName} file provided`);
      }

      const fileType = req.file.mimetype;
      const uploadOptions = {
        resource_type: "auto",
        folder: "default_folder",
      };

      if (fileType === "image/svg+xml") {
        uploadOptions.format = "svg";
      }

      // Create a Promise to handle the upload_stream
      const uploadPromise = new Promise((resolve, reject) => {
        try {
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload stream error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer);
        } catch (error) {
          console.error("Error creating upload stream:", error);
          reject(error);
        }
      });

      const result = await uploadPromise;
      req[fieldName + "Url"] = result.secure_url;
      next();
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      res.status(400).json({ error: err.message });
    }
  };
};

export default uploadSingleFileToCloudinary;