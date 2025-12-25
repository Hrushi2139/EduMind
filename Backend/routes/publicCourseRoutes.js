import { Router } from "express";
import { getPublicCourseById,getPublicCourses } from "../controllers/publicCourseController.js";

const router= Router();
router.get("/",getPublicCourses);
router.get("/:id",getPublicCourseById);
export default router;