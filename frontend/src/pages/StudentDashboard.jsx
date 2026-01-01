import React, { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton.jsx";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await api.get("/student/courses/my");
      console.log("Courses response:", res.data);
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error(
        "Error fetching enrolled courses:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading your courses...</p>;

  return (
    <div>
      <h1>Student Dashboard</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {courses.length === 0 ? (
          <p>You are not enrolled in any courses yet.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "250px",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/student/course/${course._id}`)}
            >
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><b>Level:</b> {course.level}</p>
              <p><b>Category:</b> {course.category}</p>
            </div>
          ))
        )}
      </div>

      <LogoutButton />
    </div>
  );
};

export default StudentDashboard;
