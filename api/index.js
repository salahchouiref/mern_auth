import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to database using mongoose");
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(3000,()=>{
    console.log("app is running on http://localhost:3000")
})