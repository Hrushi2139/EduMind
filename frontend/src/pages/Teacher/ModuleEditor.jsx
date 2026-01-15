import { LessonEditor } from "./LessonEditor";
export const ModuleEditor = ({ module, onChange }) => {

  const lessons = module.lessons || []; // 🔥 SAFETY LINE

  const addLesson = () => {
    onChange({
      ...module,
      order: module.order,
      lessons: [
        ...lessons,
        { title: "", contentType: "text", content: "" }
      ]
    });
  };

  const updateLesson = (i, lesson) => {
    const newLessons = [...lessons];
    newLessons[i] = lesson;

    onChange({
      ...module,
      order: module.order,
      lessons: newLessons
    });
  };

  return (
    <div>
      <input
        placeholder="Module title"
        value={module.title || ""}
        onChange={(e) =>
          onChange({
            ...module,
            order: module.order,
            title: e.target.value
          })
        }
      />

      {lessons.map((lesson, i) => (
        <LessonEditor
          key={i}
          lesson={lesson}
          onChange={(l) => updateLesson(i, l)}
        />
      ))}

      <button onClick={addLesson}>➕ Add Lesson</button>
    </div>
  );
};
