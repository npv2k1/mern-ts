import "dotenv/config";
import express, { Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import indexController from "./controllers/index.controller";
import initSocket from "./modules/socket/socket";
import initTodo from "./modules/todo/todo";
import initUpload from "./modules/upload/upload";
import "./services/db";
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/home", (request: Request, response: Response) => {
  console.log(request.url);
  response.json({ message: `Welcome to the home page!` });
});

app.use("/api", indexController);
initUpload(app);
initTodo(app);
const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(5000, () => {
  console.log("server is running on port 5000");
});
