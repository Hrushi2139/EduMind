import {hash,compare} from 'bcryptjs';
import User from '../models/User.js';
import jwt from "jsonwebtoken";
export async function signup(req,res) {
    const {username,email,password,role} = req.body;
    try{
        if(!username || !email ||!password){
            return res.status(400).json({message:"Fill all the Details"});
        }
        if (role === "admin") {
            return res.status(403).json({
                message: "Admin registration is not allowed"
            });
        }

        const allowedRoles = ["student", "teacher"];
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role selected" });
        }
        const isExistingUser=await User.findOne({email});
        if(isExistingUser){
            return res.status(409).json({message:"User already Exists"});
        }
        const hashedPassword=await hash(password,10);
        const user= await User.create({
            username,
            email,
            password:hashedPassword,
            role,
            status: role === "teacher" ? "pending" : "active"
        });
        res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
            userId: user.userId,   
            username: user.username,
            email: user.email,
            role: user.role
        }
        });
    }catch(error){
        res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
    
}

export async function login(req,res) {
   const {email,password}=req.body;
   try{ 
        if(!email || !password){
            return res.status(400).json({
                message:"Enter all the details"
            })
        }

        let existUser=await User.findOne({ email });
         if (!existUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await compare(password, existUser.password);
        // console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // console.log(existUser);
        if (existUser.status === "pending") {
            return res.status(403).json({
                message: "Your account is pending admin approval"
            });
        }
        if (existUser.status === "blocked") {
            return res.status(403).json({
                message: "Your account has been blocked. Contact admin."
            });
        }
       
        const token = jwt.sign(
        {
            userId: existUser.userId,
            role: existUser.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
        );
         return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                userId: existUser.userId,
                username: existUser.username,
                email: existUser.email,
                role: existUser.role
            }
    });
    }catch (error) {
        return res.status(500).json({ message: `Error logging in:{error}`,error});
    }

    
}