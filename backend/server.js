import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";



import cors from "cors"
 connectDB();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);

app.use("/api/tutor",tutorRoutes )


app.use(express.static("backend/public"));




// Things done to give acess to the cors for resource sharing
// to avoid has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

//admin
app.use('/api/admin',adminRoutes)
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is starting on port ${port}`));
