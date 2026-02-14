import React, { useState } from 'react';

/**
 * Pure Tailwind CSS Showcase Page
 * Demonstrates advanced Tailwind patterns without custom CSS
 * - Glassmorphism
 * - Animated gradients
 * - Responsive grid layouts
 * - Hover animations
 * - Dark mode support
 * - Accessibility features
 */

export const TailwindShowcase = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Taakra Premium
          </h1>
          <div className="hidden md:flex gap-8 text-white/70">
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors duration-300">Testimonials</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-8 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-md">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
              ✨ Next Generation Platform
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
            Compete at Your
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
              Highest Level
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
            Join thousands of competitors in thrilling competitions. Network, learn, and prove your skills on a global stage with our cutting-edge platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 active:scale-95">
              Start Competing Now
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:border-white/50">
              Watch Demo
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '50K+', label: 'Active Users', icon: '👥' },
              { value: '500+', label: 'Competitions', icon: '🏆' },
              { value: '150+', label: 'Countries', icon: '🌍' },
            ].map((stat, idx) => (
              <div key={idx} className="group p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose Taakra?
            </h2>
            <p className="text-xl text-white/60">Everything you need to succeed</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Precision Matching',
                description: 'AI-powered competition recommendations tailored to your skills and interests.',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                border: 'border-blue-400/30',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Optimized platform for instant registration and seamless experience.',
                gradient: 'from-yellow-500/20 to-orange-500/20',
                border: 'border-yellow-400/30',
              },
              {
                icon: '🔐',
                title: 'Secure & Safe',
                description: 'Bank-level encryption protecting your data and transactions.',
                gradient: 'from-green-500/20 to-emerald-500/20',
                border: 'border-green-400/30',
              },
              {
                icon: '💬',
                title: 'Real-time Chat',
                description: 'Connect instantly with other competitors and mentors.',
                gradient: 'from-purple-500/20 to-pink-500/20',
                border: 'border-purple-400/30',
              },
              {
                icon: '📊',
                title: 'Analytics',
                description: 'Track your performance with detailed insights and leaderboards.',
                gradient: 'from-red-500/20 to-pink-500/20',
                border: 'border-red-400/30',
              },
              {
                icon: '🤖',
                title: 'AI Assistant',
                description: '24/7 intelligent support ready to help you succeed.',
                gradient: 'from-indigo-500/20 to-purple-500/20',
                border: 'border-indigo-400/30',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br ${feature.gradient} border ${feature.border} hover:border-white/30 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20`}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
                <div className="mt-4 w-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/60">Choose the perfect plan for your journey</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '0',
                period: 'Forever Free',
                features: [
                  'Access to 5 competitions',
                  'Basic chat support',
                  'Profile showcase',
                  'Competition results',
                ],
                cta: 'Get Started',
                highlighted: false,
              },
              {
                name: 'Professional',
                price: '9.99',
                period: 'per month',
                features: [
                  'Unlimited competitions',
                  'Priority chat support',
                  'Advanced analytics',
                  'Custom portfolio',
                  'Certificate badges',
                  'Mentor access',
                ],
                cta: 'Start Free Trial',
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'per month',
                features: [
                  'Everything in Pro',
                  'Dedicated account manager',
                  'Custom competitions',
                  'White-label options',
                  'API access',
                  'Priority support',
                ],
                cta: 'Contact Sales',
                highlighted: false,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                className={`relative rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-purple-400/60 ring-2 ring-purple-400/30 shadow-2xl shadow-purple-500/20'
                    : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    ${plan.price}
                  </span>
                  <span className="text-white/60">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-white/80">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                        <span className="text-xs text-slate-900 font-bold">✓</span>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105'
                      : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Loved by Competitors
            </h2>
            <p className="text-xl text-white/60">Join thousands of success stories</p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Product Designer',
                avatar: '👩‍💼',
                text: 'Taakra transformed how I showcase my work. The platform is intuitive and the community is incredibly supportive.',
                rating: 5,
              },
              {
                name: 'Alex Rodriguez',
                role: 'Full-Stack Developer',
                avatar: '👨‍💻',
                text: 'Best decision I made was joining Taakra. I\'ve won 3 competitions and landed my dream job through connections here.',
                rating: 5,
              },
              {
                name: 'Emma Watson',
                role: 'Content Creator',
                avatar: '👩‍🎨',
                text: 'The real-time chat and AI support are game-changers. I get instant feedback and can improve so much faster.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <span key={idx} className="text-xl">⭐</span>
                  ))}
                </div>

                <p className="text-white/80 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ready to Compete?
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Join our community of passionate competitors and start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 active:scale-95">
              Start Your Journey
            </button>
            <button className="px-12 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:border-white/50">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-purple-900/20 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Community', links: ['Discord', 'Twitter', 'LinkedIn', 'GitHub'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Contact'] },
          ].map((column, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-white mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, lidx) => (
                  <li key={lidx}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>© 2026 Taakra. All rights reserved. Built with ✨ using modern web technologies.</p>
        </div>
      </footer>
    </div>
  );
};

export default TailwindShowcase;
