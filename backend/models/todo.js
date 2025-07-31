import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model("Todo", TodoSchema);
