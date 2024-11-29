import RoleModel from "../../Models/RoleModel/RoleModel.js"; // Adjust the import path to your Role model
import UserModel from "../../Models/UserModel/UserModel.js";

const RoleService = {
  createRole: async (roleData) => {
    // console.log(roleData);
    const role = new RoleModel(roleData);
    return await role.save();
  },

  updateRole: async (id, roleData) => {
    return await RoleModel.findByIdAndUpdate(id, roleData, {
      new: true,
      runValidators: true,
    });
  },

  deleteRole: async (id) => {
    return await RoleModel.findByIdAndDelete(id);
  },

  getAllRoles: async () => {
    return await RoleModel.find({});
  },

  getRoleById: async (id) => {
    return await RoleModel.findById(id);
  },
  allUsersWithRole: async (id) => {
    return await UserModel.find({ role: id  , isDeleted: false});
  },
};

export default RoleService;
