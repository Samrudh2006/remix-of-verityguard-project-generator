import React, { useState, useEffect, useRef } from 'react';
import { aiChatbotService } from '../services/aiChatbotService';

export default function AIChatWidget({ onClose, userId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initial greeting
    setMessages([{
      id: 'greeting',
      role: 'assistant',
      content: "Hi! I'm VerityBot, your AI fact-checking assistant. I can help you verify news articles, check source credibility, and answer questions about media literacy. What would you like to verify today?",
      timestamp: new Date().toISOString(),
      suggestions: [
        "Verify a news article",
        "Check source credibility", 
        "How does fact-checking work?",
        "Show me trending news"
      ]
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await aiChatbotService.processMessage(userId, inputMessage);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: response.timestamp,
        intent: response.intent,
        suggestions: response.suggestions,
        actions: response.actions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        suggestions: ["Try again", "Contact support"]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const formatMessageContent = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/80 rounded-full text-white font-medium shadow-lg transition-colors"
        >
          <span>🤖</span>
          <span>VerityBot</span>
          {messages.length > 1 && (
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {messages.length - 1}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-dark-light border border-white/20 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-primary to-blue-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div>
            <div className="text-white font-medium">VerityBot</div>
            <div className="text-white/70 text-xs">AI Fact-Checking Assistant</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-white/70 hover:text-white hover:bg-white/20 rounded transition-colors"
            title="Minimize"
          >
            ➖
          </button>
          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white hover:bg-white/20 rounded transition-colors"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              <div 
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
              />
              
              {/* Suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-xs text-white/80 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="text-xs text-white/50 mt-2">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to verify news, check sources, or explain fact-checking..."
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-colors resize-none"
            rows={2}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/50 rounded-lg text-white font-medium transition-colors"
          >
            📤
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 mt-2">
          {[
            { icon: '🔍', text: 'Verify URL', action: 'verify' },
            { icon: '📰', text: 'Latest News', action: 'news' },
            { icon: '❓', text: 'How it works', action: 'help' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(action.text)}
              className="flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-white/70 transition-colors"
            >
              <span>{action.icon}</span>
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}