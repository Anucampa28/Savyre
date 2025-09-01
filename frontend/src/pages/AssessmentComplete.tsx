import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ClockIcon,
  AcademicCapIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface AssessmentAttempt {
  id: number;
  assessment_id: number;
  candidate_email: string;
  candidate_name?: string;
  started_at: string;
  completed_at: string;
  total_score?: number;
  max_score: number;
  status: string;
}

const AssessmentComplete: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (attemptId) {
      fetchAttemptDetails();
    }
  }, [attemptId]);

  const fetchAttemptDetails = async () => {
    try {
      const response = await fetch(`/api/assessments/attempts/${attemptId}`);
      if (response.ok) {
        const data = await response.json();
        setAttempt(data);
      } else {
        setError('Failed to fetch attempt details');
      }
    } catch (error) {
      setError('Failed to fetch attempt details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculatePercentage = () => {
    if (!attempt || !attempt.total_score) return 0;
    return Math.round((attempt.total_score / attempt.max_score) * 100);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent! You have a strong understanding of the concepts.';
    if (percentage >= 60) return 'Good work! You have a solid grasp of most concepts.';
    return 'Keep practicing! Review the concepts to improve your understanding.';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error || 'Attempt not found'}</p>
        </div>
      </div>
    );
  }

  const percentage = calculatePercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assessment Completed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for completing the assessment. Your results are being processed.
          </p>
        </div>

        {/* Assessment Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Candidate Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{attempt.candidate_email}</p>
                  </div>
                </div>
                
                {attempt.candidate_name && (
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{attempt.candidate_name}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Started</p>
                    <p className="font-medium text-gray-900">{formatDate(attempt.started_at)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="font-medium text-gray-900">{formatDate(attempt.completed_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              
              <div className="space-y-4">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className={`text-4xl font-bold ${getScoreColor(percentage)} mb-2`}>
                    {percentage}%
                  </div>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {attempt.total_score || 'Pending'}
                    </div>
                    <p className="text-sm text-gray-600">Points Earned</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {attempt.max_score}
                    </div>
                    <p className="text-sm text-gray-600">Total Points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Feedback</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {getScoreMessage(percentage)}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">What Happens Next?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Results Processing</h4>
              <p className="text-sm text-gray-600">
                Your answers are being reviewed and scored by our assessment team.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <AcademicCapIcon className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Detailed Feedback</h4>
              <p className="text-sm text-gray-600">
                You'll receive comprehensive feedback on your performance within 24-48 hours.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <ClockIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
              <p className="text-sm text-gray-600">
                Check your email for updates and detailed results from the assessment team.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have questions about your assessment?
          </p>
          <p className="text-gray-600">
            Contact us at <span className="text-primary-600 font-medium">hello@savyre.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentComplete;
