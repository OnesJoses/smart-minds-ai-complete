/**
 * Sign Up Component
 * Beautiful registration form with premium visual effects
 */

import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { 
  Brain, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles,
  Star,
  Zap,
  Shield,
  CheckCircle2
} from 'lucide-react'

interface SignUpProps {
  onSignUp: (name: string, email: string, password: string) => void
  onSwitchToSignIn: () => void
  onClose: () => void
}

export default function SignUp({ onSignUp, onSwitchToSignIn, onClose }: SignUpProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password || !agreedToTerms) return
    if (formData.password !== formData.confirmPassword) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      onSignUp(formData.name, formData.email, formData.password)
      setIsLoading(false)
    }, 2000)
  }

  /**
   * Update form field
   */
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  /**
   * Check password strength
   */
  const getPasswordStrength = () => {
    const password = formData.password
    if (password.length < 6) return { strength: 0, label: 'Too short', color: 'text-red-400' }
    if (password.length < 8) return { strength: 33, label: 'Weak', color: 'text-orange-400' }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 66, label: 'Good', color: 'text-yellow-400' }
    return { strength: 100, label: 'Strong', color: 'text-green-400' }
  }

  const passwordStrength = getPasswordStrength()
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Star className="h-3 w-3 text-purple-400/30" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10"></div>
        
        {/* Floating Orbs */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <CardHeader className="relative z-10 text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                <Brain className="h-8 w-8 text-purple-500" />
              </div>
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Join Smart Minds
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              Start your intelligent learning adventure today
            </CardDescription>
          </div>

          <div className="flex justify-center space-x-2">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Zap className="h-3 w-3 mr-1" />
              Free Forever
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-200">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Password strength</span>
                    <span className={passwordStrength.color}>{passwordStrength.label}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        passwordStrength.strength < 33 ? 'bg-red-500' :
                        passwordStrength.strength < 66 ? 'bg-orange-500' :
                        passwordStrength.strength < 100 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
                {passwordsMatch && (
                  <CheckCircle2 className="absolute right-10 top-3 h-4 w-4 text-green-400" />
                )}
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-400">Passwords don't match</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-start space-x-3 text-sm text-gray-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500/20" 
                />
                <span className="leading-5">
                  I agree to the{' '}
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto font-normal">
                    Terms of Service
                  </Button>
                  {' '}and{' '}
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto font-normal">
                    Privacy Policy
                  </Button>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email || !formData.password || !passwordsMatch || !agreedToTerms}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          <div className="text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Button
              variant="link"
              onClick={onSwitchToSignIn}
              className="text-purple-400 hover:text-purple-300 p-0 font-medium"
            >
              Sign in here
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
