import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAssessmentModal: React.FC<CreateAssessmentModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Intermediate');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role.trim()) {
      alert('Please enter a role');
      return;
    }

    setLoading(true);
    
    try {
      // Navigate to the assessment builder with the selected parameters
      navigate(`/assessments/create?role=${encodeURIComponent(role)}&level=${difficultyLevel}`);
      onClose();
    } catch (error) {
      console.error('Error creating assessment:', error);
      alert('Failed to create assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Assessment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Role Input */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role We Are Hiring For *
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Python Developer, Frontend Engineer, DevOps Specialist"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {/* Difficulty Level Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Assessment Level *
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficultyLevel"
                  value="Beginner"
                  checked={difficultyLevel === 'Beginner'}
                  onChange={(e) => setDifficultyLevel(e.target.value as 'Beginner' | 'Intermediate' | 'Expert')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">Beginner</span>
                  <span className="text-gray-500 ml-2">- Entry level, basic concepts</span>
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficultyLevel"
                  value="Intermediate"
                  checked={difficultyLevel === 'Intermediate'}
                  onChange={(e) => setDifficultyLevel(e.target.value as 'Beginner' | 'Intermediate' | 'Expert')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">Intermediate</span>
                  <span className="text-gray-500 ml-2">- Mid-level, practical experience</span>
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficultyLevel"
                  value="Expert"
                  checked={difficultyLevel === 'Expert'}
                  onChange={(e) => setDifficultyLevel(e.target.value as 'Beginner' | 'Intermediate' | 'Expert')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">Expert</span>
                  <span className="text-gray-500 ml-2">- Senior level, advanced concepts</span>
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !role.trim()}
              className="flex-1 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Assessment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessmentModal;
