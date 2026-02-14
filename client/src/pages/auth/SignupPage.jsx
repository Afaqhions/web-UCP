import { SignUp } from '@clerk/clerk-react';

const SignupPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
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
          top: '0%',
          right: '0%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--color-primary-900) -50%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0%',
          left: '0%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--color-accent-900) -50%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.2
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '520px', display: 'flex', justifyContent: 'center' }}>
        <SignUp signInUrl="/login" forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
};

export default SignupPage;
