import React, { useState } from "react";

const DateTimeModal = ({ onClose, onSave }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSave = () => {
    if (!startTime || !endTime || !startDate) {
      alert("Please select date & time");
      return;
    }

    const dateTimeData = {
      startTime,
      endTime,
      startDate,
      endDate,
    };

    onSave(dateTimeData); // send data to parent
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      {/* Modal Container */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-xl w-full max-w-4xl p-6 relative">

        {/* Header */}
        <h2 className="text-xl font-semibold mb-6">
          Select Date & Time
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Time Section */}
          <div className="bg-white rounded-xl shadow p-5 space-y-4">

            <h3 className="font-semibold text-gray-700">
              Start Time
            </h3>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded-lg p-2"
            />

            <h3 className="font-semibold text-gray-700">
              End Time
            </h3>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border rounded-lg p-2"
            />

            {/* <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
            >
              Save
            </button> */}
          </div>

          {/* RIGHT — Date Section */}
          <div className="space-y-4">

            {/* Calendar Card */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

              {/* Purple Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4">
                <p className="text-sm">SELECT DATE</p>
                <h3 className="text-xl font-semibold">
                  {startDate || "Pick a date"}
                </h3>
              </div>

              {/* Date Inputs */}
              <div className="p-4 space-y-4">

                <div>
                  <label className="text-sm text-gray-600">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(e.target.value)
                    }
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                      setEndDate(e.target.value)
                    }
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                {/* <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
                >
                  Save
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimeModal;
