import ItemModel from "../../Models/ItemModel/ItemModel.js";
import ProductModel from "../../Models/ProductModel/ProductModel.js";

const ProductService = {
  createProduct: async (productData, itemData, createdBy) => {
    try {
      // console.log(productData, itemData, createdBy);
    const newProduct = new ProductModel({
      name: productData.name,
      description: productData.description,
      category: productData.category,
      tone: productData.tone,
      type: productData.type,
      items: itemData,
      createdBy: createdBy
    }
    );
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
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  },

  deleteProduct: async (id) => {
    return await ProductModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  },
};

export default ProductService;
