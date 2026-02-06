import Option from "./Option";

const QuestionPanel = ({ data, selectedOption, setSelectedOption }) => {
  return (
    <div className="flex-1 space-y-6">
      <div className="bg-[#F3DFFF] rounded-xl p-6">
        <div className="flex justify-between mb-4 text-sm text-gray-600">
          <span>
            Question {data.questionNumber} of {data.totalQuestions}
          </span>
          <button className="border px-3 py-1 rounded-full text-xs">
            Revision
          </button>
        </div>

        <h2 className="text-xl px-5 font-semibold mb-6">
          {data.question}
        </h2>

        <div className="px-5 space-y-4">
          {data.options.map((option) => (
            <Option
              key={option.id}
              option={option}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-600">
          ℹ This is an easy question from {data.topic}.
        </p>
      </div>

      <div className="bg-[#F3DFFF] rounded-xl p-6 text-sm text-gray-500">
        📝 Add Notes for this Question
      </div>

      <div className="flex justify-end">
        <button className="border-2 border-purple-600 px-6 py-2 rounded-lg text-purple-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;
