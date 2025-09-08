import React, { useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  PlayIcon,
  EyeIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAssessments } from '../hooks/useAssessments';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBoundary from '../components/ErrorBoundary';
import { Assessment } from '../services/assessmentService';

// Extended interface for candidate-specific assessment data
interface CandidateAssessment extends Assessment {
  status?: 'completed' | 'in_progress' | 'upcoming' | 'expired';
  score?: number;
  max_score?: number;
  completed_at?: string;
  started_at?: string;
  due_date?: string;
  category?: string;
  employer?: string;
  roundType?: string;
}

const CandidateAssessments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'in_progress' | 'upcoming'>('all');
  
  // Fetch assessments from API
  const { assessments: apiAssessments, loading, error, stats, refetch } = useAssessments();

  // Transform API assessments to include candidate-specific data
  const assessments: CandidateAssessment[] = apiAssessments.map(assessment => ({
    ...assessment,
    status: 'upcoming' as const, // Default status since API doesn't provide this
    category: 'Technical Skills',
    employer: 'Savyre Platform',
    roundType: assessment.assessment_type === 'code_review' ? 'Code Review' : 'Coding Assessment',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  }));

  // Handle loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <ErrorBoundary 
        error={error}
        title="Unable to load assessments"
        message="We're having trouble loading your assessments. Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

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




  const filteredAssessments = assessments.filter(assessment => {
    if (activeTab === 'all') return true;
    return assessment.status === activeTab;
  });

  // Calculate stats from transformed assessments
  const displayStats = [
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
          {displayStats.map((stat) => (
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
                      <span className="text-xl font-bold text-primary-600">{assessment.employer || 'Savyre Platform'}</span>
                    </div>
                  </div>
                  
                  {/* Assessment Title and Status */}
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assessment.status || 'upcoming')}`}>
                      {(assessment.status || 'upcoming').replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </span>
                  </div>
                  
                  {/* Assessment Type - Below Title */}
                  <div className="mb-3">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-secondary-600 mr-2">🎯</span>
                      <span className="text-lg font-semibold text-secondary-600">{assessment.roundType || 'Assessment'}</span>
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
                      {assessment.roundType || 'Assessment'}
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
                        <span className="font-medium">Score:</span> {assessment.score}/{assessment.max_score || 100}
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
                    {(assessment.status === 'upcoming' || !assessment.status) && (
                      <button 
                        onClick={() => {
                          const url = assessment.assessment_type === 'code_review' 
                            ? `/code-review-assessment/${assessment.id}`
                            : `/coding-assessment/${assessment.id}`;
                          window.location.href = url;
                        }}
                        className="btn-primary text-sm py-2 px-4 flex items-center"
                      >
                        <PlayIcon className="w-4 h-4 mr-1" />
                        Start
                      </button>
                    )}
                    {assessment.status === 'in_progress' && (
                      <button 
                        onClick={() => {
                          const url = assessment.assessment_type === 'code_review' 
                            ? `/code-review-assessment/${assessment.id}`
                            : `/coding-assessment/${assessment.id}`;
                          window.location.href = url;
                        }}
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
            <p className="text-gray-600 mb-4">
              {activeTab === 'all' 
                ? 'You haven\'t taken any assessments yet'
                : `No ${activeTab.replace('_', ' ')} assessments found`
              }
            </p>
            {activeTab === 'all' && (
              <button
                onClick={() => window.location.href = '/assessment'}
                className="btn-primary"
              >
                Take Your First Assessment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateAssessments;
