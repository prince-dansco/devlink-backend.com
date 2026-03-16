

import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { routerAuth } from "./router/routerAuth.js";
import { userRouter } from "./router/userRout.js";
import { connectDB } from "./config/db.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  // "https://devlink-com-6z1g.vercel.app"
  "https://dev-link-com.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", routerAuth);
app.use("/api/crud", userRouter);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Database Connected & Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Failed to start server due to DB error:", err);
  });