import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkResult = await db.query(" SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      res.status(409).json("User already exists");
    } else {
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        const insertResult = await db.query(
          "INSERT INTO users (username , email, password_hash) VALUES ($1,$2,$3) RETURNING id, username, email",
          [username, email, hash]
        );
        const createdUser = insertResult.rows[0];
        res.status(201).json({
          message: "Kayıt başarılı",
          user: createdUser,
        });
      } catch (hashErr) {
        console.error("Error hashing or inserting user: ", hashErr);
        res.status(500).json("Internal server error");
      }
    }
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json("Internal server error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "E-posta veya şifre yanlış." });
    }
    const user = userResult.rows[0];
    const storedHashedPassword = user.password_hash;
    const isMatch = await bcrypt.compare(password, storedHashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "E-posta veya şifre yanlış." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Giriş başarılı",
      token: token,
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json("Internal server error");
  }
};
