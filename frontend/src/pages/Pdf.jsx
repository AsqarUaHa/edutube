import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import Quiz from '../components/QuizFromPdf.jsx';

function Pdf() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState('');
  const [textDataFromPDF, setTextDataFromPDF] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Function to handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  // Function to convert file to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  function createAndTrimString(str, length, padChar = ' ') {
    const paddedString = str.padEnd(length, padChar);
    const trimmedString = paddedString.trimEnd();
    return trimmedString.slice(0, length);
  }

  const onSummarizerSubmit = async () => {
    if (textDataFromPDF === '') {
      setError('No text available to summarize. Please upload a PDF and generate text first.');
      return;
    }

    setIsSummarizing(true);
    setError('');
    try {
      const prompt = `Summarize this ${textDataFromPDF} in easy language like you would explain this to a layman with some example and give the response in markdown with left align.`;
      const response = await axios.post('https://codecubicles-backend.onrender.com/api/v1/ai/chat', { prompt });
      setSummary(response.data.data);
    } catch (err) {
      setError('Failed to summarize text.');
    } finally {
      setIsSummarizing(false);
    }
  };

  // Function to handle file upload and summarization
  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const base64File = await fileToBase64(file);
      const requestBody = {
        Parameters: [
          {
            Name: 'File',
            FileValue: {
              Name: file.name,
              Data: base64File,
            },
          },
          {
            Name: 'StoreFile',
            Value: true,
          },
        ],
      };

      const convertAPIEndpoint = 'https://v2.convertapi.com/convert/pdf/to/txt?Secret=secret_kvZsIPvDdSd9m3YNJ1XoGWyd5K1L7jSx';
      const uploadResponse = await axios.post(convertAPIEndpoint, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const extractedTextUrl = uploadResponse.data.Files[0].Url;
      const textResponse = await axios.get(extractedTextUrl);
      
      const formattedSummary = textResponse.data
        .replace(/'/g, '')
        .replace(/[\n\r]+/g, ' ')
        .replace(/["]+/g, '');

      const trimmedSummary = createAndTrimString(formattedSummary, 2500, ' ');
      setTextDataFromPDF(trimmedSummary);
    } catch (err) {
      setError('Error occurred during file upload or summarization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="flex justify-center space-x-8 mb-6">
        <button
          className={`text-2xl py-2 px-4 rounded-md ${options === 'Quiz' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setOptions('Quiz')}
        >
          Quiz
        </button>
        <button
          className={`text-2xl py-2 px-4 rounded-md ${options === 'Summary' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setOptions('Summary')}
        >
          Summary
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-2xl text-center">
        <div className="text-2xl font-bold mb-4 text-gray-800">Upload and Summarize PDF</div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Upload PDF
        </button>
        {loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {options === 'Summary' && textDataFromPDF && (
          <div className="mt-4 p-6 border rounded-md bg-gray-50 text-gray-700">
            <h2 className="text-xl font-bold mb-2 text-black">Summary</h2>
            <button
              onClick={onSummarizerSubmit}
              disabled={isSummarizing}
              className={`py-2 px-4 rounded-md ${isSummarizing ? 'bg-gray-400' : 'bg-blue-600'} text-white transition duration-300`}
            >
              {isSummarizing ? 'Generating Summary...' : 'Click to Generate Summary'}
            </button>
            {summary && (
              <div className="mt-4 p-6 border rounded-md bg-gray-50 text-gray-700">
                <Markdown>{summary}</Markdown>
              </div>
            )}
          </div>
        )}
        {options === 'Quiz' && (
          <div className="mt-4 p-6 border rounded-md bg-gray-50 text-gray-700">
            {textDataFromPDF ? <Quiz textFromPDF={textDataFromPDF} /> : <p>No quiz data available.</p>}
          </div>
        )}
        {options === '' && (
          <div className="mt-4 p-6 border rounded-md bg-gray-50 text-gray-700">
            <p>Select an option to view.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pdf;
