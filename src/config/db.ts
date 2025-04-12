import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.{ts,js}'], // Path to your model files
    logging: false // Disable logging when running tests
});

export default db;