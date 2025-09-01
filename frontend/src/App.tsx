import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Demo from './pages/Demo';
import AssessmentSelection from './pages/AssessmentSelection';
import QuestionLibrary from './pages/QuestionLibrary';
import AssessmentBuilder from './pages/AssessmentBuilder';
import AssessmentView from './pages/AssessmentView';
import CandidateAssessment from './pages/CandidateAssessment';
import AssessmentComplete from './pages/AssessmentComplete';
import AssessmentDashboard from './pages/AssessmentDashboard';
import { AuthProvider } from './contexts/AuthContext';

// Wrapper component to conditionally render Navbar
function AppContent() {
  const location = useLocation();
  
  // Pages that should NOT show the main website navigation
  const authenticatedPages = [
    '/dashboard',
    '/assessments',
    '/assessments/create',
    '/questions',
    '/assessment'
  ];
  
  const shouldShowNavbar = !authenticatedPages.some(page => 
    location.pathname.startsWith(page)
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/assessment" element={<AssessmentSelection />} />
          <Route path="/questions" element={<QuestionLibrary onQuestionsSelected={() => {}} selectedQuestions={[]} />} />
          <Route path="/assessments/create" element={<AssessmentBuilder />} />
          <Route path="/assessments/:id" element={<AssessmentView />} />
          <Route path="/assessment/:shareableLink" element={<CandidateAssessment />} />
          <Route path="/assessment/complete/:attemptId" element={<AssessmentComplete />} />
          <Route path="/assessments" element={<AssessmentDashboard />} />
        </Routes>
      </main>
      {shouldShowNavbar && <Footer />}
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
