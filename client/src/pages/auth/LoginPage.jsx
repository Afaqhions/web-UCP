import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
        background: 'var(--color-dark-bg)',
        overflow: 'hidden'
      }}
    >
      {/* Cinematic Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="bg-pattern-dots" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, var(--color-primary-900) -50%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.3
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <SignIn signUpUrl="/signup" forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
};

export default LoginPage;
