import express from "express";
import {connect} from "mongoose";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
dotenv.config()
const app=express();
const PORT =process.env.PORT || 6969;
app.use(express.json());

//Mongo DB Connection 

const connectDB=async ()=>{
    try{
        const con=await connect(process.env.MONGO_URI)
        console.log(`Database Connected: ${con.connection.host}`);
    }
    catch(error){
        console.error(`Error in Connecting with Database:${error.message}`);
        process.exit(1);
    }
};

app.use('/api/auth',authRoutes);
app.listen(PORT,async ()=>{
    try{
        await connectDB();
        console.log("Server Running");
    }catch(error){
        console.log(`Error in Connecting to Server:${error.message}`);
    }    
});