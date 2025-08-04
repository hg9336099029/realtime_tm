// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/route.js"
dotenv.config();
connectDB();

const app = express();
// Replace this with your actual frontend URL (Vite runs on 5173)
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies, authorization headers, etc.
}));
app.use(express.json());
app.use("/api",routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
