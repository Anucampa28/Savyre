import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useAssessments, useAssessmentSearch } from '../hooks/useAssessments';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBoundary from '../components/ErrorBoundary';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch assessments from API
  const { assessments, loading, error, stats, refetch } = useAssessments();
  const filteredAssessments = useAssessmentSearch(assessments, searchTerm);

  const statsData = [
    {
      name: 'Total Assessments',
      value: stats.total,
      icon: ChartBarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Completed',
      value: stats.completed,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'In Progress',
      value: stats.in_progress,
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Pending',
      value: stats.pending,
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  // Handle loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <ErrorBoundary 
        error={error}
        title="Unable to load dashboard"
        message="We're having trouble loading your dashboard data. Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.first_name || 'User'}!
          </h1>
          <p className="text-gray-600">
            {user?.user_type === 'employer' 
              ? "Manage your company's assessments and review candidate performance"
              : "Track your assessment progress and skill development"
            }
          </p>
        </div>

        {/* Candidate Navigation */}
        {user?.user_type === 'candidate' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/profile"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors duration-200">
                  <UserIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-primary-700">My Profile</h3>
                  <p className="text-sm text-gray-500">View and edit your profile information</p>
                </div>
              </a>
              <a
                href="/assessments"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors duration-200">
                  <ChartBarIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-primary-700">My Assessments</h3>
                  <p className="text-sm text-gray-500">Track your assessment progress and results</p>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat) => (
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

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="relative w-full sm:w-96 mb-4 sm:mb-0">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="btn-primary flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            {user?.user_type === 'employer' ? 'Create Assessment' : 'Find Assessment'}
          </button>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  assessment.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                  assessment.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {assessment.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {assessment.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {assessment.duration_minutes} min
                </span>
                <span>Created {new Date(assessment.created_at).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 btn-primary text-sm py-2">
                  Start Assessment
                </button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first assessment'}
            </p>
            {!searchTerm && (
              <button 
                onClick={refetch}
                className="mt-4 btn-primary"
              >
                Refresh Assessments
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
