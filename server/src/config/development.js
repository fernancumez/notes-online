import dotenv from "dotenv";
const { NODE_ENV } = process.env;

if (NODE_ENV !== "production") dotenv.config();

const devConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_KEY: process.env.JWT_KEY,
};
export default devConfig;
