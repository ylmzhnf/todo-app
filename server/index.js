import express from "express";
import cors from "cors";
import env from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

env.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

// CORS Ayarı
const corsOptions = {
  origin: isProduction
    ? [
        "https://your-vercel-domain.vercel.app",
        "https://your-custom-domain.com"
      ]
    : "http://localhost:5174",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
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
  console.log(`Server is running on port ${PORT} (${isProduction ? "Production" : "Development"})`);});
