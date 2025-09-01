import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Assessment, AssessmentAttempt } from '../types';

const AssessmentDashboard: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<AssessmentAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    totalAttempts: 0,
    completedAttempts: 0,
    averageScore: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [assessmentsRes, attemptsRes] = await Promise.all([
        fetch('/api/assessments/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('/api/assessments/attempts/recent', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      if (assessmentsRes.ok) {
        const assessmentsData = await assessmentsRes.json();
        setAssessments(assessmentsData);
        setStats(prev => ({ ...prev, totalAssessments: assessmentsData.length }));
      }

      if (attemptsRes.ok) {
        const attemptsData = await attemptsRes.json();
        setRecentAttempts(attemptsData);
        
        const completed = attemptsData.filter((a: AssessmentAttempt) => a.status === 'completed');
        const avgScore = completed.length > 0 
          ? completed.reduce((sum: number, a: AssessmentAttempt) => sum + (a.total_score || 0), 0) / completed.length
          : 0;
        
        setStats(prev => ({
          ...prev,
          totalAttempts: attemptsData.length,
          completedAttempts: completed.length,
          averageScore: Math.round(avgScore)
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssessment = async (assessmentId: number) => {
    if (!window.confirm('Are you sure you want to delete this assessment? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/assessments/${assessmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setAssessments(prev => prev.filter(a => a.id !== assessmentId));
        setStats(prev => ({ ...prev, totalAssessments: prev.totalAssessments - 1 }));
      }
    } catch (error) {
      console.error('Failed to delete assessment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Dashboard</h1>
            <p className="text-gray-600">Manage your assessments and track candidate performance</p>
          </div>
          
          <Link
            to="/assessments/create"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Assessment
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentDuplicateIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Assessments</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalAssessments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UsersIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Attempts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalAttempts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completedAttempts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Score</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageScore}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Assessments */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Assessments</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {assessments.slice(0, 5).map((assessment) => (
              <div key={assessment.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {assessment.title}
                    </h3>
                    {assessment.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {assessment.description}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-3 text-sm">
                      <span className={`px-2 py-1 rounded-full ${getDifficultyColor(assessment.difficulty_level)}`}>
                        {assessment.difficulty_level}
                      </span>
                      <span className="text-gray-500">
                        {assessment.questions.length} questions
                      </span>
                      <span className="text-gray-500">
                        {assessment.total_duration} min
                      </span>
                      <span className="text-gray-500">
                        {assessment.max_score} pts
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/assessments/${assessment.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="View Assessment"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Link>
                    
                    <button
                      onClick={() => navigator.clipboard.writeText(`${window.location.origin}/assessment/${assessment.shareable_link}`)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Copy Share Link"
                    >
                      <ShareIcon className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteAssessment(assessment.id)}
                      className="p-2 text-red-400 hover:text-red-600"
                      title="Delete Assessment"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Created {formatDate(assessment.created_at)}
                  {assessment.is_template && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Template
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {assessments.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <DocumentDuplicateIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p>No assessments created yet</p>
                <Link
                  to="/assessments/create"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Create your first assessment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Attempts</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentAttempts.slice(0, 5).map((attempt) => (
              <div key={attempt.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(attempt.status)}`}>
                        {attempt.status.replace('_', ' ')}
                      </span>
                      {attempt.total_score !== undefined && (
                        <span className="text-sm font-medium text-gray-900">
                          {attempt.total_score}/{attempt.max_score} pts
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {attempt.candidate_name || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      {attempt.candidate_email}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Started: {formatDate(attempt.started_at)}</span>
                      {attempt.completed_at && (
                        <span>Completed: {formatDate(attempt.completed_at)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {attempt.status === 'completed' && (
                      <Link
                        to={`/assessment/complete/${attempt.id}`}
                        className="p-2 text-primary-400 hover:text-primary-600"
                        title="View Results"
                      >
                        <ChartBarIcon className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {recentAttempts.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p>No assessment attempts yet</p>
                <p className="text-sm">Share your assessments to see candidate attempts</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/assessments/create"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <PlusIcon className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Create Assessment</h3>
              <p className="text-sm text-gray-500">Build a new assessment from scratch</p>
            </div>
          </Link>
          
          <Link
            to="/questions"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <DocumentDuplicateIcon className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Browse Questions</h3>
              <p className="text-sm text-gray-500">Explore the question library</p>
            </div>
          </Link>
          
          <Link
            to="/assessments"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <ChartBarIcon className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">View All Assessments</h3>
              <p className="text-sm text-gray-500">Manage your assessment portfolio</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
