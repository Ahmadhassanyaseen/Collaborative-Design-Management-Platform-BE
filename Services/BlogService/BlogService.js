import BlogCategoryModel from "../../Models/BlogCategoryModel/BlogCategoryModel.js";
import BlogWebsiteModel from "../../Models/BlogWebsiteModel/BlogWebsiteModel.js";
import PostModel from "../../Models/PostModel/PostModel.js";

const BlogService = {
  async createPost(req) {
    const {
      name,
      slug,
      content,
      category,
      createdBy,
      comments,
      status,
      metaTitle,
      metaDescription,
      focusKeywords,
    } = req.body;

    // Handle websites array from form-data
    const websites = Object.keys(req.body)
      .filter((key) => key.startsWith("websites["))
      .map((key) => req.body[key]);

    const featuredImage = req.imageUrl;
    const finalSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Check if slug already exists
    const existingPost = await PostModel.findOne({
      slug: finalSlug,
      isDeleted: false,
    });

    if (existingPost) {
      throw new Error("A post with this slug already exists");
    }

    const post = new PostModel({
      name,
      slug: finalSlug,
      content,
      category,
      featuredImage,
      status,
      createdBy,
      comments,
      websites,
      metaTitle,
      metaDescription,
      focusKeywords: JSON.parse(focusKeywords || "[]"),
    });

    return await post.save();
  },
  async getAllPosts() {
    return await PostModel.find({ isDeleted: false })
      .populate("category")
      .populate("websites")
      .populate("createdBy");
  },
  async getAllPostsByWebsite(websiteLink) {
    // First find the website by link
    const website = await BlogWebsiteModel.findOne({
      link: websiteLink,
      isDeleted: false,
    });
    if (!website) {
      throw new Error(`Website with link "${websiteLink}" not found`);
    }

    // console.log('Found website:', website);

    // Debug: Check all posts with less restrictive conditions
    const allPosts = await PostModel.find({ isDeleted: false }).select(
      "websites status"
    );
    // console.log('All non-deleted posts:', allPosts);

    // Then find posts using the website's ID
    const query = {
      isDeleted: false,
      websites: website._id,
      status: "publish",
    };

    // console.log('Query:', JSON.stringify(query));

    const posts = await PostModel.find(query)
      .populate("category")
      .populate("websites")
      .populate("createdBy");

    // console.log('Found posts:', posts);

    return posts;
  },
  async getAllPostsByCategory(category) {
    // First find the website by link
    const categories = await BlogCategoryModel.findOne({
      slug: category,
      isDeleted: false,
    });
    if (!categories) {
      throw new Error(`Website with link "${category}" not found`);
    }

    // console.log('Found website:', website);

    // Debug: Check all posts with less restrictive conditions
    const allPosts = await PostModel.find({ isDeleted: false }).select(
      "category status"
    );
    // console.log('All non-deleted posts:', allPosts);

    // Then find posts using the website's ID
    const query = {
      isDeleted: false,
      category: categories._id,
      status: "publish",
    };

    // console.log('Query:', JSON.stringify(query));

    const posts = await PostModel.find(query)
      .populate("category")
      .populate("websites")
      .populate("createdBy");

    // console.log('Found posts:', posts);

    return posts;
  },
  // async allPostsByCategory(category) {
  //   // First find the website by link
  //   const categories = await PostModel.find({
  //     category: category,
  //     isDeleted: false,
  //   }).populate("category")
  //     .populate("websites")
  //     .populate("createdBy");
  //   if (!categories) {
  //     throw new Error(`categories with link "${categories}" not found`);
  //   }

    


  //   return categories;
  // },

  async getPostById(id) {
    return await PostModel.findById(id)
      .populate({
        path: "category",
        match: { isDeleted: false },
      })
      .populate({
        path: "websites",
        match: { isDeleted: false },
        select: "name link createdBy",
      })
      .populate("createdBy");
  },
  async getPostBySlug(slug) {
    // Find and update the post atomically
    const post = await PostModel.findOneAndUpdate(
      { slug, isDeleted: false, status: "publish" },
      { $inc: { views: 1 } }, // Increment views by 1
      { new: true } // Return the updated document
    )
      .populate({
        path: "category",
        match: { isDeleted: false },
      })
      .populate({
        path: "websites",
        match: { isDeleted: false },
        select: "name link createdBy",
      })
      .populate("createdBy");

    return post;
  },

  async updatePost(id, req) {
    const {
      name,
      slug,
      content,
      category,
      comments,
      status,
      metaTitle,
      metaDescription,
      focusKeywords,
      websites: websitesArray, // Get websites if passed as array
    } = req.body;

    const finalSlug =
      slug ||
      name
        ?.toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Check if new slug already exists (excluding current post)
    const existingPost = await PostModel.findOne({
      _id: { $ne: id },
      slug: finalSlug,
      isDeleted: false,
    });

    // Handle websites - check both array format and form-data format
    let websites = websitesArray;
    if (!websites) {
      // Try form-data format if direct array is not present
      websites = Object.keys(req.body)
        .filter((key) => key.startsWith("websites["))
        .map((key) => req.body[key])
        .filter(Boolean);
    }

    const updateData = {
      name,
      slug: finalSlug,
      content,
      category,
      comments,
      status,
      websites, // Use the processed websites array
      metaTitle,
      metaDescription,
      focusKeywords: JSON.parse(focusKeywords || "[]"),
    };

    if (req.imageUrl) {
      updateData.featuredImage = req.imageUrl;
    }

    return await PostModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate({
        path: "category",
        match: { isDeleted: false },
      })
      .populate({
        path: "websites",
        match: { isDeleted: false },
        select: "name link createdBy",
      })
      .populate("createdBy");
  },

  async updatePostImage(id, req) {
    const updateData = { featuredImage: req.imageUrl };

    return await PostModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate("category")
      .populate("websites")
      .populate("createdBy");
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
      slug: name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
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
    category.slug = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");

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
  // Create a new Website
  async createWebsite(req) {
    // console.log(req.body);
    const { name, link, createdBy } = req.body;

    const website = new BlogWebsiteModel({
      name,
      link,
      createdBy,
    });
    return await website.save();
  },

  // Get all categories
  async getAllWebsites() {
    return await BlogWebsiteModel.find({ isDeleted: false }).populate(
      "createdBy"
    );
  },

  // Get a single category by ID
  async getWebsiteById(id) {
    return await BlogWebsiteModel.findOne({ _id: id, isDeleted: false });
  },

  // Update a category by ID
  async updateWebsite(id, req) {
    const website = await BlogWebsiteModel.findById(id);
    if (!website) {
      return null;
    }
    const { name, link } = req.body;
    website.name = name || website.name;
    website.link = link || website.link;

    return await website.save();
  },

  // Delete a category (soft delete)
  async deleteWebsite(id) {
    return await BlogWebsiteModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  },
};

export default BlogService;
