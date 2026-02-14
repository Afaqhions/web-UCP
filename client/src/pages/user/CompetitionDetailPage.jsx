import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { FiCalendar, FiUsers, FiAward, FiShare2, FiBookmark } from 'react-icons/fi';

const CompetitionDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: 'about', label: '📋 About', icon: '📋' },
    { id: 'details', label: '📊 Details', icon: '📊' },
    { id: 'leaderboard', label: '🥇 Leaderboard', icon: '🥇' },
    { id: 'rules', label: '📜 Rules', icon: '📜' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative h-full flex items-end p-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-5xl font-black text-white mb-3">Web Development Championship</h1>
                <p className="text-white/80 text-lg">Build amazing web applications and compete for $5000</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsSaved(!isSaved)} className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isSaved ? 'bg-yellow-400/30 border border-yellow-400/60' : 'bg-white/10 border border-white/30'}`}>
                  <FiBookmark className="w-6 h-6 text-white" />
                </button>
                <button className="p-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white/20 transition-all">
                  <FiShare2 className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '💰', label: 'Prize Pool', value: '$5,000' },
                { icon: '👥', label: 'Participants', value: '234' },
                { icon: '🏆', label: 'Winners', value: '10' },
                { icon: '⏰', label: 'Days Left', value: '15' },
              ].map((stat, idx) => (
                <Card key={idx} variant="glass" className="p-4 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-gray-600 text-xs mb-1">{stat.label}</p>
                  <p className="font-bold text-lg text-gray-900">{stat.value}</p>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <Card variant="glass" className="p-2">
              <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'about' && (
                <Card variant="gradient">
                  <h3 className="text-2xl font-bold mb-4">About This Competition</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Join our prestigious Web Development Championship where the world's best developers showcase their skills. This is your opportunity to create a stunning web application and compete against talented developers worldwide.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="font-semibold text-blue-900 mb-2">🎯 What you'll build:</p>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Full-stack web applications</li>
                      <li>• Responsive and modern UI/UX</li>
                      <li>• Real-time features and APIs</li>
                      <li>• Performance optimized solutions</li>
                    </ul>
                  </div>
                </Card>
              )}

              {activeTab === 'details' && (
                <Card variant="gradient">
                  <h3 className="text-2xl font-bold mb-6">Competition Details</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Start Date', value: 'March 1, 2026' },
                      { label: 'End Date', value: 'March 15, 2026' },
                      { label: 'Registration Deadline', value: 'February 28, 2026' },
                      { label: 'Time Zone', value: 'UTC' },
                      { label: 'Skill Level', value: 'Intermediate - Advanced' },
                      { label: 'Team Size', value: '1-3 members' },
                    ].map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0">
                        <span className="text-gray-600">{detail.label}</span>
                        <span className="font-bold text-gray-900">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'leaderboard' && (
                <Card variant="gradient">
                  <h3 className="text-2xl font-bold mb-6">Current Leaderboard</h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <div key={rank} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="text-2xl font-bold text-gray-600">#{rank}</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">Team {rank}</p>
                          <p className="text-sm text-gray-600">{Math.floor(Math.random() * 100 + 500)} points</p>
                        </div>
                        <div className={`text-2xl ${rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : ''}`}></div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'rules' && (
                <Card variant="gradient">
                  <h3 className="text-2xl font-bold mb-6">Rules & Guidelines</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg mb-2">Eligibility</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Must be 18 years or older</li>
                        <li>Open to all skill levels</li>
                        <li>No restrictions by location</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <h4 className="font-bold text-red-900 mb-2">⚠️ Not Allowed</h4>
                      <ul className="list-disc list-inside space-y-1 text-red-800">
                        <li>AI-generated code submissions</li>
                        <li>Plagiarism or copying</li>
                        <li>Cheating or unfair practices</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card variant="glass" className="sticky top-8 p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Ready to Compete?</h3>
                <p className="text-gray-600 mb-4">234 competitors registered</p>
              </div>

              <Button variant="primary" size="lg" className="w-full mb-3">
                Register Now
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Share with Friends
              </Button>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>💡 Tip:</strong> Join the Discord community to discuss strategies with other participants!
                </p>
              </div>
            </Card>

            {/* Organizer Info */}
            <Card variant="glass">
              <h4 className="font-bold mb-4">Organized By</h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xl">
                  🚀
                </div>
                <div>
                  <p className="font-bold text-gray-900">Taakra Team</p>
                  <p className="text-sm text-gray-600">Official Partner</p>
                </div>
              </div>
            </Card>

            {/* Share Card */}
            <Card variant="glass">
              <h4 className="font-bold mb-4">Share</h4>
              <div className="flex gap-3">
                {['𝕏', '📘', '🔗'].map((social, idx) => (
                  <button
                    key={idx}
                    className="flex-1 py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-bold"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailPage;
