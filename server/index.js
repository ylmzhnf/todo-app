import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dummyTodos = [
  { id: 1, text: "React projesi kurulumunu tamamla", completed: false },
  { id: 2, text: "Backend API'yi test et", completed: false },
  { id: 3, text: "İlk API çağrısını yap", completed: true }
];

// ... diğer middleware'ler (app.use(cors()); vb.)

// YENİ ROTA: Tüm görevleri döndürür
app.get('/todos', (req, res) => {
  console.log('GET /todos isteği geldi.');
  res.json(dummyTodos);
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});