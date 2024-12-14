import express, { Express} from "express";
import router from "./router";

const server: Express = express();

server.use(express.json());

server.use("/api/products", router);

export default server;