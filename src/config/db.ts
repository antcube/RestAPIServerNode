import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.ts'],
    logging: process.env.NODE_ENV === 'test' ? false : true
});

export default db;