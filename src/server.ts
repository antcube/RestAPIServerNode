import express, { Express} from "express";
import colors from "colors";
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
        console.log(colors.bgGreen.blue.bold('Connection has been established successfully.'));

        // Synchronize models with the database
        await db.sync();
        console.log(colors.bgGreen.blue.bold('All models were synchronized successfully.'));
    } catch (error) {
        console.error(colors.bgRed.white.bold('Unable to connect to the database:' + error));
    }
}
connectDB();

// Define the routes
server.use("/api/products", router);

export default server;