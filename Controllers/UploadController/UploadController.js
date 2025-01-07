import { UploadService } from "../../Services/UploadService/UploadService.js";

const UploadController = {
  uploadFile: async (req, res) => {
    try {
      // The fileUrl should be set by CloudinaryMiddleware
      const fileUrl = req.fileUrl;
      
      if (!fileUrl) {
        return res.status(400).json({ 
          message: "No file URL available. Upload may have failed." 
        });
      }

      res.status(200).json({ url: fileUrl });
    } catch (error) {
      console.error("Error in uploadFile:", error);
      res.status(500).json({ 
        message: error.message || "Internal server error during file upload" 
      });
    }
  },

  deleteFile: async (req, res) => {
    try {
      const { publicId } = req.params;
      const cloudinary = req.app.get('cloudinary');
      
      if (!publicId) {
        return res.status(400).json({ 
          message: "Public ID is required for file deletion" 
        });
      }

      await cloudinary.uploader.destroy(publicId);
      res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Error in deleteFile:", error);
      res.status(500).json({ 
        message: error.message || "Internal server error during file deletion" 
      });
    }
  }
};

export default UploadController;
