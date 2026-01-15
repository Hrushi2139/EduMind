import React from 'react'

export const LessonEditor = ({lesson,onChange}) => {
    
  return (
    <div>
        <input
            placeholder="Lesson title"
            value={lesson.title}
            onChange={(e)=>onChange({...lesson,title:e.target.value})}
        />
        <select
            value={lesson.contentType}
            onChange={(e)=>onChange({...lesson,contentType:e.target.value})}
        >
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>

        </select>
        <textarea
            placeholder="Lesson Content"
            value={lesson.content}
            onChange={(e)=>onChange({...lesson,content:e.target.value})}
        />
    </div>
  );
};

