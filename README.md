# EduTube - AI-Powered Learning Platform

Educational platform with AI features powered by Google Gemini.

## Features
- 📝 Topic Explainer - Get simple explanations on any topic
- 🎯 Quiz Generator - Generate MCQ quizzes on any topic
- 📄 PDF Summarizer - Upload and summarize PDF documents
- 📊 PDF Quiz Generator - Generate quizzes from PDF content
- 🎥 YouTube & PDF Search

## Setup Instructions

### 1. Get Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key

### 2. Backend Setup
```bash
cd backend
npm install
```

Edit `backend/.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

Start backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Tech Stack
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **AI**: Google Gemini API
- **PDF Processing**: ConvertAPI

## API Endpoint
```
POST http://localhost:3000/api/v1/ai/chat
Body: { "prompt": "your prompt here" }
```

## Project Structure
```
edutube/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── backend/           # Express backend
│   ├── index.js
│   ├── .env
│   └── package.json
└── README.md
```

## Note
Make sure both backend (port 3000) and frontend (port 5173) are running simultaneously for the app to work properly.
