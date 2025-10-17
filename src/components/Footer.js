import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-dark-light border-t border-primary/20 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">VerityGuard</h3>
            <p className="text-gray-300">
              Building trust in digital projects through AI, verification, and gamification.
            </p>
            {/* TODO: Add social media links */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-primary transition-colors">Features</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a>
              </li>
              {/* TODO: Add links to Documentation, API, Community */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@verityguard.io</p>
              <p>Support: support@verityguard.io</p>
              {/* TODO: Add contact form or support widget */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} VerityGuard. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
