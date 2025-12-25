import Course from "../models/Course.js";

export async function getPublicCourses(req, res) {
  try {
    const courses = await Course.find({
      status: "approved",
      isPublished: true
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });

  } catch (error) {
    console.error("Public courses fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export async function getPublicCourseById(req, res) {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      _id: id,
      status: "approved",
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      course
    });

  } catch (error) {
    console.error("Public course fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}
