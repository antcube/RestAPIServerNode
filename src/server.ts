import express, { Express} from "express";
import router from "./router";
import db from "./config/db";

// Create an instance of the Express server
const server: Express = express();

// Middleware to parse the request body as JSON
server.use(express.json());

// Connect to the database
const connectDB = async (): Promise<void> => {
    try {
        // Test the connection
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models with the database
        await db.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectDB();

server.use("/api/products", router);

export default server;