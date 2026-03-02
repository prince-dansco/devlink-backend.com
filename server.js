import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

import { routerAuth } from './router/routerAuth.js'; 
import { userRouter } from './router/userRout.js'; 



import { connectDB } from './config/db.js'; 


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://your-devlinks-frontend.vercel.app"], 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth", routerAuth);
app.use("/api/crud", userRouter);

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Database Connected & Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log("❌ Failed to start server due to DB error:", err);
});