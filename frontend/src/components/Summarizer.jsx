import React, { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  const [topic, setTopic] = useState("");
  const [lines, setLines] = useState();
  const [isSummaryLoaded, setIsSummaryLoaded] = useState(false);
  const [summaryData, setSummaryData] = useState("");
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    setLoading(true);
    try {
      const prompt = `Exaplain this ${topic} in just ${lines} lines like you would explain this to a layman with some example.`;
      const response = await axios.post("http://localhost:3000/api/v1/ai/chat", { prompt });
      const data = response.data;
      setSummaryData(data.data);
      setIsSummaryLoaded(true);
    } catch (err) {
      console.error("Error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center">
      <div className="text-4xl font-bold mb-4">Topic Explainer </div>
      <div className="text-xl mb-4">Enter topic :</div>
      <input
        type="text"
        placeholder="Write your topic here"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <input
        type="number"
        placeholder="Number of Lines"
        min={0}
        max={20}
        value={lines}
        onChange={(e) => setLines(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        onClick={getSummary}
        className="w-full max-w-md bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Generate Explanation
      </button>
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : isSummaryLoaded ? (
          <div className="text-gray-800">{summaryData}</div>
        ) : (
          <p className="text-center text-gray-600">Explaination will appear here</p>
        )}
      </div>
    </div>
  );
}

export default Summarizer;
