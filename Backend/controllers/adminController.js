import Course from "../models/Course.js";

export async function getPendingCourses(req, res) {
  try {
    const pendingCourses = await Course.find({ status: "pending" }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: pendingCourses.length,
      courses: pendingCourses
    });

  } catch (error) {
    console.error("Get pending courses error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export async function approveCourse(req,res) {
    try{
        const {id} = req.params;
        const course= await Course.findById(id);
        if(!course){
            return res.status(404).json({ message: "Course not found" });
        }
        if (course.status === "approved") {
            return res.status(400).json({ message: "Course is already approved" });
        }
        course.status="approved";
        course.isPublished=false;
        await course.save();
        return res.status(200).json({
            success: true,
            message:"Course approved Successfully",
            course
        });
    }
    catch(error){
        console.log("Approve course error:",error);
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }
    
}

export async function rejectCourse(req,res) {
    try{
        const {id} = req.params;
        const course= await Course.findById(id);
        const {remarks}=req.body;
        if(!course){
            return res.status(404).json({ message: "Course not found" });
        }
        if (course.status === "rejected") {
            return res.status(400).json({ message: "Course is already rejected" });
        }
        if (course.status === "approved") {
            return res.status(400).json({ message: "Approved courses cannot be rejected" });
        }
        course.status="rejected";
        course.isPublished=false;
        if(remarks) course.adminRemarks=remarks;
        await course.save();
        return res.status(200).json({
            success: true,
            message:"Course rejected Successfully",
            course
        });
    }
    catch(error){
        console.log("Reject course error:",error);
        return res.status(500).json({
            success:false,
            message:error.message||"server error"
        })
    }

}

export async function publishCourse(req, res) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.status !== "approved") {
      return res.status(400).json({ message: "Only approved courses can be published" });
    }

    if (course.isPublished) {
      return res.status(400).json({ message: "Course is already published" });
    }

    course.isPublished = true;
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course published successfully",
      course
    });

  } catch (error) {
    console.error("Publish course error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function unpublishCourse(req, res) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.isPublished) {
      return res.status(400).json({ message: "Course is already unpublished" });
    }

    course.isPublished = false;
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course unpublished successfully",
      course
    });

  } catch (error) {
    console.error("Unpublish course error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
