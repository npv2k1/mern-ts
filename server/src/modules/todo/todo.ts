import { Express } from "express";
import todoController from "./todo.controller";
export default function initTodo(app: Express) {
  app.use("/todo", todoController);

}
