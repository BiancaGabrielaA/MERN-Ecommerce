import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errors.js";

process.on('uncaughtException', (err) => {
    console.log(`ERROR2 ${err}`);
    console.log("Shutting down due to uncaught expection");
    process.exit(1);
})

const app = express()

dotenv.config({path: 'backend/config/config.env'});

///connecting to database
import { connectDatabase } from "./config/dbConnect.js";
connectDatabase();

app.use(express.json());

///import all routes

import productRoutes from './routes/products.js'

app.use("/api/v1", productRoutes);

app.use(errorMiddleware);

const server = app.listen(3000, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode `);
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down server due to Unhandled Promise Rejection");
    server.close( () => {
        process.exit(1);
    })
})

