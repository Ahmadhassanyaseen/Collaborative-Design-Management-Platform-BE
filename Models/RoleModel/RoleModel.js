import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    resource: {
      type: String,
      required: true,
    },
    actions: {
      type: [String], // e.g., ["view", "edit", "delete"]
      required: true,
    },
  },
  { _id: false } // Prevents the creation of an _id field for each permission object
);

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: {
      type: [PermissionSchema],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Role", RoleSchema);
