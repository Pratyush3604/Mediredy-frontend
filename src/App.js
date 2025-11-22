import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import VitalSigns from './pages/VitalSigns';
import InjuryDetection from './pages/InjuryDetection';
import ReportAnalysis from './pages/ReportAnalysis';
import ChatInterface from './pages/ChatInterface';
import AIDoctor from './pages/AIDoctor';
import AboutUs from './pages/AboutUs'; // New About Us page

function App() {
  return (
    <Router>
      <div className="app">
        {/* NAVBAR */}
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#f3f4f6'
        }}>
          {/* Navbar Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {[
              { to: '/', label: '🏠 Home' },
              { to: '/ai-doctor', label: '🤖 AI Doctor' },
              { to: '/symptoms', label: '🩺 Symptoms' },
              { to: '/vitals', label: '💓 Vital Signs' },
              { to: '/injury', label: '🩹 Injury Detection' },
              { to: '/reports', label: '📋 Report Analysis' },
              { to: '/chat', label: '💬 Chat' },
              { to: '/about-us', label: 'ℹ️ About Us' },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  backgroundColor: '#10b981',
                  color: 'white',
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="main-content" style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-doctor" element={<AIDoctor />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/vitals" element={<VitalSigns />} />
            <Route path="/injury" element={<InjuryDetection />} />
            <Route path="/reports" element={<ReportAnalysis />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/about-us" element={<AboutUs />} /> {/* About Us page route */}
          </Routes>
        </main>

        {/* FOOTER */}
        <footer style={{ 
          padding: '1rem 2rem', 
          textAlign: 'center', 
          background: '#f3f4f6', 
          marginTop: '2rem' 
        }}>
          <p>⚠️ Disclaimer: This is an AI-powered medical assistant. Always consult healthcare professionals for medical advice.</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#6b7280' }}>
            v2.0 - Powered by GPT-4o Vision, Groq, & ElevenLabs
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
