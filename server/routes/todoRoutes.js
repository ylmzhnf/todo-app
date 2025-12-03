import express from "express";
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tüm rotalar token doğrulaması gerektirir
router.use(verifyToken);

router.get("/", getAllTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;