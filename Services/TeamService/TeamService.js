import TeamModel from "../../Models/TeamModel/TeamModel.js";
import UserModel from "../../Models/UserModel/UserModel.js";

const TeamService = {
  createTeam: async (req, teamData) => {
    try {
      teamData.imageUrl = req.imageUrl;
      // console.log(teamData);
      const team = await TeamModel.create(teamData);
      return team;
    } catch (err) {
      console.log(err);
      throw new Error("Error creating team");
    }
  },

  getAllTeams: async () => {
    try {
      // Fetch teams from the database
      const teams = await TeamModel.find();

      // Use Promise.all to resolve members and lead asynchronously
      const teamsWithPopulatedUsers = await Promise.all(
        teams.map(async (team) => {
          // Populate members
          const members = await Promise.all(
            team.members.map(async (memberId) => {
              const member = await UserModel.findById(memberId);
              if (!member)
                throw new Error(`Member with ID ${memberId} not found`);
              return member; // Ensure this returns an object
            })
          );

          // Populate lead
          const lead = await UserModel.findById(team.lead);
          if (!lead) throw new Error(`Lead with ID ${team.lead} not found`);

          // Return the team with populated members and lead
          return {
            ...team.toObject(), // Convert Mongoose document to plain object
            members,
            lead,
          };
        })
      );

      return teamsWithPopulatedUsers;
    } catch (err) {
      console.log(err);
      throw new Error("Error fetching teams");
    }
  },

  getTeamById: async (id) => {
    try {
     const team = await TeamModel.findById(id)
       .populate({
         path: "members",
         populate: {
           path: "role", 
         },
       })
       .populate({
         path: "lead",
         populate: {
           path: "role", 
         },
       }); 

      
      return team;
    } catch (err) {
      console.log(err);
      throw new Error("Error fetching team");
    }
  },
  updateTeamImage: async (req,res) => {
    try {
     
      const teamId = req.params.id;
      const imageUrl = req.imageUrl;
      const team = await TeamModel.findById(teamId);
      if(!team){
        return {
          "message": "Team not found",
          "status": "404"
        }
      }
      team.imageUrl = imageUrl;
      team.save();
      return team;
    } catch (err) {
      console.log(err);
      throw new Error("Error fetching team");
    }
  },

  updateTeam: async (id, teamData) => {
    try {
      return await TeamModel.findByIdAndUpdate(id, teamData, { new: true })
        .populate("members", "") // Populate members array with relevant fields
        .populate("lead", "");;
    } catch (err) {
      console.log(err);
      throw new Error("Error updating team");
    }
  },

  deleteTeam: async (id) => {
    try {
      return await TeamModel.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting team");
    }
  },

  addMember: async (id, member) => {
    try {
      return await TeamModel.findByIdAndUpdate(
        id,
        { $addToSet: { members: member } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error adding member");
    }
  },

  removeMember: async (id, member) => {
    try {
      return await TeamModel.findByIdAndUpdate(
        id,
        { $pull: { members: member } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error removing member");
    }
  },

  updateLead: async (id, lead) => {
    try {
      return await TeamModel.findByIdAndUpdate(
        id,
        { lead: lead },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error updating lead");
    }
  },
};

export default TeamService;
