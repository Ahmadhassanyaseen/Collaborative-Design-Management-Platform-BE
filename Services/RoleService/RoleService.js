import RoleModel from "../../Models/RoleModel/RoleModel.js"; // Adjust the import path to your Role model

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
};

export default RoleService;
