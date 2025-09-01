import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PlayIcon,
  EyeIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface Assessment {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration_minutes: number;
  status: 'completed' | 'in_progress' | 'upcoming' | 'expired';
  score?: number;
  max_score?: number;
  completed_at?: string;
  started_at?: string;
  due_date?: string;
  category: string;
  employer: string;
  roundType: string;
}

const CandidateAssessments: React.FC = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'in_progress' | 'upcoming'>('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockAssessments: Assessment[] = [
      {
        id: 1,
        title: 'Frontend Code Enhancement',
        description: 'Enhance a React component to add new features and improve user experience',
        difficulty: 'Intermediate',
        duration_minutes: 60,
        status: 'upcoming',
        due_date: '2024-02-01T23:59:59Z',
        category: 'Technical Skills',
        employer: 'TechCorp Inc.',
        roundType: 'Coding Assessment'
      },
      {
        id: 2,
        title: 'Code Quality Review',
        description: 'Review and improve existing code for better maintainability',
        difficulty: 'Advanced',
        duration_minutes: 60,
        status: 'in_progress',
        started_at: '2024-01-20T10:00:00Z',
        due_date: '2024-01-25T23:59:59Z',
        category: 'Technical Skills',
        employer: 'Innovation Labs',
        roundType: 'Code Review'
      },
      {
        id: 3,
        title: 'Problem Solving Challenge',
        description: 'Tackle complex problems and demonstrate your analytical thinking',
        difficulty: 'Intermediate',
        duration_minutes: 90,
        status: 'upcoming',
        due_date: '2024-02-01T23:59:59Z',
        category: 'Technical Skills',
        employer: 'CodeAcademy',
        roundType: 'Coding Assessment'
      },
      {
        id: 4,
        title: 'Architecture Discussion',
        description: 'Discuss system design principles and architectural decisions',
        difficulty: 'Advanced',
        duration_minutes: 120,
        status: 'upcoming',
        due_date: '2024-02-05T23:59:59Z',
        category: 'Technical Skills',
        employer: 'BigTech Corp',
        roundType: 'System Design'
      },
      {
        id: 5,
        title: 'Data Management Skills',
        description: 'Showcase your understanding of data structures and optimization',
        difficulty: 'Intermediate',
        duration_minutes: 75,
        status: 'completed',
        score: 92,
        max_score: 100,
        completed_at: '2024-01-10T16:45:00Z',
        category: 'Technical Skills',
        employer: 'DataFlow Systems',
        roundType: 'Code Review'
      }
    ];
    
    setTimeout(() => {
      setAssessments(mockAssessments);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'in_progress':
        return <ClockIcon className="w-5 h-5" />;
      case 'upcoming':
        return <CalendarIcon className="w-5 h-5" />;
      case 'expired':
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      default:
        return <ClockIcon className="w-5 h-5" />;
    }
  };



  const filteredAssessments = assessments.filter(assessment => {
    if (activeTab === 'all') return true;
    return assessment.status === activeTab;
  });

  const stats = [
    {
      name: 'Total Assessments',
      value: assessments.length,
      icon: ChartBarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Completed',
      value: assessments.filter(a => a.status === 'completed').length,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'In Progress',
      value: assessments.filter(a => a.status === 'in_progress').length,
      icon: ClockIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Upcoming',
      value: assessments.filter(a => a.status === 'upcoming').length,
      icon: CalendarIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Assessments
          </h1>
          <p className="text-gray-600">
            Track your assessment progress and performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-8">
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All Assessments', count: assessments.length },
              { key: 'completed', label: 'Completed', count: assessments.filter(a => a.status === 'completed').length },
              { key: 'in_progress', label: 'In Progress', count: assessments.filter(a => a.status === 'in_progress').length },
              { key: 'upcoming', label: 'Upcoming', count: assessments.filter(a => a.status === 'upcoming').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-200 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Assessments List */}
        <div className="space-y-4">
          {filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                {/* Left side - Assessment info */}
                <div className="flex-1">
                  {/* Company Name - At the Top */}
                  <div className="mb-3">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-primary-600 mr-2">🏢</span>
                      <span className="text-xl font-bold text-primary-600">{assessment.employer}</span>
                    </div>
                  </div>
                  
                  {/* Assessment Title and Status */}
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assessment.status)}`}>
                      {assessment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  
                  {/* Assessment Type - Below Title */}
                  <div className="mb-3">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-secondary-600 mr-2">🎯</span>
                      <span className="text-lg font-semibold text-secondary-600">{assessment.roundType}</span>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium text-gray-700 mr-2">⏱️</span>
                    <span className="text-sm text-gray-600">{assessment.duration_minutes} min</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                    {assessment.description}
                  </p>
                  
                  {/* Round Type Badge Only */}
                  <div className="flex items-center space-x-2">
                    <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full font-semibold border border-secondary-200">
                      {assessment.roundType}
                    </span>
                  </div>
                </div>
                
                {/* Right side - Additional details and actions */}
                <div className="flex flex-col items-end space-y-3 ml-6">
                  {/* Additional details */}
                  <div className="text-right text-sm text-gray-500">
                    {assessment.due_date && (
                      <div className="mb-1">
                        <span className="font-medium">Due:</span> {new Date(assessment.due_date).toLocaleDateString()}
                      </div>
                    )}
                    {assessment.score !== undefined && (
                      <div className="mb-1">
                        <span className="font-medium">Score:</span> {assessment.score}/{assessment.max_score}
                      </div>
                    )}
                    {assessment.completed_at && (
                      <div>
                        <span className="font-medium">Completed:</span> {new Date(assessment.completed_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    {assessment.status === 'upcoming' && (
                      <button 
                        onClick={() => window.location.href = `/coding-assessment/${assessment.id}`}
                        className="btn-primary text-sm py-2 px-4 flex items-center"
                      >
                        <PlayIcon className="w-4 h-4 mr-1" />
                        Start
                      </button>
                    )}
                    {assessment.status === 'in_progress' && (
                      <button 
                        onClick={() => window.location.href = `/coding-assessment/${assessment.id}`}
                        className="btn-primary text-sm py-2 px-4 flex items-center"
                      >
                        <PlayIcon className="w-4 h-4 mr-1" />
                        Continue
                      </button>
                    )}
                    {assessment.status === 'completed' && (
                      <button className="btn-secondary text-sm py-2 px-4 flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        Results
                      </button>
                    )}
                    <button className="px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
            <p className="text-gray-600">
              {activeTab === 'all' 
                ? 'You haven\'t taken any assessments yet'
                : `No ${activeTab.replace('_', ' ')} assessments found`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateAssessments;
