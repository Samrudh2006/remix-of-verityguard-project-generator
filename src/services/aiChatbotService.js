/**
 * AI Chatbot Service
 * Handles conversational AI for news verification and user assistance
 */

import { aiVerificationService } from './aiVerificationService';
import { newsApiService } from './newsApiService';

class AIChatbotService {
  constructor() {
    this.conversationHistory = new Map();
    this.maxHistoryLength = 10;
    this.systemPrompt = `You are VerityBot, an AI assistant specialized in news verification and fact-checking. 

Your capabilities:
- Verify news articles, claims, and social media posts
- Explain fact-checking methodology
- Provide source credibility analysis
- Help users understand media literacy
- Answer questions about current events
- Guide users through the verification process

Always be helpful, accurate, and encourage critical thinking. When users ask you to verify content, use the verification tools available to provide detailed analysis.`;
  }

  /**
   * Process user message and generate response
   */
  async processMessage(userId, message, context = {}) {
    try {
      // Get or create conversation history
      const history = this.getConversationHistory(userId);
      
      // Add user message to history
      history.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      });

      // Detect intent and generate response
      const intent = this.detectIntent(message);
      const response = await this.generateResponse(intent, message, history, context);
      
      // Add bot response to history
      history.push({
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toISOString(),
        intent: intent.type,
        actions: response.actions || []
      });

      // Update conversation history
      this.updateConversationHistory(userId, history);

      return {
        text: response.text,
        intent: intent.type,
        confidence: intent.confidence,
        actions: response.actions || [],
        suggestions: response.suggestions || [],
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Chatbot processing error:', error);
      return {
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        intent: 'error',
        confidence: 0,
        actions: [],
        suggestions: ['Try rephrasing your question', 'Check your internet connection'],
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Detect user intent from message
   */
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Verification requests
    if (this.containsAny(lowerMessage, ['verify', 'check', 'fact check', 'is this true', 'real or fake'])) {
      return { type: 'verification_request', confidence: 0.9 };
    }
    
    // URL verification
    if (this.containsUrl(message)) {
      return { type: 'url_verification', confidence: 0.95 };
    }
    
    // News search
    if (this.containsAny(lowerMessage, ['news about', 'latest news', 'find news', 'search news'])) {
      return { type: 'news_search', confidence: 0.8 };
    }
    
    // Source credibility
    if (this.containsAny(lowerMessage, ['source', 'credible', 'reliable', 'trustworthy'])) {
      return { type: 'source_inquiry', confidence: 0.7 };
    }
    
    // How-to questions
    if (this.containsAny(lowerMessage, ['how to', 'how do i', 'how can i', 'what is'])) {
      return { type: 'how_to', confidence: 0.6 };
    }
    
    // Greeting
    if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon'])) {
      return { type: 'greeting', confidence: 0.9 };
    }
    
    // General question
    return { type: 'general_question', confidence: 0.5 };
  }

  /**
   * Generate response based on intent
   */
  async generateResponse(intent, message, history, context) {
    switch (intent.type) {
      case 'verification_request':
        return await this.handleVerificationRequest(message, context);
      
      case 'url_verification':
        return await this.handleUrlVerification(message);
      
      case 'news_search':
        return await this.handleNewsSearch(message);
      
      case 'source_inquiry':
        return this.handleSourceInquiry(message);
      
      case 'how_to':
        return this.handleHowToQuestion(message);
      
      case 'greeting':
        return this.handleGreeting();
      
      case 'general_question':
        return await this.handleGeneralQuestion(message, history);
      
      default:
        return this.handleUnknownIntent(message);
    }
  }

  /**
   * Handle verification requests
   */
  async handleVerificationRequest(message, context) {
    try {
      // Extract content to verify from message
      const contentToVerify = this.extractContentFromMessage(message);
      
      if (!contentToVerify) {
        return {
          text: "I'd be happy to help verify content for you! Please share:\n\n• A news article URL\n• Text you want me to fact-check\n• A claim you've heard\n\nI'll analyze it using multiple sources and AI verification tools.",
          suggestions: [
            "Paste a news URL here",
            "Share a text claim to verify",
            "How does verification work?"
          ]
        };
      }

      // Perform verification
      const verificationResult = await aiVerificationService.verifyContent(contentToVerify);
      
      return {
        text: this.formatVerificationResponse(verificationResult),
        actions: [{
          type: 'verification_complete',
          data: verificationResult
        }],
        suggestions: [
          "Tell me more about the sources",
          "How accurate is this analysis?",
          "Verify another article"
        ]
      };

    } catch (error) {
      return {
        text: "I encountered an issue while verifying that content. Please try again or share the content in a different format.",
        suggestions: ["Try a different URL", "Share text instead", "Contact support"]
      };
    }
  }

  /**
   * Handle URL verification
   */
  async handleUrlVerification(message) {
    const urls = this.extractUrls(message);
    
    if (urls.length === 0) {
      return {
        text: "I don't see a valid URL in your message. Please share a complete URL starting with http:// or https://",
        suggestions: ["Paste the full URL", "Copy link from browser", "Try a different format"]
      };
    }

    const url = urls[0]; // Verify first URL
    
    try {
      const verificationResult = await aiVerificationService.verifyContent(url);
      
      return {
        text: `🔍 **URL Verification Complete**\n\n${this.formatVerificationResponse(verificationResult)}`,
        actions: [{
          type: 'url_verified',
          data: { url, result: verificationResult }
        }],
        suggestions: [
          "Check another URL",
          "Explain the methodology",
          "Find similar articles"
        ]
      };

    } catch (error) {
      return {
        text: `I had trouble accessing that URL. This could be due to:\n\n• The site blocking automated access\n• Network connectivity issues\n• The URL being invalid\n\nTry copying the article text instead, and I'll verify that for you.`,
        suggestions: ["Copy article text", "Try a different URL", "Check the link"]
      };
    }
  }

  /**
   * Handle news search requests
   */
  async handleNewsSearch(message) {
    const searchQuery = this.extractSearchQuery(message);
    
    if (!searchQuery) {
      return {
        text: "What topic would you like me to search for? I can find recent news articles and verify their credibility.",
        suggestions: ["Climate change news", "Technology updates", "Local news"]
      };
    }

    try {
      const searchResults = await newsApiService.searchNews(searchQuery, { pageSize: 5 });
      
      if (searchResults.articles.length === 0) {
        return {
          text: `I couldn't find recent news about "${searchQuery}". Try:\n\n• Different keywords\n• Broader search terms\n• Checking spelling`,
          suggestions: ["Try different keywords", "Search trending topics", "Browse categories"]
        };
      }

      const formattedResults = this.formatNewsSearchResults(searchResults.articles);
      
      return {
        text: `📰 **Found ${searchResults.articles.length} articles about "${searchQuery}":**\n\n${formattedResults}`,
        actions: [{
          type: 'news_search_results',
          data: { query: searchQuery, results: searchResults.articles }
        }],
        suggestions: [
          "Verify one of these articles",
          "Search for something else",
          "Get trending topics"
        ]
      };

    } catch (error) {
      return {
        text: "I'm having trouble searching for news right now. Please try again in a moment.",
        suggestions: ["Try again later", "Browse trending topics", "Check specific sources"]
      };
    }
  }

  /**
   * Handle source credibility inquiries
   */
  handleSourceInquiry(message) {
    const sourceName = this.extractSourceName(message);
    
    if (!sourceName) {
      return {
        text: "I can help you evaluate news source credibility! Which source would you like me to analyze?\n\nI consider factors like:\n• Editorial standards\n• Fact-checking history\n• Bias ratings\n• Transparency\n• Expert reputation",
        suggestions: ["BBC credibility", "CNN reliability", "How to check sources"]
      };
    }

    const credibilityInfo = this.getSourceCredibilityInfo(sourceName);
    
    return {
      text: credibilityInfo,
      suggestions: [
        "Check another source",
        "Learn about media bias",
        "Verify an article"
      ]
    };
  }

  /**
   * Handle how-to questions
   */
  handleHowToQuestion(message) {
    const lowerMessage = message.toLowerCase();
    
    if (this.containsAny(lowerMessage, ['verify', 'fact check', 'check news'])) {
      return {
        text: "🎯 **How to Verify News:**\n\n1. **Check the Source** - Is it a reputable news organization?\n2. **Look for Evidence** - Are claims backed by data or expert quotes?\n3. **Cross-Reference** - Do other reliable sources report the same?\n4. **Check Dates** - Is the information current?\n5. **Verify Images** - Use reverse image search\n6. **Use VerityGuard** - Let our AI help analyze credibility!\n\nWant me to verify something specific?",
        suggestions: [
          "Verify a news article",
          "Check source credibility",
          "Learn about bias detection"
        ]
      };
    }
    
    if (this.containsAny(lowerMessage, ['detect', 'spot', 'identify', 'fake news'])) {
      return {
        text: "🚨 **How to Spot Fake News:**\n\n• **Sensational Headlines** - Excessive caps, emotional language\n• **Poor Quality** - Spelling errors, bad grammar\n• **Missing Sources** - No author, publication date, or references\n• **Extreme Bias** - One-sided reporting without balance\n• **Suspicious URLs** - Mimic real news sites with slight changes\n• **Emotional Manipulation** - Designed to make you angry or scared\n\nAlways verify before sharing!",
        suggestions: [
          "Verify suspicious content",
          "Check a specific article",
          "Learn about media literacy"
        ]
      };
    }
    
    return {
      text: "I can help you learn about news verification, fact-checking, source evaluation, and media literacy. What specific topic interests you?",
      suggestions: [
        "How to verify news",
        "How to spot fake news",
        "How to check sources"
      ]
    };
  }

  /**
   * Handle greetings
   */
  handleGreeting() {
    const greetings = [
      "Hello! I'm VerityBot, your AI fact-checking assistant. I can help you verify news, check sources, and answer questions about media literacy. What would you like to verify today?",
      "Hi there! I'm here to help you navigate the world of news and information. Share a link, ask about a claim, or let me know how I can assist with fact-checking!",
      "Welcome! I'm VerityBot, specialized in news verification and fact-checking. Feel free to share any content you'd like me to analyze or ask questions about media credibility."
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    return {
      text: randomGreeting,
      suggestions: [
        "Verify a news article",
        "Check source credibility",
        "How does fact-checking work?",
        "Show me trending news"
      ]
    };
  }

  /**
   * Handle general questions
   */
  async handleGeneralQuestion(message, history) {
    // Mock AI response - replace with real AI service
    const responses = [
      "That's an interesting question! While I specialize in news verification and fact-checking, I'd be happy to help you find reliable sources about this topic. Would you like me to search for recent news articles?",
      "I focus on helping with news verification and media literacy. For the best answer to your question, I'd recommend checking with verified news sources or fact-checking organizations. Can I help you find credible sources?",
      "While I'm designed primarily for fact-checking and news verification, I can help you find reliable information sources. Would you like me to search for verified news about this topic?"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      text: randomResponse,
      suggestions: [
        "Search for news about this",
        "Find reliable sources",
        "Verify a specific claim"
      ]
    };
  }

  /**
   * Handle unknown intents
   */
  handleUnknownIntent(message) {
    return {
      text: "I'm not sure I understand. I'm specialized in news verification and fact-checking. Here's what I can help with:\n\n• Verify news articles and claims\n• Check source credibility\n• Explain fact-checking methods\n• Search for reliable news\n• Detect misinformation patterns\n\nWhat would you like to verify or learn about?",
      suggestions: [
        "Verify a news article",
        "Check if something is true",
        "How to spot fake news",
        "Search for news"
      ]
    };
  }

  /**
   * Utility methods
   */
  containsAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }

  containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  }

  extractUrls(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  }

  extractContentFromMessage(message) {
    // Extract URLs
    const urls = this.extractUrls(message);
    if (urls.length > 0) {
      return urls[0];
    }
    
    // Extract quoted text
    const quotedText = message.match(/"([^"]+)"/);
    if (quotedText) {
      return quotedText[1];
    }
    
    // Return the message itself if it seems like a claim
    if (message.length > 20 && !message.toLowerCase().startsWith('verify')) {
      return message;
    }
    
    return null;
  }

  extractSearchQuery(message) {
    const patterns = [
      /news about (.+)/i,
      /search (?:for )?(.+)/i,
      /find (?:news about )?(.+)/i,
      /latest (?:news )?(?:on )?(.+)/i
    ];
    
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return null;
  }

  extractSourceName(message) {
    const patterns = [
      /(?:is |how )?(.+?)(?: reliable| credible| trustworthy)/i,
      /(?:about |check )(.+?)(?:'s| credibility)/i,
      /source (.+)/i
    ];
    
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return null;
  }

  getSourceCredibilityInfo(sourceName) {
    const sourceInfo = {
      'bbc': 'BBC is highly credible with strong editorial standards and fact-checking processes. Trust score: 92/100',
      'cnn': 'CNN is generally reliable but shows some political bias. Trust score: 75/100',
      'fox news': 'Fox News has mixed credibility with notable political bias. Trust score: 70/100',
      'reuters': 'Reuters is extremely credible with excellent fact-checking. Trust score: 95/100',
      'associated press': 'AP is highly credible and widely trusted. Trust score: 94/100'
    };
    
    const lowerSource = sourceName.toLowerCase();
    for (const [key, info] of Object.entries(sourceInfo)) {
      if (lowerSource.includes(key)) {
        return `📊 **${sourceName} Credibility Analysis:**\n\n${info}\n\nFactors considered: Editorial standards, fact-checking history, transparency, bias ratings, and expert assessments.`;
      }
    }
    
    return `I don't have specific credibility data for "${sourceName}" in my database. However, I can help you evaluate any source by checking:\n\n• Editorial standards\n• Fact-checking processes\n• Transparency about funding\n• Correction policies\n• Expert reputation\n\nWould you like me to verify a specific article from this source?`;
  }

  formatVerificationResponse(result) {
    const { trustScore, verdict, report } = result;
    
    let emoji = '❓';
    if (verdict === 'VERIFIED') emoji = '✅';
    else if (verdict === 'LIKELY_TRUE') emoji = '✅';
    else if (verdict === 'MIXED') emoji = '⚠️';
    else if (verdict === 'LIKELY_FALSE') emoji = '❌';
    else if (verdict === 'FALSE') emoji = '❌';
    
    return `${emoji} **Verification Result: ${verdict}**\n\n**Trust Score:** ${trustScore}/100\n\n**Analysis:** ${report.summary}\n\n**Recommendations:**\n${report.recommendations.map(r => `• ${r}`).join('\n')}`;
  }

  formatNewsSearchResults(articles) {
    return articles.map((article, index) => {
      const trustEmoji = article.trustScore >= 80 ? '🟢' : article.trustScore >= 60 ? '🟡' : '🔴';
      return `${index + 1}. ${trustEmoji} **${article.title}**\n   Source: ${article.source.name} | Trust: ${article.trustScore}%`;
    }).join('\n\n');
  }

  getConversationHistory(userId) {
    if (!this.conversationHistory.has(userId)) {
      this.conversationHistory.set(userId, []);
    }
    return this.conversationHistory.get(userId);
  }

  updateConversationHistory(userId, history) {
    // Keep only recent messages
    if (history.length > this.maxHistoryLength) {
      history.splice(0, history.length - this.maxHistoryLength);
    }
    this.conversationHistory.set(userId, history);
  }

  clearConversationHistory(userId) {
    this.conversationHistory.delete(userId);
  }
}

// Export singleton instance
export const aiChatbotService = new AIChatbotService();
export default aiChatbotService;