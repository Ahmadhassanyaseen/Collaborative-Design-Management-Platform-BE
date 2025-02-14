import BlogService from "../../Services/BlogService/BlogService.js";

const BlogController = {
  async createPost(req, res) {
    try {
      const post = await BlogService.createPost(req);
      return res.status(201).json(post);
    } catch (error) {
      if (error.message === "A post with this slug already exists") {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },
  async getAllPosts(req, res) {
    try {
      const posts = await BlogService.getAllPosts();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getAllPostsByWebsite(req, res) {
    try {
      const posts = await BlogService.getAllPostsByWebsite(req.params.website);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async allPostsByCategory(req, res) {
    try {
      const posts = await BlogService.allPostsByCategory(req.params.category);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getPostById(req, res) {
    try {
      const post = await BlogService.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getPostBySlug(req, res) {
    try {
      const post = await BlogService.getPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updatePost(req, res) {
    try {
      const post = await BlogService.updatePost(req.params.id, req);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      if (error.message === "A post with this slug already exists") {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },
  async updatePostImage(req, res) {
    try {
      const post = await BlogService.updatePostImage(req.params.id, req);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deletePost(req, res) {
    try {
      const result = await BlogService.deletePost(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },




  // Controller method for creating a category
  async createCategory(req, res) {
    try {
      const category = await BlogService.createCategory(req);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for fetching all categories
  async getAllCategories(req, res) {
    try {
      const categories = await BlogService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for fetching a single category by ID
  async getCategoryById(req, res) {
    try {
      const category = await BlogService.getCategoryById(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for updating a category
  async updateCategory(req, res) {
    try {
      const category = await BlogService.updateCategory(
        req.params.id,
        req
      );
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for deleting a category (soft delete)
  async deleteCategory(req, res) {
    try {
      const category = await BlogService.deleteCategory(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Controller method for creating a website
  async createWebsite(req, res) {
    try {
      // console.log("kakk");
      const website = await BlogService.createWebsite(req);
      return res.status(201).json(website);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for fetching all websites
  async getAllWebsites(req, res) {
    try {
      const websites = await BlogService.getAllWebsites();
      return res.status(200).json(websites);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for fetching a single website by ID
  async getWebsiteById(req, res) {
    try {
      const website = await BlogService.getWebsiteById(req.params.id);
      if (!website)
        return res.status(404).json({ message: "Website not found" });
      return res.status(200).json(website);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for updating a website
  async updateWebsite(req, res) {
    try {
      const website = await BlogService.updateWebsite(
        req.params.id,
        req
      );
      if (!website)
        return res.status(404).json({ message: "Website not found" });
      return res.status(200).json(website);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Controller method for deleting a website (soft delete)
  async deleteWebsite(req, res) {
    try {
      const website = await BlogService.deleteWebsite(req.params.id);
      if (!website)
        return res.status(404).json({ message: "Website not found" });
      return res.status(200).json({ message: "Website deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default BlogController;
