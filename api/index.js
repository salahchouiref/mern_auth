import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to database using mongoose");
}).catch((err)=>{
    console.log(err);
});


app.listen(3000 || process.env.PORT,()=>{
    console.log("app is running on http://localhost:3000")
});

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.status || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    });
});