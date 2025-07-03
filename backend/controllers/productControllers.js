import Product from "../models/product.js"
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const getProducts = catchAsyncErrors( async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        products
    })
});

export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
  
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ error: "Invalid product ID" });
    // }
  
    const product = await Product.findById(id);
  
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
  
    res.status(200).json({ product });
  });


export const updateProduct = catchAsyncErrors( async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
  
    let product = await Product.findById(id);
  
    if (!product) {
       return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new: true})

    res.status(200).json({
        product
    })
});

export const newProduct =  catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body);
    return res.status(200).json({
        product
    })
});

export const deleteProduct = catchAsyncErrors( async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
  
    let product = await Product.findById(id);
  
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }

    await product.deleteOne();

    res.status(200).json({
        message: "Product deleted"
    })

});