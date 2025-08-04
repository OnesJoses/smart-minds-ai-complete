# Smart Minds - AI Learning Platform

A powerful AI-enhanced learning platform with free, unlimited access to advanced AI models including GPT-4o, o3, o1, and DALL-E through Puter.js.

## 🚀 Features

### 🤖 AI Assistant
- **Free OpenAI API Access** - No API keys required
- **Multiple AI Models** - GPT-4o, GPT-4.1, o3, o3-mini, o1-mini, o4-mini
- **Intelligent Tutoring** - Personalized study guidance
- **Image Generation** - Create educational diagrams with DALL-E
- **Image Analysis** - Analyze visual content with GPT-4o Vision
- **Streaming Responses** - Real-time AI responses
- **Study Planning** - AI-generated personalized study plans

### 🃏 Smart Flashcards
- **AI-Generated Cards** - Create flashcards instantly from any topic
- **Spaced Repetition** - Optimized learning schedule
- **Multiple Difficulty Levels** - Easy, Medium, Hard
- **Subject Organization** - Categorized learning materials
- **Progress Tracking** - Monitor your learning journey

### 🧠 Brain Training
- **Cognitive Exercises** - Memory, attention, and reasoning games
- **Adaptive Difficulty** - Adjusts to your skill level
- **Performance Analytics** - Track cognitive improvement

### 📚 Knowledge Hub
- **Interactive Learning** - Explore topics interactively
- **AI-Enhanced Content** - Enriched with AI insights
- **Resource Library** - Curated learning materials

### ⏱️ Focus Timer
- **Pomodoro Technique** - 25-minute focused sessions
- **Customizable Intervals** - Adapt to your needs
- **Break Reminders** - Maintain optimal productivity

### 📊 Progress Analytics
- **Learning Insights** - Detailed progress reports
- **Performance Metrics** - Track improvements over time
- **Goal Setting** - Set and achieve learning objectives

### 👥 Study Groups
- **Collaborative Learning** - Study with others
- **Shared Resources** - Exchange materials and insights
- **Group Challenges** - Competitive learning

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: Puter.js (Free OpenAI API)
- **Icons**: Lucide React

## 🔥 AI Models Available

- **GPT-4o** - Latest OpenAI model for general tasks
- **GPT-4.1** - Advanced reasoning and analysis
- **GPT-4.1-mini** - Fast, efficient responses
- **GPT-4.1-nano** - Ultra-fast processing
- **o3** - Advanced problem-solving
- **o3-mini** - Efficient reasoning
- **o1-mini** - Optimized performance
- **DALL-E** - Image generation
- **GPT-4o Vision** - Image analysis

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Smart-Minds-Interactive-Hub-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📖 Usage Examples

### AI Assistant
- **Ask questions**: "Explain quantum physics in simple terms"
- **Generate study plans**: "Create a study plan for mathematics"
- **Create flashcards**: "Generate flashcards for biology"
- **Generate images**: "Generate image: diagram of photosynthesis"

### Smart Flashcards
1. Click "AI Generate" button
2. Enter a topic (e.g., "Machine Learning Basics")
3. Select number of cards and difficulty
4. Let AI create comprehensive flashcards
5. Study with spaced repetition

## 🌟 Key Benefits

- **100% Free** - No API keys or subscriptions needed
- **No Server Required** - Pure frontend application
- **Advanced AI** - Access to latest AI models
- **Educational Focus** - Designed specifically for learning
- **Responsive Design** - Works on all devices
- **Fast Performance** - Optimized for speed

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🎯 Roadmap

- [ ] Offline mode support
- [ ] More AI model integrations
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Voice interaction capabilities

---

**Powered by Puter.js - The pioneer of the "User Pays" model for AI**

A comprehensive AI-powered learning and productivity platform built with React, TypeScript, and Tailwind CSS.

## 📁 Project Structure

```
Smart-Minds-Interactive-Hub-AI/
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── auth/               # Authentication components
│   │   ├── AIAssistant.tsx     # AI assistant component
│   │   ├── BrainTraining.tsx   # Brain training games
│   │   ├── FocusTimer.tsx      # Pomodoro timer
│   │   ├── KnowledgeHub.tsx    # Knowledge base
│   │   ├── ProgressAnalytics.tsx # Analytics dashboard
│   │   ├── SmartFlashcards.tsx # Flashcard system
│   │   └── StudyGroups.tsx     # Study group features
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   ├── pages/                  # Page components
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # App entry point
│   └── shadcn.css             # Global styles
├── index.html                  # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## ✨ Features

- **AI Assistant**: Intelligent chatbot for learning support
- **Knowledge Hub**: Centralized learning resources
- **Brain Training**: Cognitive exercises and games
- **Study Groups**: Collaborative learning features
- **Progress Analytics**: Learning progress tracking
- **Smart Flashcards**: Adaptive flashcard system
- **Focus Timer**: Pomodoro technique implementation
- **Authentication**: User sign-in and sign-up

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Animations**: Framer Motion

## 📝 Project Simplification

This project has been simplified from multiple versions into a single, clean structure:

### What was removed:
- `smart-minds-complete/` - Duplicate React version
- `smart-minds-python/` - Python Flask version
- `smart-minds-simple/` - Simple HTML version
- `agents/` - Python agents
- `scripts/` - Custom build scripts

### What was consolidated:
- Single package.json with all dependencies
- Unified build system using Vite
- All React components in one `src/` directory
- Simplified configuration files

## 🎨 Customization

The project uses Tailwind CSS for styling with custom animations and glassmorphism effects. All UI components are built with shadcn/ui for consistency and accessibility.

## 📄 License

This project is open source and available under the MIT License.
# Smart-Minds-AI-Platform
