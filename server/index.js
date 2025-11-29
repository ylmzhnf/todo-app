import express from "express";
import cors from "cors";
import env from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
env.config();
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);





app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
