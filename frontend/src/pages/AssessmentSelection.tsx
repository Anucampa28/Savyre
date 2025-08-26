import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CodeBracketIcon, ServerIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Level {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

const AssessmentSelection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  const roles: Role[] = [
    {
      id: 'backend',
      title: 'Backend Engineer',
      description: 'Server-side development, APIs, databases, and system architecture',
      icon: ServerIcon,
      color: 'bg-blue-500'
    },
    {
      id: 'frontend',
      title: 'Frontend Engineer',
      description: 'User interface development, responsive design, and user experience',
      icon: CodeBracketIcon,
      color: 'bg-green-500'
    },
    {
      id: 'data',
      title: 'Data Engineer',
      description: 'Data pipelines, ETL processes, and data infrastructure',
      icon: ChartBarIcon,
      color: 'bg-purple-500'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Engineer',
      description: 'End-to-end development across frontend and backend',
      icon: CpuChipIcon,
      color: 'bg-orange-500'
    }
  ];

  const levels: Level[] = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: '0-2 years of experience, fundamental concepts',
      duration: '1-2 hours',
      difficulty: 'Basic'
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: '2-5 years of experience, practical applications',
      duration: '2-3 hours',
      difficulty: 'Moderate'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: '5+ years of experience, complex problem solving',
      duration: '3-4 hours',
      difficulty: 'Challenging'
    }
  ];

  const launchAssessment = async () => {
    if (!selectedRole || !selectedLevel) {
      alert('Please select both a role and level before proceeding.');
      return;
    }

    setIsLaunching(true);

    // Assessment-specific repository configurations
    const assessmentRepos = {
      backend: {
        beginner: 'Anucampa28/backend-beginner-assessment',
        intermediate: 'Anucampa28/backend-intermediate-assessment',
        advanced: 'Anucampa28/backend-advanced-assessment'
      },
      frontend: {
        beginner: 'Anucampa28/frontend-beginner-assessment',
        intermediate: 'Anucampa28/frontend-intermediate-assessment',
        advanced: 'Anucampa28/frontend-advanced-assessment'
      },
      data: {
        beginner: 'Anucampa28/data-beginner-assessment',
        intermediate: 'Anucampa28/data-intermediate-assessment',
        advanced: 'Anucampa28/data-advanced-assessment'
      },
      fullstack: {
        beginner: 'Anucampa28/fullstack-beginner-assessment',
        intermediate: 'Anucampa28/fullstack-intermediate-assessment',
        advanced: 'Anucampa28/fullstack-advanced-assessment'
      }
    };

    const repo = assessmentRepos[selectedRole as keyof typeof assessmentRepos]?.[selectedLevel as keyof typeof assessmentRepos.backend];
    
    if (!repo) {
      alert('Assessment configuration not found. Please try again.');
      setIsLaunching(false);
      return;
    }

    // Create GitHub Codespace URL
    const codespaceUrl = `https://github.com/codespaces/new?repo=${repo}&machine=standardLinux32gb&location=WestUs2`;
    
    console.log('Launching assessment:', { role: selectedRole, level: selectedLevel, repo, url: codespaceUrl });

    // Try to open in new tab
    const newWindow = window.open(codespaceUrl, '_blank');
    
    if (!newWindow) {
      alert(
        `⚠️ Popup blocked!\n\n` +
        `Please allow popups and try again, or manually visit:\n${codespaceUrl}`
      );
      setIsLaunching(false);
      return;
    }

    // Show success message
    alert(
      `🎉 Assessment Launched!\n\n` +
      `✅ Role: ${roles.find(r => r.id === selectedRole)?.title}\n` +
      `✅ Level: ${levels.find(l => l.id === selectedLevel)?.title}\n` +
      `✅ Repository: ${repo}\n\n` +
      `🚀 GitHub Codespace opening in new tab\n` +
      `⏳ Environment building (2-3 minutes)\n\n` +
      `Good luck with your assessment! 🎯`
    );

    // Reset states
    setTimeout(() => {
      setIsLaunching(false);
      setSelectedRole('');
      setSelectedLevel('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Assessment Selection</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              selectedRole ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              selectedLevel ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              selectedRole && selectedLevel ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-center space-x-16 mt-2 text-sm text-gray-500">
            <span>Select Role</span>
            <span>Select Level</span>
            <span>Launch Assessment</span>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`card cursor-pointer transition-all duration-200 ${
                  selectedRole === role.id
                    ? 'ring-2 ring-primary-500 shadow-lg transform scale-105'
                    : 'hover:shadow-lg hover:scale-105'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${role.color} flex items-center justify-center`}>
                    <role.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                    <p className="text-gray-600 text-sm">{role.description}</p>
                  </div>
                  {selectedRole === role.id && (
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level Selection */}
        {selectedRole && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Level</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {levels.map((level) => (
                <div
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`card cursor-pointer transition-all duration-200 ${
                    selectedLevel === level.id
                      ? 'ring-2 ring-primary-500 shadow-lg transform scale-105'
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{level.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{level.description}</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>⏱️ Duration: {level.duration}</div>
                      <div>📊 Difficulty: {level.difficulty}</div>
                    </div>
                    {selectedLevel === level.id && (
                      <div className="mt-3">
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Launch Button */}
        {selectedRole && selectedLevel && (
          <div className="text-center">
            <button
              onClick={launchAssessment}
              disabled={isLaunching}
              className={`btn-primary text-xl px-12 py-4 flex items-center justify-center gap-3 mx-auto transition-all duration-200 ${
                isLaunching
                  ? 'opacity-75 cursor-not-allowed bg-primary-500'
                  : 'hover:bg-primary-700 hover:scale-105'
              }`}
            >
              {isLaunching ? (
                <>
                  <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Launching Assessment...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Launch Assessment
                </>
              )}
            </button>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Role: <span className="font-medium text-gray-700">{roles.find(r => r.id === selectedRole)?.title}</span></p>
              <p>Level: <span className="font-medium text-gray-700">{levels.find(l => l.id === selectedLevel)?.title}</span></p>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSelection;
