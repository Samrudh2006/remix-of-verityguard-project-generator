import React from 'react';

function Features() {
  const features = [
    {
      id: 1,
      title: 'AI-Powered Generation',
      description: 'Leverage advanced AI to generate secure, scalable project templates tailored to your needs.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      // TODO: Add AI chat integration here
    },
    {
      id: 2,
      title: 'Trust Score System',
      description: 'Build credibility with our innovative Trust Score that tracks your project quality and user engagement.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      // TODO: Add Trust Score visualization component
    },
    {
      id: 3,
      title: 'Gamification & Rewards',
      description: 'Earn points, unlock badges, and level up as you build better projects and engage with the community.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      // TODO: Add points/badges display widget
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-dark to-dark-light">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to build trustworthy, engaging projects
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="glass-card">
              {/* Icon */}
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              
              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              
              {/* CTA Button */}
              <button className="mt-6 text-primary hover:text-white transition-colors duration-300 font-semibold flex items-center gap-2">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* 
          TODO: Additional feature sections to add:
          - Interactive demo section
          - User testimonials with Trust Scores
          - Comparison table
          - Integration showcase
        */}
      </div>
    </section>
  );
}

export default Features;
