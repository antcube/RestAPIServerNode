import { exit } from "process";
import db from "../config/db";

// This function clears the database
const clearDB = async () => {
    try {
        await db.sync({ force: true });
        console.log('Database cleared successfully');
        exit(0);
    } catch (error) {
        console.error(error);
        exit(1);
    }
}

if(process.argv[2] === '--clear') {
    clearDB();
}