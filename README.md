# AI Study Assistant

An AI-powered Study Assistant that allows students to upload study materials, chat with their notes using Retrieval-Augmented Generation (RAG), generate quizzes and summaries, and manage learning resources through a modern web application.

---

## Features

- User Authentication (JWT + OTP Verification)
- Upload PDF/DOCX Notes
- AI Chat with Uploaded Notes (RAG)
- AI Generated Summaries
- AI Quiz Generation
- Document Management
- User Profile Management
- Responsive Dashboard
- Production Ready Architecture

---

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Zod
- Axios
- React Dropzone
- Framer Motion
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- Helmet
- CORS

### AI Service
- Python
- LangChain
- LangGraph
- Groq LLM
- HuggingFace Embeddings
- Pinecone Vector Database

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Vector Database → Pinecone

---

# Project Structure

```
AI-Study-Assistant
│
├── client/          # React Frontend
├── server/          # Express Backend
├── ai-service/      # LangChain + LangGraph Service
├── README.md
└── LICENSE
```

---

## Frontend Structure

```
client/src
│
├── assets
├── components
│   ├── auth
│   ├── chatbot
│   ├── dashboard
│   ├── upload
│   ├── common
│   └── ui
│
├── context
├── hooks
├── layouts
├── pages
├── routes
├── services
├── styles
├── types
├── utils
│
├── App.tsx
└── main.tsx
```

### Frontend Responsibilities

- Authentication UI
- Dashboard
- Upload Notes
- AI Chat Interface
- Quiz UI
- Document Management
- API Communication

---

## Backend Structure

```
server/src
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── validators
├── utils
│
├── app.ts
└── server.ts
```

### Backend Responsibilities

- Authentication
- User Management
- File Upload
- Document APIs
- Dashboard APIs
- Quiz APIs
- AI Communication

---

## AI Service Structure

```
ai-service
│
├── chains
├── graph
├── embeddings
├── vectorstore
├── prompts
├── services
└── main.py
```

### AI Responsibilities

- Extract document text
- Chunk documents
- Generate embeddings
- Store vectors in Pinecone
- Retrieve relevant chunks
- Build prompts
- Generate AI responses
- Generate quizzes and summaries

---

# System Workflow

```
User
   │
   ▼
React Frontend
   │
   ▼
Express Backend
   │
   ├──────────────► MongoDB
   │
   └──────────────► AI Service
                       │
                       ▼
                  LangGraph
                       │
                       ▼
                  Pinecone
                       │
                       ▼
                    Groq LLM
                       │
                       ▼
                 AI Response
```

---

# Authentication Flow

```
Register
    │
    ▼
Email OTP
    │
    ▼
Verify OTP
    │
    ▼
Login
    │
    ▼
JWT Access Token
    │
    ▼
Protected Routes
```

---

# Upload Flow

```
Upload File
      │
      ▼
Express API
      │
      ▼
Save Metadata
      │
      ▼
Extract Text
      │
      ▼
Generate Embeddings
      │
      ▼
Pinecone
```

---

# RAG Workflow

```
Question
     │
     ▼
Retrieve Relevant Chunks
     │
     ▼
Conversation History
     │
     ▼
Prompt Builder
     │
     ▼
Groq LLM
     │
     ▼
Answer
```

---

# Development Progress

### ✅ Completed

- Project Architecture
- Frontend Foundation
- Backend Foundation
- MongoDB Connection
- Authentication Backend
- Dashboard UI
- Upload UI
- Authentication UI
- API Layer
- JWT Authentication
- OTP Verification
- Password Reset
- Profile APIs

### 🚧 In Progress

- Frontend Authentication Integration
- Protected Routes
- Document APIs
- Upload Integration

### 📌 Upcoming

- Document Management
- AI Chat
- RAG Integration
- Quiz Generator
- Summary Generator
- Flashcards
- Analytics
- Deployment

---

# Installation

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### AI Service

```bash
cd ai-service
pip install -r requirements.txt
python main.py
```

---

# Environment Variables

### Frontend

```
VITE_API_URL=
```

### Backend

```
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLIENT_URL=
EMAIL_USER=
EMAIL_PASS=
```

### AI Service

```
GROQ_API_KEY=
PINECONE_API_KEY=
PINECONE_INDEX=
HUGGINGFACE_API_KEY=
```

---

# Project Goals

- Help students study smarter using AI.
- Build a scalable production-ready SaaS application.
- Implement Retrieval-Augmented Generation (RAG) for accurate responses.
- Provide a modern and intuitive user experience.
- Showcase full-stack development, AI integration, and software engineering best practices.

---

# Author

**Vansh Chaudhary**

Final Year B.Tech (AI & ML)

---

## License

This project is developed for educational and portfolio purposes.