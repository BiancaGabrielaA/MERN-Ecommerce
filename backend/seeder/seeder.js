import Product from "../models/product.js";
import products from "./data.js"
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({path: 'backend/config/config.env'});

const seedProducts = async () => {
    try {

        await mongoose.connect(process.env.DB_LOCAL_URI)
        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(products);
        console.log('Products are added');

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();