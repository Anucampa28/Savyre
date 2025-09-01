import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PlayIcon, 
  ClockIcon, 
  DocumentTextIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface CodingProblem {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  existingCode: string;
  timeLimit: number;
  difficulty: string;
  repoUrl: string;
  codespaceUrl: string;
}

const CodingAssessment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const [showProblem, setShowProblem] = useState(false);

  // Mock coding problem data
  const codingProblem: CodingProblem = {
    id: 1,
    title: 'Frontend Code Enhancement',
    description: 'You are given a React component that displays a simple user profile. Your task is to enhance this component by adding new features and improving the user experience.',
    requirements: [
      'Add a "Edit Profile" button that opens a modal for editing user information',
      'Implement form validation for the edit profile form',
      'Add a "Save Changes" functionality with loading states',
      'Improve the responsive design for mobile devices',
      'Add error handling for failed API calls',
      'Implement a dark/light theme toggle'
    ],
    existingCode: `// UserProfile.jsx
import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {user.role}
          </div>
          <p className="mt-2 text-slate-500">{user.bio}</p>
          <div className="mt-4">
            <p className="text-slate-700"><strong>Email:</strong> {user.email}</p>
            <p className="text-slate-700"><strong>Location:</strong> {user.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;`,
    timeLimit: 60,
    difficulty: 'Intermediate',
    repoUrl: 'https://github.com/Anucampa28/techcorp-frontend-enhancement-2024',
    codespaceUrl: 'https://github.com/codespaces/new?repo=Anucampa28/techcorp-frontend-enhancement-2024'
  };

  const handleStartAssessment = async () => {
    setIsStarting(true);
    
    try {
      // Simulate launching GitHub Codespace
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Open GitHub Codespace in new tab
      window.open(codingProblem.codespaceUrl, '_blank');
      
      // Navigate to assessment interface
      setShowProblem(true);
    } catch (error) {
      console.error('Failed to start assessment:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const handleViewRepository = () => {
    window.open(codingProblem.repoUrl, '_blank');
  };

  if (!showProblem) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {codingProblem.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {codingProblem.description}
            </p>
          </div>

          {/* Assessment Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Time Limit</p>
                <p className="text-xl font-semibold text-gray-900">{codingProblem.timeLimit} minutes</p>
              </div>
              <div className="text-center">
                <CodeBracketIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="text-xl font-semibold text-gray-900">{codingProblem.difficulty}</p>
              </div>
              <div className="text-center">
                <DocumentTextIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Requirements</p>
                <p className="text-xl font-semibold text-gray-900">{codingProblem.requirements.length} tasks</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements:</h3>
              <ul className="space-y-2">
                {codingProblem.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartAssessment}
                disabled={isStarting}
                className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isStarting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Launching Codespace...
                  </>
                ) : (
                  <>
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Start Assessment
                  </>
                )}
              </button>
              
              <button
                onClick={handleViewRepository}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <CodeBracketIcon className="h-5 w-5 mr-2" />
                View Repository
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Instructions</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• The assessment will open in a GitHub Codespace with a dedicated assessment repository</li>
                  <li>• You have {codingProblem.timeLimit} minutes to complete all requirements</li>
                  <li>• Work on the existing React component and enhance it according to requirements</li>
                  <li>• Test your implementation thoroughly before submitting</li>
                  <li>• You can use any external resources or documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assessment Interface (shown after starting)
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Timer */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{codingProblem.title}</h1>
              <p className="text-gray-600">Complete the requirements in the GitHub Codespace</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">59:45</div>
                <div className="text-sm text-gray-500">Time Remaining</div>
              </div>
              <button
                onClick={() => navigate('/assessments')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem Statement</h2>
          <p className="text-gray-700 mb-4">{codingProblem.description}</p>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements:</h3>
          <ul className="space-y-2 mb-6">
            {codingProblem.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-2">□</span>
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                GitHub Codespace is now open! Work on the assessment code in the new tab.
              </span>
            </div>
          </div>
        </div>

        {/* Existing Code Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Existing Code (Preview)</h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{codingProblem.existingCode}</code>
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            This is a preview of the existing code. The full assessment repository is available in the GitHub Codespace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodingAssessment;
