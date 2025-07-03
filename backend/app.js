import express from "express";
import dotenv from "dotenv";

const app = express()

dotenv.config({path: 'backend/config/config.env'});

///connecting to database
import { connectDatabase } from "./config/dbConnect.js";
connectDatabase();

app.use(express.json());

///import all routes

import productRoutes from './routes/products.js'

app.use("/api/v1", productRoutes);

app.listen(3000, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode `);
});