import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { createToken } from "../utils/token.js";

export const signup = async  (req,res,next) => {
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({ message : "user created succesfuly" });
    }catch(err){
        next(err);
    }
};

export const signin = async  (req,res,next) => {
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(401,"User not found"));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"invalid credentials"));
        const tokenInfos = createToken(validUser);
        res.cookie('accesToken',tokenInfos.token,{httpOnly : true,expires:tokenInfos.expiryDate}).status(200).json(tokenInfos.rest);
    }catch(err){
        next(err);
    }
};

export const google = async (req,res,next) =>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            const tokenInfos = createToken(user);
            res.cookie('accesToken',tokenInfos.token,{httpOnly : true,expires:tokenInfos.expiryDate}).status(200).json(tokenInfos.rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username : req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),
                email : req.body.email,
                password : hashedPassword,
                profilePicture : req.body.photo });
            await newUser.save();
            const tokenInfos = createToken(newUser);
            res.cookie('accesToken',tokenInfos.token,{httpOnly : true,expires:tokenInfos.expiryDate}).status(200).json(tokenInfos.rest);
        }
    }catch(err){
        next(err);
    }
};

export const signout = (req,res) => {
    res.clearCookie("accesToken").status(200).json({message : "Signout success"});
};