import RoleService from "../../Services/RoleService/RoleService.js";

const RoleController = {
  createRole: async (req, res) => {
    try {
      const role = await RoleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateRole: async (req, res) => {
    try {
      const role = await RoleService.updateRole(req.params.id, req.body);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
      res.json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const role = await RoleService.deleteRole(req.params.id);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const roles = await RoleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getRoleById: async (req, res) => {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
      res.json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default RoleController;
