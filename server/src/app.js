import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";

import noteRoutes from "./routes/notes.routes";
import userRoutes from "./routes/users.routes";

const app = express();

// Configurations
app.set("port", parseInt(config.PORT));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

export default app;
