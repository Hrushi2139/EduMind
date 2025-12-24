import { Router } from "express";
import { createCourse, getMyCourses, updateCourse, removeCourse } from "../controllers/courseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/", verifyToken, allowRoles("teacher"), createCourse);
router.get("/my", verifyToken, allowRoles("teacher"), getMyCourses);
router.put("/:id", verifyToken, allowRoles("teacher"), updateCourse);
router.delete("/:id", verifyToken, allowRoles("teacher"), removeCourse);

export default router;
