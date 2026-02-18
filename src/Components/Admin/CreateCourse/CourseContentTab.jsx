import React, { useState } from "react";
import { FileText, PlayCircle, HelpCircle } from "lucide-react";

const CourseContentTab = () => {
  // Section title (dynamic)
  const [sectionTitle, setSectionTitle] = useState("Introduction");

  // Lesson form states
  const [lessonTitle, setLessonTitle] = useState("");
  const [isVideo, setIsVideo] = useState(true);
  const [file, setFile] = useState(null);

  // Stored lessons
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Fundamental Theorem of Arithmetic",
      type: "pdf",
    },
    {
      id: 2,
      title: "Fundamental Theorem of Arithmetic",
      type: "video",
    },
    {
      id: 3,
      title: "Fundamental Theorem of Arithmetic",
      type: "doc",
    },
    {
      id: 4,
      title: "Quiz",
      type: "quiz",
    },
  ]);

  // Add Lesson
  const handleAddLesson = () => {
    if (!lessonTitle) return;

    const newLesson = {
      id: Date.now(),
      title: lessonTitle,
      type: isVideo ? "video" : "doc",
      file,
    };

    setLessons((prev) => [...prev, newLesson]);

    // Reset form
    setLessonTitle("");
    setFile(null);
    setIsVideo(true);
  };

  // Icon Render
  const renderIcon = (type) => {
    switch (type) {
      case "video":
        return <PlayCircle className="text-purple-600" />;
      case "pdf":
      case "doc":
        return <FileText className="text-purple-600" />;
      case "quiz":
        return <HelpCircle className="text-blue-500" />;
      default:
        return <FileText />;
    }
  };

  return (
    <div className="bg-purple-100/60 rounded-2xl p-4 md:p-6 border">

      {/* SECTION TITLE */}
      <div className="bg-purple-200 rounded-xl p-4 mb-6">
        <input
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          className="bg-transparent font-semibold text-lg outline-none w-full"
        />
      </div>

      {/* LESSON LIST */}
      <div className="bg-white rounded-xl border shadow-sm mb-6">

        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`flex items-center gap-4 p-4 ${
              index !== lessons.length - 1
                ? "border-b"
                : ""
            }`}
          >
            {renderIcon(lesson.type)}

            <p className="text-sm md:text-base">
              {lesson.title}
            </p>
          </div>
        ))}
      </div>

      {/* ADD LESSON FORM */}
      <div className="bg-white rounded-xl border shadow p-4 md:p-6">

        <h3 className="font-semibold mb-4">
          Add Course
        </h3>

        {/* Lesson Title */}
        <input
          type="text"
          placeholder="Lesson Title"
          value={lessonTitle}
          onChange={(e) =>
            setLessonTitle(e.target.value)
          }
          className="border rounded-lg px-3 py-2 w-full mb-4"
        />

        {/* Toggle */}
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            <p>Video</p>
          </div>

          <button
            onClick={() => setIsVideo(!isVideo)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              isVideo
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                isVideo
                  ? "translate-x-6"
                  : ""
              }`}
            />
          </button>
        </div>

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="border rounded-lg px-3 py-2 w-full mb-6"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={handleAddLesson}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseContentTab;
