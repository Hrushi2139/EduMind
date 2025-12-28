import Progress from "../models/Progress.js";
import Course from "../models/Course.js";


export async function startCourse(req, res) {
  try {
    const { courseId } = req.params;
    const studentId = req.user.userId;

    const existing = await Progress.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Course already started" });
    }

    const progress = await Progress.create({
      student: studentId,
      course: courseId,
      startedAt: new Date(),
      completedLessons: [],
      progressPercent: 0,
      isCompleted: false
    });

    return res.status(201).json({
      success: true,
      message: "Course started",
      progress
    });

  } catch (error) {
    console.error("Start course error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function markLessonCompleted(req, res) {
  try {
    const { courseId, lessonId } = req.params;
    const studentId = req.user.userId;

    const progress = await Progress.findOne({ student: studentId, course: courseId });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found. Start the course first." });
    }

    if (progress.isCompleted) {
      return res.status(400).json({ message: "Course already completed" });
    }

    if (progress.completedLessons.includes(lessonId)) {
      return res.status(400).json({ message: "Lesson already completed" });
    }

    progress.completedLessons.push(lessonId);
    progress.lastAccessedLesson = lessonId;

    const course = await Course.findById(courseId);
    const totalLessons = course.modules.reduce(
      (sum, mod) => sum + mod.lessons.length, 0
    );

    progress.progressPercent = totalLessons === 0
      ? 0
      : Math.round((progress.completedLessons.length / totalLessons) * 100);

    if (progress.progressPercent === 100) {
      progress.isCompleted = true;
      progress.completedAt = new Date();
    }

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Lesson marked as completed",
      progress
    });

  } catch (error) {
    console.error("Mark lesson error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function getProgress(req, res) {
  try {
    const { courseId } = req.params;
    const studentId = req.user.userId;

    const progress = await Progress.findOne({ student: studentId, course: courseId });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    return res.status(200).json({
      success: true,
      progress
    });

  } catch (error) {
    console.error("Get progress error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function completeCourse(req, res) {
  try {
    const { courseId } = req.params;
    const studentId = req.user.userId;

    const progress = await Progress.findOne({ student: studentId, course: courseId });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    progress.isCompleted = true;
    progress.progressPercent = 100;
    progress.completedAt = new Date();

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Course marked as completed",
      progress
    });

  } catch (error) {
    console.error("Complete course error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
