import { Router } from "express";
import UserRouter from "./UserRouter/UserRouter.js";
import TeamRouter from "./TeamRouter/TeamRouter.js";
import TaskRouter from "./TaskRouter/TaskRouter.js";
import RoleRouter from "./RoleRouter/RoleRouter.js";
import ProductRouter from "./ProductRouter/ProductRouter.js";
import ItemRouter from "./ItemRouter/ItemRouter.js";
import BlogRouter from "./BlogRouter/BlogRouter.js";
import UploadRouter from "./UploadRouter/UploadRouter.js";

const AllRouter = Router();

AllRouter.use('/users', UserRouter);
AllRouter.use('/teams', TeamRouter);
AllRouter.use("/tasks", TaskRouter);
AllRouter.use("/roles", RoleRouter);
AllRouter.use("/products", ProductRouter);
AllRouter.use("/items", ItemRouter);
AllRouter.use("/blogs", BlogRouter);
AllRouter.use("/upload", UploadRouter);

export default AllRouter;