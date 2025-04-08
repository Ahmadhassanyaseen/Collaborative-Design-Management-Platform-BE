import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      required: true,
      enum: ['standard', 'sharp', 'rounded', 'duoTone' , 'flat' , 'isometric'],
    },
    type: {
      type: String,
      required: true,
      enum: ['solid', 'semiSolid', 'stroke' , 'line' , 'colorLine'],
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    tags: [
      { type: String }
    ],
    file: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

export default mongoose.model("Item", ItemSchema);
