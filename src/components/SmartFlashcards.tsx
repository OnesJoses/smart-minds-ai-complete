/**
 * Smart Flashcards Component
 * AI-generated study materials and spaced repetition system
 * Powered by Puter.js for free AI flashcard generation
 */

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Lightbulb, 
  Plus, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Brain,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  Wand2
} from 'lucide-react'
import { smartMindsAI } from '../lib/ai-service'

interface Flashcard {
  id: string
  front: string
  back: string
  subject: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  lastReviewed: Date
  nextReview: Date
  accuracy: number
  timesStudied: number
  isAIGenerated?: boolean
}

export default function SmartFlashcards() {

  const [selectedSubject, setSelectedSubject] = useState('all')
  const [studyMode, setStudyMode] = useState<'review' | 'create' | 'ai-generate' | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studyStats, setStudyStats] = useState({ correct: 0, incorrect: 0 })
  const [newCard, setNewCard] = useState({
    front: '',
    back: '',
    subject: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard'
  })
  
  // AI Generation State
  const [aiTopic, setAiTopic] = useState('')
  const [aiCount, setAiCount] = useState(5)
  const [aiDifficulty, setAiDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      front: 'What is the time complexity of binary search?',
      back: 'O(log n) - Binary search divides the search space in half with each comparison, resulting in logarithmic time complexity.',
      subject: 'Computer Science',
      difficulty: 'Medium',
      lastReviewed: new Date('2024-12-25'),
      nextReview: new Date('2024-12-28'),
      accuracy: 85,
      timesStudied: 12
    },
    {
      id: '2',
      front: 'What is photosynthesis?',
      back: 'Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.',
      subject: 'Biology',
      difficulty: 'Easy',
      lastReviewed: new Date('2024-12-26'),
      nextReview: new Date('2024-12-29'),
      accuracy: 92,
      timesStudied: 8
    },
    {
      id: '3',
      front: 'What is the derivative of sin(x)?',
      back: 'cos(x) - The derivative of sine x with respect to x is cosine x.',
      subject: 'Mathematics',
      difficulty: 'Medium',
      lastReviewed: new Date('2024-12-24'),
      nextReview: new Date('2024-12-27'),
      accuracy: 78,
      timesStudied: 15
    }
  ])

  /**
   * Generate flashcards using AI
   */
  const generateAIFlashcards = async () => {
    if (!aiTopic.trim()) return
    
    setIsGenerating(true)
    try {
      const response = await smartMindsAI.generateFlashcards(aiTopic, aiCount)
      
      // Parse the AI response to extract flashcards
      const lines = response.content.split('\n')
      const newFlashcards: Flashcard[] = []
      
      let currentCard: Partial<Flashcard> = {}
      let cardIndex = 0
      
      for (const line of lines) {
        const trimmedLine = line.trim()
        
        if (trimmedLine.startsWith('FRONT:')) {
          if (currentCard.front && currentCard.back) {
            // Save previous card
            newFlashcards.push({
              id: `ai-${Date.now()}-${cardIndex}`,
              front: currentCard.front,
              back: currentCard.back,
              subject: aiTopic,
              difficulty: aiDifficulty,
              lastReviewed: new Date(),
              nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day
              accuracy: 0,
              timesStudied: 0,
              isAIGenerated: true
            })
            cardIndex++
          }
          currentCard = { front: trimmedLine.replace('FRONT:', '').trim() }
        } else if (trimmedLine.startsWith('BACK:')) {
          currentCard.back = trimmedLine.replace('BACK:', '').trim()
        }
      }
      
      // Add the last card if it exists
      if (currentCard.front && currentCard.back) {
        newFlashcards.push({
          id: `ai-${Date.now()}-${cardIndex}`,
          front: currentCard.front,
          back: currentCard.back,
          subject: aiTopic,
          difficulty: aiDifficulty,
          lastReviewed: new Date(),
          nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
          accuracy: 0,
          timesStudied: 0,
          isAIGenerated: true
        })
      }
      
      // Add new flashcards to existing ones
      setFlashcards(prev => [...prev, ...newFlashcards])
      
      // Reset form and show success
      setAiTopic('')
      setStudyMode(null)
      
    } catch (error) {
      console.error('Failed to generate flashcards:', error)
      alert('Failed to generate flashcards. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Get unique subjects
  const subjects = ['all', ...Array.from(new Set(flashcards.map(card => card.subject)))]

  // Filter cards by subject and due for review
  const getStudyCards = () => {
    let filtered = flashcards
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === selectedSubject)
    }
    return filtered.filter(card => card.nextReview <= new Date())
  }

  const studyCards = getStudyCards()
  const currentCard = studyCards[currentCardIndex]

  /**
   * Handle answer feedback
   */
  const handleAnswer = (isCorrect: boolean) => {
    setStudyStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }))

    // Move to next card
    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      // Study session complete
      setStudyMode(null)
      setCurrentCardIndex(0)
      setShowAnswer(false)
    }
  }

  /**
   * Start study session
   */
  const startStudySession = () => {
    if (studyCards.length === 0) return
    setStudyMode('review')
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setStudyStats({ correct: 0, incorrect: 0 })
  }

  /**
   * Generate AI flashcard suggestions
   */
  const generateAICard = (topic: string) => {
    const aiSuggestions = {
      'machine learning': {
        front: 'What is overfitting in machine learning?',
        back: 'Overfitting occurs when a model learns the training data too well, including noise and outliers, leading to poor generalization on new, unseen data. It can be addressed through techniques like regularization, cross-validation, and reducing model complexity.'
      },
      'chemistry': {
        front: 'What is the difference between ionic and covalent bonds?',
        back: 'Ionic bonds form between metals and non-metals through electron transfer, creating charged ions. Covalent bonds form between non-metals through electron sharing. Ionic compounds typically have higher melting points and conduct electricity when dissolved.'
      },
      'history': {
        front: 'What were the main causes of World War I?',
        back: 'The main causes were: 1) Militarism - arms race between nations, 2) Alliances - complex web of treaties, 3) Imperialism - competition for colonies, 4) Nationalism - ethnic tensions, especially in the Balkans. The immediate trigger was the assassination of Archduke Franz Ferdinand.'
      }
    }

    const suggestion = aiSuggestions[topic.toLowerCase() as keyof typeof aiSuggestions]
    if (suggestion) {
      setNewCard({
        front: suggestion.front,
        back: suggestion.back,
        subject: topic,
        difficulty: 'Medium'
      })
    }
  }

  /**
   * Create new flashcard
   */
  const createCard = () => {
    if (!newCard.front.trim() || !newCard.back.trim()) return
    
    // In a real app, this would save to backend
    setNewCard({ front: '', back: '', subject: '', difficulty: 'Medium' })
    setStudyMode(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <span>Smart Flashcards</span>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </CardTitle>
          <CardDescription>
            AI-powered flashcards with spaced repetition for optimal learning
          </CardDescription>
        </CardHeader>
      </Card>

      {!studyMode ? (
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <TabsList className="bg-white/10">
              {subjects.map(subject => (
                <TabsTrigger key={subject} value={subject} className="capitalize">
                  {subject}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex space-x-2">
              <Button 
                onClick={startStudySession}
                disabled={studyCards.length === 0}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Brain className="h-4 w-4 mr-2" />
                Study ({studyCards.length} due)
              </Button>
              <Button 
                onClick={() => setStudyMode('create')}
                variant="outline"
                className="bg-transparent border-white/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Card
              </Button>
              <Button 
                onClick={() => setStudyMode('ai-generate')}
                variant="outline"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                AI Generate
              </Button>
            </div>
          </div>

          {subjects.map(subject => (
            <TabsContent key={subject} value={subject}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcards
                  .filter(card => subject === 'all' || card.subject === subject)
                  .map(card => (
                    <Card key={card.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-2">
                            <Badge 
                              variant="outline" 
                              className={
                                card.difficulty === 'Easy' ? 'text-green-400 border-green-400/50' :
                                card.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-400/50' :
                                'text-red-400 border-red-400/50'
                              }
                            >
                              {card.difficulty}
                            </Badge>
                            {card.isAIGenerated && (
                              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                            {card.subject}
                          </Badge>
                        </div>
                        <CardTitle className="text-sm line-clamp-2">{card.front}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-xs text-gray-400 space-y-1">
                          <div className="flex justify-between">
                            <span>Accuracy</span>
                            <span>{card.accuracy}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Times Studied</span>
                            <span>{card.timesStudied}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Next Review</span>
                            <span>{card.nextReview.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge 
                            className={
                              card.nextReview <= new Date() 
                                ? 'bg-orange-500/20 text-orange-300' 
                                : 'bg-green-500/20 text-green-300'
                            }
                          >
                            {card.nextReview <= new Date() ? 'Due Now' : 'Scheduled'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : studyMode === 'review' ? (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <span>Study Session</span>
                <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                  {currentCardIndex + 1} / {studyCards.length}
                </Badge>
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>{studyStats.correct}</span>
                </div>
                <div className="flex items-center space-x-1 text-red-400">
                  <XCircle className="h-4 w-4" />
                  <span>{studyStats.incorrect}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentCard && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {currentCard.subject}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={
                      currentCard.difficulty === 'Easy' ? 'text-green-400 border-green-400/50' :
                      currentCard.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-400/50' :
                      'text-red-400 border-red-400/50'
                    }
                  >
                    {currentCard.difficulty}
                  </Badge>
                </div>

                <Card className="bg-white/5 border-white/10 min-h-[200px] cursor-pointer" onClick={() => setShowAnswer(!showAnswer)}>
                  <CardContent className="p-8 flex items-center justify-center text-center">
                    {!showAnswer ? (
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium">{currentCard.front}</h3>
                        <div className="flex items-center justify-center text-gray-400">
                          <Eye className="h-4 w-4 mr-2" />
                          <span>Click to reveal answer</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-300 leading-relaxed">{currentCard.back}</p>
                        <div className="flex items-center justify-center text-gray-400">
                          <EyeOff className="h-4 w-4 mr-2" />
                          <span>Click to hide answer</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {showAnswer && (
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => handleAnswer(false)}
                      variant="outline"
                      className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Incorrect
                    </Button>
                    <Button 
                      onClick={() => handleAnswer(true)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Correct
                    </Button>
                  </div>
                )}

                <div className="flex justify-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="bg-transparent border-white/20"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Flip Card
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setStudyMode(null)}
                    className="bg-transparent border-white/20"
                  >
                    End Session
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : studyMode === 'create' ? (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-green-500" />
              <span>Create New Flashcard</span>
            </CardTitle>
            <CardDescription>
              Create custom flashcards manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Front (Question)</label>
                <Input
                  placeholder="Enter your question or prompt..."
                  value={newCard.front}
                  onChange={(e) => setNewCard(prev => ({ ...prev, front: e.target.value }))}
                  className="bg-white/10 border-white/20"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Back (Answer)</label>
                <textarea
                  placeholder="Enter the answer or explanation..."
                  value={newCard.back}
                  onChange={(e) => setNewCard(prev => ({ ...prev, back: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input
                    placeholder="e.g., Mathematics, Chemistry..."
                    value={newCard.subject}
                    onChange={(e) => setNewCard(prev => ({ ...prev, subject: e.target.value }))}
                    className="bg-white/10 border-white/20"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <select
                    value={newCard.difficulty}
                    onChange={(e) => setNewCard(prev => ({ ...prev, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="font-medium mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                AI Suggestions
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Machine Learning', 'Chemistry', 'History'].map(topic => (
                  <Button
                    key={topic}
                    variant="outline"
                    size="sm"
                    onClick={() => generateAICard(topic)}
                    className="bg-transparent border-white/20"
                  >
                    Generate {topic} Card
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={createCard}
                disabled={!newCard.front.trim() || !newCard.back.trim()}
                className="bg-green-500 hover:bg-green-600"
              >
                Create Flashcard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setStudyMode(null)}
                className="bg-transparent border-white/20"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : studyMode === 'ai-generate' ? (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="h-5 w-5 text-purple-500" />
              <span>AI Flashcard Generator</span>
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </CardTitle>
            <CardDescription>
              Generate intelligent flashcards using AI - powered by GPT-4o, o3, o1
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Topic or Subject</label>
                <Input
                  placeholder="e.g., Photosynthesis, Machine Learning, World War II..."
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="bg-white/10 border-white/20"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Number of Cards</label>
                  <Select value={aiCount.toString()} onValueChange={(value) => setAiCount(parseInt(value))}>
                    <SelectTrigger className="bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 cards</SelectItem>
                      <SelectItem value="5">5 cards</SelectItem>
                      <SelectItem value="10">10 cards</SelectItem>
                      <SelectItem value="15">15 cards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                  <Select value={aiDifficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setAiDifficulty(value)}>
                    <SelectTrigger className="bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-blue-300 mb-2">💡 Pro Tips for Better Results:</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Be specific with your topic (e.g., "Mitosis in cell biology" vs "biology")</li>
                  <li>• Include context if needed (e.g., "Beginner Python programming")</li>
                  <li>• Try different difficulty levels to match your learning needs</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={generateAIFlashcards}
                disabled={!aiTopic.trim() || isGenerating}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate {aiCount} Cards
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setStudyMode(null)}
                disabled={isGenerating}
                className="bg-transparent border-white/20"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}