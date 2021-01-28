import { config } from "dotenv";
const { NODE_ENV } = process.env;

NODE_ENV !== "production" ? config() : "";

export const Config = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/notasenlinea",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 4000,
};
