import React, { useState } from 'react';
import { aiVerificationService } from '../services/aiVerificationService';
import { aiChatbotService } from '../services/aiChatbotService';
import { newsApiService } from '../services/newsApiService';

export default function DemoShowcase() {
  const [activeDemo, setActiveDemo] = useState('verification');
  const [demoResult, setDemoResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const demos = [
    {
      id: 'verification',
      title: 'AI News Verification',
      icon: '🔍',
      description: 'Test our AI-powered fact-checking system'
    },
    {
      id: 'chatbot',
      title: 'AI Chatbot',
      icon: '🤖',
      description: 'Interact with VerityBot assistant'
    },
    {
      id: 'newsfeed',
      title: 'Smart News Feed',
      icon: '📰',
      description: 'Personalized, verified news content'
    }
  ];

  const runVerificationDemo = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      const testContent = "Scientists at MIT have developed a revolutionary new battery technology that can charge electric vehicles in just 30 seconds and last for 1 million miles.";
      
      const result = await aiVerificationService.verifyContent(testContent);
      setDemoResult({
        type: 'verification',
        data: result
      });
    } catch (error) {
      setDemoResult({
        type: 'error',
        message: 'Demo failed: ' + error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runChatbotDemo = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      const testMessage = "How can I verify if a news article is real or fake?";
      
      const response = await aiChatbotService.processMessage('demo-user', testMessage);
      setDemoResult({
        type: 'chatbot',
        data: response
      });
    } catch (error) {
      setDemoResult({
        type: 'error',
        message: 'Demo failed: ' + error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runNewsFeedDemo = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      const feed = await newsApiService.getPersonalizedFeed('demo-user', {
        categories: ['technology', 'health'],
        country: 'us'
      });
      
      setDemoResult({
        type: 'newsfeed',
        data: feed
      });
    } catch (error) {
      setDemoResult({
        type: 'error',
        message: 'Demo failed: ' + error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runDemo = () => {
    switch (activeDemo) {
      case 'verification':
        runVerificationDemo();
        break;
      case 'chatbot':
        runChatbotDemo();
        break;
      case 'newsfeed':
        runNewsFeedDemo();
        break;
      default:
        break;
    }
  };

  const renderResult = () => {
    if (!demoResult) return null;

    if (demoResult.type === 'error') {
      return (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="text-red-400 font-medium">❌ {demoResult.message}</div>
        </div>
      );
    }

    switch (demoResult.type) {
      case 'verification':
        const { trustScore, verdict, report } = demoResult.data;
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">Trust Score</div>
                <div className="text-2xl font-bold text-white">{trustScore}/100</div>
              </div>
              <div className={`px-4 py-2 rounded-lg font-medium ${
                verdict === 'VERIFIED' ? 'bg-green-500/20 text-green-400' :
                verdict === 'MIXED' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {verdict}
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-white font-medium mb-2">Analysis</div>
              <div className="text-white/80 text-sm">{report?.summary}</div>
            </div>
          </div>
        );

      case 'chatbot':
        return (
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-white font-medium mb-2">VerityBot Response:</div>
            <div className="text-white/80 text-sm whitespace-pre-wrap">{demoResult.data.text}</div>
            {demoResult.data.suggestions && (
              <div className="mt-3 space-y-1">
                <div className="text-white/60 text-xs">Suggestions:</div>
                {demoResult.data.suggestions.map((suggestion, index) => (
                  <div key={index} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'newsfeed':
        return (
          <div className="space-y-3">
            <div className="text-white font-medium">
              Found {demoResult.data.articles.length} verified articles
            </div>
            {demoResult.data.articles.slice(0, 3).map((article, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="text-white font-medium text-sm mb-1">{article.title}</div>
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-xs">{article.source?.name}</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    article.trustScore >= 80 ? 'bg-green-500/20 text-green-400' :
                    article.trustScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {article.trustScore}% Trust
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">🚀</div>
        <h3 className="text-xl font-bold text-white">AI Features Demo</h3>
      </div>

      {/* Demo Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`p-4 rounded-lg border transition-all ${
              activeDemo === demo.id
                ? 'bg-primary/20 border-primary text-white'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <div className="text-2xl mb-2">{demo.icon}</div>
            <div className="font-medium mb-1">{demo.title}</div>
            <div className="text-xs opacity-80">{demo.description}</div>
          </button>
        ))}
      </div>

      {/* Run Demo Button */}
      <div className="text-center mb-6">
        <button
          onClick={runDemo}
          disabled={isLoading}
          className="px-6 py-3 bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/50 rounded-lg text-white font-medium transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Running Demo...
            </div>
          ) : (
            `Run ${demos.find(d => d.id === activeDemo)?.title} Demo`
          )}
        </button>
      </div>

      {/* Demo Result */}
      {renderResult()}

      {/* Demo Info */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="text-white/60 text-sm">
          <strong>Note:</strong> These demos use mock data for demonstration purposes. 
          In production, they would connect to real AI services and news APIs for live verification and analysis.
        </div>
      </div>
    </div>
  );
}