import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Demo from './pages/Demo';
import AssessmentSelection from './pages/AssessmentSelection';
import CandidateProfile from './pages/CandidateProfile';
import CandidateAssessments from './pages/CandidateAssessments';
import CandidateHome from './pages/CandidateHome';
import CodingAssessment from './pages/CodingAssessment';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/assessment" element={<AssessmentSelection />} />
              <Route path="/profile" element={<CandidateProfile />} />
              <Route path="/assessments" element={<CandidateAssessments />} />
              <Route path="/coding-assessment/:id" element={<CodingAssessment />} />
              <Route path="/candidate-home" element={<CandidateHome />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
