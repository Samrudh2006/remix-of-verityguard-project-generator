import React, { useState } from 'react';
import { aiVerificationService } from '../services/aiVerificationService';

export default function VerifyNewsWidget() {
  const [input, setInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [inputType, setInputType] = useState('url'); // 'url', 'text', 'image'

  const handleVerify = async () => {
    if (!input.trim()) return;

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const result = await aiVerificationService.verifyContent(input);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult({
        error: true,
        message: 'Verification failed. Please try again.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setVerificationResult(null);
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'VERIFIED': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'LIKELY_TRUE': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'MIXED': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'LIKELY_FALSE': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'FALSE': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case 'VERIFIED': return '✅';
      case 'LIKELY_TRUE': return '✅';
      case 'MIXED': return '⚠️';
      case 'LIKELY_FALSE': return '❌';
      case 'FALSE': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">🔍</div>
        <h3 className="text-xl font-bold text-white">Verify News</h3>
      </div>

      {/* Input Type Selector */}
      <div className="flex gap-2 mb-4">
        {[
          { type: 'url', icon: '🔗', label: 'URL' },
          { type: 'text', icon: '📝', label: 'Text' },
          { type: 'image', icon: '🖼️', label: 'Image' }
        ].map((option) => (
          <button
            key={option.type}
            onClick={() => setInputType(option.type)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              inputType === option.type
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <span>{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="mb-4">
        {inputType === 'image' ? (
          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-white/60 mb-2">Upload an image to verify</div>
            <button className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-medium transition-colors">
              Choose Image
            </button>
          </div>
        ) : (
          <div>
            {inputType === 'url' ? (
              <input
                type="url"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste news article URL here..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-colors"
              />
            ) : (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste news text or claim to verify..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-colors resize-none"
              />
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleVerify}
          disabled={!input.trim() || isVerifying}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/50 rounded-lg text-white font-medium transition-colors"
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Verifying...
            </>
          ) : (
            <>
              <span>🔍</span>
              Verify Now
            </>
          )}
        </button>
        
        {input && (
          <button
            onClick={handleClear}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 font-medium transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className="space-y-4">
          {verificationResult.error ? (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="text-red-400 font-medium">❌ Verification Failed</div>
              <div className="text-red-300 text-sm mt-1">{verificationResult.message}</div>
            </div>
          ) : (
            <>
              {/* Trust Score & Verdict */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <div className="text-white font-medium mb-1">Trust Score</div>
                  <div className="text-2xl font-bold text-white">
                    {verificationResult.trustScore}/100
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border font-medium ${getVerdictColor(verificationResult.verdict)}`}>
                  {getVerdictIcon(verificationResult.verdict)} {verificationResult.verdict.replace('_', ' ')}
                </div>
              </div>

              {/* Analysis Summary */}
              {verificationResult.report && (
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white font-medium mb-2">Analysis Summary</div>
                  <div className="text-white/80 text-sm mb-3">
                    {verificationResult.report.summary}
                  </div>
                  
                  {verificationResult.report.recommendations && (
                    <div>
                      <div className="text-white/70 text-sm font-medium mb-2">Recommendations:</div>
                      <ul className="space-y-1">
                        {verificationResult.report.recommendations.map((rec, index) => (
                          <li key={index} className="text-white/60 text-sm flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Sources */}
              {verificationResult.sources && verificationResult.sources.length > 0 && (
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white font-medium mb-2">
                    Sources Checked ({verificationResult.sources.length})
                  </div>
                  <div className="space-y-2">
                    {verificationResult.sources.slice(0, 3).map((source, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{source.name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          source.credibility === 'high' ? 'bg-green-500/20 text-green-400' :
                          source.credibility === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {source.credibility}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Info */}
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>Verified: {new Date(verificationResult.timestamp).toLocaleTimeString()}</span>
                <span>Confidence: {Math.round(verificationResult.confidence * 100)}%</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Quick Examples */}
      {!verificationResult && !isVerifying && (
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Try these examples:</div>
          <div className="space-y-2">
            {[
              'https://www.bbc.com/news/example-article',
              'Scientists discover new treatment for diabetes',
              'Breaking: Major earthquake hits California'
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setInput(example)}
                className="block w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-sm text-white/70 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}