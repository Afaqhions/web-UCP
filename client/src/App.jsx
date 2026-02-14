import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './AppRoutes';
import { useChat } from './context/ChatContext';
import { ChatWindow } from './components/chat/ChatWindow';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const { isChatOpen, toggleChat } = useChat();

  // Simple path detection for top-level layout
  const isAdmin = window.location.pathname.startsWith('/admin');

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: isAdmin ? '#ffffff' : 'transparent' }}>
        {!isAdmin && <Header />}
        <main style={{ flex: '1 1 auto' }}>
          <AppRoutes />
        </main>
        {!isAdmin && <Footer />}

        {/* Chat Floating Button */}
        <button
          onClick={toggleChat}
          title="Open Chat"
          className="hover-lift"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)',
            zIndex: 40,
            transition: 'all 300ms ease',
          }}
        >
          💬
        </button>

        {/* Chat Window */}
        <ChatWindow isOpen={isChatOpen} onClose={toggleChat} />
      </div>
    </Router>
  );
}

export default App;
