import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    content:{
        type:String,
        required:true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    websites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogWebsite",
      required: true,
    }],
    metaTitle: {
      type: String,
      required: true,
      maxLength: 60 // SEO best practice for meta titles
    },
    metaDescription: {
      type: String,
      required: true,
      maxLength: 160 // SEO best practice for meta descriptions
    },
    focusKeywords: [{
      type: String,
      required: true,
      trim: true
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments:{
        type:Boolean,
        default: false
    },
    views: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: "draft",
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

export default mongoose.model("Post", PostSchema);
