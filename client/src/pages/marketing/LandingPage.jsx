import React, { useEffect, useState } from 'react';
import { Button } from '../../components/common/Button';
import { FiTrendingUp, FiUsers, FiAward, FiZap, FiTarget, FiStar, FiArrowRight } from 'react-icons/fi';

export const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <FiAward />,
      title: 'Compete & Win',
      description: 'Participate in exciting competitions and showcase your talents to the world.',
      gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    },
    {
      icon: <FiUsers />,
      title: 'Connect',
      description: 'Network with like-minded individuals and build meaningful relationships.',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    },
    {
      icon: <FiZap />,
      title: 'Real-time Chat',
      description: 'Chat with mentors, judges, and other participants instantly.',
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
    },
    {
      icon: <FiTarget />,
      title: 'AI Support',
      description: 'Get guidance from our intelligent assistant 24/7.',
      gradient: 'linear-gradient(135deg, #22c55e, #10b981)',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Track Progress',
      description: 'Monitor your performance with detailed analytics and leaderboards.',
      gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
    },
    {
      icon: <FiStar />,
      title: 'Showcase',
      description: 'Build your portfolio and make your mark in the community.',
      gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      image: '👩‍💼',
      quote: 'Taakra helped me showcase my design skills and land my dream job!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Software Developer',
      image: '👨‍💻',
      quote: 'The competitions are challenging and the community is incredibly supportive.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Digital Artist',
      image: '👩‍🎨',
      quote: 'Best platform for creative professionals to connect and compete!',
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: '👥', color: '#a855f7' },
    { label: 'Competitions', value: '500+', icon: '🏆', color: '#3b82f6' },
    { label: 'Success Rate', value: '98%', icon: '📈', color: '#22c55e' },
    { label: 'Countries', value: '150+', icon: '🌍', color: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* ====== Animated Background ====== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'linear-gradient(160deg, #0f0c29 0%, #302b63 40%, #24243e 100%)',
        }}
      >
        <div className="bg-pattern-dots" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animationDelay: '1s',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '30%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animationDelay: '2s',
            transform: `translateY(${scrollY * 0.25}px)`,
          }}
        />
      </div>

      {/* ====== HERO SECTION ====== */}
      <section style={{
        position: 'relative',
        padding: '10rem 1.5rem 8rem',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center' }}>
            {/* Super Header Badge */}
            <div
              className="glass-dark animate-fade-in-down"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                marginBottom: '3rem',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)'
              }}
            >
              <span style={{ position: 'relative', display: 'flex', width: '12px', height: '12px' }}>
                <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-neon-emerald)', opacity: 0.75 }} />
                <span style={{ position: 'relative', display: 'inline-flex', width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>
                LIVE: 12 Active Championships
              </span>
            </div>

            {/* Cinematic Main Heading */}
            <h1
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '2rem'
              }}
            >
              <span
                className="animate-fade-in-up"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  color: '#fff',
                  lineHeight: 1,
                  animationDelay: '0.1s',
                  letterSpacing: '-2px'
                }}
              >
                THE ULTIMATE ARENA FOR
              </span>
              <span
                className="animate-fade-in-up gradient-text-neon"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                  fontWeight: 950,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 0.9,
                  animationDelay: '0.3s',
                  letterSpacing: '-4px',
                  filter: 'drop-shadow(0 0 30px rgba(0, 245, 160, 0.3))'
                }}
              >
                CREATIVE ELITES
              </span>
            </h1>

            {/* Refined Subtext */}
            <p
              className="animate-fade-in-up"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '800px',
                margin: '0 auto 4rem',
                lineHeight: 1.8,
                animationDelay: '0.5s',
                fontFamily: 'var(--font-sans)',
                fontWeight: 400
              }}
            >
              Step into a high-stakes environment where talent meets recognition.
              Join <span style={{ color: '#fff', fontWeight: 700 }}>50,000+ elite creators</span> globaly
              to compete for prestige, prizes, and future-defining opportunities.
            </p>

            {/* Primary Actions */}
            <div
              className="animate-fade-in-up"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                justifyContent: 'center',
                alignItems: 'center',
                animationDelay: '0.7s',
              }}
            >
              <Button
                size="lg"
                variant="neon"
                onClick={() => (window.location.href = '/signup')}
                style={{
                  minWidth: '240px',
                  height: '64px',
                  fontSize: '1.1rem',
                  boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)'
                }}
              >
                JOIN THE ARENA <FiArrowRight size={22} />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => (window.location.href = '/competitions')}
                style={{
                  minWidth: '240px',
                  height: '64px',
                  fontSize: '1.1rem'
                }}
              >
                EXPLORE EVENTS
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                animationDelay: '2s'
              }}
            >
              <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--color-primary-500), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATS SECTION ====== */}
      <section style={{ padding: '3rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card hover-lift animate-fade-in-up"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  textAlign: 'center',
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {/* Glow on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at center, ${stat.color}15, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 300ms ease',
                  }}
                  className="group-hover:opacity-100"
                />
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: '0.25rem',
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#6b7280',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section Header */}
          <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #c084fc, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Why Choose Taakra?
            </h2>
            <p
              style={{
                fontSize: '1.15rem',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Experience the ultimate platform designed for ambitious creators who want to{' '}
              <span style={{ fontWeight: 700, color: '#c084fc' }}>stand out and succeed</span>
            </p>
          </div>

          {/* Features Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {features.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} delay={idx * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS SECTION ====== */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Loved by Creators
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              See what our community members have to say
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-card hover-lift animate-fade-in-up"
                style={{
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} style={{ fontSize: '1.1rem', color: '#fbbf24' }}>⭐</span>
                  ))}
                </div>
                <p
                  style={{
                    color: '#4b5563',
                    marginBottom: '1.5rem',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                  }}
                >
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>{t.image}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section style={{ padding: '5rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            className="animate-fade-in-up"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2rem',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899, #3b82f6)',
              padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 4rem)',
              textAlign: 'center',
            }}
          >
            {/* Background pattern */}
            <div
              className="bg-pattern-grid"
              style={{ position: 'absolute', inset: 0, opacity: 0.12 }}
            />

            {/* Floating Orbs */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '2rem',
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '50%',
              }}
            />
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '2rem',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '50%',
                animationDelay: '1s',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  marginBottom: '1rem',
                  color: '#fff',
                }}
              >
                Ready to Shine? ✨
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '2.5rem',
                  maxWidth: '600px',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.7,
                }}
              >
                Join thousands of talented creators and start your journey to success today.{' '}
                <span style={{ fontWeight: 700 }}>It's completely free!</span>
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <button
                  onClick={() => (window.location.href = '/signup')}
                  className="hover-lift btn-glow"
                  style={{
                    padding: '1rem 2.5rem',
                    borderRadius: '1rem',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    background: '#fff',
                    color: '#7c3aed',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    transition: 'all 300ms ease',
                  }}
                  onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
                >
                  🎯 Create Free Account
                </button>
                <button
                  onClick={() => (window.location.href = '/competitions')}
                  style={{
                    padding: '1rem 2.5rem',
                    borderRadius: '1rem',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    background: 'transparent',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    transition: 'all 300ms ease',
                  }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                >
                  🔍 Browse Competitions
                </button>
              </div>

              {/* Trust Badge */}
              <div
                style={{
                  marginTop: '2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>
                  ✓ No credit card required
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ====== Feature Card Component ====== */
const FeatureCard = ({ feature, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1.5rem',
        padding: '2rem',
        animationDelay: `${delay}s`,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 40px rgba(0,0,0,0.12)'
          : '0 4px 6px rgba(0,0,0,0.04), 0 10px 30px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient glow bg on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: feature.gradient,
          opacity: hovered ? 0.06 : 0,
          transition: 'opacity 400ms ease',
        }}
      />

      {/* Icon */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          padding: '1rem',
          borderRadius: '1rem',
          background: feature.gradient,
          color: '#fff',
          marginBottom: '1.25rem',
          fontSize: '1.75rem',
          transition: 'all 300ms ease',
          transform: hovered ? 'scale(1.1) rotate(6deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        {feature.icon}
      </div>

      {/* Content */}
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: hovered ? '#7c3aed' : '#1f2937',
          transition: 'color 200ms ease',
        }}
      >
        {feature.title}
      </h3>
      <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.95rem' }}>
        {feature.description}
      </p>

      {/* Decorative blur */}
      <div
        style={{
          position: 'absolute',
          bottom: '-1rem',
          right: '-1rem',
          width: '100px',
          height: '100px',
          background: feature.gradient,
          borderRadius: '50%',
          opacity: hovered ? 0.12 : 0,
          filter: 'blur(30px)',
          transition: 'opacity 400ms ease',
        }}
      />
    </div>
  );
};

export default LandingPage;
