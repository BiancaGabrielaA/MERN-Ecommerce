import Product from "../models/product.js"
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import qs from 'qs';

export const getProducts = catchAsyncErrors( async (req, res) => {
  const parsedQuery = qs.parse(req._parsedUrl.query);
  const resPerPage = 4;
  const apiFilters = new APIFilters(Product, parsedQuery).search().filters();

  let products = await apiFilters.query;

  let filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCount,
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

  req.body.user = req.user._id;
  
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


///Create/Update product review => /api/v1/reviews
export const createProductReview = catchAsyncErrors( async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  if(!product) {
    return next(new ErrorHandler("No product found", 404))
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if(isReviewed){

    product.reviews.forEach((review) => {
      if(review?.user?.toString() === req?.user?._id.toString()) {
            review.comment = comment;
            review.rating = rating;
      }
    })
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }

   /// reduce to one value -> average of the reviews

  product.ratings = product.reviews.reduce((acc, item) => 
         item.rating+acc, 0 ) / product.reviews.length
 
  await product.save({validateBeforeSave: false})

  res.status(200).json({
     success: true
  })

});


///Get All reviews for one product  => /api/v1/reviews
export const getProductReviews = catchAsyncErrors( async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if(!product)
     {
      return next(new ErrorHandler("Product not found", 404))
     }
  
   res.status(200).json({
      reviews: product.reviews
   })
})


///Delete Product Review /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors( async (req, res, next) => {
  let product = await Product.findById(req.query.productId)

  if(!product) {
    return next(new ErrorHandler("No product found", 404))
  }

  const reviews = product?.reviews.filter(
    (review) => review._id.toString() !== req?.query?.id.toString()
  );

  const numOfReviews = product.reviews.length;

  const ratings = 
      numOfReviews === 0 ?  0 
      : product.reviews.reduce((acc, item) => item.rating+acc, 0 ) / numOfReviews;



  product = await Product.findByIdAndUpdate(req.query.productId, {reviews, numOfReviews, ratings}, {new: true})
  res.status(200).json({
     success: true
  })

});

