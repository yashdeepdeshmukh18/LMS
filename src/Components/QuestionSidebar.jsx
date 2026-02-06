const QuestionSidebar = () => {
  return (
    <div className="w-64 bg-[#E7C6F3] rounded-xl p-4">
      <div className="bg-yellow-400 w-fit px-3 py-1 rounded-full text-sm mb-6">
        ⏱ 1:00
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="h-10 w-10 rounded bg-green-500" />
        <div className="h-10 w-10 rounded bg-orange-400" />
        <div className="h-10 w-10 rounded bg-white" />
      </div>

      <div className="space-y-3 text-sm">
        <p className="flex items-center gap-2">🟢 Answered</p>
        <p className="flex items-center gap-2">🟠 Not Answered</p>
        <p className="flex items-center gap-2">⚪ Not Visited</p>
      </div>
    </div>
  );
};

export default QuestionSidebar;
