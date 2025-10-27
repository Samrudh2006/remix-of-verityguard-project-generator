import React, { useState, useEffect, useRef } from 'react';
import { aiAgentManager } from '../services/aiAgentManager';

export default function RealTimeMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitoringData, setMonitoringData] = useState({
    activeVerifications: 0,
    queuedTasks: 0,
    systemLoad: 0,
    alertsCount: 0,
    recentActivity: [],
    performanceMetrics: {},
    networkStatus: 'healthy'
  });
  const [alerts, setAlerts] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => stopMonitoring();
  }, [isMonitoring]);

  const startMonitoring = () => {
    // Initial data load
    updateMonitoringData();
    
    // Set up real-time updates
    intervalRef.current = setInterval(() => {
      updateMonitoringData();
    }, 2000); // Update every 2 seconds
  };

  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const updateMonitoringData = () => {
    // Simulate real-time data updates
    const newData = {
      activeVerifications: Math.floor(Math.random() * 50) + 10,
      queuedTasks: Math.floor(Math.random() * 20),
      systemLoad: Math.floor(Math.random() * 30) + 40,
      alertsCount: Math.floor(Math.random() * 5),
      recentActivity: generateRecentActivity(),
      performanceMetrics: generatePerformanceMetrics(),
      networkStatus: Math.random() > 0.1 ? 'healthy' : 'degraded'
    };

    setMonitoringData(newData);

    // Generate alerts occasionally
    if (Math.random() > 0.8) {
      generateAlert();
    }
  };

  const generateRecentActivity = () => {
    const activities = [
      'News article verified from BBC',
      'Misinformation detected and flagged',
      'User reported suspicious content',
      'AI agent completed trend analysis',
      'Source credibility updated',
      'Content moderation completed',
      'New trending topic identified',
      'Fact-check request processed'
    ];

    return Array.from({ length: 5 }, (_, index) => ({
      id: Date.now() + index,
      message: activities[Math.floor(Math.random() * activities.length)],
      timestamp: new Date(Date.now() - Math.random() * 300000).toISOString(),
      type: ['verification', 'alert', 'user_action', 'system'][Math.floor(Math.random() * 4)],
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
    }));
  };

  const generatePerformanceMetrics = () => {
    return {
      cpuUsage: Math.floor(Math.random() * 40) + 30,
      memoryUsage: Math.floor(Math.random() * 50) + 40,
      apiResponseTime: Math.floor(Math.random() * 500) + 200,
      throughput: Math.floor(Math.random() * 100) + 50,
      errorRate: Math.random() * 2
    };
  };

  const generateAlert = () => {
    const alertTypes = [
      {
        type: 'performance',
        message: 'High API response time detected',
        severity: 'medium'
      },
      {
        type: 'security',
        message: 'Unusual verification pattern detected',
        severity: 'high'
      },
      {
        type: 'content',
        message: 'Spike in misinformation reports',
        severity: 'medium'
      },
      {
        type: 'system',
        message: 'Agent performance degradation',
        severity: 'low'
      }
    ];

    const alert = {
      id: Date.now(),
      ...alertTypes[Math.floor(Math.random() * alertTypes.length)],
      timestamp: new Date().toISOString()
    };

    setAlerts(prev => [alert, ...prev.slice(0, 9)]); // Keep last 10 alerts
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/20';
      case 'degraded': return 'text-yellow-400 bg-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'verification': return '🔍';
      case 'alert': return '🚨';
      case 'user_action': return '👤';
      case 'system': return '⚙️';
      default: return '📊';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Real-Time Monitor</h3>
          <p className="text-white/60">Live system performance and activity monitoring</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Timeframe Selector */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
          </select>
          
          {/* Monitor Toggle */}
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isMonitoring
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-white animate-pulse' : 'bg-white'}`}></div>
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">🔄</div>
            <div className={`px-2 py-1 rounded text-xs ${getStatusColor(monitoringData.networkStatus)}`}>
              {monitoringData.networkStatus}
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{monitoringData.activeVerifications}</div>
          <div className="text-sm text-white/60">Active Verifications</div>
        </div>

        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">⏳</div>
            <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
              Queue
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{monitoringData.queuedTasks}</div>
          <div className="text-sm text-white/60">Queued Tasks</div>
        </div>

        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">📊</div>
            <div className={`text-xs px-2 py-1 rounded ${
              monitoringData.systemLoad > 80 ? 'bg-red-500/20 text-red-400' :
              monitoringData.systemLoad > 60 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {monitoringData.systemLoad > 80 ? 'High' : monitoringData.systemLoad > 60 ? 'Medium' : 'Low'}
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{monitoringData.systemLoad}%</div>
          <div className="text-sm text-white/60">System Load</div>
        </div>

        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">🚨</div>
            <div className={`text-xs px-2 py-1 rounded ${
              monitoringData.alertsCount > 3 ? 'bg-red-500/20 text-red-400' :
              monitoringData.alertsCount > 0 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {monitoringData.alertsCount > 3 ? 'Critical' : monitoringData.alertsCount > 0 ? 'Active' : 'Clear'}
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{monitoringData.alertsCount}</div>
          <div className="text-sm text-white/60">Active Alerts</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-bold text-white mb-4">Performance Metrics</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(monitoringData.performanceMetrics).map(([key, value]) => {
            const isPercentage = ['cpuUsage', 'memoryUsage'].includes(key);
            const isTime = key === 'apiResponseTime';
            const isRate = key === 'errorRate';
            
            return (
              <div key={key} className="p-4 bg-white/5 rounded-lg">
                <div className="text-sm text-white/60 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-xl font-bold text-white">
                  {isPercentage ? `${value}%` : 
                   isTime ? `${value}ms` :
                   isRate ? `${value.toFixed(2)}%` :
                   value}
                </div>
                {isPercentage && (
                  <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                    <div 
                      className={`h-1 rounded-full ${
                        value > 80 ? 'bg-red-500' :
                        value > 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white">Recent Activity</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Live</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {monitoringData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div className="text-xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <div className="text-white text-sm">{activity.message}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white/40 text-xs">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs ${getSeverityColor(activity.severity)}`}>
                      {activity.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-bold text-white mb-4">System Alerts</h4>
          
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-white/60">No active alerts</div>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white font-medium text-sm">{alert.message}</div>
                    <button className="text-white/40 hover:text-white text-xs">
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-80 capitalize">{alert.type}</span>
                    <span className="text-xs opacity-60">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      {!isMonitoring && (
        <div className="glass-card rounded-xl p-6 border border-white/10 text-center">
          <div className="text-4xl mb-4">⏸️</div>
          <div className="text-white font-medium mb-2">Monitoring Paused</div>
          <div className="text-white/60 mb-4">Click "Start Monitoring" to begin real-time system monitoring</div>
          <button
            onClick={() => setIsMonitoring(true)}
            className="px-6 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white font-medium transition-colors"
          >
            Start Monitoring
          </button>
        </div>
      )}
    </div>
  );
}