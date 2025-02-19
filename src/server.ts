import express, { Express} from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// Create an instance of the Express server
const server: Express = express();

// Middleware to parse the request body as JSON
server.use(express.json());

// Connect to the database
export const connectDB = async (): Promise<void> => {
    try {
        // Test the connection
        await db.authenticate();
        // console.log(colors.bgGreen.blue.bold('Connection has been established successfully.'));

        // Synchronize models with the database
        await db.sync();
        // console.log(colors.bgGreen.blue.bold('All models were synchronized successfully.'));
    } catch (error) {
        console.log(colors.bgRed.white.bold('Unable to connect to the database'));
    }
}
connectDB();

// Define the routes
server.use("/api/products", router);

// Prueba de Jest
server.get("/api/test", (req, res) => {
    res.json({ message: "Desde API Test" });
})

export default server;