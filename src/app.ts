import express from "express";

import "express-async-errors";
import "reflect-metadata";

import userRoutes from "./routes/user.routes";

import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use(handleErrorMiddleware);

export default app;
