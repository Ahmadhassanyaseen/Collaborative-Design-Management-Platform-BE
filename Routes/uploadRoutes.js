import express from 'express';
import UploadController from '../Controllers/UploadController/UploadController.js';
import { upload } from '../Services/UploadService/UploadService.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Upload file route
router.post('/upload', authenticateToken, upload.single('file'), UploadController.uploadFile);

// Delete file route
router.delete('/delete/:publicId', authenticateToken, UploadController.deleteFile);

export default router;
