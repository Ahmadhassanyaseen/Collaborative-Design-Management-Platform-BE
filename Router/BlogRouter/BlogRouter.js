import { Router } from "express";
import BlogController from "../../Controller/BlogController/BlogController.js";
import upload from "../../Middlewares/MulterMiddleware.js";
import uploadSingleFileToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";

const BlogRouter = Router();

// Route to create a category
BlogRouter.post(
  "/createPost",
  upload.single("image"),
  uploadSingleFileToCloudinary("image"),
  BlogController.createPost
);
BlogRouter.get("/allPosts", BlogController.getAllPosts);
BlogRouter.get("/allPosts/:website", BlogController.getAllPostsByWebsite);

// Route to get a single blog post by ID
BlogRouter.get("/post/:id", BlogController.getPostById);
BlogRouter.get("/postBySlug/:slug", BlogController.getPostBySlug);

// Route to update a blog post by ID
BlogRouter.put(
  "/updatePost/:id",
  BlogController.updatePost
);
BlogRouter.put(
  "/updatePostImage/:id",
  upload.single("image"),
  uploadSingleFileToCloudinary("image"),
  BlogController.updatePostImage
);

// Route to delete a blog post by ID
BlogRouter.delete("/deletePost/:id", BlogController.deletePost);




BlogRouter.post(
  "/createCategory",
  upload.single("icon"),
  uploadSingleFileToCloudinary("icon"),
  BlogController.createCategory
);

// Route to get all categories
BlogRouter.get("/allCategories", BlogController.getAllCategories);

// Route to get a single category by ID
BlogRouter.get("/categories/:id", BlogController.getCategoryById);

// Route to update a category
BlogRouter.put(
  "/editCategory/:id",
  upload.single("icon"),
  uploadSingleFileToCloudinary("icon"),
  BlogController.updateCategory
);

// Route to delete a category (soft delete)
BlogRouter.delete("/categories/:id", BlogController.deleteCategory);

// Route to create a new website
BlogRouter.post(
  "/createWebsite",
  BlogController.createWebsite
);

// Route to get all websites
BlogRouter.get("/allWebsites", BlogController.getAllWebsites);

// Route to get a single website by ID
BlogRouter.get("/websites/:id", BlogController.getWebsiteById);

// Route to update a website
BlogRouter.put(
  "/editWebsite/:id",
  BlogController.updateWebsite
);

// Route to delete a website (soft delete)
BlogRouter.delete("/websites/:id", BlogController.deleteWebsite);

export default BlogRouter;
