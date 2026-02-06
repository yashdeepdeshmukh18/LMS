const Option = ({ option, selectedOption, setSelectedOption }) => {
  const isSelected = selectedOption === option.id;

  return (
    <div
      onClick={() => setSelectedOption(option.id)}
      className={`cursor-pointer border rounded-lg px-8 py-3 flex items-center gap-3
        ${
          isSelected
            ? "border-purple-600 bg-purple-200"
            : "border-gray-300 bg-white"
        }
      `}
    >
      <div
        className={`h-4 w-4 rounded-full border
          ${isSelected ? "border-purple-600 bg-purple-600" : "border-gray-400"}
        `}
      />
      <span className="font-medium">{option.text}</span>
    </div>
  );
};

export default Option;
