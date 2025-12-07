import express from "express";
import {connect} from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const app=express();
const PORT =process.env.PORT || 6969;

//Mongo DB Connection 

const connectDB=async ()=>{
    try{
        const con=await connect(process.env.MONGO_URI)
        console.log(`Database Connected: ${con.connection.host}`);
    }
    catch{
        console.error(`Error in Connecting with Database:${error.message}`);
    }
};

app.listen(PORT,()=>{
    try{
        connectDB();
        console.log("Server Running");
    }catch{
        console.log(`Error in Connecting to Server:${error.message}`);
    }    
});