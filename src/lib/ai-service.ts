// AI Service powered by Puter.js - Free OpenAI API access
// This service provides access to GPT-4o, o3, o1, DALL-E and more without API keys

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string, options?: { model?: string; stream?: boolean } | string) => Promise<any>;
        txt2img: (prompt: string, options?: any) => Promise<HTMLImageElement>;
      };
      print: (content: string) => void;
    };
  }
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    tokens: number;
  };
}

export class SmartMindsAI {
  private static instance: SmartMindsAI;
  private conversationHistory: AIMessage[] = [];
  
  // Available models
  public static readonly MODELS = {
    GPT_4_1: 'gpt-4.1',
    GPT_4_1_MINI: 'gpt-4.1-mini', 
    GPT_4_1_NANO: 'gpt-4.1-nano',
    GPT_4_5_PREVIEW: 'gpt-4.5-preview',
    GPT_4O: 'gpt-4o',
    GPT_4O_MINI: 'gpt-4o-mini',
    O1: 'o1',
    O1_MINI: 'o1-mini',
    O1_PRO: 'o1-pro',
    O3: 'o3',
    O3_MINI: 'o3-mini',
    O4_MINI: 'o4-mini'
  };

  private constructor() {}

  public static getInstance(): SmartMindsAI {
    if (!SmartMindsAI.instance) {
      SmartMindsAI.instance = new SmartMindsAI();
    }
    return SmartMindsAI.instance;
  }

  /**
   * Check if Puter.js is loaded and available
   */
  private isPuterAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.puter && !!window.puter.ai;
  }

  /**
   * Chat with AI using various models
   */
  async chat(
    message: string, 
    options: {
      model?: string;
      stream?: boolean;
      systemPrompt?: string;
      context?: string;
    } = {}
  ): Promise<AIResponse> {
    if (!this.isPuterAvailable()) {
      throw new Error('Puter.js is not loaded. Please ensure the script is included in your HTML.');
    }

    const { 
      model = SmartMindsAI.MODELS.GPT_4O, 
      stream = false,
      systemPrompt = '',
      context = ''
    } = options;

    // Build the enhanced prompt with context
    let enhancedMessage = message;
    if (systemPrompt) {
      enhancedMessage = `${systemPrompt}\n\n${message}`;
    }
    if (context) {
      enhancedMessage = `Context: ${context}\n\n${enhancedMessage}`;
    }

    try {
      const response = await window.puter.ai.chat(enhancedMessage, { model, stream });
      
      // Add to conversation history
      this.conversationHistory.push(
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'assistant', content: response, timestamp: new Date() }
      );

      return {
        content: response,
        model,
        usage: { tokens: response.length } // Approximate token count
      };
    } catch (error) {
      console.error('AI Chat Error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  /**
   * Stream chat responses for longer conversations
   */
  async streamChat(
    message: string,
    onChunk: (chunk: string) => void,
    options: { model?: string; systemPrompt?: string } = {}
  ): Promise<void> {
    if (!this.isPuterAvailable()) {
      throw new Error('Puter.js is not loaded.');
    }

    const { model = SmartMindsAI.MODELS.GPT_4O, systemPrompt = '' } = options;
    
    let enhancedMessage = message;
    if (systemPrompt) {
      enhancedMessage = `${systemPrompt}\n\n${message}`;
    }

    try {
      const response = await window.puter.ai.chat(enhancedMessage, { model, stream: true });
      
      let fullResponse = '';
      for await (const part of response) {
        if (part?.text) {
          fullResponse += part.text;
          onChunk(part.text);
        }
      }

      // Add to conversation history
      this.conversationHistory.push(
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'assistant', content: fullResponse, timestamp: new Date() }
      );
    } catch (error) {
      console.error('AI Stream Error:', error);
      throw new Error('Failed to stream AI response.');
    }
  }

  /**
   * Generate images using DALL-E
   */
  async generateImage(prompt: string): Promise<HTMLImageElement> {
    if (!this.isPuterAvailable()) {
      throw new Error('Puter.js is not loaded.');
    }

    try {
      const imageElement = await window.puter.ai.txt2img(prompt);
      return imageElement;
    } catch (error) {
      console.error('Image Generation Error:', error);
      throw new Error('Failed to generate image. Please try again.');
    }
  }

  /**
   * Analyze images with GPT-4o Vision
   */
  async analyzeImage(imageUrl: string, question: string = "What do you see in this image?"): Promise<AIResponse> {
    if (!this.isPuterAvailable()) {
      throw new Error('Puter.js is not loaded.');
    }

    try {
      const response = await window.puter.ai.chat(question, imageUrl);
      
      return {
        content: response,
        model: 'gpt-4o-vision',
        usage: { tokens: response.length }
      };
    } catch (error) {
      console.error('Image Analysis Error:', error);
      throw new Error('Failed to analyze image.');
    }
  }

  /**
   * Get study recommendations based on user data
   */
  async getStudyRecommendations(
    subject: string, 
    level: string, 
    goals: string[],
    timeAvailable: number
  ): Promise<AIResponse> {
    const systemPrompt = `You are an expert educational AI tutor. Provide personalized study recommendations based on the user's subject, level, goals, and available time. Be specific and actionable.`;
    
    const message = `
Subject: ${subject}
Level: ${level}
Goals: ${goals.join(', ')}
Time Available: ${timeAvailable} minutes

Please provide a detailed study plan with:
1. Prioritized topics to focus on
2. Specific study techniques
3. Time allocation for each topic
4. Resources or materials to use
5. Practice exercises or activities
6. Progress tracking suggestions
    `;

    return this.chat(message, { 
      model: SmartMindsAI.MODELS.GPT_4_1,
      systemPrompt 
    });
  }

  /**
   * Generate flashcards for a topic
   */
  async generateFlashcards(topic: string, count: number = 10): Promise<AIResponse> {
    const systemPrompt = `Generate ${count} high-quality flashcards for the topic "${topic}". Format each flashcard as:
FRONT: [Question or concept]
BACK: [Answer or explanation]

Make them challenging but fair, covering key concepts, definitions, and applications.`;

    return this.chat(`Create ${count} flashcards about ${topic}`, {
      model: SmartMindsAI.MODELS.GPT_4O,
      systemPrompt
    });
  }

  /**
   * Get conversation history
   */
  getConversationHistory(): AIMessage[] {
    return [...this.conversationHistory];
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get available models
   */
  getAvailableModels(): string[] {
    return Object.values(SmartMindsAI.MODELS);
  }
}

// Export singleton instance
export const smartMindsAI = SmartMindsAI.getInstance();
