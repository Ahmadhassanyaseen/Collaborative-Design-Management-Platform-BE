import { Router } from "express";
import TaskController from "../../Controller/TaskController/TaskController.js";
import upload from "../../Middlewares/MulterMiddleware.js";
import uploadSingleFileToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";

const TaskRouter = Router();

TaskRouter.post(
  "/createTask",
  upload.single("image"),
  uploadSingleFileToCloudinary("image"),
  TaskController.createTask
);
TaskRouter.get("/allTasks", TaskController.getAllTasks);
TaskRouter.put(
  "/updateTaskFile/:id",
  upload.single("image"),
  uploadSingleFileToCloudinary("image"),
  TaskController.updateTaskFile
);
TaskRouter.get("/singleTask/:id", TaskController.getTaskById);
TaskRouter.put("/updateTask/:id", TaskController.updateTask);
TaskRouter.delete("/deleteTask/:id", TaskController.deleteTask);


export default TaskRouter;
