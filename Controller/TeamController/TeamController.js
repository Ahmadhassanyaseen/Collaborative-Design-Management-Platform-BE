import TeamService from "../../Services/TeamService/TeamService.js";

const TeamController = {
  createTeam: async (req, res) => {
    try {
          
      const team = await TeamService.createTeam(req,req.body);
      res.status(201).send(team);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to create team" });
    }
  },

  getAllTeams: async (req, res) => {
    try {
      const teams = await TeamService.getAllTeams();
      res.status(200).send(teams);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to fetch teams" });
    }
  },
  updateTeamImage: async (req, res) => {
    try {
      const teams = await TeamService.updateTeamImage(req,res);
      res.status(200).send(teams);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to fetch teams" });
    }
  },

  getTeamById: async (req, res) => {
    try {
      const team = await TeamService.getTeamById(req.params.id);
      if (!team) {
        return res.status(404).send({ error: "Team not found" });
      }
      res.status(200).send(team);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to fetch team" });
    }
  },

  updateTeam: async (req, res) => {
    try {
      const team = await TeamService.updateTeam(req.params.id, req.body);
      if (!team) {
        return res.status(404).send({ error: "Team not found" });
      }
      res.status(200).send(team);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to update team" });
    }
  },

  deleteTeam: async (req, res) => {
    try {
      const result = await TeamService.deleteTeam(req.params.id);
      if (!result) {
        return res.status(404).send({ error: "Team not found" });
      }
      res.status(200).send({ message: "Team deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to delete team" });
    }
  },

  addMember: async (req, res) => {
    try {
      const team = await TeamService.addMember(req.params.id, req.body.member);
      if (!team) {
        return res.status(404).send({ error: "Team not found" });
      }
      res.status(200).send(team);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to add member" });
    }
  },

  removeMember: async (req, res) => {
    try {
      const team = await TeamService.removeMember(
        req.params.id,
        req.body.member
      );
      if (!team) {
        return res.status(404).send({ error: "Team not found" });
      }
      res.status(200).send(team);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to remove member" });
    }
  },

  updateLead: async (req, res) => {
    try {
      const team = await TeamService.updateLead(req.params.id, req.body.lead);
      if (!team) {
        return res.status(404).send({ error: "Team not found" });
      }
      res.status(200).send(team);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to update lead" });
    }
  },
};

export default TeamController;
