import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PlusIcon, 
  TrashIcon, 
  DocumentDuplicateIcon,
  ShareIcon,
  ClockIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import QuestionLibrary from './QuestionLibrary';
import { Question, AssessmentQuestion, AssessmentForm } from '../types';

const AssessmentBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [assessmentQuestions, setAssessmentQuestions] = useState<AssessmentQuestion[]>([]);
  const [formData, setFormData] = useState<AssessmentForm>({
    title: '',
    description: '',
    programming_language: '',
    difficulty_level: '',
    is_template: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const programmingLanguages = [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'C++', 'C', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'SQL', 'HTML/CSS', 'Other'
  ];

  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Mixed'];

  useEffect(() => {
    // Convert selected questions to assessment questions
    const newAssessmentQuestions = selectedQuestions.map((question, index) => ({
      id: index, // Temporary ID for local state
      question_id: question.id,
      order: index + 1,
      points: 10, // Default points
      custom_duration: question.estimated_duration,
      question
    }));
    setAssessmentQuestions(newAssessmentQuestions);
  }, [selectedQuestions]);

  const handleQuestionSelection = (questions: Question[]) => {
    setSelectedQuestions(questions);
  };

  const handleFormChange = (field: keyof AssessmentForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateQuestionPoints = (questionId: number, points: number) => {
    setAssessmentQuestions(prev => 
      prev.map(q => 
        q.question_id === questionId 
          ? { ...q, points: Math.max(1, points) }
          : q
      )
    );
  };

  const updateQuestionDuration = (questionId: number, duration: number) => {
    setAssessmentQuestions(prev => 
      prev.map(q => 
        q.question_id === questionId 
          ? { ...q, custom_duration: Math.max(1, duration) }
          : q
      )
    );
  };

  const reorderQuestions = (fromIndex: number, toIndex: number) => {
    const newQuestions = [...assessmentQuestions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);
    
    // Update order numbers
    const reorderedQuestions = newQuestions.map((q, index) => ({
      ...q,
      order: index + 1
    }));
    
    setAssessmentQuestions(reorderedQuestions);
  };

  const removeQuestion = (questionId: number) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const calculateTotalDuration = () => {
    return assessmentQuestions.reduce((total, q) => total + (q.custom_duration || q.question.estimated_duration), 0);
  };

  const calculateTotalScore = () => {
    return assessmentQuestions.reduce((total, q) => total + q.points, 0);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Assessment title is required');
      return false;
    }
    if (!formData.programming_language) {
      setError('Programming language is required');
      return false;
    }
    if (selectedQuestions.length === 0) {
      setError('Please select at least one question');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const assessmentData = {
        ...formData,
        questions: assessmentQuestions.map(q => ({
          question_id: q.question_id,
          order: q.order,
          points: q.points,
          custom_duration: q.custom_duration
        }))
      };

      const response = await fetch('/api/assessments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(assessmentData)
      });

      if (response.ok) {
        const assessment = await response.json();
        
        // Generate shareable link
        const shareableLink = `${window.location.origin}/assessment/${assessment.shareable_link}`;
        
        // Show success with shareable link
        setSuccess(`Assessment created successfully! Shareable link: ${shareableLink}`);
        
        // Navigate to assessment view after a delay
        setTimeout(() => {
          navigate(`/assessments/${assessment.id}`);
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to create assessment');
      }
    } catch (error) {
      setError('An error occurred while creating the assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const assessmentData = {
        ...formData,
        is_template: true,
        questions: assessmentQuestions.map(q => ({
          question_id: q.question_id,
          order: q.order,
          points: q.points,
          custom_duration: q.custom_duration
        }))
      };

      const response = await fetch('/api/assessments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(assessmentData)
      });

      if (response.ok) {
        const assessment = await response.json();
        navigate(`/assessments/${assessment.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to save template');
      }
    } catch (error) {
      setError('An error occurred while saving the template');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Savyre Branding */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link to="/assessments/create" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                Savyre
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/assessments" className="text-gray-700 hover:text-primary-600 font-medium">
                  Assessments
                </Link>
                <Link to="/questions" className="text-gray-700 hover:text-primary-600 font-medium">
                  Question Library
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                Go Pro
              </button>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Assessment</h1>
          <p className="text-gray-600">
            Build a custom assessment by selecting questions and configuring settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Question Library (Vertical Layout) */}
          <div className="lg:col-span-1">
            <QuestionLibrary
              onQuestionsSelected={handleQuestionSelection}
              selectedQuestions={selectedQuestions}
            />
          </div>

          {/* Right Column - Assessment Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Assessment Configuration</h2>

              {/* Form Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter assessment title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter assessment description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programming Language *
                  </label>
                  <select
                    value={formData.programming_language}
                    onChange={(e) => handleFormChange('programming_language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select language</option>
                    {programmingLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty_level}
                    onChange={(e) => handleFormChange('difficulty_level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select difficulty</option>
                    {difficultyLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_template"
                    checked={formData.is_template}
                    onChange={(e) => handleFormChange('is_template', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_template" className="ml-2 block text-sm text-gray-900">
                    Save as template for future use
                  </label>
                </div>
              </div>

              {/* Selected Questions Summary */}
              {selectedQuestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Questions ({selectedQuestions.length})</h3>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {assessmentQuestions.map((aq, index) => (
                      <div key={aq.question_id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}. {aq.question.title}
                          </span>
                          <button
                            onClick={() => removeQuestion(aq.question_id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-gray-600">Points:</label>
                            <input
                              type="number"
                              min="1"
                              value={aq.points}
                              onChange={(e) => updateQuestionPoints(aq.question_id, parseInt(e.target.value) || 1)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-gray-600">Duration (min):</label>
                            <input
                              type="number"
                              min="1"
                              value={aq.custom_duration || aq.question.estimated_duration}
                              onChange={(e) => updateQuestionDuration(aq.question_id, parseInt(e.target.value) || 1)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Assessment Summary */}
                  <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Duration:</span>
                      <span className="font-medium">{calculateTotalDuration()} min</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Score:</span>
                      <span className="font-medium">{calculateTotalScore()} points</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading || selectedQuestions.length === 0}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Assessment'}
                </button>

                <button
                  onClick={handleSaveTemplate}
                  disabled={loading || selectedQuestions.length === 0}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save as Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentBuilder;
