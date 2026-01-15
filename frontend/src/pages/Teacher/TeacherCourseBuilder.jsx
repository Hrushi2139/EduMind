import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { ModuleEditor } from "./ModuleEditor";

export const TeacherCourseBuilder = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
  try {
    const res = await api.get(`/courses/${id}`);
    console.log("Fetched course:", res.data);
    setCourse(res.data.course);
  } catch (error) {
    console.error("Fetch course failed:", error.response?.data || error.message);
  }
};


  const addModule = () => {
    setCourse({
      ...course,
      modules: [...(course.modules || []), { title: "", order: (course.modules?.length || 0) + 1, lessons: [] }]
    });
  };

    const saveModule = async () => {
    try {
        if (!course.modules || course.modules.length === 0) {
        alert("Add at least one module before saving.");
        return;
        }

        const res = await api.put(`/courses/${id}`, {
        modules: course.modules
        });

        setCourse(res.data.course); // 🔥 sync frontend with DB
        alert("Saved Successfully");

    } catch (error) {
        console.error("Save failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Save failed");
    }
    };


  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>Build Course: {course.title}</h1>

      {(course.modules || []).map((mod, index) => (
        <ModuleEditor
          key={index}
          module={mod}
          onChange={(updated) => {
            const newModules = [...course.modules];
            newModules[index] = updated;
            setCourse({ ...course, modules: newModules });
          }}
        />
      ))}

      <button onClick={addModule}>➕ Add Module</button>
      <button onClick={saveModule}>💾 Save</button>
    </div>
  );
};
