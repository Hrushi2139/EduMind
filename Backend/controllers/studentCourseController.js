import Course from "../models/Course.js";

export async function enrollInCourse(req,res) {
    try{
        const { id } = req.params;
        const studentId=req.user.userId;
        const course=await Course.findOne({
            _id:id,
            status:"approved",
            isPublished:true
        });
        if(!course){
            return res.status(404).json({message: "Course doesn't Exists"});
        }
        if(course.enrolledStudents.includes(studentId)){
            return res.status(400).json({message: "Student already enrolled"});
        }
        course.enrolledStudents.push(studentId);
        course.enrollmentCount+=1;
        await course.save();
        return res.status(200).json({
            success: true,
            message:"Enrolled Successfully",
            course
        });

    }
    catch(error){
         console.log("Enroll course error:",error);
            return res.status(500).json({
                success:false,
                message:"server error"
            })
    }    
}


export async function getMyEnrolledCourses(req, res) {
  try {
    const studentId = req.user.userId;

    const courses = await Course.find({
      enrolledStudents: studentId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });

  } catch (error) {
    console.error("Get enrolled courses error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}


export async function checkEnrollment(req, res) {
  try {
    const { id } = req.params;       // courseId
    const studentId = req.user.userId;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const isEnrolled = course.enrolledStudents.includes(studentId);

    return res.status(200).json({
      success: true,
      enrolled: isEnrolled
    });

  } catch (error) {
    console.error("Check enrollment error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

