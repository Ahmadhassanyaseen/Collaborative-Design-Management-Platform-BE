import { Router } from "express";
import UserController from "../../Controller/UserController/UserController.js";
// import uploadToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";
import uploadSingleFileToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";
import upload from "../../Middlewares/MulterMiddleware.js";
const UserRouter = Router();

UserRouter.post(
  "/createUser",
  upload.single("image"),
  uploadSingleFileToCloudinary('image'),
  UserController.createUser
);

UserRouter.post('/loginUser' , UserController.loginUser)
UserRouter.get('/allUsers' , UserController.allUsers)
UserRouter.get('/singleUser/:userId' , UserController.singleUser)
UserRouter.put(
  "/updateUser/:userId",
  UserController.updateUser
);
UserRouter.put(
  "/updateUserImage/:userId",
  upload.single("image"),
  uploadSingleFileToCloudinary("image"),
  UserController.updateUserImage
);

UserRouter.delete('/deleteUser/:userId' , UserController.deleteUser);

export default UserRouter;