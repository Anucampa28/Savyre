import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { usePage } from '../hooks/useContent';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBoundary from '../components/ErrorBoundary';
import NotFound from '../components/NotFound';

interface DemoAssessment {
  id: number;
  title: string;
  description: string;
  duration: number;
  questions: number;
  category: string;
}

const Demo: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<DemoAssessment | null>(null);
  
  // Fetch content from database
  const { page, loading, error } = usePage('demo');

  // Handle loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <ErrorBoundary 
        error={error}
        title="Unable to load demo content"
        message="We're having trouble loading the demo page. Please check your connection and try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Handle not found state
  if (!page) {
    return <NotFound />;
  }

  // Get content from database
  const getSectionContent = (sectionKey: string) => {
    if (!page?.sections) return null;
    return page.sections.find(section => section.section_key === sectionKey);
  };

  const demoAssessmentsSection = getSectionContent('demo_assessments');
  const ctaSection = getSectionContent('cta');

  // Extract data from sections (database content only)
  const demoAssessments: DemoAssessment[] = demoAssessmentsSection?.meta_data?.assessments || [];
  const ctaData = ctaSection?.meta_data || {};

  const handleStartAssessment = (assessment: DemoAssessment) => {
    setSelectedAssessment(assessment);
  };

  const handleCloseAssessment = () => {
    setSelectedAssessment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <section className="bg-white shadow-sm border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.title || 'Savyre Assessment Demo'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {page.description || 'Experience our real-world workplace scenarios and interactive assessments.'}
          </p>
        </div>
      </section>

      {/* Demo Assessments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {demoAssessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {demoAssessments.map((assessment) => (
              <div key={assessment.id} className="card hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {assessment.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {assessment.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      assessment.category === 'Leadership' ? 'bg-blue-100 text-blue-800' :
                      assessment.category === 'Technical' ? 'bg-green-100 text-green-800' :
                      assessment.category === 'Soft Skills' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {assessment.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {assessment.duration} min
                    </span>
                    <span className="flex items-center">
                      <AcademicCapIcon className="h-4 w-4 mr-1" />
                      {assessment.questions} questions
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleStartAssessment(assessment)}
                  className="w-full btn-primary flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-200"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Start Demo Assessment
                </button>
              </div>
            ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No demo assessments available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {ctaSection?.title || 'Ready for the Full Experience?'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {ctaSection?.content || 'Create your account to access our complete assessment library and track your progress over time.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn-primary text-lg px-8 py-3"
            >
              {ctaData.cta_primary || 'Create Account'}
            </Link>
            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-8 py-3 rounded-lg transition-colors duration-200 text-lg"
            >
              {ctaData.cta_secondary || 'Learn More'}
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedAssessment.title}
                </h2>
                <button
                  onClick={handleCloseAssessment}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-600">{selectedAssessment.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Duration</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedAssessment.duration} minutes</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Questions</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedAssessment.questions}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCloseAssessment}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary flex items-center justify-center">
                  Start Assessment
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
