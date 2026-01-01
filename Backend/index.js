import express from "express";
import {connect} from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";
import adminCourseRoutes from "./routes/adminCourseRoutes.js"
import publicCourseRoutes from "./routes/publicCourseRoutes.js"
import studentCourseRoutes from "./routes/studentCourseRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config()
const app=express();
const PORT =process.env.PORT || 6969;
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


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
app.use("/api/courses", courseRoutes);
app.use('/api/admin/courses',adminCourseRoutes);
app.use('/api/public/courses',publicCourseRoutes);
app.use("/api/student/",studentCourseRoutes);
app.use("/api/progress", progressRoutes);

app.listen(PORT,async ()=>{
    try{
        await connectDB();
        console.log("Server Running");
    }catch(error){
        console.log(`Error in Connecting to Server:${error.message}`);
    }    
});