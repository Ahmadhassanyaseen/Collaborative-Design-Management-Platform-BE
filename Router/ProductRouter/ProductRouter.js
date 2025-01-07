import { Router } from "express";
import ProductController from "../../Controller/ProductController/ProductController.js";
import uploadSingleFileToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";
import upload from "../../Middlewares/MulterMiddleware.js";
import uploadToCloudinary from "../../Middlewares/CloudinaryMultipleMiddleware.js";
const ProductRouter = Router();

// Create a new product
ProductRouter.post(
  "/createProduct",
  ProductController.createProduct
);

// Get all products
ProductRouter.get("/allProducts", ProductController.getAllProducts);

// Get all published products
ProductRouter.get("/publishedProducts", ProductController.getAllPublishedProducts);

// Get a product by ID
ProductRouter.get("/singleProduct/:id", ProductController.getProductById);

// Update a product by ID
ProductRouter.put("/updateProduct/:id", ProductController.updateProduct);

// Delete a product by ID
ProductRouter.delete("/deleteProduct/:id", ProductController.deleteProduct);

export default ProductRouter;
