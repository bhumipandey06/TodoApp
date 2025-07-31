import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { Title, Description } = req.body;
    if (!Title || !Description) {
      return res.status(403).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const todo = new Todo({ Title, Description });
    todo.save();

    return res.status(201).json({
      success: true,
      message: "Todo Created",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodos = async (req,res)=>{
  try {
    const todos = await Todo.find()
    return res.status(200).json({
      success:true,
      todos: todos
    })
  } catch (error) {
    console.log(error);
  }
}

export const updateTodo = async(req,res)=>{
  try {
    const todoId = req.params.todoId
    const {Title} = req.body
    // const todo = await Todo.findById(todoId)
    const todo = await Todo.findByIdAndUpdate(todoId,{Title},{new:true})

    return res.status(200).json({
      success:true,
      todo,
      message:"Todo Updated."
    })
  } catch (error) {
    console.log(error);
  }
}

export const deleteTodo=async(req,res)=>{
  try {
    const todoId = req.params.todoId
    await Todo.findByIdAndDelete(todoId)
    return res.status(200).json({
      success:true,
      message:"Todo Deleted."
    })
  } catch (error) {
    console.log(error);
  }
}