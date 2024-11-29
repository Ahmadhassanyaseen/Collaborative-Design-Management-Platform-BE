import ItemModel from "../../Models/ItemModel/ItemModel.js";

const ItemService = {
  createItem: async (req) => {
    // console.log(req.body);
    const {name, tags ,  uploadedBy} = req.body;
    // console.log(req.body);
    // console.log(req.fileUrl);
    const item = new ItemModel({
      name,
      tags,
      uploadedBy,
      file: req.fileUrl,
    })
  
    return await item.save();
  },

  getAllItems: async () => {
    return await ItemModel.find({ isDeleted: false }).populate("uploadedBy");
  },

  getItemById: async (id) => {
    return await ItemModel.findById(id).populate("uploadedBy");
  },

  updateItem: async (req) => {
    const id = req.params.id;
  const { name, tags } = req.body;

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
