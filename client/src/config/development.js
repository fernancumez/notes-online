import dotenv from "dotenv";
const { NODE_ENV } = process.env;

if (NODE_ENV !== "production") dotenv.config();

const devConfig = {
  NODE_ENV: `${process.env.NODE_ENV}`,
  REACT_APP_SERVER_URL: `${process.env.REACT_APP_SERVER_URL}`,
};

export default devConfig;
