import { Router } from "express";
import UserRouter from "./UserRouter/UserRouter.js";
import TeamRouter from "./TeamRouter/TeamRouter.js";
import TaskRouter from "./TaskRouter/TaskRouter.js";
import RoleRouter from "./RoleRouter/RoleRouter.js";

const AllRouter = Router();

AllRouter.use('/users', UserRouter);
AllRouter.use('/teams', TeamRouter);
AllRouter.use("/tasks", TaskRouter);
AllRouter.use("/roles", RoleRouter);

export default AllRouter;