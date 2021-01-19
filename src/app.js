import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

import authRoute from "./routes/auth/index";
import todoRoute from "./routes/todos/index";

app.use("/api/auth", authRoute);
app.use("/api/todos", todoRoute);
export default app;
