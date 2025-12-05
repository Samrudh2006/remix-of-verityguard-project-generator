import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, Award, Bell, Search, MessageSquare, BarChart3, Users, CheckCircle, XCircle, Clock, Sparkles, Send, X, Home, Settings, LogOut, Eye, Flag, BookOpen, User, Image, Video, Mic, Link2, FileUp, Lock, ChevronRight, Zap, Star, Activity, Filter, Download, Share2, Trash2, Edit, Plus, Calendar, Target, Trophy, Bookmark, AlertTriangle, FileText, Globe, Database, Cpu, Wifi, Camera, Radio, MapPin, Briefcase, Layers, PenTool, Scan, Fingerprint, Binary, FileSearch, Siren, History, Compass, CloudRain, Sun, Moon, Thermometer, Wind, Music, Speaker, RadioReceiver, Monitor, Smartphone, Tablet, HardDrive, Server, Code, Terminal, Command, Hash, Key, Unlock, EyeOff, FileDigit, FileCode, FileImage, FileVideo, FileAudio } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const VerityGuard = () => {
  const [activeRole, setActiveRole] = useState('');
  const [activePage, setActivePage] = useState('dashboard');
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', content: 'Hello! I\'m VerityBot. How can I help you?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyMode, setVerifyMode] = useState('text');
  const [verifyResult, setVerifyResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Verifier Command Center State
  const [verifierTab, setVerifierTab] = useState('image');
  const [activeTool, setActiveTool] = useState(null);

  const userData = {
    name: signupData.name || 'Alex Thompson',
    email: signupData.email || 'alex@verityguard.com',
    role: activeRole,
    points: 1250,
    level: 'Gold',
    streak: 7,
    accuracy: 94,
    verified: 45
  };

  const safetyTips = [
    { icon: '🏥', title: 'Health Alert', text: 'Always verify health information with WHO or official medical authorities.' },
    { icon: '🌊', title: 'Flood Safety', text: 'Stay away from floodwater and follow evacuation orders.' },
    { icon: '🔥', title: 'Fire Prevention', text: 'Check smoke detectors monthly and have an emergency plan.' },
    { icon: '🌡️', title: 'Heat Wave', text: 'Stay hydrated and avoid outdoor activities 12-4 PM during heat waves.' }
  ];

  const analyticsData = {
    weekly: [
      { day: 'Mon', verifications: 8 }, { day: 'Tue', verifications: 12 }, { day: 'Wed', verifications: 6 },
      { day: 'Thu', verifications: 15 }, { day: 'Fri', verifications: 10 }, { day: 'Sat', verifications: 5 }, { day: 'Sun', verifications: 9 }
    ],
    categories: [
      { name: 'Health', value: 35, color: '#10b981' }, { name: 'Politics', value: 25, color: '#ef4444' },
      { name: 'Tech', value: 20, color: '#6366f1' }, { name: 'Environment', value: 12, color: '#f59e0b' }, { name: 'Other', value: 8, color: '#8b5cf6' }
    ],
    radar: [
      { subject: 'Visual', A: 120, fullMark: 150 },
      { subject: 'Audio', A: 98, fullMark: 150 },
      { subject: 'Text', A: 86, fullMark: 150 },
      { subject: 'Geo', A: 99, fullMark: 150 },
      { subject: 'Metadata', A: 85, fullMark: 150 },
      { subject: 'Source', A: 65, fullMark: 150 },
    ]
  };

  const badges = [
    { name: 'Fact Finder', icon: '🔍', earned: true, desc: 'Complete 10 verifications' },
    { name: 'Truth Explorer', icon: '🧭', earned: true, desc: 'Reach 1000 points' },
    { name: 'Guardian', icon: '🛡️', earned: true, desc: 'Maintain 85% accuracy' },
    { name: 'Protector', icon: '⚔️', earned: false, desc: 'Submit 50 reports' },
    { name: 'Master', icon: '👑', earned: false, desc: 'Reach Diamond tier' }
  ];

  const courses = [
    { id: 1, title: 'Intro to Fact-Checking', duration: '45 min', progress: 100, icon: '📚' },
    { id: 2, title: 'Source Verification', duration: '1.5 hrs', progress: 60, icon: '🔍' },
    { id: 3, title: 'Spotting Deepfakes', duration: '1 hr', progress: 30, icon: '🎭' },
    { id: 4, title: 'Statistical Analysis', duration: '2 hrs', progress: 0, icon: '📊' }
  ];

  useEffect(() => {
    const interval = setInterval(() => setCarouselIndex((prev) => (prev + 1) % safetyTips.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', content: inputMessage }]);
    setInputMessage('');
    setLoading(true);
    setTimeout(() => {
      const response = inputMessage.toLowerCase().includes('verify') ? 'I can help verify that! Share the URL or text.' : 'Check trusted sources like WHO, Reuters, or government websites.';
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, 1000);
  };

  const handleVerify = () => {
    if (!verifyInput.trim() && !selectedFile) return;
    setLoading(true);
    setTimeout(() => {
      const trustScore = Math.floor(Math.random() * 100);
      const status = trustScore >= 75 ? 'verified' : trustScore >= 40 ? 'pending' : 'false';
      setVerifyResult({
        trustScore, status,
        confidence: trustScore >= 75 ? 'High' : trustScore >= 40 ? 'Medium' : 'Low',
        explanation: status === 'verified' ? 'Verified by multiple trusted sources.' : status === 'pending' ? 'Some claims verified, needs more evidence.' : 'Contains significant misinformation.',
        sources: ['WHO', 'Reuters', 'PolitiFact'].slice(0, Math.floor(trustScore / 25) + 1)
      });
      setLoading(false);
    }, 2000);
  };

  // VERIFIER COMMAND CENTER TOOLS
  const verifierTools = {
    image: [
      { id: 'ela', name: 'Error Level Analysis', icon: Scan, desc: 'Detect compression artifacts and manipulation' },
      { id: 'metadata', name: 'Metadata Extractor', icon: FileDigit, desc: 'View EXIF, XMP, and IPTC data' },
      { id: 'reverse', name: 'Reverse Image Search', icon: Search, desc: 'Find original sources across the web' },
      { id: 'stega', name: 'Steganography Check', icon: EyeOff, desc: 'Detect hidden data within pixels' },
      { id: 'pixel', name: 'Pixel Peeping', icon: Image, desc: 'Zoom analysis for edge inconsistencies' }
    ],
    video: [
      { id: 'deepfake', name: 'Deepfake Scanner', icon: Siren, desc: 'AI detection of face swaps and synthesis' },
      { id: 'frame', name: 'Frame-by-Frame', icon: Layers, desc: 'Analyze individual video frames' },
      { id: 'sync', name: 'Audio Sync Check', icon: Mic, desc: 'Verify lip movement matches audio' },
      { id: 'motion', name: 'Motion Tracker', icon: Activity, desc: 'Detect unnatural movements' },
      { id: 'face', name: 'Face Artifacts', icon: User, desc: 'Check for warping and blending errors' }
    ],
    text: [
      { id: 'fact', name: 'Fact Check DB', icon: Database, desc: 'Cross-reference with global databases' },
      { id: 'sentiment', name: 'Sentiment Analysis', icon: PenTool, desc: 'Detect emotional manipulation' },
      { id: 'propaganda', name: 'Propaganda Detector', icon: AlertTriangle, desc: 'Identify persuasive techniques' },
      { id: 'claim', name: 'Claim Buster', icon: Target, desc: 'Extract and verify specific claims' },
      { id: 'author', name: 'Authorship Analysis', icon: Fingerprint, desc: 'Analyze writing style patterns' }
    ],
    audio: [
      { id: 'voice', name: 'Voice Clone Detector', icon: Radio, desc: 'Detect AI-synthesized voices' },
      { id: 'spectro', name: 'Spectrogram', icon: Activity, desc: 'Visual frequency analysis' },
      { id: 'noise', name: 'Noise Isolator', icon: Speaker, desc: 'Separate background from speech' },
      { id: 'silence', name: 'Silence Analysis', icon: Mic, desc: 'Detect unnatural pauses or cuts' }
    ],
    geo: [
      { id: 'shadow', name: 'Shadow Analysis', icon: Sun, desc: 'Verify time based on sun position' },
      { id: 'landmark', name: 'Landmark Matcher', icon: MapPin, desc: 'Identify location from visual cues' },
      { id: 'weather', name: 'Weather History', icon: CloudRain, desc: 'Cross-reference weather data' },
      { id: 'map', name: 'Map Pinning', icon: Globe, desc: 'Geolocate specific coordinates' }
    ]
  };

  const renderVerifierCommandCenter = () => {
    return (
      <div className="animate-fadeIn">
        <div className="card p-6 mb-6 bg-slate-800/80 backdrop-blur border border-indigo-500/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="heading-md text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-indigo-400" />
                Verifier Command Center
              </h2>
              <p className="text-slate-400 mt-1">Access advanced forensic tools and verification suites</p>
            </div>
            <div className="flex gap-2">
              <span className="badge badge-neutral flex items-center gap-1"><Activity className="w-3 h-3" /> System Online</span>
              <span className="badge badge-success flex items-center gap-1"><Wifi className="w-3 h-3" /> Connected</span>
            </div>
          </div>

          {/* Tool Categories Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-slate-700">
            {[
              { id: 'image', label: 'Image Forensics', icon: Image },
              { id: 'video', label: 'Video Analysis', icon: Video },
              { id: 'text', label: 'Text & Claims', icon: FileText },
              { id: 'audio', label: 'Audio Forensics', icon: Mic },
              { id: 'geo', label: 'Geolocation', icon: Globe }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setVerifierTab(tab.id); setActiveTool(null); }}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${verifierTab === tab.id ? 'bg-indigo-600 text-white border-b-2 border-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {verifierTools[verifierTab].map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool)}
                className={`card p-4 text-left transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 ${activeTool?.id === tool.id ? 'border-indigo-500 bg-indigo-900/20' : 'border-slate-700 bg-slate-800/50'}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${activeTool?.id === tool.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                <p className="text-xs text-slate-400">{tool.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Active Tool Workspace */}
        {activeTool ? (
          <div className="card p-6 border-t-4 border-indigo-500 animate-slideInRight">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <h3 className="heading-sm text-white flex items-center gap-3">
                <activeTool.icon className="w-6 h-6 text-indigo-400" />
                {activeTool.name}
              </h3>
              <button onClick={() => setActiveTool(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Area */}
              <div className="lg:col-span-2 space-y-4">
                <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center bg-slate-900/50 hover:border-indigo-500 transition-colors cursor-pointer">
                  <FileUp className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-300 font-medium">Drop file to analyze or click to upload</p>
                  <p className="text-slate-500 text-sm mt-2">Supports JPG, PNG, MP4, WAV, TXT</p>
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Or paste URL here..." className="input flex-1" />
                  <button className="btn btn-secondary">Load</button>
                </div>
              </div>

              {/* Controls & Info */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Analysis Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Sensitivity</span>
                      <span>High</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full"><div className="bg-indigo-500 h-1.5 rounded-full w-3/4"></div></div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <input type="checkbox" className="rounded bg-slate-700 border-slate-600" defaultChecked />
                      <span>Deep Scan</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <input type="checkbox" className="rounded bg-slate-700 border-slate-600" />
                      <span>Compare History</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-indigo-500/25">
                  <Zap className="w-5 h-5 mr-2" /> Run Analysis
                </button>
              </div>
            </div>

            {/* Results Placeholder */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Live Output</h4>
              <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-green-400 h-48 overflow-y-auto border border-slate-700">
                <p>{`> Initializing ${activeTool.name} module...`}</p>
                <p>{`> Connecting to secure server...`}</p>
                <p>{`> Ready for input.`}</p>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="heading-sm text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400"><Activity className="w-4 h-4" /></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-200">Deepfake Scan #293{i}</div>
                      <div className="text-xs text-slate-500">2 hours ago • High Confidence</div>
                    </div>
                    <span className="badge badge-success">Verified</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="heading-sm text-white mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">AI Models</span>
                  <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Database Sync</span>
                  <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Updated</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">API Latency</span>
                  <span className="text-indigo-400 text-sm">24ms</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Storage Usage</div>
                  <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-indigo-500 h-2 rounded-full w-1/3"></div></div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>34 GB Used</span><span>100 GB Total</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // LANDING PAGE
  if (currentScreen === 'landing') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 6s ease-in-out infinite' }}></div>
        <nav style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)', background: 'rgba(15, 23, 42, 0.5)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }} className="animate-fadeIn">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield style={{ width: '32px', height: '32px', color: '#818cf8' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VerityGuard</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setCurrentScreen('roleSelect')} style={{ padding: '0.625rem 1.25rem', background: 'transparent', color: '#cbd5e1', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}>Login</button>
            <button onClick={() => setCurrentScreen('roleSelect')} className="btn btn-primary"><Sparkles style={{ width: '18px', height: '18px' }} />Get Started</button>
          </div>
        </nav>
        <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', padding: '2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px' }} className="animate-fadeIn">
            <h1 className="heading-xl" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Detect <span className="text-gradient">Fake News</span> in Seconds</h1>
            <p className="text-lg" style={{ marginBottom: '2.5rem', color: '#cbd5e1' }}>AI-powered platform combining NLP, real-time fact-checking, and community verification.</p>
            <button onClick={() => setCurrentScreen('roleSelect')} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}><Sparkles style={{ width: '20px', height: '20px' }} />Start Verifying</button>
          </div>
        </div>
      </div>
    );
  }

  // ROLE SELECTION
  if (currentScreen === 'roleSelect') {
    const roles = [
      { role: 'user', icon: User, color: '#6366f1', title: 'User', subtitle: 'General Access', desc: 'Verify news, report misinformation, learn skills, earn badges.' },
      { role: 'verifier', icon: Eye, color: '#8b5cf6', title: 'Verifier', subtitle: 'Command Center', desc: 'Access comprehensive forensic tools and verification suites.' },
      { role: 'reporter', icon: Flag, color: '#ec4899', title: 'Reporter', subtitle: 'Contributor', desc: 'Submit reports, track incidents, and investigate misinformation.' }
    ];
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', width: '100%' }} className="animate-fadeIn">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: '0.75rem', color: '#f1f5f9' }}>Select Your Role</h2>
            <p className="text-base" style={{ color: '#94a3b8' }}>Choose how you want to contribute</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {roles.map((item, i) => (
              <button key={item.role} onClick={() => { setSelectedRole(item.role); setCurrentScreen('signup'); }} className="card" style={{ padding: '2rem', textAlign: 'left', cursor: 'pointer', border: '2px solid transparent', background: 'rgba(30, 41, 59, 0.5)' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '56px', height: '56px', background: `${item.color}20`, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <item.icon style={{ width: '28px', height: '28px', color: item.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#f1f5f9' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{item.subtitle}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{item.desc}</p>
              </button>
            ))}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button onClick={() => setCurrentScreen('landing')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>← Back</button>
          </div>
        </div>
      </div>
    );
  }

  // SIGNUP
  if (currentScreen === 'signup') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card card-glass" style={{ maxWidth: '480px', width: '100%', padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Shield style={{ width: '48px', height: '48px', color: '#818cf8', margin: '0 auto 1rem' }} />
            <h2 className="heading-md" style={{ marginBottom: '0.5rem', color: '#f1f5f9' }}>Create Account</h2>
            <p className="text-sm" style={{ color: '#94a3b8' }}>Sign up as <span style={{ color: '#818cf8', fontWeight: '600', textTransform: 'capitalize' }}>{selectedRole}</span></p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (signupData.password !== signupData.confirmPassword) { alert('Passwords do not match!'); return; } setCurrentScreen('login'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Full Name</label><input type="text" required value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} className="input" placeholder="Enter your name" /></div>
            <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Email</label><input type="email" required value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="input" placeholder="your@email.com" /></div>

            {/* Removed Specialization Dropdown for Verifier - Now Access All Tools */}

            <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Password</label><input type="password" required value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="input" placeholder="Create password" /></div>
            <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Confirm Password</label><input type="password" required value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} className="input" placeholder="Confirm password" /></div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>Create Account</button>
          </form>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}><button onClick={() => setCurrentScreen('login')} style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontSize: '0.875rem' }}>Already have account? Login</button></div>
        </div>
      </div>
    );
  }

  // LOGIN
  if (currentScreen === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card card-glass" style={{ maxWidth: '480px', width: '100%', padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Shield style={{ width: '48px', height: '48px', color: '#818cf8', margin: '0 auto 1rem' }} />
            <h2 className="heading-md" style={{ marginBottom: '0.5rem', color: '#f1f5f9' }}>Welcome Back</h2>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setActiveRole(selectedRole); setCurrentScreen('dashboard'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Email</label><input type="email" required value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="input" placeholder="your@email.com" /></div>
            <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Password</label><input type="password" required value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="input" placeholder="Password" /></div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  // VERIFIER DASHBOARD - Unique Investigation Workspace
  const renderVerifierDashboard = () => {
    return (
      <div className="animate-fadeIn">
        {/* Verification Queue Header */}
        <div className="card p-6 mb-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="heading-md text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-400" />
                Investigation Workspace
              </h2>
              <p className="text-blue-200 mt-1">Active Cases & Verification Queue</p>
            </div>
            <div className="flex gap-2">
              <span className="badge badge-info">12 Pending</span>
              <span className="badge badge-success">45 Verified Today</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Eye, label: 'Cases Reviewed', value: '234', color: '#3b82f6', trend: '+12%' },
            { icon: CheckCircle, label: 'Verified', value: '189', color: '#10b981', trend: '+8%' },
            { icon: Clock, label: 'In Progress', value: '23', color: '#f59e0b', trend: '-3%' },
            { icon: XCircle, label: 'Rejected', value: '22', color: '#ef4444', trend: '+2%' }
          ].map((stat, i) => (
            <div key={i} className="card p-4 bg-slate-800/50">
              <div className="flex items-center justify-between mb-2">
                <stat.icon style={{ color: stat.color }} className="w-6 h-6" />
                <span className="text-xs font-semibold" style={{ color: stat.color }}>{stat.trend}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Active Investigation & Quick Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Investigation Queue */}
          <div className="lg:col-span-2 card p-6">
            <h3 className="heading-sm text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Priority Queue
            </h3>
            <div className="space-y-3">
              {[
                { id: '#VF-2039', title: 'Political Image Manipulation', priority: 'High', time: '5m ago', type: 'Image' },
                { id: '#VF-2038', title: 'Deepfake Video Detection', priority: 'Critical', time: '12m ago', type: 'Video' },
                { id: '#VF-2037', title: 'Health Misinformation Claim', priority: 'Medium', time: '25m ago', type: 'Text' },
                { id: '#VF-2036', title: 'Audio Manipulation Check', priority: 'Low', time: '1h ago', type: 'Audio' }
              ].map((case_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-slate-700 cursor-pointer">
                  <div className={`w-2 h-12 rounded-full ${case_.priority === 'Critical' ? 'bg-red-500' : case_.priority === 'High' ? 'bg-orange-500' : case_.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 font-mono text-sm">{case_.id}</span>
                      <span className="badge badge-neutral text-xs">{case_.type}</span>
                    </div>
                    <div className="text-white font-medium">{case_.title}</div>
                    <div className="text-xs text-slate-500">{case_.time}</div>
                  </div>
                  <button className="btn btn-primary btn-sm">Investigate</button>
                </div>
              ))}
            </div>
          </div>

          {/* Forensic Tools */}
          <div className="card p-6">
            <h3 className="heading-sm text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Quick Tools
            </h3>
            <div className="space-y-2">
              {[
                { icon: Scan, label: 'Image Analysis', color: '#8b5cf6' },
                { icon: Video, label: 'Video Forensics', color: '#6366f1' },
                { icon: FileText, label: 'Text Verification', color: '#10b981' },
                { icon: Mic, label: 'Audio Check', color: '#f59e0b' },
                { icon: Globe, label: 'Geolocation', color: '#ec4899' }
              ].map((tool, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-colors text-left border border-slate-700">
                  <div style={{ background: `${tool.color}20` }} className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <tool.icon style={{ color: tool.color }} className="w-5 h-5" />
                  </div>
                  <span className="text-white font-medium text-sm">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Activity & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="heading-sm text-white mb-4">Team Collaboration</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', action: 'Verified case #VF-2035', time: '3m ago', avatar: '👩‍💼' },
                { name: 'Mike Ross', action: 'Flagged suspicious content', time: '8m ago', avatar: '👨‍💻' },
                { name: 'Emma Davis', action: 'Completed investigation', time: '15m ago', avatar: '👩‍🔬' }
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                  <div className="text-2xl">{activity.avatar}</div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{activity.name}</div>
                    <div className="text-slate-400 text-xs">{activity.action}</div>
                  </div>
                  <div className="text-slate-500 text-xs">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="heading-sm text-white mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Accuracy Rate</span>
                  <span className="text-green-400 font-semibold">94.5%</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '94.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Response Time</span>
                  <span className="text-blue-400 font-semibold">2.3 min</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Cases This Week</span>
                  <span className="text-purple-400 font-semibold">67/80</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '83.75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // REPORTER DASHBOARD - Unique Report Submission & Impact Center
  const renderReporterDashboard = () => {
    return (
      <div className="animate-fadeIn">
        {/* Report Center Header */}
        <div className="card p-6 mb-6 bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="heading-md text-white flex items-center gap-3">
                <Flag className="w-8 h-8 text-orange-400" />
                Reporter Command Center
              </h2>
              <p className="text-orange-200 mt-1">Track Reports & Community Impact</p>
            </div>
            <button className="btn btn-primary bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4" />
              Submit New Report
            </button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: FileText, label: 'Reports Submitted', value: '47', color: '#f59e0b', trend: '+5 this week' },
            { icon: CheckCircle, label: 'Accepted', value: '39', color: '#10b981', trend: '83% rate' },
            { icon: Users, label: 'People Helped', value: '2.4K', color: '#6366f1', trend: '+340 today' },
            { icon: Trophy, label: 'Impact Score', value: '892', color: '#ec4899', trend: 'Top 5%' }
          ].map((stat, i) => (
            <div key={i} className="card p-4 bg-slate-800/50">
              <div className="flex items-center justify-between mb-2">
                <stat.icon style={{ color: stat.color }} className="w-6 h-6" />
                <span className="text-xs" style={{ color: stat.color }}>{stat.trend}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Report Status & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* My Reports */}
          <div className="card p-6">
            <h3 className="heading-sm text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-400" />
              My Recent Reports
            </h3>
            <div className="space-y-3">
              {[
                { id: '#RPT-1023', title: 'Fake COVID Cure Claims', status: 'Under Review', impact: 'High', date: 'Today' },
                { id: '#RPT-1022', title: 'Manipulated Political Image', status: 'Verified', impact: 'Critical', date: 'Yesterday' },
                { id: '#RPT-1021', title: 'False Climate Data', status: 'In Progress', impact: 'Medium', date: '2 days ago' },
                { id: '#RPT-1020', title: 'Misleading Advertisement', status: 'Resolved', impact: 'Low', date: '3 days ago' }
              ].map((report, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-orange-400 font-mono text-sm">{report.id}</span>
                        <span className={`badge text-xs ${report.status === 'Verified' ? 'badge-success' : report.status === 'Resolved' ? 'badge-neutral' : 'badge-warning'}`}>{report.status}</span>
                      </div>
                      <div className="text-white font-medium">{report.title}</div>
                    </div>
                    <button className="text-slate-400 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{report.date}</span>
                    <span className={`font-semibold ${report.impact === 'Critical' ? 'text-red-400' : report.impact === 'High' ? 'text-orange-400' : report.impact === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>{report.impact} Impact</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Misinformation */}
          <div className="card p-6">
            <h3 className="heading-sm text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-400" />
              Trending Misinformation
            </h3>
            <div className="space-y-3">
              {[
                { topic: 'Health & Medicine', reports: 234, trend: '+45%', color: '#ef4444' },
                { topic: 'Political News', reports: 189, trend: '+32%', color: '#f59e0b' },
                { topic: 'Climate Change', reports: 156, trend: '+28%', color: '#10b981' },
                { topic: 'Technology', reports: 98, trend: '+15%', color: '#6366f1' },
                { topic: 'Finance', reports: 67, trend: '+8%', color: '#8b5cf6' }
              ].map((topic, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${topic.color}20` }}>
                    <span className="text-xl" style={{ color: topic.color }}>#{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{topic.topic}</div>
                    <div className="text-slate-400 text-xs">{topic.reports} reports</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-sm font-semibold">{topic.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="heading-sm text-white mb-4">Community Impact</h3>
            <div className="space-y-4">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                <div className="text-4xl font-bold text-white mb-2">2,431</div>
                <div className="text-orange-200 text-sm">Total People Protected This Month</div>
                <div className="text-green-400 text-xs mt-1">↑ 23% from last month</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-slate-800/30 text-center">
                  <div className="text-2xl font-bold text-white">156</div>
                  <div className="text-slate-400 text-xs">Reports Verified</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/30 text-center">
                  <div className="text-2xl font-bold text-white">4.8</div>
                  <div className="text-slate-400 text-xs">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="heading-sm text-white mb-4">Top Contributors</h3>
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Alex Johnson', reports: 312, badge: '🥇' },
                { rank: 2, name: 'Maria Garcia', reports: 289, badge: '🥈' },
                { rank: 3, name: 'David Lee', reports: 245, badge: '🥉' },
                { rank: 4, name: userData.name, reports: userData.verified || 47, badge: '⭐' }
              ].map((user, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${user.rank === 4 ? 'bg-orange-900/30 border border-orange-500/30' : 'bg-slate-800/30'}`}>
                  <div className="text-2xl">{user.badge}</div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{user.name}</div>
                    <div className="text-slate-400 text-xs">{user.reports} reports</div>
                  </div>
                  {user.rank === 4 && <span className="badge badge-warning text-xs">You</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // DASHBOARD - Role-specific routing
  const renderDashboard = () => {
    // Verifier gets unique Investigation Workspace dashboard and pages
    if (activeRole === 'verifier') {
      if (activePage === 'dashboard') return renderVerifierDashboard();
      if (activePage === 'queue') {
        return (
          <div className="animate-fadeIn">
            <div className="card p-6 mb-6">
              <h2 className="heading-md text-white mb-4">Investigation Queue</h2>
              <div className="space-y-3">
                {[
                  { id: '#VF-2039', title: 'Political Image Manipulation', priority: 'High', time: '5m ago', type: 'Image', status: 'Pending' },
                  { id: '#VF-2038', title: 'Deepfake Video Detection', priority: 'Critical', time: '12m ago', type: 'Video', status: 'In Progress' },
                  { id: '#VF-2037', title: 'Health Misinformation Claim', priority: 'Medium', time: '25m ago', type: 'Text', status: 'Pending' },
                  { id: '#VF-2036', title: 'Audio Manipulation Check', priority: 'Low', time: '1h ago', type: 'Audio', status: 'Pending' },
                  { id: '#VF-2035', title: 'Geolocation Verification', priority: 'Medium', time: '2h ago', type: 'Geo', status: 'Completed' }
                ].map((case_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className={`w-2 h-12 rounded-full ${case_.priority === 'Critical' ? 'bg-red-500' : case_.priority === 'High' ? 'bg-orange-500' : case_.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-400 font-mono text-sm">{case_.id}</span>
                        <span className="badge badge-neutral text-xs">{case_.type}</span>
                        <span className={`badge text-xs ${case_.status === 'Completed' ? 'badge-success' : case_.status === 'In Progress' ? 'badge-warning' : 'badge-neutral'}`}>{case_.status}</span>
                      </div>
                      <div className="text-white font-medium">{case_.title}</div>
                      <div className="text-xs text-slate-500">{case_.time}</div>
                    </div>
                    <button className="btn btn-primary btn-sm">Review</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      if (activePage === 'tools') {
        return (
          <div className="animate-fadeIn">
            <div className="card p-6">
              <h2 className="heading-md text-white mb-6">Forensic Analysis Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Scan, label: 'Image Analysis', desc: 'ELA, Metadata, Reverse Search', color: '#8b5cf6' },
                  { icon: Video, label: 'Video Forensics', desc: 'Deepfake detection, Frame analysis', color: '#6366f1' },
                  { icon: FileText, label: 'Text Verification', desc: 'Fact check, Sentiment analysis', color: '#10b981' },
                  { icon: Mic, label: 'Audio Check', desc: 'Voice clone, Spectrogram', color: '#f59e0b' },
                  { icon: Globe, label: 'Geolocation', desc: 'Shadow, Weather, Landmarks', color: '#ec4899' },
                  { icon: Database, label: 'Database Access', desc: 'Global fact-check databases', color: '#06b6d4' }
                ].map((tool, i) => (
                  <button key={i} className="card p-6 text-left hover:scale-105 transition-all">
                    <div style={{ background: `${tool.color}20` }} className="w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                      <tool.icon style={{ color: tool.color }} className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{tool.label}</h3>
                    <p className="text-slate-400 text-sm">{tool.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }
      if (activePage === 'team') {
        return (
          <div className="animate-fadeIn">
            <div className="card p-6">
              <h2 className="heading-md text-white mb-6">Team Collaboration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Active Team Members</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Chen', role: 'Lead Verifier', status: 'Online', cases: 45 },
                      { name: 'Mike Ross', role: 'Forensic Analyst', status: 'Online', cases: 38 },
                      { name: 'Emma Davis', role: 'Data Specialist', status: 'Away', cases: 32 },
                      { name: 'John Smith', role: 'Investigator', status: 'Offline', cases: 29 }
                    ].map((member, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                        <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-green-500' : member.status === 'Away' ? 'bg-yellow-500' : 'bg-slate-500'}`}></div>
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm">{member.name}</div>
                          <div className="text-slate-400 text-xs">{member.role} • {member.cases} cases</div>
                        </div>
                        <button className="btn btn-secondary btn-sm">Message</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-2">
                    {[
                      { user: 'Sarah', action: 'Completed #VF-2035', time: '2m ago' },
                      { user: 'Mike', action: 'Started #VF-2039', time: '5m ago' },
                      { user: 'Emma', action: 'Flagged #VF-2038', time: '10m ago' },
                      { user: 'John', action: 'Verified #VF-2033', time: '15m ago' }
                    ].map((activity, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-800/30 text-sm">
                        <span className="text-blue-400 font-medium">{activity.user}</span>
                        <span className="text-slate-300"> {activity.action}</span>
                        <span className="text-slate-500 ml-2">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (activePage === 'history') {
        return (
          <div className="animate-fadeIn">
            <div className="card p-6">
              <h2 className="heading-md text-white mb-6">Case History</h2>
              <div className="space-y-3">
                {[
                  { id: '#VF-2035', title: 'Geolocation Verification', result: 'Verified', date: '2 hours ago' },
                  { id: '#VF-2034', title: 'Fake News Article', result: 'False', date: '4 hours ago' },
                  { id: '#VF-2033', title: 'Image Manipulation', result: 'Verified', date: '1 day ago' },
                  { id: '#VF-2032', title: 'Video Deepfake', result: 'False', date: '1 day ago' },
                  { id: '#VF-2031', title: 'Audio Clone Detection', result: 'Verified', date: '2 days ago' }
                ].map((case_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div>
                      <div className="text-blue-400 font-mono text-sm mb-1">{case_.id}</div>
                      <div className="text-white font-medium">{case_.title}</div>
                      <div className="text-slate-500 text-xs">{case_.date}</div>
                    </div>
                    <span className={`badge ${case_.result === 'Verified' ? 'badge-success' : 'badge-error'}`}>{case_.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }

    // Reporter gets unique Report Center dashboard and pages
    if (activeRole === 'reporter') {
      if (activePage === 'dashboard') return renderReporterDashboard();
      if (activePage === 'submit') {
        return (
          <div className="animate-fadeIn">
            <div className="card p-6">
              <h2 className="heading-md text-white mb-6">Submit New Report</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Report Type</label>
                  <select className="input">
                    <option>Misinformation</option>
                    <option>Fake News</option>
                    <option>Manipulated Media</option>
                    <option>Deepfake</option>
                    <option>Scam</option>
                  </select>
                </div>
                <div>
                  <label className="text-white font-medium mb-2 block">Title</label>
                  <input type="text" className="input" placeholder="Brief description of the incident" />
                </div>
                <div>
                  <label className="text-white font-medium mb-2 block">Details</label>
                  <textarea className="input" rows="6" placeholder="Provide detailed information about what you found..."></textarea>
                </div>
                <div>
                  <label className="text-white font-medium mb-2 block">Evidence</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <FileUp className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-400">Upload screenshots, links, or other evidence</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">Impact Level</label>
                    <select className="input">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Category</label>
                    <select className="input">
                      <option>Health</option>
                      <option>Politics</option>
                      <option>Climate</option>
                      <option>Technology</option>
                      <option>Finance</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary w-full py-3 text-lg">
                  <Send className="w-5 h-5 mr-2" />
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        );
      }
      if (activePage === 'myreports') {
        return (
          <div className="animate-fadeIn">
            <div className="card p-6">
              <h2 className="heading-md text-white mb-6">My Reports</h2>
              <div className="space-y-3">
                {[
                  { id: '#RPT-1023', title: 'Fake COVID Cure Claims', status: 'Under Review', impact: 'High', date: 'Today', views: 1234 },
                  { id: '#RPT-1022', title: 'Manipulated Political Image', status: 'Verified', impact: 'Critical', date: 'Yesterday', views: 5678 },
                  { id: '#RPT-1021', title: 'False Climate Data', status: 'In Progress', impact: 'Medium', date: '2 days ago', views: 892 },
                  { id: '#RPT-1020', title: 'Misleading Advertisement', status: 'Resolved', impact: 'Low', date: '3 days ago', views: 456 },
                  { id: '#RPT-1019', title: 'Deepfake Celebrity Video', status: 'Verified', impact: 'Critical', date: '1 week ago', views: 9821 }
                ].map((report, i) => (
                  <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-orange-400 font-mono text-sm">{report.id}</span>
                          <span className={`badge text-xs ${report.status === 'Verified' ? 'badge-success' : report.status === 'Resolved' ? 'badge-neutral' : 'badge-warning'}`}>{report.status}</span>
                        </div>
                        <div className="text-white font-medium mb-2">{report.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex gap-4">
                        <span className="text-slate-500">{report.date}</span>
                        <span className="text-slate-400">{report.views} views</span>
                      </div>
                      <span className={`font-semibold ${report.impact === 'Critical' ? 'text-red-400' : report.impact === 'High' ? 'text-orange-400' : report.impact === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>{report.impact} Impact</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      if (activePage === 'trending') {
        return (
          <div className="animate-fadeIn">
            <div className="card p-6">
              <h2 className="heading-md text-white mb-6">Trending Misinformation</h2>
              <div className="space-y-4">
                {[
                  { topic: 'Health & Medicine', reports: 234, trend: '+45%', color: '#ef4444', description: 'False cure claims spreading rapidly' },
                  { topic: 'Political News', reports: 189, trend: '+32%', color: '#f59e0b', description: 'Manipulated images from recent events' },
                  { topic: 'Climate Change', reports: 156, trend: '+28%', color: '#10b981', description: 'Misleading data visualizations' },
                  { topic: 'Technology', reports: 98, trend: '+15%', color: '#6366f1', description: 'AI deepfake videos' },
                  { topic: 'Finance', reports: 67, trend: '+8%', color: '#8b5cf6', description: 'Investment scams' }
                ].map((topic, i) => (
                  <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${topic.color}20` }}>
                        <span className="text-xl font-bold" style={{ color: topic.color }}>#{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold">{topic.topic}</h3>
                          <div className="text-green-400 text-sm font-semibold">{topic.trend}</div>
                        </div>
                        <p className="text-slate-400 text-sm mb-2">{topic.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-xs">{topic.reports} active reports</span>
                          <button className="text-orange-400 text-xs hover:underline">View Details →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      if (activePage === 'impact') {
        return (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h2 className="heading-md text-white mb-6">Community Impact</h2>
                <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
                  <div className="text-5xl font-bold text-white mb-3">2,431</div>
                  <div className="text-orange-200">People Protected This Month</div>
                  <div className="text-green-400 text-sm mt-2">↑ 23% from last month</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/30 text-center">
                    <div className="text-3xl font-bold text-white">156</div>
                    <div className="text-slate-400 text-sm">Reports Verified</div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 text-center">
                    <div className="text-3xl font-bold text-white">4.8</div>
                    <div className="text-slate-400 text-sm">Avg Rating</div>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <h2 className="heading-md text-white mb-6">Your Achievements</h2>
                <div className="space-y-3">
                  {[
                    { icon: '🏆', title: 'Top Contributor', desc: 'Ranked in top 5% this month' },
                    { icon: '⭐', title: 'Quality Reporter', desc: '90% acceptance rate' },
                    { icon: '🎯', title: 'Impact Maker', desc: 'Helped 2K+ people' },
                    { icon: '🔥', title: '30 Day Streak', desc: 'Daily contributions' }
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                      <div className="text-3xl">{badge.icon}</div>
                      <div>
                        <div className="text-white font-medium">{badge.title}</div>
                        <div className="text-slate-400 text-sm">{badge.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    // User and other pages use standard navigation
    if (activePage === 'verify') {
      return (
        <div className="animate-fadeIn">
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 className="heading-md" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Verify Content</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icon: FileText, label: 'Text', mode: 'text' },
                { icon: Link2, label: 'URL', mode: 'url' },
                { icon: Image, label: 'Image', mode: 'image' },
                { icon: Video, label: 'Video', mode: 'video' },
                { icon: Mic, label: 'Audio', mode: 'audio' }
              ].map((type) => (
                <button key={type.mode} onClick={() => setVerifyMode(type.mode)} className="card" style={{ padding: '1.5rem', cursor: 'pointer', textAlign: 'center', border: verifyMode === type.mode ? '2px solid #6366f1' : '2px solid transparent' }}>
                  <type.icon style={{ width: '32px', height: '32px', color: verifyMode === type.mode ? '#6366f1' : '#94a3b8', margin: '0 auto 0.5rem' }} />
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f1f5f9' }}>{type.label}</div>
                </button>
              ))}
            </div>
            {(verifyMode === 'image' || verifyMode === 'video' || verifyMode === 'audio') ? (
              <div style={{ border: '2px dashed #475569', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={(e) => setSelectedFile(e.target.files[0])} />
                <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>
                  <FileUp style={{ width: '48px', height: '48px', color: '#64748b', margin: '0 auto 1rem' }} />
                  <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>Click to upload {verifyMode}</p>
                  {selectedFile && <p style={{ color: '#818cf8', fontSize: '0.875rem' }}>{selectedFile.name}</p>}
                </label>
              </div>
            ) : (
              <textarea value={verifyInput} onChange={(e) => setVerifyInput(e.target.value)} placeholder="Paste content to verify..." className="input" style={{ height: '150px', marginBottom: '1.5rem', resize: 'vertical' }} />
            )}
            <button onClick={handleVerify} disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>{loading ? 'Analyzing...' : 'Verify with AI'}</button>
          </div>
          {verifyResult && (
            <div className="card" style={{ padding: '2rem' }}>
              <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Verification Results</h3>
              <div style={{ padding: '2rem', borderRadius: '0.75rem', background: verifyResult.status === 'verified' ? 'rgba(16, 185, 129, 0.1)' : verifyResult.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `2px solid ${verifyResult.status === 'verified' ? '#10b981' : verifyResult.status === 'pending' ? '#f59e0b' : '#ef4444'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {verifyResult.status === 'verified' && <CheckCircle style={{ width: '48px', height: '48px', color: '#10b981' }} />}
                  {verifyResult.status === 'false' && <XCircle style={{ width: '48px', height: '48px', color: '#ef4444' }} />}
                  {verifyResult.status === 'pending' && <Clock style={{ width: '48px', height: '48px', color: '#f59e0b' }} />}
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.25rem' }}>Trust Score: {verifyResult.trustScore}%</div>
                    <div style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>Confidence: {verifyResult.confidence}</div>
                  </div>
                </div>
                <p style={{ color: '#f1f5f9', marginBottom: '1.5rem', lineHeight: '1.6' }}>{verifyResult.explanation}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {verifyResult.sources.map((source, i) => (
                    <span key={i} className="badge badge-success">{source}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activePage === 'analytics') {
      return (
        <div className="animate-fadeIn">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { icon: CheckCircle, label: 'Verifications', value: userData.verified, color: '#10b981' },
              { icon: Target, label: 'Accuracy', value: `${userData.accuracy}%`, color: '#6366f1' },
              { icon: Zap, label: 'Points', value: userData.points, color: '#f59e0b' },
              { icon: Activity, label: 'Streak', value: `${userData.streak} days`, color: '#ec4899' }
            ].map((stat, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', background: `${stat.color}20`, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <stat.icon style={{ width: '24px', height: '24px', color: stat.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>{stat.label}</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f1f5f9' }}>{stat.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={analyticsData.weekly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '0.5rem' }} />
                  <Area type="monotone" dataKey="verifications" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Categories</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={analyticsData.categories} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                    {analyticsData.categories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    if (activePage === 'badges') {
      return (
        <div className="animate-fadeIn">
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 className="heading-md" style={{ marginBottom: '2rem', color: '#f1f5f9' }}>Your Badges</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {badges.map((badge, i) => (
                <div key={i} className="card" style={{ padding: '2rem', background: badge.earned ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' : 'rgba(30, 41, 59, 0.5)', border: badge.earned ? '2px solid #6366f1' : '2px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '3rem' }}>{badge.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#f1f5f9', marginBottom: '0.25rem' }}>{badge.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{badge.desc}</p>
                    </div>
                  </div>
                  {badge.earned ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                      <CheckCircle style={{ width: '20px', height: '20px' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Earned!</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                      <Lock style={{ width: '20px', height: '20px' }} />
                      <span style={{ fontSize: '0.875rem' }}>Locked</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Leaderboard</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { rank: 1, name: 'Sarah Chen', points: 5420, icon: '🥇' },
                { rank: 2, name: 'Mike Johnson', points: 4890, icon: '🥈' },
                { rank: 3, name: 'Emma Davis', points: 4210, icon: '🥉' },
                { rank: 4, name: userData.name, points: userData.points, icon: '👤' }
              ].map((user, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: user.rank === 4 ? 'rgba(99, 102, 241, 0.1)' : 'rgba(51, 65, 85, 0.3)', borderRadius: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{user.icon}</span>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#f1f5f9' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Rank #{user.rank}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#818cf8' }}>{user.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activePage === 'learn') {
      return (
        <div className="animate-fadeIn">
          <div className="card" style={{ padding: '2rem' }}>
            <h2 className="heading-md" style={{ marginBottom: '2rem', color: '#f1f5f9' }}>Learning Hub</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {courses.map((course) => (
                <div key={course.id} className="card" style={{ padding: '2rem', background: 'rgba(30, 41, 59, 0.5)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{course.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f1f5f9', marginBottom: '0.25rem' }}>{course.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{course.duration}</p>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#94a3b8' }}>Progress</span>
                      <span style={{ color: '#f1f5f9', fontWeight: '600' }}>{course.progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#334155', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)', transition: 'width 0.3s' }}></div>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start Course'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activePage === 'settings') {
      return (
        <div className="animate-fadeIn">
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 className="heading-md" style={{ marginBottom: '2rem', color: '#f1f5f9' }}>Account Settings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Full Name</label><input type="text" defaultValue={userData.name} className="input" /></div>
              <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Email Address</label><input type="email" defaultValue={userData.email} className="input" /></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(51, 65, 85, 0.3)', borderRadius: '0.75rem' }}>
                <div><div style={{ fontSize: '1rem', fontWeight: '600', color: '#f1f5f9', marginBottom: '0.25rem' }}>Two-Factor Authentication</div><div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Add extra security to your account</div></div>
                <button className="btn btn-secondary">Enable</button>
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Danger Zone</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '2px solid rgba(239, 68, 68, 0.3)' }}><Download style={{ width: '18px', height: '18px' }} />Download My Data</button>
              <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '2px solid rgba(239, 68, 68, 0.3)' }}><Trash2 style={{ width: '18px', height: '18px' }} />Delete Account</button>
            </div>
          </div>
        </div>
      );
    }

    // Default Dashboard (User Role)
    return (
      <div className="animate-fadeIn">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { icon: Zap, label: 'Total Points', value: userData.points, color: '#6366f1' },
            { icon: Star, label: 'Level', value: userData.level, color: '#f59e0b' },
            { icon: Activity, label: 'Streak', value: `${userData.streak} days`, color: '#10b981' }
          ].map((stat, i) => (
            <div key={i} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: `${stat.color}20`, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <stat.icon style={{ width: '24px', height: '24px', color: stat.color }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>{stat.label}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f1f5f9' }}>{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 className="heading-md" style={{ marginBottom: '1rem', color: '#f1f5f9' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: Search, label: 'Verify Content', page: 'verify', color: '#6366f1' },
              { icon: BarChart3, label: 'Analytics', page: 'analytics', color: '#8b5cf6' },
              { icon: Award, label: 'Badges', page: 'badges', color: '#ec4899' },
              { icon: BookOpen, label: 'Learn', page: 'learn', color: '#10b981' }
            ].map((action, i) => (
              <button key={i} onClick={() => setActivePage(action.page)} className="card" style={{ padding: '1.5rem', cursor: 'pointer', textAlign: 'center', border: '2px solid transparent' }}>
                <action.icon style={{ width: '32px', height: '32px', color: action.color, margin: '0 auto 0.75rem' }} />
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f1f5f9' }}>{action.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div className="card card-glass" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="heading-lg" style={{ marginBottom: '0.5rem', color: '#f1f5f9' }}>Welcome, <span className="text-gradient">{userData.name}</span>!</h1>
            <p style={{ color: '#94a3b8' }}>
              Role: <span style={{ color: '#818cf8', fontWeight: '600', textTransform: 'capitalize' }}>{activeRole}</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-secondary"><Bell style={{ width: '18px', height: '18px' }} />Notifications</button>
            <button onClick={() => { setCurrentScreen('landing'); setActiveRole(''); setActivePage('dashboard'); }} className="btn btn-secondary"><LogOut style={{ width: '18px', height: '18px' }} />Logout</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Role-Specific Sidebar Navigation */}
              {activeRole === 'user' && [
                { icon: Home, label: 'Dashboard', page: 'dashboard' },
                { icon: Search, label: 'Verify', page: 'verify' },
                { icon: BarChart3, label: 'Analytics', page: 'analytics' },
                { icon: Award, label: 'Badges', page: 'badges' },
                { icon: BookOpen, label: 'Learn', page: 'learn' },
                { icon: Settings, label: 'Settings', page: 'settings' }
              ].map((item) => (
                <button key={item.page} onClick={() => setActivePage(item.page)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: activePage === item.page ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent', color: activePage === item.page ? 'white' : '#cbd5e1', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.3s' }}>
                  <item.icon style={{ width: '18px', height: '18px' }} />
                  {item.label}
                </button>
              ))}
              {activeRole === 'verifier' && [
                { icon: Home, label: 'Dashboard', page: 'dashboard' },
                { icon: Target, label: 'Investigation Queue', page: 'queue' },
                { icon: Zap, label: 'Forensic Tools', page: 'tools' },
                { icon: Users, label: 'Team Activity', page: 'team' },
                { icon: History, label: 'Case History', page: 'history' },
                { icon: Settings, label: 'Settings', page: 'settings' }
              ].map((item) => (
                <button key={item.page} onClick={() => setActivePage(item.page)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: activePage === item.page ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent', color: activePage === item.page ? 'white' : '#cbd5e1', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.3s' }}>
                  <item.icon style={{ width: '18px', height: '18px' }} />
                  {item.label}
                </button>
              ))}
              {activeRole === 'reporter' && [
                { icon: Home, label: 'Dashboard', page: 'dashboard' },
                { icon: Plus, label: 'Submit Report', page: 'submit' },
                { icon: FileText, label: 'My Reports', page: 'myreports' },
                { icon: TrendingUp, label: 'Trending Topics', page: 'trending' },
                { icon: Trophy, label: 'Community Impact', page: 'impact' },
                { icon: Settings, label: 'Settings', page: 'settings' }
              ].map((item) => (
                <button key={item.page} onClick={() => setActivePage(item.page)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: activePage === item.page ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : 'transparent', color: activePage === item.page ? 'white' : '#cbd5e1', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.3s' }}>
                  <item.icon style={{ width: '18px', height: '18px' }} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div>{renderDashboard()}</div>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem', zIndex: 40 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', background: 'rgba(51, 65, 85, 0.5)', borderRadius: '0.75rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>{safetyTips[carouselIndex].icon}</span>
          <div><h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f1f5f9', marginBottom: '0.25rem' }}>{safetyTips[carouselIndex].title}</h4><p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{safetyTips[carouselIndex].text}</p></div>
        </div>
      </div>
      {chatOpen && (
        <div style={{ position: 'fixed', bottom: '5rem', right: '1.5rem', width: '400px', maxWidth: 'calc(100vw - 3rem)', background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.1)', zIndex: 50 }}>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1rem 1.5rem', borderRadius: '1rem 1rem 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MessageSquare style={{ width: '20px', height: '20px', color: 'white' }} /><span style={{ fontWeight: '600', color: 'white' }}>VerityBot</span></div>
            <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}><X style={{ width: '20px', height: '20px' }} /></button>
          </div>
          <div style={{ height: '400px', overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: msg.role === 'user' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(51, 65, 85, 0.8)', color: 'white', fontSize: '0.875rem' }}>{msg.content}</div>
              </div>
            ))}
            {loading && <div style={{ display: 'flex', justifyContent: 'flex-start' }}><div style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(51, 65, 85, 0.8)' }}><div style={{ display: 'flex', gap: '0.5rem' }}>{[0, 1, 2].map(i => <div key={i} className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }}></div>)}</div></div></div>}
          </div>
          <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask me..." className="input" style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.875rem' }} />
              <button onClick={handleSendMessage} className="btn btn-primary" style={{ padding: '0.75rem' }}><Send style={{ width: '18px', height: '18px' }} /></button>
            </div>
          </div>
        </div>
      )}
      {!chatOpen && <button onClick={() => setChatOpen(true)} className="btn btn-primary animate-float" style={{ position: 'fixed', bottom: '5rem', right: '1.5rem', width: '56px', height: '56px', borderRadius: '50%', padding: 0, zIndex: 50 }}><MessageSquare style={{ width: '24px', height: '24px' }} /></button>}
    </div>
  );
};

export default VerityGuard;
