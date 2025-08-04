/**
 * Progress Analytics Component
 * Visual learning progress tracking and analytics dashboard
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  Brain,
  BookOpen,
  Users,
  Zap
} from 'lucide-react'

export default function ProgressAnalytics() {
  // Mock data for demonstration
  const weeklyStats = [
    { day: 'Mon', studyTime: 2.5, completed: 8 },
    { day: 'Tue', studyTime: 3.2, completed: 12 },
    { day: 'Wed', studyTime: 1.8, completed: 6 },
    { day: 'Thu', studyTime: 2.9, completed: 10 },
    { day: 'Fri', studyTime: 3.5, completed: 15 },
    { day: 'Sat', studyTime: 4.2, completed: 18 },
    { day: 'Sun', studyTime: 2.1, completed: 9 }
  ]

  const subjects = [
    { name: 'Mathematics', progress: 85, hoursSpent: 24, level: 'Advanced' },
    { name: 'Computer Science', progress: 72, hoursSpent: 18, level: 'Intermediate' },
    { name: 'Physics', progress: 91, hoursSpent: 32, level: 'Expert' },
    { name: 'Chemistry', progress: 56, hoursSpent: 12, level: 'Beginner' }
  ]

  const achievements = [
    { title: 'Study Streak Master', description: '7-day study streak', icon: Award, earned: true },
    { title: 'Brain Trainer', description: 'Complete 50 brain training exercises', icon: Brain, earned: true },
    { title: 'Knowledge Collector', description: 'Create 100 notes', icon: BookOpen, earned: false },
    { title: 'Team Player', description: 'Join 5 study groups', icon: Users, earned: true },
    { title: 'Speed Learner', description: 'Complete lessons in record time', icon: Zap, earned: false }
  ]

  const totalStudyTime = weeklyStats.reduce((sum, day) => sum + day.studyTime, 0)
  const totalCompleted = weeklyStats.reduce((sum, day) => sum + day.completed, 0)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">Weekly Study Time</p>
                <p className="text-2xl font-bold text-white">{totalStudyTime.toFixed(1)}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-4">
              <Progress value={Math.min((totalStudyTime / 25) * 100, 100)} className="h-2" />
              <p className="text-xs text-blue-200 mt-1">Goal: 25h/week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-700/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-200">Tasks Completed</p>
                <p className="text-2xl font-bold text-white">{totalCompleted}</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-4">
              <Progress value={Math.min((totalCompleted / 100) * 100, 100)} className="h-2" />
              <p className="text-xs text-green-200 mt-1">Goal: 100/week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Study Streak</p>
                <p className="text-2xl font-bold text-white">12 days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
            <div className="mt-4">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Personal Best!
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-700/20 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-200">Avg. Daily Focus</p>
                <p className="text-2xl font-bold text-white">3.2h</p>
              </div>
              <Brain className="h-8 w-8 text-orange-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center text-xs text-orange-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% from last week
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="bg-white/10 backdrop-blur-md">
          <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span>Weekly Study Activity</span>
              </CardTitle>
              <CardDescription>
                Your daily study time and completed tasks this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((day) => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day.day}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-blue-400">{day.studyTime}h</span>
                        <span className="text-green-400">{day.completed} tasks</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={(day.studyTime / 5) * 100} className="h-2" />
                      <Progress value={(day.completed / 20) * 100} className="h-1 opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.name} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={
                        subject.level === 'Expert' ? 'text-purple-400 border-purple-400/50' :
                        subject.level === 'Advanced' ? 'text-blue-400 border-blue-400/50' :
                        subject.level === 'Intermediate' ? 'text-green-400 border-green-400/50' :
                        'text-orange-400 border-orange-400/50'
                      }
                    >
                      {subject.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{subject.hoursSpent} hours studied</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>On track</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Achievements & Milestones</span>
              </CardTitle>
              <CardDescription>
                Track your learning milestones and unlock achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <Card 
                      key={achievement.title} 
                      className={`border transition-colors ${
                        achievement.earned 
                          ? 'bg-yellow-500/10 border-yellow-500/30' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned 
                            ? 'bg-yellow-500/20' 
                            : 'bg-gray-500/20'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            achievement.earned 
                              ? 'text-yellow-400' 
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-medium ${
                            achievement.earned 
                              ? 'text-yellow-300' 
                              : 'text-gray-300'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            Earned!
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}