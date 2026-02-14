import React, { useState } from 'react';

/**
 * Advanced Tailwind Patterns Showcase
 * Demonstrates: Complex layouts, Animation combinations, Accessibility
 */
export const AdvancedTailwindShowcase = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    { id: 1, title: 'Web Dev Championship', category: 'programming', participants: 234, status: 'active' },
    { id: 2, title: 'Design Showcase', category: 'design', participants: 189, status: 'active' },
    { id: 3, title: 'Photography Contest', category: 'photography', participants: 567, status: 'ending' },
    { id: 4, title: 'Content Creation', category: 'writing', participants: 345, status: 'active' },
    { id: 5, title: 'Mobile Innovation', category: 'programming', participants: 456, status: 'starting' },
    { id: 6, title: 'Video Production', category: 'video', participants: 289, status: 'active' },
  ];

  const filteredProjects = activeTab === 'all' ? projects : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-5xl font-black text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Featured
              </span>
              <br />
              Competitions
            </h1>
            <div className="hidden md:flex items-center gap-4">
              <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                View All
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
            {['all', 'programming', 'design', 'photography', 'writing', 'video'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-white/70 hover:text-white backdrop-blur-md border border-white/20'
                }`}
              >
                {tab === 'all' ? '🎯 All' : tab}
              </button>
            ))}
          </div>

          {/* Projects Grid with Stagger Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-bold backdrop-blur-md transition-all duration-300 ${
                      project.status === 'active'
                        ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                        : project.status === 'ending'
                        ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
                        : 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                    }`}
                  >
                    {project.status === 'active' && '🔴 Active'}
                    {project.status === 'ending' && '⏰ Ending'}
                    {project.status === 'starting' && '🟦 Starting'}
                  </span>
                </div>

                {/* Icon/Category Circle */}
                <div className="absolute top-0 left-0 w-32 h-32 rounded-full -ml-16 -mt-16 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 group-hover:scale-150 transition-transform duration-500"></div>

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col justify-between">
                  {/* Category Icon */}
                  <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {project.category === 'programming' && '💻'}
                    {project.category === 'design' && '🎨'}
                    {project.category === 'photography' && '📸'}
                    {project.category === 'writing' && '✍️'}
                    {project.category === 'video' && '🎬'}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Category */}
                  <p className="text-white/60 text-sm mb-6 capitalize">{project.category}</p>

                  {/* Participants Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70 text-sm">Participants</span>
                      <span className="text-white font-bold">{project.participants}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500"
                        style={{ width: `${Math.min((project.participants / 600) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500 group-hover:to-purple-500 text-white font-bold border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300 transform group-hover:scale-105"
                  >
                    {hoveredProject === project.id ? 'Join Now →' : 'View Details'}
                  </button>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/40 via-purple-600/40 to-pink-600/40 blur-2xl"></div>

            {/* Content */}
            <div className="relative p-16 text-center">
              <h2 className="text-5xl font-black text-white mb-6">
                Don't Miss Out
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of competitors pushing their limits and winning amazing prizes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 active:scale-95">
                  Explore Now
                </button>
                <button className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Responsive Sidebar Layout - Pure Tailwind
 * Features: Collapsible navigation, Responsive grid, Dark mode
 */
export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: '📊', active: true },
    { label: 'Competitions', icon: '🏆' },
    { label: 'My Registrations', icon: '📝' },
    { label: 'Leaderboard', icon: '🥇' },
    { label: 'Messages', icon: '💬' },
    { label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800">
          <span className={`font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 transition-all duration-300 ${sidebarOpen ? 'text-xl' : 'text-lg'}`}>
            {sidebarOpen ? 'Taakra' : 'T'}
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-300"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                item.active
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`font-semibold transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {item.label}
              </span>
              {item.active && <span className="ml-auto text-white">✓</span>}
            </a>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
              👤
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">Profile</p>
                <p className="text-sm text-gray-500 truncate">user@taakra.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-300">
              🔔
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Active Competitions', value: '12', trend: '↑ 3' },
              { label: 'Total Wins', value: '5', trend: '↑ 1' },
              { label: 'Followers', value: '234', trend: '↑ 23' },
              { label: 'Points', value: '4,850', trend: '↑ 320' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Large Content Area */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors duration-300">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">Competition {item} registered</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item} hours ago</p>
                  </div>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">View →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default AdvancedTailwindShowcase;
