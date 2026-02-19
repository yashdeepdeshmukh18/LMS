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
    <div className="p-4 md:p-6 bg-purple-50 rounded-xl space-y-6">

      {/* Form Section */}
      <div className="bg-white p-5 rounded-xl shadow space-y-4">

        <h3 className="font-semibold text-lg">
          Create Quiz Question
        </h3>

        {/* Question */}
        <input
          type="text"
          placeholder="Enter Question"
          value={form.question}
          onChange={handleQuestionChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-3">
          {form.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) =>
                handleOptionChange(e.target.value, i)
              }
              className="border rounded-lg px-3 py-2"
            />
          ))}
        </div>

        {/* Answer */}
        <input
          type="text"
          placeholder="Correct Answer"
          value={form.answer}
          onChange={handleAnswerChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Add Button */}
        <button
          onClick={handleAddQuiz}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          <Plus size={16} />
          {editingIndex !== null ? "Update Question" : "Add Question"}
        </button>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            {/* Question Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center">
              <p className="font-medium">
                {quiz.question}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-white/20 p-2 rounded cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="bg-white/20 p-2 rounded cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="p-4 space-y-3">
              {quiz.options.map((opt, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border flex items-center gap-3 ${
                    quiz.answer === opt
                      ? "bg-green-100 border-green-400"
                      : "bg-gray-50"
                  }`}
                >
                  <span className="font-semibold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <p>{opt}</p>
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 text-sm">
              <CheckCircle className="text-green-600" size={16} />
              Correct Answer: {quiz.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
