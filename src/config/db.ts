import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!);

export default db;