/**
 * Smart Minds - Main Home Page Component
 * A comprehensive AI-powered learning and productivity platform
 */

import { useState } from 'react'
import styles from './Home.module.css'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import AIAssistant from '../components/AIAssistant'
import KnowledgeHub from '../components/KnowledgeHub'
import BrainTraining from '../components/BrainTraining'
import StudyGroups from '../components/StudyGroups'
import ProgressAnalytics from '../components/ProgressAnalytics'
import SmartFlashcards from '../components/SmartFlashcards'
import FocusTimer from '../components/FocusTimer'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import { 
  Brain, 
  BookOpen, 
  Users, 
  BarChart3, 
  Lightbulb, 
  Timer, 
  MessageCircle,
  Moon,
  Sun,
  Sparkles,
  Zap,
  Rocket,
  Target,
  Award,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  Crown
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'premium'
  joinDate: Date
}

export default function Home() {
  // Remove duplicate state declarations
  // Theme mode: 'default' (light/dark), 'day', 'night'
  const [themeMode, setThemeMode] = useState<'default' | 'day' | 'night'>('default')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAuthModal, setShowAuthModal] = useState<'signin' | 'signup' | null>(null)
  const [user, setUser] = useState<User | null>(null)

  /**
   * Toggle between dark and light mode
   */
  /**
   * Cycle theme mode: default -> day -> night -> default
   */
  const cycleThemeMode = () => {
    let nextMode: 'default' | 'day' | 'night' = 'default';
    if (themeMode === 'default') nextMode = 'day';
    else if (themeMode === 'day') nextMode = 'night';
    else nextMode = 'default';
    setThemeMode(nextMode);
    document.documentElement.classList.remove('dark', 'day', 'night');
    if (nextMode === 'day') document.documentElement.classList.add('day');
    else if (nextMode === 'night') document.documentElement.classList.add('night');
    else document.documentElement.classList.add('dark');
  }

  /**
   * Handle sign in
   */
  const handleSignIn = (email: string, _password: string) => {
    // Simulate successful sign in
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      avatar: 'https://pub-cdn.sider.ai/u/U0GVH7EAJYR/web-coder/68855adb94baea4807e9e8d1/resource/f21443a9-88c1-49b9-9f4d-ec6385198fe4.jpg',
      plan: 'free',
      joinDate: new Date()
    }
    setUser(mockUser)
    setShowAuthModal(null)
  }

  /**
   * Handle sign up
   */
  const handleSignUp = (name: string, email: string, _password: string) => {
    // Simulate successful sign up
    const mockUser: User = {
      id: '1',
      name,
      email,
      avatar: 'https://pub-cdn.sider.ai/u/U0GVH7EAJYR/web-coder/68855adb94baea4807e9e8d1/resource/f21443a9-88c1-49b9-9f4d-ec6385198fe4.jpg',
      plan: 'free',
      joinDate: new Date()
    }
    setUser(mockUser)
    setShowAuthModal(null)
  }

  /**
   * Handle sign out
   */
  const handleSignOut = () => {
    setUser(null)
    setActiveTab('dashboard')
  }

  return (
    <div className={styles.homeContainer}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-indigo-400/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-bounce delay-2000"></div>
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/3 w-16 h-16 border-2 border-blue-400/30 rotate-45 animate-spin spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/5 w-12 h-12 border-2 border-purple-400/30 rotate-12 animate-pulse"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/20">
                  <Brain className="h-8 w-8 text-blue-500" />
                </div>
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Smart Minds
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Learning Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Auth Section */}
              {user ? (
                <div className="flex items-center space-x-3">
                  {user?.plan === 'premium' && (
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user?.plan} Plan</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="bg-white/10 border-white/20 hover:bg-red-500/20 backdrop-blur-sm transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAuthModal('signin')}
                    className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowAuthModal('signup')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={cycleThemeMode}
                className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                title={themeMode === 'default' ? 'Switch to Day Mode' : themeMode === 'day' ? 'Switch to Night Mode' : 'Switch to Default'}
              >
                {themeMode === 'default' ? <Moon className="h-4 w-4" /> : themeMode === 'day' ? <Sun className="h-4 w-4 text-yellow-500" /> : <Sparkles className="h-4 w-4 text-purple-400" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Knowledge</span>
            </TabsTrigger>
            <TabsTrigger value="brain-training" className="flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Training</span>
            </TabsTrigger>
            <TabsTrigger value="study-groups" className="flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="focus-timer" className="flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105">
              <Timer className="h-4 w-4" />
              <span className="hidden sm:inline">Focus</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-full"></div>
              <div className="relative">
                <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Rocket className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {user ? `Welcome back, ${user?.name}!` : 'Supercharge Your Learning Journey'}
                  </span>
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  {user ? 'Your Learning Dashboard' : 'Welcome to Smart Minds'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                  {user 
                    ? 'Continue your intelligent learning journey with personalized AI assistance and advanced study tools.'
                    : 'Your AI-powered learning companion for enhanced productivity, knowledge management, and cognitive development. Transform the way you learn with cutting-edge technology and proven learning methodologies.'
                  }
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  {user ? (
                    <>
                      <Button 
                        onClick={() => setActiveTab('ai-assistant')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Continue Learning
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('brain-training')}
                        variant="outline"
                        className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm px-8 py-3 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <Brain className="h-5 w-5 mr-2" />
                        Train Your Brain
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={() => setShowAuthModal('signup')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                      >
                        <UserPlus className="h-5 w-5 mr-2" />
                        Get Started Free
                      </Button>
                      <Button 
                        onClick={() => setShowAuthModal('signin')}
                        variant="outline"
                        className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm px-8 py-3 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Sign In
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* User Welcome Card */}
            {user && (
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Welcome back, {user?.name}!</h3>
                        <p className="text-gray-300">Member since {user?.joinDate?.toLocaleDateString()}</p>
                        <Badge className="mt-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {user?.plan === 'premium' ? (
                            <>
                              <Crown className="h-3 w-3 mr-1" />
                              Premium Member
                            </>
                          ) : (
                            'Free Plan'
                          )}
                        </Badge>
                      </div>
                    </div>
                    {user?.plan === 'free' && (
                      <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: MessageCircle,
                  title: "AI Learning Assistant",
                  description: "Get personalized guidance and answers to your academic questions",
                  color: "blue",
                  tab: "ai-assistant",
                  locked: false
                },
                {
                  icon: BookOpen,
                  title: "Knowledge Hub",
                  description: "Organize your notes, ideas, and learning materials efficiently",
                  color: "green",
                  tab: "knowledge",
                  locked: !user
                },
                {
                  icon: Brain,
                  title: "Brain Training",
                  description: "Enhance cognitive abilities with scientifically designed games",
                  color: "purple",
                  tab: "brain-training",
                  locked: false
                },
                {
                  icon: Users,
                  title: "Study Groups",
                  description: "Collaborate with peers in dynamic learning communities",
                  color: "indigo",
                  tab: "study-groups",
                  locked: !user
                },
                {
                  icon: Lightbulb,
                  title: "Smart Flashcards",
                  description: "AI-generated study cards with spaced repetition algorithm",
                  color: "yellow",
                  tab: "flashcards",
                  locked: !user
                },
                {
                  icon: Timer,
                  title: "Focus Timer",
                  description: "Boost productivity with Pomodoro technique and ambient sounds",
                  color: "orange",
                  tab: "focus-timer",
                  locked: false
                }
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <Card 
                    key={feature.title}
                    className={`group bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
                      feature.locked ? 'opacity-60' : ''
                    }`}
                    onClick={() => {
                      if (feature.locked) {
                        setShowAuthModal('signup')
                      } else {
                        setActiveTab(feature.tab)
                      }
                    }}
                  >
                    {/* Animated background */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/10 to-${feature.color}-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {feature.locked && (
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-yellow-500/20 text-yellow-300 p-1 rounded-full">
                          <LogIn className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="relative z-10">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                        <span>{feature.locked ? 'Sign up to unlock' : 'Explore feature'}</span>
                        <Zap className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Active Users", value: "50K+", icon: Users, color: "blue" },
                { label: "Study Sessions", value: "1M+", icon: Target, color: "green" },
                { label: "Brain Games Played", value: "2.5M+", icon: Brain, color: "purple" },
                { label: "Success Rate", value: "94%", icon: Award, color: "yellow" }
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Icon className={`h-8 w-8 text-${stat.color}-400 mx-auto mb-3`} />
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Progress Analytics - Only show for logged in users */}
            {user && <ProgressAnalytics />}
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>

          {/* Knowledge Hub Tab */}
          <TabsContent value="knowledge">
            {user ? <KnowledgeHub /> : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center p-12">
                <CardContent>
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Sign in to Access Knowledge Hub</h3>
                  <p className="text-gray-400 mb-6">Create an account to organize your notes and learning materials</p>
                  <Button onClick={() => setShowAuthModal('signup')} className="bg-gradient-to-r from-green-500 to-blue-600">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Brain Training Tab */}
          <TabsContent value="brain-training">
            <BrainTraining />
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="study-groups">
            {user ? <StudyGroups /> : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center p-12">
                <CardContent>
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Join Study Groups</h3>
                  <p className="text-gray-400 mb-6">Sign in to collaborate with peers in learning communities</p>
                  <Button onClick={() => setShowAuthModal('signup')} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Smart Flashcards Tab */}
          <TabsContent value="flashcards">
            {user ? <SmartFlashcards /> : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center p-12">
                <CardContent>
                  <Lightbulb className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Smart Flashcards</h3>
                  <p className="text-gray-400 mb-6">Sign in to create AI-powered flashcards with spaced repetition</p>
                  <Button onClick={() => setShowAuthModal('signup')} className="bg-gradient-to-r from-yellow-500 to-orange-600">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Focus Timer Tab */}
          <TabsContent value="focus-timer">
            <FocusTimer />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Minds
              </span>
            </div>
            <p className="text-gray-400 mb-4">Empowering minds through intelligent learning</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>AI-Powered Learning</span>
              <span>•</span>
              <span>Cognitive Enhancement</span>
              <span>•</span>
              <span>Collaborative Study</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentication Modals */}
      {showAuthModal === 'signin' && (
        <SignIn
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => setShowAuthModal('signup')}
          onClose={() => setShowAuthModal(null)}
        />
      )}

      {showAuthModal === 'signup' && (
        <SignUp
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => setShowAuthModal('signin')}
          onClose={() => setShowAuthModal(null)}
        />
      )}
    </div>
  )
}
