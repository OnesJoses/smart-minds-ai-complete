/**
 * Brain Training Component
 * Cognitive enhancement mini-games and exercises
 */

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Brain, Zap, Target, Timer, Trophy, Play, RotateCcw } from 'lucide-react'

interface GameStats {
  score: number
  bestScore: number
  gamesPlayed: number
  accuracy: number
}

export default function BrainTraining() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameStats] = useState<Record<string, GameStats>>({
    memory: { score: 0, bestScore: 850, gamesPlayed: 12, accuracy: 87 },
    attention: { score: 0, bestScore: 1200, gamesPlayed: 8, accuracy: 92 },
    logic: { score: 0, bestScore: 950, gamesPlayed: 15, accuracy: 78 }
  })

  // Memory Game State
  const [memorySequence, setMemorySequence] = useState<number[]>([])
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [showingSequence, setShowingSequence] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [level, setLevel] = useState(1)

  // Attention Game State
  const [attentionTargets, setAttentionTargets] = useState<{ id: number, x: number, y: number, isTarget: boolean }[]>([])
  const [attentionScore, setAttentionScore] = useState(0)
  const [attentionTimeLeft, setAttentionTimeLeft] = useState(30)

  // Logic Game State
  const [logicPuzzle, setLogicPuzzle] = useState<{ question: string, options: string[], correct: number } | null>(null)
  const [logicScore, setLogicScore] = useState(0)

  /**
   * Generate memory sequence
   */
  const generateMemorySequence = () => {
    const sequence = []
    for (let i = 0; i < level + 2; i++) {
      sequence.push(Math.floor(Math.random() * 9))
    }
    setMemorySequence(sequence)
    setUserSequence([])
    showSequence(sequence)
  }

  /**
   * Show memory sequence to user
   */
  const showSequence = (sequence: number[]) => {
    setShowingSequence(true)
    sequence.forEach((_, index) => {
      setTimeout(() => {
        // Flash the number (visual feedback would be implemented here)
        if (index === sequence.length - 1) {
          setTimeout(() => setShowingSequence(false), 500)
        }
      }, index * 800)
    })
  }

  /**
   * Handle memory game input
   */
  const handleMemoryInput = (num: number) => {
    if (showingSequence) return
    
    const newUserSequence = [...userSequence, num]
    setUserSequence(newUserSequence)

    if (newUserSequence.length === memorySequence.length) {
      const correct = newUserSequence.every((val, idx) => val === memorySequence[idx])
      if (correct) {
        setLevel(prev => prev + 1)
        setTimeout(() => generateMemorySequence(), 1000)
      } else {
        // Game over
        setGameActive(false)
        setLevel(1)
      }
    }
  }

  /**
   * Start memory game
   */
  const startMemoryGame = () => {
    setGameActive(true)
    setLevel(1)
    generateMemorySequence()
  }

  /**
   * Generate attention targets
   */
  const generateAttentionTargets = () => {
    const targets = []
    for (let i = 0; i < 15; i++) {
      targets.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        isTarget: Math.random() > 0.7 // 30% chance of being a target
      })
    }
    setAttentionTargets(targets)
  }

  /**
   * Handle attention game click
   */
  const handleAttentionClick = (target: typeof attentionTargets[0]) => {
    if (target.isTarget) {
      setAttentionScore(prev => prev + 10)
    } else {
      setAttentionScore(prev => Math.max(0, prev - 5))
    }
    
    // Remove clicked target
    setAttentionTargets(prev => prev.filter(t => t.id !== target.id))
  }

  /**
   * Start attention game
   */
  const startAttentionGame = () => {
    setAttentionScore(0)
    setAttentionTimeLeft(30)
    generateAttentionTargets()
    
    const timer = setInterval(() => {
      setAttentionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  /**
   * Generate logic puzzle
   */
  const generateLogicPuzzle = () => {
    const puzzles = [
      {
        question: "If all roses are flowers and some flowers are red, which statement must be true?",
        options: ["All roses are red", "Some roses are red", "Some roses might be red", "No roses are red"],
        correct: 2
      },
      {
        question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "44", "46"],
        correct: 1
      },
      {
        question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        options: ["100 minutes", "20 minutes", "5 minutes", "1 minute"],
        correct: 2
      }
    ]
    
    setLogicPuzzle(puzzles[Math.floor(Math.random() * puzzles.length)])
  }

  /**
   * Handle logic puzzle answer
   */
  const handleLogicAnswer = (selectedOption: number) => {
    if (logicPuzzle && selectedOption === logicPuzzle.correct) {
      setLogicScore(prev => prev + 100)
    }
    setTimeout(() => generateLogicPuzzle(), 1500)
  }

  const games = [
    {
      id: 'memory',
      title: 'Memory Matrix',
      description: 'Remember and repeat sequences to improve working memory',
      icon: Brain,
      color: 'blue',
      difficulty: 'Medium'
    },
    {
      id: 'attention',
      title: 'Focus Target',
      description: 'Quickly identify and click targets to enhance attention',
      icon: Target,
      color: 'green',
      difficulty: 'Easy'
    },
    {
      id: 'logic',
      title: 'Logic Puzzles',
      description: 'Solve reasoning problems to boost analytical thinking',
      icon: Zap,
      color: 'purple',
      difficulty: 'Hard'
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {!selectedGame ? (
        <>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-purple-500" />
                <span>Brain Training Center</span>
                <Trophy className="h-5 w-5 text-yellow-400" />
              </CardTitle>
              <CardDescription>
                Enhance your cognitive abilities with scientifically designed brain training exercises
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {games.map((game) => {
              const Icon = game.icon
              const stats = gameStats[game.id]
              
              return (
                <Card key={game.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className={`h-8 w-8 text-${game.color}-500`} />
                      <Badge variant="outline" className={`text-${game.color}-400 border-${game.color}-400/50`}>
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle>{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Best Score</span>
                        <span className="font-mono">{stats.bestScore}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Games Played</span>
                        <span>{stats.gamesPlayed}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span>{stats.accuracy}%</span>
                      </div>
                      <Progress value={stats.accuracy} className="h-2" />
                    </div>
                    <Button 
                      onClick={() => setSelectedGame(game.id)} 
                      className={`w-full bg-${game.color}-500 hover:bg-${game.color}-600`}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Training
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      ) : (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-purple-500" />
                <span>{games.find(g => g.id === selectedGame)?.title}</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setSelectedGame(null)}
                className="bg-transparent border-white/20"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedGame === 'memory' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Memory Matrix - Level {level}</h3>
                  <p className="text-gray-400">Watch the sequence, then repeat it by clicking the numbers</p>
                </div>
                
                {!gameActive ? (
                  <div className="text-center">
                    <Button onClick={startMemoryGame} className="bg-blue-500 hover:bg-blue-600">
                      <Play className="h-4 w-4 mr-2" />
                      Start Memory Game
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <Button
                          key={num}
                          onClick={() => handleMemoryInput(num)}
                          disabled={showingSequence}
                          className={`aspect-square text-lg font-bold ${
                            showingSequence && memorySequence.includes(num) 
                              ? 'bg-yellow-500' 
                              : 'bg-white/20 hover:bg-white/30'
                          }`}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">
                        {showingSequence ? 'Watch the sequence...' : `Click ${userSequence.length + 1} of ${memorySequence.length}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedGame === 'attention' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Focus Target</h3>
                  <p className="text-gray-400">Click only the blue targets, avoid the red distractors</p>
                  <div className="flex justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Timer className="h-4 w-4" />
                      <span>{attentionTimeLeft}s</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>{attentionScore}</span>
                    </div>
                  </div>
                </div>

                {attentionTargets.length === 0 ? (
                  <div className="text-center">
                    <Button onClick={startAttentionGame} className="bg-green-500 hover:bg-green-600">
                      <Play className="h-4 w-4 mr-2" />
                      Start Attention Game
                    </Button>
                  </div>
                ) : (
                  <div className="relative bg-white/5 rounded-lg h-96 overflow-hidden">
                    {attentionTargets.map((target) => (
                      <button
                        key={target.id}
                        onClick={() => handleAttentionClick(target)}
                        className={`absolute w-6 h-6 rounded-full ${
                          target.isTarget ? 'bg-blue-500' : 'bg-red-500'
                        } hover:scale-110 transition-transform`}
                        style={{
                          left: `${target.x}%`,
                          top: `${target.y}%`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedGame === 'logic' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Logic Puzzles</h3>
                  <p className="text-gray-400">Test your reasoning and analytical thinking skills</p>
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>Score: {logicScore}</span>
                    </div>
                  </div>
                </div>

                {!logicPuzzle ? (
                  <div className="text-center">
                    <Button onClick={generateLogicPuzzle} className="bg-purple-500 hover:bg-purple-600">
                      <Play className="h-4 w-4 mr-2" />
                      Start Logic Challenge
                    </Button>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto space-y-4">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="pt-6">
                        <h4 className="text-lg font-medium mb-4">{logicPuzzle.question}</h4>
                        <div className="space-y-2">
                          {logicPuzzle.options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleLogicAnswer(index)}
                              variant="outline"
                              className="w-full text-left justify-start bg-transparent border-white/20 hover:bg-white/10"
                            >
                              {String.fromCharCode(65 + index)}. {option}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}