import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ClockIcon, 
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import CodeEditor from '../components/CodeEditor';

interface Question {
  id: number;
  title: string;
  description: string;
  buggy_snippet: string;
  what_wrong: string;
  fix_outline: string;
  difficulty_level: string;
  category: string;
  estimated_duration: number;
  programming_language?: string;
  tags?: string[];
}

interface AssessmentQuestion {
  id: number;
  question_id: number;
  order: number;
  points: number;
  custom_duration?: number;
  question: Question;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  programming_language: string;
  difficulty_level: string;
  total_duration: number;
  max_score: number;
  questions: AssessmentQuestion[];
}

interface AssessmentAttempt {
  id: number;
  assessment_id: number;
  candidate_email: string;
  candidate_name?: string;
  started_at: string;
  max_score: number;
  status: string;
}

const CandidateAssessment: React.FC = () => {
  const { shareableLink } = useParams<{ shareableLink: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState({
    email: '',
    name: ''
  });

  useEffect(() => {
    if (shareableLink) {
      fetchAssessment();
    }
  }, [shareableLink]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const fetchAssessment = async () => {
    try {
      const response = await fetch(`/api/assessments/share/${shareableLink}`);
      if (response.ok) {
        const data = await response.json();
        setAssessment(data);
        setTimeRemaining(data.total_duration * 60); // Convert to seconds
      } else {
        setError('Assessment not found or has expired');
      }
    } catch (error) {
      setError('Failed to load assessment');
    } finally {
      setLoading(false);
    }
  };

  const startAssessment = async () => {
    if (!candidateInfo.email.trim()) {
      setError('Please enter your email address');
      return;
    }

    try {
      const response = await fetch(`/api/assessments/${assessment!.id}/attempts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          candidate_email: candidateInfo.email,
          candidate_name: candidateInfo.name || undefined
        })
      });

      if (response.ok) {
        const attemptData = await response.json();
        setAttempt(attemptData);
        setTimeRemaining(assessment!.total_duration * 60);
      } else {
        setError('Failed to start assessment');
      }
    } catch (error) {
      setError('Failed to start assessment');
    }
  };

  const handleTimeUp = () => {
    setShowSubmitModal(true);
  };

  const handleAnswerChange = (questionId: number | string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitAnswer = async (questionId: number) => {
    if (!attempt) return;

    try {
      await fetch(`/api/assessments/attempts/${attempt.id}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question_id: questionId,
          answer_text: answers[questionId] || ''
        })
      });
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!attempt) return;

    try {
      // Submit all remaining answers
      for (const [questionId, answer] of Object.entries(answers)) {
        if (answer && !answer.trim()) continue;
        await handleSubmitAnswer(parseInt(questionId));
      }

      // Mark assessment as completed
      await fetch(`/api/assessments/attempts/${attempt.id}/complete`, {
        method: 'POST'
      });

      navigate(`/assessment/complete/${attempt.id}`);
    } catch (error) {
      setError('Failed to submit assessment');
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestion = () => {
    if (!assessment || currentQuestionIndex >= assessment.questions.length) return null;
    return assessment.questions[currentQuestionIndex];
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < assessment!.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const isQuestionAnswered = (questionId: number) => {
    return answers[questionId] && answers[questionId].trim() !== '';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Assessment Not Found</h1>
          <p className="text-gray-600">The assessment you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{assessment.title}</h1>
          {assessment.description && (
            <p className="text-gray-600 mb-6">{assessment.description}</p>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{assessment.questions.length}</div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{assessment.total_duration}</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{assessment.max_score}</div>
              <div className="text-sm text-gray-500">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{assessment.difficulty_level}</div>
              <div className="text-sm text-gray-500">Difficulty</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={candidateInfo.email}
                onChange={(e) => setCandidateInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={candidateInfo.name}
                onChange={(e) => setCandidateInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your full name (optional)"
              />
            </div>
          </div>

          <button
            onClick={startAssessment}
            disabled={!candidateInfo.email.trim()}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{assessment.title}</h1>
              <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {assessment.questions.length}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-red-600">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span className="font-mono text-lg font-semibold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
              <h3 className="font-medium text-gray-900 mb-4">Question Navigation</h3>
              <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
                {assessment.questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`p-2 rounded-md text-sm font-medium transition-colors ${
                      index === currentQuestionIndex
                        ? 'bg-primary-600 text-white'
                        : isQuestionAnswered(q.question_id)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-primary-600 rounded mr-2"></div>
                  Current Question
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  Answered
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
                  Unanswered
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full ${
                      currentQuestion.question.difficulty_level === 'Easy' ? 'bg-green-100 text-green-800' :
                      currentQuestion.question.difficulty_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentQuestion.question.difficulty_level}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {currentQuestion.question.category}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {currentQuestion.custom_duration || currentQuestion.question.estimated_duration} min
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {currentQuestion.points} pts
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {currentQuestion.question.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {currentQuestion.question.description}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">What's Wrong:</h4>
                  <p className="text-gray-700 mb-3">{currentQuestion.question.what_wrong}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Fix Outline:</h4>
                  <p className="text-gray-700">{currentQuestion.question.fix_outline}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  
                  {/* Show IDE for programming questions, textarea for others */}
                  {currentQuestion.question.programming_language ? (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">Programming Question</h4>
                        <p className="text-blue-700 text-sm">
                          Use the code editor below to write your solution in {currentQuestion.question.programming_language}.
                        </p>
                      </div>
                      
                      <CodeEditor
                        language={currentQuestion.question.programming_language}
                        initialCode={answers[currentQuestion.question_id] || ''}
                        onCodeChange={(code) => handleAnswerChange(currentQuestion.question_id, code)}
                        readOnly={false}
                        theme="light"
                      />
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Explanation (Optional)
                        </label>
                        <textarea
                          value={answers[`${currentQuestion.question_id}_explanation`] || ''}
                          onChange={(e) => handleAnswerChange(`${currentQuestion.question_id}_explanation`, e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Explain your approach, any assumptions, or additional context..."
                        />
                      </div>
                    </div>
                  ) : (
                    <textarea
                      value={answers[currentQuestion.question_id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.question_id, e.target.value)}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Describe the issue and provide your solution..."
                    />
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <button
                  onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-2" />
                  Previous
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleSubmitAnswer(currentQuestion.question_id)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FlagIcon className="h-4 w-4 mr-2" />
                    Save Answer
                  </button>
                </div>

                <button
                  onClick={() => goToQuestion(currentQuestionIndex + 1)}
                  disabled={currentQuestionIndex === assessment.questions.length - 1}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Submit Assessment</h3>
              
              <div className="mb-4">
                <p className="text-gray-600">
                  Are you sure you want to submit your assessment? This action cannot be undone.
                </p>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center text-yellow-800">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Time Remaining: {formatTime(timeRemaining)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Continue Assessment
                </button>
                <button
                  onClick={handleSubmitAssessment}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateAssessment;
