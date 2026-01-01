import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const CourseLearn = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <p>Progress: {progress?.progressPercent || 0}%</p>
      <p>Status: {progress?.isCompleted ? "Completed" : "In Progress"}</p>
    </div>
  );
};

export default CourseLearn;
