import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import authRoute from "./routes/auth/index";
import todoRoute from "./routes/todos/index";

app.use("/api/auth", authRoute);
app.use("/api/todos", todoRoute);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to todo app" });
});
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});
export default app;
