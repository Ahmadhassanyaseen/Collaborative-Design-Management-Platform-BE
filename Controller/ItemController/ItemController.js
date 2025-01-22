import ItemService from "../../Services/ItemService/ItemService.js";

const ItemController = {
  createItem: async (req, res) => {
    try {
      // console.log("xeno");
      const item = await ItemService.createItem(req);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllItems: async (req, res) => {
    try {
      const items = await ItemService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    try {
      const item = await ItemService.getItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getItemByTag: async (req, res) => {
    try {
      const item = await ItemService.getItemByTag(req.params.tag);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      const item = await ItemService.updateItem(req);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const item = await ItemService.deleteItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default ItemController;
