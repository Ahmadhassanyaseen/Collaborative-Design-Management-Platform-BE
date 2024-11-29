import { Router } from "express";
import RoleController from "../../Controller/RoleController/RoleController.js";

const RoleRouter = Router();

// Route to create a new role
RoleRouter.post("/createRole", RoleController.createRole);

// Route to update an existing role
RoleRouter.put("/updateRole/:id", RoleController.updateRole);

// Route to delete a role
RoleRouter.delete("/deleteRole/:id", RoleController.deleteRole);

// Route to fetch all roles
RoleRouter.get("/allRoles", RoleController.getAllRoles);

// Route to fetch a single role by ID
RoleRouter.get("/singleRole/:id", RoleController.getRoleById);
// Route to fetch all user with role id 
RoleRouter.get("/allUsersWithRole/:id", RoleController.allUsersWithRole);

export default RoleRouter;
