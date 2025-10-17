export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    }}>
      <div style={{
        maxWidth: '600px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}>
          VerityGuard
        </h1>
        <p style={{
          fontSize: '1.25rem',
          marginBottom: '2rem',
          opacity: 0.9,
        }}>
          AI-Powered Misinformation Detection Platform
        </p>
        <p style={{
          fontSize: '1rem',
          opacity: 0.8,
        }}>
          Project from Orchids.app - remix-of-verityguard-project-generator
        </p>
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '0.5rem',
          backdropFilter: 'blur(10px)',
        }}>
          <p style={{
            fontSize: '0.875rem',
            opacity: 0.9,
          }}>
            ✅ Web preview is now working!
          </p>
        </div>
      </div>
    </main>
  );
}
