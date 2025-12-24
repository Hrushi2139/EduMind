import Course from "../models/Course.js";

export async function createCourse(req, res) {
  try {
    const { title, description, category, level, language, learningObjectives } = req.body;

    if (!title || !description || !category || !level || !language || !learningObjectives) {
      return res.status(400).json({ message: "Fill all the details" });
    }

    const existingCourse = await Course.findOne({
      title: title.trim(),
      createdBy: req.user.userId
    });

    if (existingCourse) {
      return res.status(409).json({ message: "You already have a course with this title" });
    }

    const newCourse = await Course.create({
      title: title.trim(),
      description,
      category,
      level,
      language,
      learningObjectives,
      createdBy: req.user.userId,
      instructorName: req.user.username,
      status: "draft",
      isPublished: false
    });

    return res.status(201).json({
      success: true,
      message: "Course added successfully",
      course: newCourse
    });

  } catch (error) {
    console.error("Create course error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while adding course"
    });
  }
}

export async function getMyCourses(req,res) {
    try{
        const userId=req.user.userId;
        const courses= await Course.find({createdBy:userId}).sort({ createdAt: -1 });
        res.status(200).json({
        success: true,
        count: courses.length,
        courses
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, level, language, learningObjectives } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to update this course" });
    }

    if (course.status === "approved") {
      return res.status(400).json({ message: "Approved courses cannot be edited" });
    }

    if (title) course.title = title.trim();
    if (description) course.description = description;
    if (category) course.category = category;
    if (level) course.level = level;
    if (language) course.language = language;
    if (learningObjectives) course.learningObjectives = learningObjectives;

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course
    });

  } catch (error) {
    console.error("Update course error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function removeCourse(req, res) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this course" });
    }

    if (course.status === "approved") {
      return res.status(400).json({ message: "Approved courses cannot be deleted" });
    }

    await course.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Course removed successfully"
    });

  } catch (error) {
    console.error("Remove course error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
