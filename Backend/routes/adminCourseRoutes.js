import { Router } from "express";
import { getPendingCourses, approveCourse, rejectCourse, publishCourse, unpublishCourse } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/pending", verifyToken, allowRoles("admin"), getPendingCourses);
router.patch("/:id/approve", verifyToken, allowRoles("admin"), approveCourse);
router.patch("/:id/reject", verifyToken, allowRoles("admin"), rejectCourse);
router.patch("/:id/publish", verifyToken, allowRoles("admin"), publishCourse);
router.patch("/:id/unpublish", verifyToken, allowRoles("admin"), unpublishCourse);

export default router;
