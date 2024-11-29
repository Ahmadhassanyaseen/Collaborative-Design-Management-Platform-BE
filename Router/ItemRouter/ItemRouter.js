import { Router } from "express";
import ItemController from "../../Controller/ItemController/ItemController.js";
import upload from "../../Middlewares/MulterMiddleware.js";
import uploadSingleFileToCloudinary from "../../Middlewares/CloudinaryMiddleware.js";

const ItemRouter = Router();

// Create a new item
ItemRouter.post(
  "/createItem",
  upload.single("file"),
  uploadSingleFileToCloudinary("file"),
  ItemController.createItem
);


// Get all items
ItemRouter.get("/getAllItems", ItemController.getAllItems);

// Get an item by ID
ItemRouter.get("/getItem/:id", ItemController.getItemById);

// Update an item by ID
ItemRouter.put(
  "/updateItem/:id",
  upload.single("file"),
  uploadSingleFileToCloudinary("file"),
  ItemController.updateItem
);

// Delete an item by ID
ItemRouter.delete("/deleteItem/:id", ItemController.deleteItem);

export default ItemRouter;
