import { Request, Response, Router } from "express";
import { taskModel } from "../../models/models";
const todoController: Router = Router();
todoController.get("/", async (req: Request, res: Response) => {
  const tasks = await taskModel.find();
  res.json({ tasks });
});
todoController.post("/", (req: Request, res: Response) => {
  const task = req.body;
  console.log(task);
  taskModel
    .create(task)
    .then((task) => {
      res.json({ task });
    })
    .catch((err) => {
      res.json({ err });
    });
});
todoController.post("/:id", (req: Request, res: Response) => {
  const task = req.body;
  console.log(task);
  taskModel.findByIdAndUpdate(req.params.id, task, { new: true }).then((dt) => {
    res.send(dt);
  }).catch(err=>{
    res.send(err)
  });
});
todoController.delete("/:id", (req: Request, res: Response) => {
  taskModel.findByIdAndDelete(req.params.id).then((dt) => {
    res.send(dt);
  }).catch(err=>{
    res.send(err)
  }
  );
});
export default todoController;
