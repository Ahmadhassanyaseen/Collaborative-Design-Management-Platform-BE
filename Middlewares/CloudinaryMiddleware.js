import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dseyjydkj",
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSingleFileToCloudinary = (fieldName) => {
  return async (req, res, next) => {
    // console.log(req.file); // Changed from req.files to req.file

    try {
      if (!req.file) {
        throw new Error(`No ${fieldName} file provided`);
      }
      let uploadOptions = { resource_type: "auto" };
      let uploadFolder = "default_folder"; // Default folder
      uploadOptions.folder = uploadFolder; // Set folder in upload options
      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error) {
            throw error;
          } else {
            req[fieldName + "Url"] = result.secure_url;
            next();
          }
        })
        .end(req.file.buffer); // Changed from req.files[fieldName][0].buffer to req.file.buffer
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
};

export default uploadSingleFileToCloudinary;