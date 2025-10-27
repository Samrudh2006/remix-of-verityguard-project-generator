import React, { useState, useEffect } from 'react';

export default function AdvancedAnalytics({ userId }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('verification');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange, userId]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock analytics data
    setAnalyticsData({
      overview: {
        totalVerifications: 1247,
        accuracyRate: 94.8,
        avgTrustScore: 78.5,
        flaggedContent: 23,
        trendsIdentified: 156,
        userEngagement: 87.2
      },
      verificationTrends: [
        { date: '2024-01-01', verifications: 45, accuracy: 92 },
        { date: '2024-01-02', verifications: 52, accuracy: 94 },
        { date: '2024-01-03', verifications: 38, accuracy: 96 },
        { date: '2024-01-04', verifications: 61, accuracy: 93 },
        { date: '2024-01-05', verifications: 47, accuracy: 95 },
        { date: '2024-01-06', verifications: 55, accuracy: 97 },
        { date: '2024-01-07', verifications: 49, accuracy: 94 }
      ],
      sourceDistribution: [
        { source: 'BBC', count: 234, trustScore: 92 },
        { source: 'Reuters', count: 198, trustScore: 95 },
        { source: 'CNN', count: 156, trustScore: 78 },
        { source: 'Associated Press', count: 143, trustScore: 94 },
        { source: 'The Guardian', count: 132, trustScore: 85 },
        { source: 'Others', count: 384, trustScore: 72 }
      ],
      categoryBreakdown: [
        { category: 'Technology', percentage: 28, trend: 'up' },
        { category: 'Politics', percentage: 22, trend: 'down' },
        { category: 'Health', percentage: 18, trend: 'up' },
        { category: 'Environment', percentage: 15, trend: 'stable' },
        { category: 'Business', percentage: 12, trend: 'up' },
        { category: 'Sports', percentage: 5, trend: 'down' }
      ],
      aiPerformance: {
        verifierAgent: { accuracy: 96.2, responseTime: 1.2, uptime: 99.8 },
        curatorAgent: { accuracy: 94.5, responseTime: 0.8, uptime: 99.9 },
        analystAgent: { accuracy: 92.1, responseTime: 2.1, uptime: 99.5 },
        moderatorAgent: { accuracy: 97.8, responseTime: 1.5, uptime: 99.7 },
        educatorAgent: { accuracy: 95.3, responseTime: 1.0, uptime: 99.6 }
      },
      alerts: [
        {
          id: 1,
          type: 'trend',
          severity: 'medium',
          message: 'Unusual spike in health misinformation detected',
          timestamp: '2024-01-07T10:30:00Z'
        },
        {
          id: 2,
          type: 'performance',
          severity: 'low',
          message: 'Analyst agent response time increased by 15%',
          timestamp: '2024-01-07T09:15:00Z'
        }
      ]
    });
    
    setIsLoading(false);
  };

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const metrics = [
    { value: 'verification', label: 'Verification Trends', icon: '🔍' },
    { value: 'sources', label: 'Source Analysis', icon: '📊' },
    { value: 'categories', label: 'Category Breakdown', icon: '📈' },
    { value: 'performance', label: 'AI Performance', icon: '🤖' }
  ];

  const renderOverviewCards = () => {
    if (!analyticsData) return null;

    const cards = [
      {
        title: 'Total Verifications',
        value: analyticsData.overview.totalVerifications.toLocaleString(),
        icon: '🔍',
        color: 'from-blue-500 to-cyan-500',
        change: '+12%'
      },
      {
        title: 'Accuracy Rate',
        value: `${analyticsData.overview.accuracyRate}%`,
        icon: '🎯',
        color: 'from-green-500 to-emerald-500',
        change: '+2.1%'
      },
      {
        title: 'Avg Trust Score',
        value: analyticsData.overview.avgTrustScore,
        icon: '⭐',
        color: 'from-yellow-500 to-orange-500',
        change: '+5.3%'
      },
      {
        title: 'Content Flagged',
        value: analyticsData.overview.flaggedContent,
        icon: '🚩',
        color: 'from-red-500 to-pink-500',
        change: '-8%'
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="glass-card rounded-xl p-6 border border-white/10 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5`}></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{card.icon}</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  card.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {card.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-white/60">{card.title}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderVerificationTrends = () => {
    if (!analyticsData) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">Verification Trends</h4>
        <div className="space-y-3">
          {analyticsData.verificationTrends.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-white/70 text-sm">
                  {new Date(day.date).toLocaleDateString()}
                </div>
                <div className="text-white font-medium">{day.verifications} verifications</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-white/60">Accuracy: </span>
                  <span className="text-green-400">{day.accuracy}%</span>
                </div>
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-blue-500"
                    style={{ width: `${(day.verifications / 70) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSourceAnalysis = () => {
    if (!analyticsData) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">Source Distribution</h4>
        <div className="space-y-3">
          {analyticsData.sourceDistribution.map((source, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-white font-medium">{source.source}</div>
                <div className="text-white/60 text-sm">{source.count} articles</div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`px-2 py-1 rounded text-xs ${
                  source.trustScore >= 90 ? 'bg-green-500/20 text-green-400' :
                  source.trustScore >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {source.trustScore}% Trust
                </div>
                <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      source.trustScore >= 90 ? 'bg-green-500' :
                      source.trustScore >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${source.trustScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCategoryBreakdown = () => {
    if (!analyticsData) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">Category Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyticsData.categoryBreakdown.map((category, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-medium">{category.category}</div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg">{category.percentage}%</span>
                  <span className={`text-sm ${
                    category.trend === 'up' ? 'text-green-400' :
                    category.trend === 'down' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {category.trend === 'up' ? '↗️' : category.trend === 'down' ? '↘️' : '➡️'}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-blue-500"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAIPerformance = () => {
    if (!analyticsData) return null;

    const agents = [
      { name: 'Verifier Agent', key: 'verifierAgent', icon: '🔍' },
      { name: 'Curator Agent', key: 'curatorAgent', icon: '📰' },
      { name: 'Analyst Agent', key: 'analystAgent', icon: '📈' },
      { name: 'Moderator Agent', key: 'moderatorAgent', icon: '🛡️' },
      { name: 'Educator Agent', key: 'educatorAgent', icon: '🎓' }
    ];

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">AI Agent Performance</h4>
        <div className="space-y-3">
          {agents.map((agent, index) => {
            const performance = analyticsData.aiPerformance[agent.key];
            return (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{agent.icon}</span>
                    <span className="text-white font-medium">{agent.name}</span>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{performance.accuracy}%</div>
                    <div className="text-xs text-white/60">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{performance.responseTime}s</div>
                    <div className="text-xs text-white/60">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{performance.uptime}%</div>
                    <div className="text-xs text-white/60">Uptime</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMetricContent = () => {
    switch (selectedMetric) {
      case 'verification':
        return renderVerificationTrends();
      case 'sources':
        return renderSourceAnalysis();
      case 'categories':
        return renderCategoryBreakdown();
      case 'performance':
        return renderAIPerformance();
      default:
        return renderVerificationTrends();
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span className="ml-3 text-white">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Advanced Analytics</h3>
          <p className="text-white/60">Comprehensive insights into verification performance and trends</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range.value
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      {renderOverviewCards()}

      {/* Alerts */}
      {analyticsData?.alerts.length > 0 && (
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-bold text-white mb-4">System Alerts</h4>
          <div className="space-y-3">
            {analyticsData.alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${
                alert.severity === 'high' ? 'bg-red-500/20 border-red-500/30' :
                alert.severity === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30' :
                'bg-blue-500/20 border-blue-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">{alert.message}</div>
                  <div className="text-xs text-white/60">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {metrics.map((metric) => (
          <button
            key={metric.value}
            onClick={() => setSelectedMetric(metric.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedMetric === metric.value
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <span>{metric.icon}</span>
            {metric.label}
          </button>
        ))}
      </div>

      {/* Metric Content */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        {renderMetricContent()}
      </div>
    </div>
  );
}