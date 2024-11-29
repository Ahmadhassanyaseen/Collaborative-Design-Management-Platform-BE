import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dseyjydkj",
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (fieldName) => {
    // console.log("here2");
  return async (req, res, next) => {
    try {
      if (!req.files || !req.files[fieldName]) {
        throw new Error(`No ${fieldName} file provided`);
          // console.log("here3");
        }
        // console.log("here5");
      const files = req.files[fieldName];
      let uploadOptions = { resource_type: "auto" };

      const urls = await Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            // const fileType = file.mimetype.split("/")[0];
            // let uploadFolder = "default_folder";
            // switch (fileType) {
            //   case "image":
            //     uploadFolder = "images";
            //     break;
            //   case "audio":
            //     uploadFolder = "audios";
            //     break;
            //   case "video":
            //     uploadFolder = "videos";
            //     break;
            // }
            uploadOptions.folder = "xeno";
            cloudinary.uploader
              .upload_stream(uploadOptions, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result.secure_url);
                }
              })
              .end(file.buffer);
          });
        })
      );

      req[fieldName + "Urls"] = urls; // Store the URLs in the request object
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
};

export default uploadToCloudinary;
