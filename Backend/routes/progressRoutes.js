import { Router } from "express";
import {
  startCourse,
  markLessonCompleted,
  getProgress,
  completeCourse
} from "../controllers/progressController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/start/:courseId", verifyToken, allowRoles("student"), startCourse);

router.patch("/:courseId/lesson/:lessonId", verifyToken, allowRoles("student"), markLessonCompleted);

router.get("/:courseId", verifyToken, allowRoles("student"), getProgress);

router.patch("/:courseId/complete", verifyToken, allowRoles("student"), completeCourse);

export default router;
