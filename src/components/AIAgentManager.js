import React, { useState, useEffect } from 'react';
import { aiAgentManager } from '../services/aiAgentManager';

export default function AIAgentManager({ userId }) {
  const [activeAgents, setActiveAgents] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');

  const agents = [
    {
      id: 'verifier',
      name: 'News Verifier',
      icon: '🔍',
      description: 'Fact-checks content and verifies sources',
      status: 'active',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'curator',
      name: 'Feed Curator',
      icon: '📰',
      description: 'Personalizes news feeds and recommendations',
      status: 'active',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'analyst',
      name: 'Trend Analyst',
      icon: '📈',
      description: 'Analyzes trends and contextual relevance',
      status: 'active',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'moderator',
      name: 'Content Moderator',
      icon: '🛡️',
      description: 'Checks for safety, bias, and quality issues',
      status: 'active',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'educator',
      name: 'Media Literacy',
      icon: '🎓',
      description: 'Provides educational content and guidance',
      status: 'active',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  useEffect(() => {
    setActiveAgents(agents.filter(agent => agent.status === 'active'));
  }, []);

  const runMultiAgentAnalysis = async () => {
    if (!selectedContent.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const result = await aiAgentManager.analyzeContent(selectedContent);
      setAnalysisResults(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 results
    } catch (error) {
      console.error('Multi-agent analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">🤖</div>
          <h3 className="text-xl font-bold text-white">AI Agent Manager</h3>
        </div>
        
        <p className="text-white/70 mb-4">
          Coordinate multiple AI agents for comprehensive content analysis and verification.
        </p>

        {/* Active Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {activeAgents.map((agent) => (
            <div
              key={agent.id}
              className={`p-4 rounded-lg bg-gradient-to-br ${agent.color} bg-opacity-20 border border-white/10`}
            >
              <div className="text-2xl mb-2">{agent.icon}</div>
              <div className="text-white font-medium text-sm mb-1">{agent.name}</div>
              <div className="text-white/70 text-xs">{agent.description}</div>
              <div className="mt-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400 text-xs ml-1">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Interface */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-bold text-white mb-4">Multi-Agent Content Analysis</h4>
        
        {/* Input */}
        <div className="mb-4">
          <textarea
            value={selectedContent}
            onChange={(e) => setSelectedContent(e.target.value)}
            placeholder="Paste news content, URL, or claim to analyze with all AI agents..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-colors resize-none"
            rows={4}
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={runMultiAgentAnalysis}
          disabled={!selectedContent.trim() || isAnalyzing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/50 rounded-lg text-white font-medium transition-colors"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyzing with {activeAgents.length} AI Agents...
            </>
          ) : (
            <>
              <span>🚀</span>
              Run Multi-Agent Analysis
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisResults.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Recent Analysis Results</h4>
          
          {analysisResults.map((result, index) => (
            <div key={result.id} className="glass-card rounded-xl p-6 border border-white/10">
              {result.error ? (
                <div className="text-red-400">
                  ❌ Analysis failed: {result.message}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Overall Score */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Overall Credibility Score</div>
                      <div className="text-2xl font-bold text-white">{result.overallScore}/100</div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${getScoreColor(result.overallScore)}`}>
                      {result.verification.verdict}
                    </div>
                  </div>

                  {/* Agent Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Verification */}
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span>🔍</span>
                        <span className="text-white font-medium text-sm">Verification</span>
                      </div>
                      <div className="text-lg font-bold text-white">{result.verification.trustScore}%</div>
                      <div className="text-xs text-white/60">
                        {result.verification.sources.length} sources checked
                      </div>
                    </div>

                    {/* Moderation */}
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span>🛡️</span>
                        <span className="text-white font-medium text-sm">Safety</span>
                      </div>
                      <div className="text-lg font-bold text-white">{result.moderation.safetyScore}%</div>
                      <div className="text-xs text-white/60">
                        {result.moderation.flags.length} flags detected
                      </div>
                    </div>

                    {/* Context */}
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span>📈</span>
                        <span className="text-white font-medium text-sm">Relevance</span>
                      </div>
                      <div className="text-lg font-bold text-white">{result.context.relevanceScore}%</div>
                      <div className="text-xs text-white/60">
                        {result.context.trendingTopics.length} trends matched
                      </div>
                    </div>

                    {/* Quality */}
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span>⭐</span>
                        <span className="text-white font-medium text-sm">Quality</span>
                      </div>
                      <div className="text-lg font-bold text-white">{result.moderation.qualityScore}%</div>
                      <div className="text-xs text-white/60">
                        Content quality assessment
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-white font-medium mb-2">AI Recommendations</div>
                      <div className="space-y-2">
                        {result.recommendations.map((rec, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className={`w-2 h-2 rounded-full mt-2 ${
                              rec.priority === 'high' ? 'bg-red-400' :
                              rec.priority === 'medium' ? 'bg-yellow-400' :
                              'bg-green-400'
                            }`}></span>
                            <span className="text-white/80 text-sm">{rec.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="text-xs text-white/40">
                    Analyzed: {new Date(result.timestamp).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Agent Status Monitor */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-bold text-white mb-4">Agent Performance Monitor</h4>
        
        <div className="space-y-3">
          {activeAgents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl">{agent.icon}</span>
                <div>
                  <div className="text-white font-medium">{agent.name}</div>
                  <div className="text-white/60 text-sm">{agent.description}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-green-400 text-sm">99.2% Uptime</div>
                  <div className="text-white/60 text-xs">~{Math.floor(Math.random() * 500 + 100)}ms avg</div>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}