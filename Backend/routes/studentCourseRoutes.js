import { Router } from "express";
import { enrollInCourse, getMyEnrolledCourses, checkEnrollment } from "../controllers/studentCourseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.patch("/courses/:id/enroll", verifyToken, allowRoles("student"), enrollInCourse);
router.get("/courses/:id/enrolled", verifyToken, allowRoles("student"), checkEnrollment);
router.get("/courses/my", verifyToken, allowRoles("student"), getMyEnrolledCourses);

export default router;
