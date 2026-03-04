// import 'dotenv/config';
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import { routerAuth } from './router/routerAuth.js'; 
// import { userRouter } from './router/userRout.js'; 
// import { connectDB } from './config/db.js'; 

// const app = express();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://devlink-com-6z1g.vercel.app"
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Accept"],
//   optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));
// // Handle preflight for all routes
// app.options('*', cors(corsOptions));
// // 2. Middleware
// app.use(express.json());
// app.use(cookieParser());

// // 3. Routes
// app.use("/api/auth", routerAuth);
// app.use("/api/crud", userRouter);

// // 4. Database & Server Start
// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`✅ Database Connected & Server running on http://localhost:${PORT}`);
//     });
// }).catch((err) => {
//     console.log("❌ Failed to start server due to DB error:", err);
// });


import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { routerAuth } from './router/routerAuth.js'; 
import { userRouter } from './router/userRout.js'; 
import { connectDB } from './config/db.js'; 

const app = express();

// 1. CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://devlink-com-6z1g.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  optionsSuccessStatus: 200 
};

// Apply CORS to ALL routes
app.use(cors(corsOptions));

// 2. Standard Middleware
app.use(express.json());
app.use(cookieParser());

// 3. Routes
app.use("/api/auth", routerAuth);
app.use("/api/crud", userRouter);

// 4. Database & Server Start
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Database Connected & Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log("❌ Failed to start server due to DB error:", err);
});