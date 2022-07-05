import { Router, Request, Response } from "express";
import {taskModel} from "../models/models";


const indexController: Router = Router();

indexController.get("/",async (request: Request, response: Response) => {
  const task =await taskModel.create({
    name: "test",
    completed: false,
  })
  response.json({ task });  
});

export default indexController;
