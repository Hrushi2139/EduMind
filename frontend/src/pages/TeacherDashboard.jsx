import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import LogoutButton from "../components/LogoutButton";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/courses/my");
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading your courses...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher Dashboard</h1>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {courses.length === 0 ? (
          <p>You haven’t created any courses yet.</p>
        ) : (
          courses.map(course => (
            <div
              key={course._id}
              onClick={() => navigate(`/teacher/course/${course._id}/build`)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "260px",
                cursor: "pointer"
              }}
            >
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><b>Status:</b> {course.status}</p>
            </div>
          ))
        )}
      </div>

      <LogoutButton />
    </div>
  );
};

export default TeacherDashboard;
