import React, { useState } from "react";
import { Plus, Pencil, Trash2, CheckCircle } from "lucide-react";

export default function CreateQuizTab() {
  const emptyForm = {
    question: "",
    options: ["", "", "", ""],
    answer: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [quizzes, setQuizzes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle Question Change
  const handleQuestionChange = (e) => {
    setForm({ ...form, question: e.target.value });
  };

  // Handle Option Change
  const handleOptionChange = (value, index) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  // Handle Answer Change
  const handleAnswerChange = (e) => {
    setForm({ ...form, answer: e.target.value });
  };

  // Add / Update Quiz
  const handleAddQuiz = () => {
    if (!form.question || form.options.some((o) => !o) || !form.answer) {
      alert("Fill all fields");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...quizzes];
      updated[editingIndex] = form;
      setQuizzes(updated);
      setEditingIndex(null);
    } else {
      setQuizzes([...quizzes, form]);
    }

    setForm(emptyForm);
  };

  // Edit Quiz
  const handleEdit = (index) => {
    setForm(quizzes[index]);
    setEditingIndex(index);
  };

  // Delete Quiz
  const handleDelete = (index) => {
    const updated = quizzes.filter((_, i) => i !== index);
    setQuizzes(updated);
  };

  return (
  <div className="bg-purple-100/60 p-6 md:p-8 rounded-2xl space-y-8">

    {/* Form Section */}
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5 border border-purple-200">

      <h3 className="text-xl font-semibold text-gray-800">
        Create Quiz Question
      </h3>

      {/* Question */}
      <input
        type="text"
        placeholder="Enter Question"
        value={form.question}
        onChange={handleQuestionChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
      />

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-4">
        {form.options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${String.fromCharCode(65 + i)}`}
            value={opt}
            onChange={(e) =>
              handleOptionChange(e.target.value, i)
            }
            className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        ))}
      </div>

      {/* Answer */}
      <input
        type="text"
        placeholder="Correct Answer"
        value={form.answer}
        onChange={handleAnswerChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
      />

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAddQuiz}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition-all"
        >
          <Plus size={16} />
          {editingIndex !== null ? "Update Question" : "Add Question"}
        </button>
      </div>
    </div>

    {/* Preview Section */}
    <div className="space-y-8">
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="bg-purple-50 rounded-2xl shadow-md border border-purple-200 overflow-hidden"
        >

          {/* Question Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
            <p className="font-medium text-lg">
              {quiz.question}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(index)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="p-6 space-y-4">
            {quiz.options.map((opt, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl shadow-sm border transition ${
                  quiz.answer === opt
                    ? "bg-blue-100 border-blue-400"
                    : "bg-teal-100 border-transparent"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold">
                  {String.fromCharCode(65 + i)}
                </div>
                <p className="text-gray-800">{opt}</p>
              </div>
            ))}
          </div>

          {/* Correct Answer Footer */}
          <div className="bg-gray-100 px-6 py-3 flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="text-green-600" size={18} />
            Correct Answer: <span className="font-medium">{quiz.answer}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
