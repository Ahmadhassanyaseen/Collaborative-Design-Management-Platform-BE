import BlogCategoryModel from "../../Models/BlogCategoryModel/BlogCategoryModel.js";
import PostModel from "../../Models/PostModel/PostModel.js";

const BlogService = {
  async createPost(req) {
    const { name, content, category, createdBy, comments, status } = req.body;
    const featuredImage = req.imageUrl;

    const post = new PostModel({
      name,
      content,
      category,
      featuredImage,
      status,
      createdBy,
      comments,
    });

    return await post.save();
  },
  async getAllPosts() {
    return await PostModel.find({ isDeleted: false })
      .populate("category")
      .populate("createdBy");
  },

  async getPostById(id) {
    return await PostModel.findById(id)
      .populate("category")
      .populate("createdBy");
  },

  async updatePost(id, req) {
    const { name, content, category, comments, status } = req.body;
    const updateData = { name, content, category, comments, status };

    return await PostModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate("category")
      .populate("createdBy");
  },
  async updatePostImage(id, req) {
   const updateData = { featuredImage: req.imageUrl };

    return await PostModel.findByIdAndUpdate(id, updateData, { new: true }).populate("category").populate("createdBy");
  },

  async deletePost(id) {
    const post = await PostModel.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    const result = await post.updateOne({ isDeleted: true });

    return result;
  },

  // Create a new category
  async createCategory(req) {
    const { name, createdBy } = req.body;
    const iconUrl = req.iconUrl;

    const category = new BlogCategoryModel({
      name,
      icon: iconUrl,
      createdBy,
    });
    return await category.save();
  },

  // Get all categories
  async getAllCategories() {
    return await BlogCategoryModel.find({ isDeleted: false }).populate(
      "createdBy"
    );
  },

  // Get a single category by ID
  async getCategoryById(id) {
    return await BlogCategoryModel.findOne({ _id: id, isDeleted: false });
  },

  // Update a category by ID
  async updateCategory(id, req) {
    const category = await BlogCategoryModel.findById(id);
    if (!category) {
      return null;
    }
    const { name } = req.body;
    category.name = name || category.name;
    category.icon = req.iconUrl || category.icon;

    return await category.save();
  },

  // Delete a category (soft delete)
  async deleteCategory(id) {
    return await BlogCategoryModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  },
};

export default BlogService;
