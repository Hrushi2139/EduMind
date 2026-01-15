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
export async function getCourseById(req, res) {
  const course = await Course.findById(req.params.id);
  res.json({ course });
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
    const { title, description, category, level, language, learningObjectives,modules } = req.body;

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
    if (modules !== undefined) course.modules = modules;

    await course.save({ validateBeforeSave: false });


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

export async function submitCourseForReview(req, res) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (course.status !== "draft") {
      return res.status(400).json({ message: "Only draft courses can be submitted" });
    }

  

    if (!course.modules || course.modules.length === 0) {
      return res.status(400).json({ message: "Add at least one module" });
    }

    for (const module of course.modules) {
      if (!module.title || !module.title.trim()) {
        return res.status(400).json({ message: "Module title missing" });
      }

      if (!module.lessons || module.lessons.length === 0) {
        return res.status(400).json({
          message: `Module "${module.title}" must have at least one lesson`
        });
      }

      for (const lesson of module.lessons) {
        if (!lesson.title || !lesson.title.trim()) {
          return res.status(400).json({
            message: `Lesson title missing in module "${module.title}"`
          });
        }

        if (!lesson.content || !lesson.content.trim()) {
          return res.status(400).json({
            message: `Lesson content missing in "${lesson.title}"`
          });
        }
      }
    }

  
    course.status = "pending";
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course submitted for review",
      course
    });

  } catch (error) {
    console.error("Submit course error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


