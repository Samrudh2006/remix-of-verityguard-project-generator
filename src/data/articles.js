// Location-specific news articles for India
// Tagged with location: { state, city, scope: 'local'|'state'|'national' }

export const locationArticles = [
  // Annavaram local news (your example)
  {
    id: 101,
    title: 'Sri Veera Venkata Satyanarayana Swamy Temple Receives Record Donations',
    source: 'Annavaram Times',
    time: '2 hours ago',
    trustScore: 94,
    status: 'verified',
    location: { state: 'AP', city: 'Annavaram', scope: 'local' },
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=250&fit=crop',
    excerpt: 'The famous Annavaram temple reported a 40% increase in devotee donations this festival season, with enhanced safety measures...',
  },
  {
    id: 102,
    title: 'New Bridge Connecting Annavaram to Rajahmundry Under Construction',
    source: 'AP Local News',
    time: '5 hours ago',
    trustScore: 88,
    status: 'verified',
    location: { state: 'AP', city: 'Annavaram', scope: 'local' },
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=250&fit=crop',
    excerpt: 'The state government has approved a new bridge project to improve connectivity between Annavaram and Rajahmundry, reducing travel time...',
  },

  // Visakhapatnam (AP)
  {
    id: 103,
    title: 'Visakhapatnam Metro Rail Project Phase 2 Approved',
    source: 'Vizag Express',
    time: '3 hours ago',
    trustScore: 91,
    status: 'verified',
    location: { state: 'AP', city: 'Visakhapatnam', scope: 'local' },
    image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=400&h=250&fit=crop',
    excerpt: 'The central government has given the green light for Phase 2 of the Visakhapatnam Metro Rail project, covering 45 km...',
  },

  // Hyderabad (TG)
  {
    id: 104,
    title: 'Hyderabad Declared Best City for IT Startups in India',
    source: 'Telangana Today',
    time: '1 hour ago',
    trustScore: 93,
    status: 'verified',
    location: { state: 'TG', city: 'Hyderabad', scope: 'local' },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
    excerpt: 'A national survey ranks Hyderabad as the top destination for tech startups, citing infrastructure, talent pool, and supportive policies...',
  },

  // Mumbai (MH)
  {
    id: 105,
    title: 'Mumbai Coastal Road Project Nears Completion',
    source: 'Mumbai Mirror',
    time: '4 hours ago',
    trustScore: 89,
    status: 'verified',
    location: { state: 'MH', city: 'Mumbai', scope: 'local' },
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=250&fit=crop',
    excerpt: 'The ambitious coastal road project is set to open by year-end, promising to cut travel time across Mumbai by 30%...',
  },

  // Delhi
  {
    id: 106,
    title: 'Delhi Metro Introduces AI-Powered Crowd Management System',
    source: 'Delhi Times',
    time: '6 hours ago',
    trustScore: 90,
    status: 'verified',
    location: { state: 'DL', city: 'New Delhi', scope: 'local' },
    image: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=400&h=250&fit=crop',
    excerpt: 'DMRC launches an AI system to predict and manage rush-hour crowds, improving commuter experience and safety...',
  },

  // Bangalore (KA)
  {
    id: 107,
    title: 'Bangalore Water Crisis: New Desalination Plant Announced',
    source: 'Bangalore Herald',
    time: '8 hours ago',
    trustScore: 85,
    status: 'partial',
    location: { state: 'KA', city: 'Bangalore', scope: 'local' },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    excerpt: 'To address the water shortage, the state government proposes a large-scale desalination plant, though environmental concerns remain...',
  },

  // State-level news (Andhra Pradesh)
  {
    id: 108,
    title: 'Andhra Pradesh Launches Free Laptop Scheme for Students',
    source: 'AP Government Portal',
    time: '12 hours ago',
    trustScore: 92,
    status: 'verified',
    location: { state: 'AP', city: null, scope: 'state' },
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop',
    excerpt: 'The state government announced a program to distribute free laptops to 500,000 students across Andhra Pradesh...',
  },

  // State-level (Telangana)
  {
    id: 109,
    title: 'Telangana to Build 10 New Skill Development Centers',
    source: 'Telangana News',
    time: '10 hours ago',
    trustScore: 87,
    status: 'verified',
    location: { state: 'TG', city: null, scope: 'state' },
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
    excerpt: 'The government plans to establish skill centers in rural areas, focusing on IT, healthcare, and manufacturing training...',
  },

  // National news (always shown)
  {
    id: 1,
    title: 'Breakthrough in Renewable Energy: New Solar Panel Efficiency Reaches 47%',
    source: 'Science Daily',
    time: 'about 2 hours ago',
    trustScore: 92,
    status: 'verified',
    location: { state: null, city: null, scope: 'national' },
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
    excerpt: 'Researchers at MIT have developed a revolutionary solar panel design that achieves unprecedented 47% efficiency, marking a major...',
  },
  {
    id: 2,
    title: 'Global Summit Reaches Historic Climate Agreement',
    source: 'Reuters',
    time: 'about 5 hours ago',
    trustScore: 88,
    status: 'verified',
    location: { state: null, city: null, scope: 'national' },
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=250&fit=crop',
    excerpt: 'World leaders have signed a landmark climate agreement at the UN summit, committing to carbon neutrality by 2040. The accord includes...',
  },
  {
    id: 3,
    title: 'Tech Giant Announces Revolutionary AI Chip',
    source: 'TechCrunch',
    time: 'about 8 hours ago',
    trustScore: 72,
    status: 'partial',
    location: { state: null, city: null, scope: 'national' },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
    excerpt: 'A major technology company unveiled its latest AI processor, claiming 10x performance improvements over current generation chips....',
  },
  {
    id: 4,
    title: 'New Study Links Coffee Consumption to Extended Lifespan',
    source: 'Health Today',
    time: 'about 12 hours ago',
    trustScore: 85,
    status: 'verified',
    location: { state: null, city: null, scope: 'national' },
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop',
    excerpt: 'Recent research suggests moderate coffee consumption may contribute to longevity and reduced disease risk...',
  },
  {
    id: 5,
    title: 'Viral Video Claims Show Fake Moon Landing Evidence',
    source: 'Social Media',
    time: 'about 1 day ago',
    trustScore: 15,
    status: 'false',
    location: { state: null, city: null, scope: 'national' },
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop',
    excerpt: 'A widely circulated video alleges evidence of staged moon landings, but fact-checkers have debunked these claims...',
  },
  {
    id: 6,
    title: 'Economic Recovery Accelerates in Major Markets',
    source: 'Financial Times',
    time: 'about 1 day ago',
    trustScore: 90,
    status: 'verified',
    location: { state: null, city: null, scope: 'national' },
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    excerpt: 'Global economic indicators show strong recovery momentum across developed markets, with GDP growth exceeding forecasts...',
  },
];
