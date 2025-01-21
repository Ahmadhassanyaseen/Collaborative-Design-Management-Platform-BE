import { Router } from 'express';
import UploadController from '../../Controllers/UploadController/UploadController.js';
import uploadSingleFileToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";
import upload from "../../Middlewares/MulterMiddleware.js";

const UploadRouter = Router();

// Upload file route
// console.log("here");
// console.log(upload);

UploadRouter.post('/', upload.single('file'), uploadSingleFileToCloudinary('file'), UploadController.uploadFile);

// Delete file route
UploadRouter.delete('/:publicId', UploadController.deleteFile);

export default UploadRouter;
