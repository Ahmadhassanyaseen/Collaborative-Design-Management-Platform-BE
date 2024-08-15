import { Router } from "express";
import TeamController from "../../Controller/TeamController/TeamController.js";
import upload from "../../Middlewares/MulterMiddleware.js";
import uploadSingleFileToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";

const TeamRouter = Router();

TeamRouter.post(
  "/createTeam",
  upload.single("image"),
  uploadSingleFileToCloudinary("image"),
  TeamController.createTeam
);
TeamRouter.get("/allTeams", TeamController.getAllTeams);
TeamRouter.put(
  "/updateTeamImage/:id",
  upload.single("image"),
  uploadSingleFileToCloudinary("image"),
  TeamController.updateTeamImage
);
TeamRouter.get("/singleTeam/:id", TeamController.getTeamById);
TeamRouter.put("/updateTeam/:id", TeamController.updateTeam);
TeamRouter.delete("/deleteTeam/:id", TeamController.deleteTeam);
TeamRouter.patch("/team/:id/addMember", TeamController.addMember);
TeamRouter.patch("/team/:id/removeMember", TeamController.removeMember);
TeamRouter.patch("/team/:id/updateLead", TeamController.updateLead);

export default TeamRouter;
