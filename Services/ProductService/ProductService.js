import ItemModel from "../../Models/ItemModel/ItemModel.js";
import ProductModel from "../../Models/ProductModel/ProductModel.js";

const ProductService = {
  createProduct: async (productData, itemData, createdBy) => {
    try {
      const newProduct = new ProductModel({
        name: productData.name,
        description: productData.description,
        screenshot: productData.screenshot,
        category: productData.category,
        tone: productData.tone,
        type: productData.type,
        price: productData.price,
        status: productData.status,
        published: productData.published,
        items: itemData,
        createdBy: createdBy
      });
      return await newProduct.save();
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  },

  getAllProducts: async () => {
    return await ProductModel.find({ isDeleted: false })
       .populate("items")
      .populate("createdBy");
  },

  getAllPublishedProducts: async () => {
    return await ProductModel.find({ 
      isDeleted: false,
      published: true 
    })
      .populate("items")
      .populate("createdBy");
  },

  getProductById: async (id) => {
    return await ProductModel.findById(id)
      .populate({
        path:"items",
        populate: {
          path: "uploadedBy",
        },
      })
      .populate("createdBy");
  },

  updateProduct: async (id, productData) => {
    return await ProductModel.findByIdAndUpdate(
      id,
      { ...productData },
      { new: true }
    ).populate("items").populate("createdBy");
  },

  deleteProduct: async (id) => {
    try {
      const product = await ProductModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      return product;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  },
  getProductBySlug: async (slug) => {
    return await ProductModel.findOne({ slug, isDeleted: false })
      .populate("items")
      .populate("createdBy");
  },
};

export default ProductService;
