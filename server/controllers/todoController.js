import db from "../config/db.js";

// Returns all todos
export const getAllTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      "SELECT * FROM todos WHERE user_id=$1 ORDER BY created_at DESC",
      [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
};

// Adds new todo
export const createTodo = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const result = await db.query(
      "INSERT INTO todos (user_id, content, is_completed) VALUES ($1, $2, FALSE) RETURNING *",
      [userId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
};

// Updates todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body;
  const userId = req.userId;

  try {
    const result = await db.query(
      "UPDATE todos SET is_completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [is_completed, id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
};

// Deletes todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const result = await db.query(
      "DELETE FROM todos WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo successfully deleted", deleteTodo: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
};

