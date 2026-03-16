# PromptForge
# ⚡ PromptForge

> A community-driven, open-source platform where developers share, fork, and evolve AI prompts together.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![MERN Stack](https://img.shields.io/badge/stack-MERN-61DAFB.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## 🤔 The Problem

You saw someone vibe-code a stunning website in 60 seconds. You tried the same thing. Yours looked terrible.

The difference wasn't the tool — it was the **prompt**.

Great prompts are currently buried in Discord servers, Twitter threads, and private Notion docs. There's no dedicated space where developers can share, discuss, improve, and build on each other's prompts — whether for vibe-coding, image generation, UI design, writing, or anything else.

**PromptForge fixes that.**

---

## 💡 What is PromptForge?

PromptForge is a platform built specifically around how prompts actually work — not a generic Reddit clone, not a simple paste site. Every feature is designed for the unique nature of prompts:

- Prompts have **versions** — improvements are tracked, not just overwritten
- Prompts have **outputs** — you see the prompt and its result side by side
- Prompts can be **forked** — take someone's prompt, remix it, link back to the original
- Prompts have **lineage** — see how a great prompt evolved through the community

---

## ✨ Features

- 📝 **Post Prompts** — share your prompt alongside a screenshot of its output
- 🔀 **Fork & Remix** — fork any prompt, improve it, your version links back to the original
- 🕰️ **Version History** — every edit creates a new version, full history preserved
- 🌿 **Fork Tree** — visual lineage showing how a prompt evolved through the community
- 🗂️ **Categories** — Vibe Coding · Image Gen · UI Design · Writing · Terminal · Data
- 🔍 **Search & Filter** — find prompts by keyword, category, or tag
- 💬 **Comments** — discuss, critique, and suggest improvements
- ⬆️ **Upvotes** — surface the best prompts to the top

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT + bcrypt |
| File Upload | Multer |
| Testing | Jest, Supertest |

---

## ⚙️ Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [MongoDB](https://www.mongodb.com/) — local installation **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- [Git](https://git-scm.com/)

To verify your setup:
```bash
node --version    # should print v18+
npm --version     # should print v9+
mongod --version  # if using local MongoDB
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/promptforge.git
cd promptforge
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `/server` directory:

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/promptforge
# OR if using MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/promptforge

JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:3000
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside the `/client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the development servers

Open **two terminal windows**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```
Server will start at `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd client
npm start
```
App will open at `http://localhost:3000`

---

## 📖 Usage Guide

### Creating an account

1. Open `http://localhost:3000` in your browser
2. Click **Sign Up** in the top right
3. Enter a username, email, and password
4. You're in — your dashboard is ready

### Posting a prompt

1. Click **+ New Prompt** from the navbar
2. Fill in:
   - **Title** — a short description of what this prompt does
   - **Category** — pick from Vibe Coding, Image Gen, UI Design, Writing, Terminal, or Data
   - **Prompt Text** — paste your full prompt
   - **Output Screenshot** — upload a screenshot of what the prompt produced
   - **Tags** — add relevant tags (e.g. `react`, `landing-page`, `dark-theme`)
3. Click **Publish**

### Forking a prompt

1. Open any prompt from the feed
2. Click the **Fork** button in the top right of the prompt
3. The editor opens pre-filled with the original text
4. Make your changes and add your improved output screenshot
5. Click **Publish Fork** — your version automatically links back to the original and appears in the fork tree

### Saving a new version of your prompt

1. Open one of your own prompts
2. Click **Edit**
3. Modify the prompt text
4. Click **Save as new version** — the old version is preserved in history, not overwritten
5. Switch between versions anytime from the **Version History** panel on the right

### Browsing the feed

- Use the **sidebar** to filter by category
- Use the **search bar** to find prompts by keyword or tag
- Sort by **Top**, **New**, or **Trending**

---

## 🧪 Testing

### Backend tests

```bash
cd server
npm test
```

Runs all API tests using **Jest** and **Supertest**. Tests cover:
- Auth routes (register, login, token validation)
- Prompt CRUD (create, read, update)
- Fork logic (fork creation, fork tree structure)
- Version history (version save, version retrieval)
- Upvote toggle behaviour

To run with coverage report:

```bash
npm run test:coverage
```

### Frontend tests

```bash
cd client
npm test
```

Runs component tests using **React Testing Library**. Tests cover:
- PromptCard rendering with correct data
- Feed filtering by category
- Fork button behaviour
- Form validation on prompt creation

### Run all tests at once

From the root directory:

```bash
npm run test:all
```

---

## 📁 Project Structure

```
promptforge/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       │   ├── PromptCard/
│       │   ├── SplitView/
│       │   ├── ForkTree/
│       │   └── VersionHistory/
│       ├── pages/           # Route-level pages
│       │   ├── Feed/
│       │   ├── PromptDetail/
│       │   ├── CreatePrompt/
│       │   └── Profile/
│       ├── hooks/           # Custom React hooks
│       ├── utils/           # Helper functions
│       └── App.jsx
│
├── server/                  # Express backend
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── Prompt.js
│   │   └── Comment.js
│   ├── routes/              # API route handlers
│   │   ├── auth.js
│   │   ├── prompts.js
│   │   ├── comments.js
│   │   └── upload.js
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── tests/               # Jest + Supertest test files
│   └── server.js
│
├── .env.example             # Template for environment variables
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/prompts` | ❌ | Get feed (`?category=&tag=&sort=`) |
| POST | `/api/prompts` | ✅ | Create a new prompt |
| GET | `/api/prompts/:id` | ❌ | Get single prompt + version history |
| PUT | `/api/prompts/:id` | ✅ | Save a new version of your prompt |
| POST | `/api/prompts/:id/fork` | ✅ | Fork a prompt |
| GET | `/api/prompts/:id/forks` | ❌ | Get full fork tree |
| POST | `/api/prompts/:id/upvote` | ✅ | Toggle upvote |
| GET | `/api/search` | ❌ | Search by `?q=&category=&tag=` |
| POST | `/api/upload` | ✅ | Upload output screenshot |

> ✅ = requires `Authorization: Bearer <token>` header

---

## 🤝 Contributing

Contributions are welcome and appreciated

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/yourusername/promptforge.git

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes and commit
git commit -m "feat: describe what you added"

# 5. Push to your fork


Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR. All PRs should include relevant tests.

---

## 🐛 Reporting Issues

Found a bug? Open an issue on GitHub with:
- A clear description of what happened
- Steps to reproduce it
- Expected vs actual behaviour
- Screenshots if applicable

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👥 Team



---

<p align="center">
  If PromptForge helped you write a better prompt, give it a ⭐
</p>
