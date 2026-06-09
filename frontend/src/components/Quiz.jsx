import React, { useState } from 'react';
import axios from 'axios';

function Quiz() {
  const [topic, setTopic] = useState("");
  const [isQuizLoaded, setIsQuizLoaded] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [score, setScore] = useState(0);

  function extractJSON(input) {
    const start = input.indexOf('[');
    const end = input.lastIndexOf(']');
    return (start !== -1 && end !== -1 && start < end) ? input.slice(start, end + 1) : null;
  }

  const getQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const prompt = `Generate 10 multiple-choice questions (MCQs) on ${topic} in JSON format that I can directly use in a React component. Each question should include a 'question' field (the question text), an 'options' field (an array of 4 options), and an 'answer' field (the correct option from the 'options' array). Ensure the output is valid JSON, without explanations, comments, or additional text.`;
      const response = await axios.post("http://localhost:3000/api/v1/ai/chat", { prompt });
      const data = response.data;
      const jsonData = JSON.parse(extractJSON(data.data));

      setQuizData(jsonData);
      setIsQuizLoaded(true);
      setSelectedOptions({}); // Reset selected options
      setShowAnswer({}); // Reset answer display
      setScore(0); // Reset score
    } catch (err) {
      setError("Failed to load quiz data.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (questionIndex, option) => {
    if (showAnswer[questionIndex]) return; // Prevent re-selection

    const isCorrect = option === quizData[questionIndex].answer;
    const updatedScore = score + (isCorrect ? 1 : -1);

    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option
    });

    setShowAnswer({
      ...showAnswer,
      [questionIndex]: true
    });

    setScore(updatedScore);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="text-4xl font-bold mb-6">Quiz Generator</div>
      <div className="text-xl mb-4">Enter topic name:</div>
      <input
        type="text"
        placeholder="e.g., React Interview"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={getQuestions}
        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Generate Quiz
      </button>

      <div className="mt-6 w-full max-w-4xl">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : isQuizLoaded ? (
          <div>
            {quizData.map((data, index) => (
              <div key={index} className="bg-white p-6 mb-4 rounded-lg shadow-lg border border-gray-200">
                <div className="text-lg font-semibold mb-2">{index + 1}. {data.question}</div>
                <div className="space-y-2">
                  {data.options.map((option, idx) => {
                    const isSelected = selectedOptions[index] === option;
                    const isCorrect = option === data.answer;
                    const optionStyle = isSelected
                      ? isCorrect
                        ? 'bg-green-100 border-green-300'
                        : 'bg-red-100 border-red-300'
                      : 'bg-gray-50 border-gray-200';

                    const hoverStyle = isSelected
                      ? isCorrect
                        ? 'hover:bg-green-200'
                        : 'hover:bg-red-200'
                      : 'hover:bg-gray-200';

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(index, option)}
                        className={`block w-full text-left p-3 rounded-md border ${optionStyle} ${hoverStyle} transition duration-300`}
                        disabled={showAnswer[index]} // Disable button after selection
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {showAnswer[index] && (
                  <div className="mt-3 text-gray-700 italic">Correct Answer: {data.answer}</div>
                )}
              </div>
            ))}
            <div className="mt-6 text-lg font-semibold">Score: {score}</div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Quiz will appear here</p>
        )}
      </div>
    </div>
  );
}

export default Quiz;
