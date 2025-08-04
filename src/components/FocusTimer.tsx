/**
 * Focus Timer Component
 * Pomodoro technique with productivity tracking and ambient sounds
 */

import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Slider } from './ui/slider'
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Target,
  Volume2,
  VolumeX,
  Settings,
  TrendingUp,
  Calendar
} from 'lucide-react'

interface PomodoroSession {
  id: string
  date: Date
  duration: number
  completed: boolean
  task: string
}

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work')
  const [sessions, setSessions] = useState<PomodoroSession[]>([
    {
      id: '1',
      date: new Date('2024-12-26T14:30:00'),
      duration: 25 * 60,
      completed: true,
      task: 'Study Mathematics - Calculus'
    },
    {
      id: '2',
      date: new Date('2024-12-26T15:00:00'),
      duration: 25 * 60,
      completed: true,
      task: 'Review Computer Science Notes'
    },
    {
      id: '3',
      date: new Date('2024-12-26T16:30:00'),
      duration: 25 * 60,
      completed: false,
      task: 'Practice Brain Training'
    }
  ])
  
  const [currentTask, setCurrentTask] = useState('')
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    soundEnabled: true,
    soundVolume: 50
  })
  
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Timer durations in seconds
  const durations = {
    work: settings.workDuration * 60,
    shortBreak: settings.shortBreakDuration * 60,
    longBreak: settings.longBreakDuration * 60
  }

  /**
   * Start or pause the timer
   */
  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  /**
   * Reset the current timer
   */
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(durations[mode])
  }

  /**
   * Switch timer mode
   */
  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode)
    setTimeLeft(durations[newMode])
    setIsRunning(false)
  }

  /**
   * Complete current session
   */
  const completeSession = () => {
    if (mode === 'work') {
      const newSession: PomodoroSession = {
        id: Date.now().toString(),
        date: new Date(),
        duration: durations[mode],
        completed: true,
        task: currentTask || 'Focus Session'
      }
      setSessions(prev => [newSession, ...prev])
      setCompletedPomodoros(prev => prev + 1)
      
      // Auto-switch to break
      const shouldTakeLongBreak = (completedPomodoros + 1) % settings.longBreakInterval === 0
      switchMode(shouldTakeLongBreak ? 'longBreak' : 'shortBreak')
    } else {
      // Break completed, switch to work
      switchMode('work')
    }
    setCurrentTask('')
  }

  // Timer effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            completeSession()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  /**
   * Format time as MM:SS
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  /**
   * Get progress percentage
   */
  const getProgress = () => {
    const total = durations[mode]
    return ((total - timeLeft) / total) * 100
  }

  /**
   * Get today's completed sessions
   */
  const getTodaysSessions = () => {
    const today = new Date().toDateString()
    return sessions.filter(session => session.date.toDateString() === today)
  }

  const todaysSessions = getTodaysSessions()
  const todaysCompleted = todaysSessions.filter(s => s.completed).length

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Timer className="h-6 w-6 text-orange-500" />
              <span>Focus Timer</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="bg-transparent border-white/20"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>
            Boost productivity with the Pomodoro Technique and focus tracking
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Timer */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Mode Selector */}
                <div className="flex justify-center space-x-2">
                  <Button
                    variant={mode === 'work' ? 'default' : 'outline'}
                    onClick={() => switchMode('work')}
                    className={mode === 'work' ? 'bg-red-500 hover:bg-red-600' : 'bg-transparent border-white/20'}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Work
                  </Button>
                  <Button
                    variant={mode === 'shortBreak' ? 'default' : 'outline'}
                    onClick={() => switchMode('shortBreak')}
                    className={mode === 'shortBreak' ? 'bg-green-500 hover:bg-green-600' : 'bg-transparent border-white/20'}
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Short Break
                  </Button>
                  <Button
                    variant={mode === 'longBreak' ? 'default' : 'outline'}
                    onClick={() => switchMode('longBreak')}
                    className={mode === 'longBreak' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-transparent border-white/20'}
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Long Break
                  </Button>
                </div>

                {/* Timer Display */}
                <div className="space-y-4">
                  <div className="text-8xl font-mono font-bold text-white tracking-tight">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress value={getProgress()} className="h-3" />
                  <Badge 
                    className={
                      mode === 'work' ? 'bg-red-500/20 text-red-300' :
                      mode === 'shortBreak' ? 'bg-green-500/20 text-green-300' :
                      'bg-blue-500/20 text-blue-300'
                    }
                  >
                    {mode === 'work' ? '🎯 Focus Time' : 
                     mode === 'shortBreak' ? '☕ Short Break' : 
                     '🌟 Long Break'}
                  </Badge>
                </div>

                {/* Current Task Input */}
                {mode === 'work' && (
                  <div className="max-w-md mx-auto">
                    <input
                      type="text"
                      placeholder="What are you working on?"
                      value={currentTask}
                      onChange={(e) => setCurrentTask(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    className={
                      mode === 'work' ? 'bg-red-500 hover:bg-red-600' :
                      mode === 'shortBreak' ? 'bg-green-500 hover:bg-green-600' :
                      'bg-blue-500 hover:bg-blue-600'
                    }
                  >
                    {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetTimer}
                    size="lg"
                    className="bg-transparent border-white/20"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ambient Sounds */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5" />
                <span>Ambient Sounds</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'Rain', emoji: '🌧️' },
                  { name: 'Forest', emoji: '🌲' },
                  { name: 'Ocean', emoji: '🌊' },
                  { name: 'Fireplace', emoji: '🔥' }
                ].map((sound) => (
                  <Button
                    key={sound.name}
                    variant="outline"
                    className="h-16 bg-transparent border-white/20 hover:bg-white/10 flex-col"
                  >
                    <span className="text-2xl mb-1">{sound.emoji}</span>
                    <span className="text-xs">{sound.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & History */}
        <div className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Today's Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{todaysCompleted}</div>
                <div className="text-sm text-gray-400">Completed Sessions</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Goal</span>
                  <span>{todaysCompleted}/8</span>
                </div>
                <Progress value={Math.min((todaysCompleted / 8) * 100, 100)} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-xl font-semibold text-orange-400">
                    {Math.floor(todaysSessions.reduce((sum, s) => sum + s.duration, 0) / 60)}m
                  </div>
                  <div className="text-xs text-gray-400">Focus Time</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-blue-400">{completedPomodoros}</div>
                  <div className="text-xs text-gray-400">Total Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Recent Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm line-clamp-1">
                        {session.task}
                      </div>
                      <div className="text-xs text-gray-400">
                        {session.date.toLocaleTimeString()} • {session.duration / 60}min
                      </div>
                    </div>
                    <Badge 
                      className={
                        session.completed 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-orange-500/20 text-orange-300'
                      }
                    >
                      {session.completed ? '✓' : '○'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle>Timer Settings</CardTitle>
            <CardDescription>Customize your Pomodoro experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Work Duration (minutes)</label>
                <Slider
                  value={[settings.workDuration]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, workDuration: value[0] }))}
                  max={60}
                  min={5}
                  step={5}
                />
                <div className="text-center text-sm text-gray-400">{settings.workDuration} minutes</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Short Break (minutes)</label>
                <Slider
                  value={[settings.shortBreakDuration]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, shortBreakDuration: value[0] }))}
                  max={15}
                  min={1}
                  step={1}
                />
                <div className="text-center text-sm text-gray-400">{settings.shortBreakDuration} minutes</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Long Break (minutes)</label>
                <Slider
                  value={[settings.longBreakDuration]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, longBreakDuration: value[0] }))}
                  max={30}
                  min={10}
                  step={5}
                />
                <div className="text-center text-sm text-gray-400">{settings.longBreakDuration} minutes</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sound Notifications</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                className="bg-transparent border-white/20"
              >
                {settings.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}