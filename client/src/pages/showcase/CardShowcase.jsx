import React, { useState } from 'react';

/**
 * Premium Card Component - Pure Tailwind CSS
 * Demonstrates: Glassmorphism, Animations, Dark Mode, Accessibility
 */
export const PremiumCardShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cards = [
    {
      title: 'Interactive Learning',
      description: 'Master new skills through real competitions',
      icon: '📚',
      gradient: 'from-blue-600 to-cyan-600',
      darkGradient: 'dark:from-blue-500 dark:to-cyan-500',
    },
    {
      title: 'Global Network',
      description: 'Connect with talented people worldwide',
      icon: '🌐',
      gradient: 'from-purple-600 to-pink-600',
      darkGradient: 'dark:from-purple-500 dark:to-pink-500',
    },
    {
      title: 'Real Rewards',
      description: 'Win prizes and recognition for your achievements',
      icon: '🏆',
      gradient: 'from-yellow-600 to-orange-600',
      darkGradient: 'dark:from-yellow-500 dark:to-orange-500',
    },
    {
      title: 'Career Growth',
      description: 'Build your portfolio and land amazing opportunities',
      icon: '📈',
      gradient: 'from-green-600 to-emerald-600',
      darkGradient: 'dark:from-green-500 dark:to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 dark:text-white">
          Experience Excellence
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Discover why thousands of competitors choose Taakra for their next big opportunity
        </p>
      </div>

      {/* Card Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 cursor-pointer
                ${hoveredIndex === idx ? 'transform scale-105 shadow-2xl' : 'shadow-lg'}
                bg-gradient-to-br ${card.gradient} ${card.darkGradient}
              `}
            >
              {/* Card Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`text-5xl mb-4 transition-all duration-300 ${hoveredIndex === idx ? 'scale-125 rotate-12' : ''}`}>
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>

                {/* Description */}
                <p className="text-white/90 text-sm leading-relaxed mb-6">{card.description}</p>

                {/* CTA Link */}
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Learn More</span>
                  <span className={`transition-transform duration-300 ${hoveredIndex === idx ? 'translate-x-2' : ''}`}>→</span>
                </div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Dashboard Stats Grid - Pure Tailwind
 * Features: Animated counters, Dark mode, Responsive grid
 */
export const StatsDashboard = () => {
  const stats = [
    { label: 'Total Competitions', value: '1,234', change: '+12%', icon: '🏆', color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Users', value: '45,678', change: '+8%', icon: '👥', color: 'from-purple-500 to-pink-500' },
    { label: 'Prize Pool', value: '$125K', change: '+15%', icon: '💰', color: 'from-yellow-500 to-orange-500' },
    { label: 'Success Rate', value: '98.5%', change: '+2%', icon: '✅', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Platform Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">Real-time insights into our thriving community</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Background Gradient Accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Icon */}
              <div className="relative z-10 text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="relative z-10 mb-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-4xl font-black text-gray-900 dark:text-white">{stat.value}</p>
              </div>

              {/* Change Indicator */}
              <div className="relative z-10 flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <span>↑</span>
                <span className="text-sm">{stat.change}</span>
              </div>

              {/* Hover Bar */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.color} group-hover:w-full transition-all duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Team Members Grid - Pure Tailwind
 * Features: Image placeholders, Hover effects, Social links
 */
export const TeamShowcase = () => {
  const team = [
    { name: 'Alice Johnson', role: 'CEO & Founder', avatar: '👩‍💼', social: ['tw', 'li', 'gh'] },
    { name: 'Bob Smith', role: 'CTO', avatar: '👨‍💻', social: ['tw', 'li', 'gh'] },
    { name: 'Carol White', role: 'Design Lead', avatar: '👩‍🎨', social: ['tw', 'li', 'gh'] },
    { name: 'David Lee', role: 'Product Manager', avatar: '👨‍📊', social: ['tw', 'li', 'gh'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Brilliant minds working to bring Taakra to life</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              {/* Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-slate-700">
                {/* Avatar Area */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-125 transition-transform duration-300">
                    {member.avatar}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.role}</p>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    {member.social.map((social, sidx) => (
                      <button
                        key={sidx}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-blue-500 text-gray-600 dark:text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                      >
                        {social === 'tw' && '𝕏'}
                        {social === 'li' && '💼'}
                        {social === 'gh' && '⚙️'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TailwindShowcase;
