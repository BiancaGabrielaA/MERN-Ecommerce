import Product from "../models/product.js"
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        products
    })
}

export const getProductDetails = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
  
    const product = await Product.findById(id);
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
  
    res.status(200).json({ product });
  };


export const updateProduct = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
  
    let product = await Product.findById(id);
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new: true})

    res.status(200).json({
        product
    })
}

export const newProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        product
    })
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
  
    let product = await Product.findById(id);
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
        message: "Product deleted"
    })

}