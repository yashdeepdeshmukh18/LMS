import React, { useState } from "react";
import DateTimeModal from "./DateTimeModal";
import ScheduleCard from "./ScheduleCard";

const CourseSchedule = () => {
    const [openModal, setOpenModal] = useState(false);

    const [selectedContent, setSelectedContent] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState(null);

    const [schedules, setSchedules] = useState([]);

    const [editingId, setEditingId] = useState(null);



    const courseContents = [
    "Introduction",
    "Fundamentals",
    "Advanced Concepts",
    ];

    const handleEdit = (schedule) => {
        setSelectedContent(schedule.content);
        setDescription(schedule.description);
        setDateTime(schedule.dateTime);

        setEditingId(schedule.id);
        setOpenModal(true);
    };


    const handleDelete = (id) => {
        setSchedules((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };



    const handleSaveSchedule = () => {
        if (!selectedContent || !dateTime) return;

        if (editingId) {
            // Update
            setSchedules((prev) =>
            prev.map((item) =>
                item.id === editingId
                ? {
                    ...item,
                    content: selectedContent,
                    description,
                    dateTime,
                    }
                : item
            )
            );
        } else {
            // Create
            const newSchedule = {
              id: Date.now(),
              content: selectedContent,
              description,
              dateTime,
            };

            setSchedules((prev) => [...prev, newSchedule]);
        }

        // Reset
        setSelectedContent("");
        setDescription("");
        setDateTime("");
        setEditingId(null);
        setOpenModal(false);
    };


  return (
    <div className="bg-white rounded-xl p-6 shadow">

      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Course Schedule
        </h2>

        <button className="bg-gray-200 px-3 py-1 rounded">
          Help
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        Here where you can add course content like lectures,
        course section, assignment and more.
      </div>

      {/* Add Schedule */}
      <div className="border rounded-xl p-4 mb-6">

        <h3 className="font-semibold mb-3">
            Course {schedules.length + 1}
        </h3>

        <div className="flex flex-col md:flex-row gap-3">

          {/* Select Content */}
          <select
            value={selectedContent}
            onChange={(e) => setSelectedContent(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
            >
            <option value="">Select Content</option>

            {courseContents.map((item, i) => (
                <option key={i} value={item}>
                {item}
                </option>
            ))}
            </select>


          {/* Date Time */}
          <button
            onClick={() => setOpenModal(true)}
            className="border p-2 rounded w-full text-left"
          >
            Select Date and Time
          </button>
        </div>

        <button
        onClick={handleSaveSchedule}
        className="bg-blue-500 mt-5 text-white px-4 py-2 rounded"
        >
            Save Schedule
        </button>

      </div>

      {/* Existing Course Card */}
      {schedules.map((schedule) => (
        <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
        ))}


      {/* Modal */}
      {openModal && (
        <DateTimeModal 
            onClose={() => setOpenModal(false)} 
            onSave={(data) => setDateTime(data)}
            initialData={dateTime}
        />
      )}
    </div>
  );
}

export default CourseSchedule;
