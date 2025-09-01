import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShareIcon, 
  DocumentDuplicateIcon, 
  PencilIcon, 
  TrashIcon,
  ClockIcon,
  AcademicCapIcon,
  TagIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Question, AssessmentQuestion, Assessment } from '../types';

const AssessmentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAssessment();
    }
  }, [id]);

  const fetchAssessment = async () => {
    try {
      const response = await fetch(`/api/assessments/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAssessment(data);
      } else {
        setError('Failed to fetch assessment');
      }
    } catch (error) {
      setError('An error occurred while fetching the assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAssessment = async () => {
    try {
      const response = await fetch(`/api/assessments/${id}/copy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const copiedAssessment = await response.json();
        navigate(`/assessments/${copiedAssessment.id}`);
      } else {
        setError('Failed to copy assessment');
      }
    } catch (error) {
      setError('An error occurred while copying the assessment');
    }
  };

  const handleDeleteAssessment = async () => {
    if (!window.confirm('Are you sure you want to delete this assessment? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/assessments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        navigate('/assessments');
      } else {
        setError('Failed to delete assessment');
      }
    } catch (error) {
      setError('An error occurred while deleting the assessment');
    }
  };

  const copyShareableLink = async () => {
    if (assessment) {
      const shareUrl = `${window.location.origin}/assessment/${assessment.shareable_link}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
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

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
      'bg-orange-100 text-orange-800'
    ];
    const index = category.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error || 'Assessment not found'}</p>
          <button
            onClick={() => navigate('/assessments')}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{assessment.title}</h1>
            {assessment.description && (
              <p className="text-gray-600 mb-4">{assessment.description}</p>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </button>
            
            <button
              onClick={handleCopyAssessment}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
              Copy
            </button>
            
            <button
              onClick={() => navigate(`/assessments/${assessment.id}/edit`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </button>
            
            <button
              onClick={handleDeleteAssessment}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Assessment Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Language</p>
              <p className="font-medium">{assessment.programming_language}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Difficulty</p>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(assessment.difficulty_level)}`}>
                {assessment.difficulty_level}
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{assessment.total_duration} min</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Total Score</p>
              <p className="font-medium">{assessment.max_score} points</p>
            </div>
          </div>
        </div>

        {assessment.is_template && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              This assessment is saved as a template and can be copied for future use.
            </p>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Questions ({assessment.questions.length})</h2>
        
        {assessment.questions.map((aq, index) => (
          <div key={aq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{aq.question.title}</h3>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <span className={`px-2 py-1 rounded-full ${getDifficultyColor(aq.question.difficulty_level)}`}>
                  {aq.question.difficulty_level}
                </span>
                <span className={`px-2 py-1 rounded-full ${getCategoryColor(aq.question.category)}`}>
                  {aq.question.category}
                </span>
                <span className="text-gray-500">
                  {aq.custom_duration || aq.question.estimated_duration} min
                </span>
                <span className="text-gray-500">
                  {aq.points} pts
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{aq.question.description}</p>

            {/* Question Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">What's Wrong:</h4>
              <p className="text-gray-700 mb-3">{aq.question.what_wrong}</p>
              
              <h4 className="font-medium text-gray-900 mb-2">Fix Outline:</h4>
              <p className="text-gray-700">{aq.question.fix_outline}</p>
            </div>

            {/* Tags */}
            {aq.question.tags && aq.question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {aq.question.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Share Assessment</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareable Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/assessment/${assessment.shareable_link}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                  />
                  <button
                    onClick={copyShareableLink}
                    className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p>Send this link to candidates to start the assessment.</p>
                <p className="mt-2">
                  <strong>Note:</strong> The solution and rubric are hidden from candidates.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentView;
