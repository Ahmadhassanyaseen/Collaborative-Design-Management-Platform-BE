import UserServices from "../../Services/UserServices/UserServices.js";

const UserController = {
  createUser: async (req, res) => {
    try {
      const user = await UserServices.createUser(req, res);

      res.send(user);
    } catch (error) {
      console.error("Error While Creating User" + error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await UserServices.loginUser(req, res);
      if(!user){
         throw new Error("User Not Found");
      }

      res.json(user);
    } catch (error) {
      console.error("Error While Login User" + error);
    }
  },
  allUsers: async (req, res) => {
    try {
      const user = await UserServices.allUsers(req, res);

      res.send(user);
    } catch (error) {
      console.error("Error While Fetching all Users " + error);
    }
  },
  singleUser: async (req, res) => {
    try {
      const user = await UserServices.singleUser(req, res);

      res.send(user);
    } catch (error) {
      console.error("Error While fetching single User" + error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await UserServices.updateUser(req, res);

      res.send(user);
    } catch (error) {
      console.error("Error While updating single User" + error);
    }
  },
  updateUserImage: async (req, res) => {
    try {
      const user = await UserServices.updateUserImage(req, res);

      res.send(user);
    } catch (error) {
      console.error("Error While updating single User Image " + error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await UserServices.deleteUser(req, res);

      res.send(user);
    } catch (error) {
      console.error("Error While deleting single User" + error);
    }
  },
};

export default UserController;