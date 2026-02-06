const Transcript = ({ text, language, onLanguageChange }) => {
    return (
        <div className="mt-6 text-sm sm:text-base leading-relaxed">

            {/* HEADER ROW */}
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-base font-semibold text-gray-900">
                    Transcript :
                </h4>

                <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="border border-purple-400 text-grey-900 rounded px-3 py-1 text-sm bg-purple-50 focus:outline-none focus:ring-1 focus:ring-purple-300"
                >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                </select>
            </div>

            {/* TRANSCRIPT BODY */}
            <p className="text-sm leading-7 text-gray-900 break-words">
                {text || "Transcript not available in this language."}
            </p>
        </div>
    );
};

export default Transcript;
