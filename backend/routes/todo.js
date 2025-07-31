import express from "express"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.js"

const router = express.Router()

// router.route("/").post(createTodo).get(getAllTodos)
router.route("/").post(createTodo)
router.route("/").get(getAllTodos)
// router.route("/:todoId").put(updateTodo).delete(deleteTodo)
router.route("/:todoId").put(updateTodo)
router.route("/:todoId").delete(deleteTodo)

export default router