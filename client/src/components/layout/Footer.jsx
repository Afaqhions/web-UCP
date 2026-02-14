import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiMail, FiHeart } from 'react-icons/fi';
import { Button } from '../common/Button';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiTwitter, color: '#60a5fa', href: '#' },
    { icon: FiGithub, color: '#c084fc', href: '#' },
    { icon: FiLinkedin, color: '#22d3ee', href: '#' },
    { icon: FiInstagram, color: '#f472b6', href: '#' },
  ];

  const productLinks = [
    { label: '🏆 Competitions', to: '/competitions' },
    { label: '💎 Pricing', href: '#' },
    { label: '🔒 Security', href: '#' },
    { label: '📱 Mobile App', href: '#' },
  ];

  const companyLinks = [
    { label: '👥 About Us', href: '#' },
    { label: '📝 Blog', href: '#' },
    { label: '💼 Careers', href: '#' },
    { label: '📰 Press Kit', href: '#' },
  ];

  const supportLinks = [
    { label: '📧 Contact', href: '#' },
    { label: '❓ Help Center', href: '#' },
    { label: '🔐 Privacy Policy', href: '#' },
    { label: '📜 Terms of Service', href: '#' },
  ];

  return (
    <footer
      style={{
        position: 'relative',
        marginTop: '6rem',
        overflow: 'hidden',
        background: 'var(--color-dark-surface)',
        borderTop: '1px solid var(--color-dark-border)'
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '6rem 1.5rem 2rem',
        }}
      >
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(3, 1fr)',
            gap: '4rem',
            marginBottom: '6rem',
          }}
          className="responsive-grid"
        >
          {/* Brand Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 950,
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #fff 0%, var(--color-primary-400) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1.5rem',
                letterSpacing: '-1px'
              }}
            >
              TAAKRA
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '320px' }}>
              The global stage for competitive excellence. Join the elite community and rewrite the rules of the game.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map(({ icon: Icon, color, href }, idx) => (
                <SocialIcon key={idx} href={href} color={color}>
                  <Icon style={{ width: '20px', height: '20px' }} />
                </SocialIcon>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: 'PLATFORM', links: productLinks },
            { title: 'ORGANIZATION', links: companyLinks },
            { title: 'RESOURCES', links: supportLinks }
          ].map((col, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <FooterHeading>{col.title}</FooterHeading>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {col.links.map((link, idx) => (
                  <li key={idx}>
                    {link.to ? (
                      <FooterLink as={Link} to={link.to}>{link.label.toUpperCase()}</FooterLink>
                    ) : (
                      <FooterLink href={link.href}>{link.label.toUpperCase()}</FooterLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section - Refined HUD Style */}
        <div
          className="glass-dark animate-fade-in"
          style={{
            animationDelay: '0.5s',
            marginBottom: '4rem',
            padding: '3rem',
            borderRadius: '2rem',
            border: '1px solid var(--color-dark-border)',
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
              JOIN THE INNER CIRCLE
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Receive exclusive event access and platform updates.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flex: '1 1 400px' }}>
            <input
              type="email"
              placeholder="operator@taakra.com"
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                borderRadius: '1rem',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.05)',
                outline: 'none',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            />
            <Button variant="neon" size="lg">SUBSCRIBE</Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-dark-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '1px'
          }}
        >
          <div>
            © {currentYear} TAAKRA OPERATIONAL COMMAND. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</a>
            <a href="#" className="hover:text-white transition-colors">SERVICE_TERMS</a>
            <a href="#" className="hover:text-white transition-colors">SECURITY_MANIFESTO</a>
          </div>
        </div>
      </div>

      {/* Cinematic Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--color-primary-500), transparent)'
      }} />
    </footer>
  );
};

/* ====== Helper Components ====== */

const FooterHeading = ({ children }) => (
  <h4
    style={{
      color: '#fff',
      fontWeight: 900,
      fontSize: '0.8rem',
      marginBottom: '1.75rem',
      letterSpacing: '3px',
      textTransform: 'uppercase'
    }}
  >
    {children}
  </h4>
);

const FooterLink = ({ children, as: Component = 'a', ...props }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Component
      {...props}
      style={{
        color: hovered ? 'var(--color-primary-400)' : 'rgba(255,255,255,0.4)',
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontWeight: 800,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '1px',
        display: 'inline-block',
        transform: hovered ? 'translateX(8px)' : 'translateX(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Component>
  );
};

const SocialIcon = ({ children, href, color }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '1rem',
        background: hovered ? `${color}15` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.08)'}`,
        color: hovered ? color : 'rgba(255,255,255,0.3)',
        transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: hovered ? `0 0 20px ${color}30` : 'none',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
};
