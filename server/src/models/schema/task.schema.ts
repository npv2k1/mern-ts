import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});
// Duplicate the ID field.
taskSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
taskSchema.set("toJSON", {
  virtuals: true,
});
export default taskSchema