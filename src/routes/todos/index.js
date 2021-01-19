import { Router } from "express";
import {
  updateTodoValidation,
  createTodoValidation,
} from "../../middlewares/validations";
import todoController from "../../controllers/todos/todos";
import AuthMiddleWare from "../../middlewares/auth";

const todoRoute = new Router();

todoRoute.post(
  "/",
  AuthMiddleWare.checkToken,
  createTodoValidation,
  todoController.createTodo
);
todoRoute.get("/", AuthMiddleWare.checkToken, todoController.getTodos);

todoRoute.get("/:id", AuthMiddleWare.checkToken, todoController.getTodo);
todoRoute.patch(
  "/:id",
  AuthMiddleWare.checkToken,
  updateTodoValidation,
  todoController.updateTodo
);
todoRoute.delete("/", AuthMiddleWare.checkToken, todoController.deleteTodos);
todoRoute.delete("/:id", AuthMiddleWare.checkToken, todoController.deleteTodo);
export default todoRoute;
