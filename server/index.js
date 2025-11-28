import express from "express";
import cors from "cors";
import env from "dotenv";
import pg from "pg";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
env.config();
app.use(express.urlencoded({ extended: true }));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});



// YENİ ROTA: Tüm görevleri döndürür
app.get("/todos", async (req, res) => {
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
});


app.post("/todos", async (req, res) => {
  //user_id ,content ve is_completed değerlerinin dinamik olarak alınması gerekiyor. Şimdilik sabit değerler kullanıldı.
  try {
    const result= await db.query("INSERT INTO todos (user_id, content ,is_completed)VALUES (1, 'This is a content', 'false') RETURNING *");
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
});

app.put("/todos/:id", async (req, res) => {
  //user_id ve id, is_completed değerlerinin dinamik olarak alınması gerekiyor. Şimdilik sabit değerler kullanıldı.
  try {
    const result=  await db.query("UPDATE todos SET  is_completed=TRUE WHERE id=2 AND user_id=1 RETURNING *");
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  //user_id ve id değerlerinin dinamik olarak alınması gerekiyor. Şimdilik sabit değerler kullanıldı.
  try {
    const result = await db.query("DELETE FROM todos WHERE id=2 AND user_id = 1");
    res.json(result.rows);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
