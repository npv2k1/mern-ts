import mongoose from "mongoose";
import taskSchema from "./schema/task.schema";

const taskModel = mongoose.model("Task", taskSchema);
export { taskModel };
