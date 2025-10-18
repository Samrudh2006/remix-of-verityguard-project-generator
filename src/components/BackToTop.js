import React, { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={scrollTop}
      className="fixed bottom-6 right-6 z-50 neon-button shadow-lg"
      style={{ padding: '0.75rem 1rem' }}
    >
      ⬆️ Top
    </button>
  );
}
