import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const CourseLearn = () => {
  const { id } = useParams(); 

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseAndProgress();
  }, [id]);

  const fetchCourseAndProgress = async () => {
    try {
      const courseRes = await api.get(`/public/courses/${id}`);
      setCourse(courseRes.data.course);

      const progressRes = await api.get(`/progress/${id}`);
      setProgress(progressRes.data.progress);
    } catch (error) {
      console.error(
        "Error fetching course/progress:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const markLessonCompleted = async (lessonId) => {
    try {
      await api.patch(`/progress/${id}/lesson/${lessonId}/complete`);
      fetchCourseAndProgress(); 
    } catch (error) {
      console.error(
        "Error marking lesson:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <p><b>Progress:</b> {progress?.progressPercent || 0}%</p>
      <p><b>Status:</b> {progress?.isCompleted ? "Completed" : "In Progress"}</p>

      <hr />

      {course.modules.map((module, mIndex) => (
        <div key={mIndex} style={{ marginBottom: "20px" }}>
          <h3>{module.title}</h3>

          {module.lessons.map((lesson, lIndex) => {
            const isCompleted = progress?.completedLessons?.includes(lesson._id);
            const isLast = progress?.lastAccessedLesson === lesson._id;

            return (
              <div
                key={lIndex}
                onClick={() => markLessonCompleted(lesson._id)}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                  backgroundColor: isCompleted
                    ? "#e0ffe0"
                    : isLast
                    ? "#fff3cd"
                    : "#fff"
                }}
              >
                {lesson.title} {isCompleted && "✔"} {isLast && "▶"}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CourseLearn;
