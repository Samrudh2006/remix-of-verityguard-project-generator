import React from 'react';

function Hero() {
  const handleGetStarted = () => {
    // TODO: Add authentication flow or redirect to dashboard
    console.log('Get Started clicked - Redirect to sign up');
  };

  return (
    <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Build Trust in the{' '}
              <span className="text-primary animate-glow">Digital Age</span>
            </h1>
            <p className="text-xl text-gray-300">
              VerityGuard is your AI-powered project generator that helps you create secure, 
              trustworthy applications with built-in verification and gamification features.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleGetStarted} className="neon-button">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 font-semibold">
                Learn More
              </button>
            </div>
            {/* TODO: Add Trust Score preview widget here */}
          </div>

          {/* Right side - Hero image/illustration */}
          <div className="relative">
            <div className="glass-card p-8">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-dark-lighter rounded-lg flex items-center justify-center">
                <svg className="w-64 h-64 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              {/* TODO: Replace with actual hero illustration or 3D model */}
            </div>
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
