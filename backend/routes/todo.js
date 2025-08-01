import express from "express"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router()

// router.route("/").post(createTodo).get(getAllTodos)
router.route("/").post(isAuthenticated,createTodo)
router.route("/").get(getAllTodos)
// router.route("/:todoId").put(updateTodo).delete(deleteTodo)
router.route("/:todoId").put(isAuthenticated,updateTodo)
router.route("/:todoId").delete(isAuthenticated,deleteTodo)

export default router