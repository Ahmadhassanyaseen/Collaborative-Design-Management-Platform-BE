import ItemModel from "../../Models/ItemModel/ItemModel.js";
import ProductModel from "../../Models/ProductModel/ProductModel.js";

const ItemService = {
  createItem: async (req) => {
    const { name, tags, uploadedBy, type, category, status, tone, productId } = req.body;
    
    // Parse tags if they're a JSON string
    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    
    console.log({
      name,
      tags: parsedTags,
      uploadedBy,
      type,
      category,
      status,
      tone,
      productId
    });

    // Create new item with all required fields
    const item = new ItemModel({
      name,
      tags: parsedTags,
      uploadedBy,
      type,
      category,
      status: status || 'active',
      tone,
      file: req.fileUrl,
    });

    // Save the item
    const savedItem = await item.save();

    // Update the product's items array
    if (productId) {
      await ProductModel.findByIdAndUpdate(
        productId,
        { $push: { items: savedItem._id } },
        { new: true }
      );
    }

    // Return the saved item
    return savedItem;
  },

  getAllItems: async () => {
    return await ItemModel.find({ isDeleted: false }).populate("uploadedBy");
  },

  getItemById: async (id) => {
    return await ItemModel.findById(id).populate("uploadedBy");
  },
  getItemByTag: async (tag) => {
    return await ItemModel.find({ tags: tag }).populate("uploadedBy");
  },

  updateItem: async (req) => {
    const id = req.params.id;
  const { name, tags, type, category, tone } = req.body;

  try {
    // Find the item by ID
    const item = await ItemModel.findById(id);
    
    if (!item) {
      return {
        message: "Item not found",
        status: 404
      };
    }

    // Update fields if provided
    item.name = name || item.name;
    item.tags = tags || item.tags;
    item.tone = tone || item.tone;
    item.category = category || item.category;
    item.type = type || item.type;
    item.file = req.fileUrl || item.file; // Update file URL if provided

    // Save the updated item
    const updatedItem = await item.save();

    return {
      message: "Item updated successfully",
      status: 200,
      data: updatedItem
    };
  } catch (err) {
    return {
      message: "Error updating item",
      status: 500,
      error: err.message
    }}
   
  },

  deleteItem: async (id) => {
    return await ItemModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  },
};

export default ItemService;
