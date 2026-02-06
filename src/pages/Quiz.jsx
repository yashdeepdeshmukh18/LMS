import React, { useEffect, useState } from "react";
import QuestionPanel from "../Components/QuestionPanel";
import QuestionSidebar from "../Components/QuestionSidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const QuizPage = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // MOCK API CALL
    setTimeout(() => {
      setQuestionData({
        id: 1,
        questionNumber: 1,
        totalQuestions: 5,
        question: "What is the HCF of 36 and 60?",
        options: [
          { id: 1, text: "6" },
          { id: 2, text: "12" },
          { id: 3, text: "18" },
          { id: 4, text: "24" }
        ],
        topic: "Real Numbers"
      });
    }, 500);
  }, []);

  if (!questionData) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDF6FF]">
        <Navbar/>
        <div className="w-[85%] mx-auto min-h-screen bg-[#FBF3FF] p-6 flex gap-6">
            <QuestionSidebar />

            <QuestionPanel
                data={questionData}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />

        </div>
        <Footer/>
    </div>
  );
};

export default QuizPage;
