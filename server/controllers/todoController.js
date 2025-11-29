import db from "../config/db.js";

//tüm görevleri döndürür
export const getAllTodos = async (req, res) => {
  //user_id ve is_compeleted filteresinin dinamik olarak alınması gerekiyor. Şimdilik sabit değerler kullanıldı.
  try {
    const result = await db.query(
      "SELECT id, content, is_completed FROM todos WHERE user_id=1 AND is_completed=false ORDER BY  id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }

  console.log("GET /todos isteği geldi.");
};

// Yeni görev ekler
export const createTodo = async (req, res) => {
  //user_id ,content ve is_completed değerlerinin dinamik olarak alınması gerekiyor. Şimdilik sabit değerler kullanıldı.
  try {
    const result = await db.query(
      "INSERT INTO todos (user_id, content ,is_completed)VALUES (1, 'This is a content', false) RETURNING *"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};

// Görevi günceller

export const updateTodo = async (req, res) => {
  //user_id ve id, is_completed değerlerinin dinamik olarak alınması gerekiyor. Şimdilik sabit değerler kullanıldı.
  try {
    const result = await db.query(
      "UPDATE todos SET  is_completed=TRUE WHERE id=2 AND user_id=1 RETURNING *"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};

// Görevi siler

export const deleteTodo = async (req, res) => {
  //user_id ve id değerlerinin dinamik olarak alınması gerekiyor. Şimdilik sabit değerler kullanıldı.
  try {
    const result = await db.query(
      "DELETE FROM todos WHERE id=2 AND user_id = 1"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};

