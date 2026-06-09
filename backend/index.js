const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API endpoint for chat
app.post('/api/v1/ai/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      data: text
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate response',
      message: error.message
    });
  }
});

// API endpoint for PDF processing
app.post('/api/v1/ai/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the generative model that supports files
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert buffer to base64
    const base64Data = req.file.buffer.toString('base64');

    // Create file part for Gemini
    const filePart = {
      inlineData: {
        data: base64Data,
        mimeType: req.file.mimetype
      }
    };

    // Extract text from PDF
    const prompt = "Extract all text content from this PDF document and return it as plain text.";
    const result = await model.generateContent([prompt, filePart]);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      data: text
    });
  } catch (error) {
    console.error('PDF Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process PDF',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
