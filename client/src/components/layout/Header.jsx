import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { Dropdown } from '../common/Dropdown';

export const Header = () => {
  const { user, clerkUser, isSignedIn, loading, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDarkPage = ['/', '/login', '/signup'].includes(location.pathname);
  // On dark pages, when not scrolled, text should be white.
  // When scrolled (glass-strong white bg) or on light pages, text should be dark.
  const isTextWhite = isDarkPage && !scrolled;
  const textColor = isTextWhite ? 'rgba(255, 255, 255, 0.9)' : '#374151';

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 smooth-transition ${scrolled
        ? 'glass-dark shadow-glow'
        : 'bg-transparent'
        }`}
      style={{
        borderBottom: scrolled
          ? '1px solid var(--color-dark-border)'
          : 'none',
        padding: scrolled ? '0.5rem 0' : '1.25rem 0'
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Logo - Cinematic & Futuristic */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          style={{ textDecoration: 'none' }}
        >
          <div className="relative">
            <span
              className="font-black animate-gradient"
              style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #fff 0%, var(--color-primary-400) 50%, var(--color-accent-500) 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-1px',
                display: 'block'
              }}
            >
              TAAKRA
            </span>
            <div
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full smooth-transition-slow group-hover:w-full"
              style={{ width: '0%', opacity: 0.8 }}
            />
          </div>
        </Link>

        {/* Desktop Navigation - Elite Centered Links */}
        <nav
          className="hidden md:flex items-center"
          style={{ gap: '2.5rem' }}
        >
          <NavLink to="/competitions">EVENTS</NavLink>
          {isSignedIn && (
            <>
              <NavLink to="/dashboard">DASHBOARD</NavLink>
              {isAdmin() && (
                <NavLink to="/admin">
                  <span className="flex items-center gap-2">
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-neon-emerald)', boxShadow: '0 0 8px var(--color-neon-emerald)' }} />
                    ADMIN
                  </span>
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Desktop Actions - High-Tech Buttons */}
        <div className="hidden md:flex items-center" style={{ gap: '1.25rem' }}>
          {isSignedIn ? (
            <Dropdown
              trigger={
                <div
                  className="flex items-center glass cursor-pointer hover-lift group"
                  style={{
                    gap: '0.75rem',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '99px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    color: '#fff',
                    fontWeight: 700
                  }}>
                    {user?.name?.charAt(0) || clerkUser?.firstName?.charAt(0) || clerkUser?.primaryEmailAddress?.emailAddress?.charAt(0) || 'U'}
                  </div>
                  <span
                    className="font-bold tracking-wider"
                    style={{ color: '#fff', fontSize: '0.8rem' }}
                  >
                    {user?.name?.split(' ')[0]?.toUpperCase() || clerkUser?.firstName?.toUpperCase() || 'USER'}
                  </span>
                  <FiChevronDown
                    style={{ color: 'rgba(255,255,255,0.5)', width: '14px', height: '14px' }}
                  />
                </div>
              }
              items={[
                { label: '🛡️ PROFILE', onClick: () => navigate('/profile') },
                { label: '⚙️ SETTINGS', onClick: () => navigate('/settings') },
                { label: '🚪 LOGOUT', onClick: logout },
              ]}
            />
          ) : (
            <>
              <Button
                variant="ghost"
                size="md"
                onClick={() => navigate('/login')}
                style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 800, fontSize: '0.85rem' }}
              >
                LOGIN
              </Button>
              <Button
                variant="neon"
                size="md"
                onClick={() => navigate('/signup')}
                style={{ height: '44px', padding: '0 1.5rem', fontSize: '0.85rem' }}
              >
                GET STARTED
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden glass"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            color: '#fff',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            padding: '0.6rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu - Immersive Dark HUD */}
      {mobileMenuOpen && (
        <div
          className="md:hidden glass-dark animate-fade-in-down"
          style={{
            padding: '2rem',
            margin: '1rem',
            borderRadius: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'rgba(11, 13, 23, 0.98)',
            border: '1px solid var(--color-dark-border)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          <MobileLink to="/competitions" onClick={() => setMobileMenuOpen(false)}>
            EVENTS
          </MobileLink>
          {isSignedIn && (
            <>
              <MobileLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                DASHBOARD
              </MobileLink>
              {isAdmin() && (
                <MobileLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  ADMIN PANEL
                </MobileLink>
              )}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.5rem 0' }} />
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                LOGOUT
              </button>
            </>
          )}
          {!isSignedIn && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '1rem'
              }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                style={{ width: '100%' }}
              >
                LOGIN
              </Button>
              <Button
                variant="neon"
                size="lg"
                onClick={() => navigate('/signup')}
                style={{ width: '100%' }}
              >
                SIGN UP
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

/* ---------- Helper sub-components ---------- */

const NavLink = ({ to, children, color, hoverColor }) => (
  <Link
    to={to}
    className="group"
    style={{
      position: 'relative',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
      color: color,
      transition: 'color 200ms ease',
      padding: '0.25rem 0',
    }}
    onMouseEnter={e => { e.currentTarget.style.color = hoverColor; }}
    onMouseLeave={e => { e.currentTarget.style.color = color; }}
  >
    <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    <span
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
        borderRadius: '999px',
        transition: 'width 300ms ease',
      }}
      className="group-hover:!w-full"
    />
  </Link>
);

const MobileLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    style={{
      display: 'block',
      textDecoration: 'none',
      padding: '0.75rem 1rem',
      borderRadius: '0.75rem',
      fontWeight: 500,
      fontSize: '0.95rem',
      color: '#374151',
      transition: 'all 200ms ease',
    }}
    onMouseEnter={e => { e.target.style.background = 'rgba(139, 92, 246, 0.1)'; e.target.style.color = '#7c3aed'; }}
    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#374151'; }}
  >
    {children}
  </Link>
);
