import { config } from "dotenv";
config();

export const DB_DEV_NAME = process.env.DB_DEV_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST; 
export const DB_PORT = process.env.DB_PORT;
export const DB_DIALECT = process.env.DB_DIALECT;
export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
export const TK_SECRET = JWT_SECRET;