
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tags:[
        {type:String,}
    ],
    file:{
        type: String,
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

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
