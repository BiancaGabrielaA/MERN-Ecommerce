import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js";

export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const { 
        orderItems, 
        shippingInfo, 
        itemsPrice, 
        taxAmount, 
        shippingAmount, 
        totalAmount, 
        paymentMethod, 
        paymentInfo
    } =  req.body;

    const order = await Order.create({
        orderItems, 
        shippingInfo, 
        itemsPrice, 
        taxAmount, 
        shippingAmount, 
        totalAmount, 
        paymentMethod, 
        paymentInfo,
        user: req.user._id
    })

    res.status(200).json({
        order
    })
})

export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next( new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({
        order
    })
})

/// api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    res.status(200).json({
        orders
    })
})

///api/v1/admin/orders/:id
export const getOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next( new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({
        order
    })
})

export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user._id})

    res.status(200).json({
        orders
    })
})

/// api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    if(order?.orderStatus === 'Delivered') {
        return next(new ErrorHandler("You have already delivered this", 400))
    }

    for (const item of order.orderItems) {
        const product = await Product.findById(item.product.toString());
    
        if (!product) {
            return next(new ErrorHandler("No Product found with this ID", 404));
        }
    
        product.stock -= item.quantity;
        await product.save();
    }

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    res.status(200).json({
        success: true
    })
})


export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler("No Order found with this ID", 404))
    }

    await order.deleteOne();

    res.status(200).json({success: true})
})

