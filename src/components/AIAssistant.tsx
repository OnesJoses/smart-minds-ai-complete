/**
 * AI Assistant Component
 * Interactive chat-based learning companion powered by Puter.js (Free OpenAI API)
 * Supports GPT-4o, o3, o1, DALL-E and more without API keys
 */

import { useState, useRef, useEffect } from 'react'
import { SmartMindsAI } from '../lib/ai-service'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { Send, Bot, User, Sparkles, Brain, Loader2, Settings } from 'lucide-react'
import { smartMindsAI, SmartMindsAI, AIMessage } from '../lib/ai-service'

interface Message extends AIMessage {
  id: string
  isLoading?: boolean
  isStreaming?: boolean
}

export default function AIAssistant() {
  const [aiAvailable, setAiAvailable] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI learning assistant powered by advanced AI models including GPT-4o, o3, and o1. I can help you with:\n\n🎓 **Study Planning** - Create personalized study schedules\n📚 **Learning Support** - Explain complex concepts\n🃏 **Flashcard Generation** - Create custom study materials\n🖼️ **Image Analysis** - Analyze diagrams and visual content\n🎨 **Visual Learning** - Generate educational images\n\nWhat would you like to learn about today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedModel, setSelectedModel] = useState(SmartMindsAI.MODELS.GPT_4O)
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  /**
   * Check if Puter.js is loaded
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.puter || !window.puter.ai) {
      setAiAvailable(false)
    }
  }, [])

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  /**
   * Handle sending a message to the AI
   */
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    // Add user message to chat
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

  if (!aiAvailable) {
    return (
      <Card className="max-w-2xl mx-auto my-8 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-500" /> AI Assistant
          </CardTitle>
          <CardDescription>
            <span style={{ color: 'red' }}>AI service is unavailable. Please check your connection or try again later.</span>
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }
  return (
    <Card className="max-w-2xl mx-auto my-8 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-blue-500" /> AI Assistant
        </CardTitle>
        <CardDescription>
          Powered by GPT-4o, o3, o1, DALL-E and more (no API key required)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* ...existing chat UI code... */}
      </CardContent>
    </Card>
  )
        }

        setMessages(prev => [...prev, aiResponse])
        
        // Add the image to the chat
        setTimeout(() => {
          const chatContainer = scrollAreaRef.current
          if (chatContainer && imageElement) {
            imageElement.style.maxWidth = '300px'
            imageElement.style.borderRadius = '8px'
            imageElement.style.marginTop = '8px'
            const messageDiv = chatContainer.querySelector(`[data-message-id="${aiResponse.id}"]`)
            if (messageDiv) {
              messageDiv.appendChild(imageElement)
            }
          }
        }, 100)
        
      } else if (inputMessage.toLowerCase().includes('flashcard') || 
                 inputMessage.toLowerCase().includes('study cards')) {
        
        // Generate flashcards
        const topic = inputMessage.replace(/flashcard|study cards|generate|create|make/gi, '').trim()
        const response = await smartMindsAI.generateFlashcards(topic, 5)
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.content,
          timestamp: new Date()
        }

        setMessages(prev => [...prev, aiResponse])
        
      } else {
        // Regular chat with enhanced educational context
        const systemPrompt = `You are an expert AI tutor and learning assistant. You help students learn effectively by:
        - Providing clear, accurate explanations
        - Breaking down complex concepts into understandable parts
        - Suggesting study strategies and techniques
        - Creating engaging learning content
        - Encouraging critical thinking
        - Adapting to different learning styles
        
        Always be encouraging, patient, and educational in your responses.`

        // Use streaming for longer responses
        if (inputMessage.length > 50 || inputMessage.toLowerCase().includes('explain')) {
          setIsStreaming(true)
          let streamingResponse = ''
          
          const streamingMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            isStreaming: true
          }
          
          setMessages(prev => [...prev, streamingMessage])
          
          await smartMindsAI.streamChat(
            inputMessage,
            (chunk) => {
              streamingResponse += chunk
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === streamingMessage.id 
                    ? { ...msg, content: streamingResponse }
                    : msg
                )
              )
            },
            { model: selectedModel, systemPrompt }
          )
          
          // Mark streaming as complete
          setMessages(prev => 
            prev.map(msg => 
              msg.id === streamingMessage.id 
                ? { ...msg, isStreaming: false }
                : msg
            )
          )
          setIsStreaming(false)
          
        } else {
          // Regular response for shorter queries
          const response = await smartMindsAI.chat(inputMessage, {
            model: selectedModel,
            systemPrompt
          })

          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.content,
            timestamp: new Date()
          }

          setMessages(prev => [...prev, aiResponse])
        }
      }
    } catch (error) {
      console.error('AI Assistant Error:', error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please make sure you have a stable internet connection and try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                AI Learning Assistant
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </CardTitle>
              <CardDescription>
                Powered by GPT-4o, o3, o1 • Free & Unlimited
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {selectedModel}
            </Badge>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-auto">
                <Settings className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SmartMindsAI.MODELS.GPT_4O}>GPT-4o</SelectItem>
                <SelectItem value={SmartMindsAI.MODELS.GPT_4_1}>GPT-4.1</SelectItem>
                <SelectItem value={SmartMindsAI.MODELS.O3}>o3</SelectItem>
                <SelectItem value={SmartMindsAI.MODELS.O3_MINI}>o3-mini</SelectItem>
                <SelectItem value={SmartMindsAI.MODELS.O1_MINI}>o1-mini</SelectItem>
                <SelectItem value={SmartMindsAI.MODELS.GPT_4_1_NANO}>GPT-4.1-nano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                data-message-id={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg flex gap-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white ml-4'
                      : 'bg-gray-100 dark:bg-gray-800 mr-4'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {message.role === 'assistant' && <Bot className="h-4 w-4 mt-1 text-blue-400" />}
                    {message.role === 'user' && <User className="h-4 w-4 mt-1" />}
                  </div>
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    {message.isStreaming && (
                      <div className="flex items-center gap-1 mt-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-xs opacity-70">Thinking...</span>
                      </div>
                    )}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp ? message.timestamp.toLocaleTimeString() : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about learning, request flashcards, or generate images..."
              className="flex-1"
              disabled={isLoading || isStreaming}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isLoading || isStreaming}
              size="icon"
            >
              {isLoading || isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Create a study plan for mathematics")}
              disabled={isLoading}
            >
              📚 Study Plan
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Generate flashcards for biology")}
              disabled={isLoading}
            >
              🃏 Flashcards
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Generate image: diagram of photosynthesis")}
              disabled={isLoading}
            >
              🎨 Generate Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Explain quantum physics in simple terms")}
              disabled={isLoading}
            >
              🧠 Explain Topic
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}