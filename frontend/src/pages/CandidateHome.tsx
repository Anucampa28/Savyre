import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserIcon, 
  ChartBarIcon, 
  StarIcon, 
  TrophyIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { usePage } from '../hooks/useContent';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBoundary from '../components/ErrorBoundary';
import NotFound from '../components/NotFound';

const CandidateHome: React.FC = () => {
  const { user } = useAuth();
  
  // Fetch content from database
  const { page, loading, error } = usePage('candidate-home');

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
        message="We're having trouble loading your dashboard. Please check your connection and try again."
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

  const heroSection = getSectionContent('hero');
  const statsSection = getSectionContent('stats');
  const featuresSection = getSectionContent('features');
  const categoriesSection = getSectionContent('assessment_categories');
  const ctaSection = getSectionContent('cta');

  // Extract data from sections (database content only)
  const stats = statsSection?.meta_data?.stats || [];
  const features = featuresSection?.meta_data?.features || [];
  const categories = categoriesSection?.meta_data?.categories || [];
  const ctaData = ctaSection?.meta_data || {};

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
              <UserIcon className="w-4 h-4 mr-2" />
              {heroSection?.meta_data?.welcome_message?.replace('{user_name}', user?.first_name || 'Candidate') || `Welcome back, ${user?.first_name || 'Candidate'}!`}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {heroSection?.title || 'Level Up Your Career Skills'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {heroSection?.content || 'Take real-world assessments, track your progress, and showcase your expertise to top employers. Your journey to professional excellence starts here.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/assessments"
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
              >
                <ChartBarIcon className="w-5 h-5 mr-2" />
                {heroSection?.meta_data?.cta_primary || 'View My Assessments'}
              </Link>
              <Link
                to="/profile"
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                {heroSection?.meta_data?.cta_secondary || 'Update Profile'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {statsSection?.title || 'Your Progress Overview'}
            </h2>
            <p className="text-gray-600">
              {statsSection?.content || 'Track your assessment progress and skill development'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.length > 0 ? (
              stats.map((stat: any, index: number) => {
                const IconComponent = stat.icon === 'ChartBarIcon' ? ChartBarIcon :
                                    stat.icon === 'CheckCircleIcon' ? CheckCircleIcon :
                                    stat.icon === 'StarIcon' ? StarIcon :
                                    stat.icon === 'TrophyIcon' ? TrophyIcon : ChartBarIcon;
                
                const colorClasses = {
                  primary: 'bg-primary-100 text-primary-600',
                  green: 'bg-green-100 text-green-600',
                  blue: 'bg-blue-100 text-blue-600',
                  yellow: 'bg-yellow-100 text-yellow-600'
                };
                
                const colorClass = colorClasses[stat.color as keyof typeof colorClasses] || 'bg-primary-100 text-primary-600';
                
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${colorClass.split(' ')[0]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${colorClass.split(' ')[1]}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                );
              })
            ) : (
              // Fallback stats if no data
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChartBarIcon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">0</h3>
                  <p className="text-gray-600">Total Assessments</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">0</h3>
                  <p className="text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <StarIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">0%</h3>
                  <p className="text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrophyIcon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">0</h3>
                  <p className="text-gray-600">Skills Mastered</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {featuresSection?.title || 'Why Choose Savyre Assessments?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {featuresSection?.content || 'Our platform is designed to help you showcase your skills and advance your career'}
            </p>
          </div>
          
          {features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature: any, index: number) => {
                const IconComponent = feature.icon === 'AcademicCapIcon' ? AcademicCapIcon :
                                    feature.icon === 'ChartBarIcon' ? ChartBarIcon :
                                    feature.icon === 'BriefcaseIcon' ? BriefcaseIcon : AcademicCapIcon;
                
                return (
                  <div key={index} className="card text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No features available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Assessment Categories */}
      <section id="assessments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {categoriesSection?.title || 'Assessment Categories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {categoriesSection?.content || 'Explore assessments across different domains and skill levels'}
            </p>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category: any, index: number) => (
                <div key={index} className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                      {category.count} assessments
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No assessment categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {ctaSection?.title || 'Ready to Take Your Next Assessment?'}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {ctaSection?.content || 'Join thousands of professionals who are advancing their careers with Savyre assessments.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessments"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              {ctaData.cta_primary || 'Start Assessment'}
            </Link>
            <Link
              to="/profile"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              {ctaData.cta_secondary || 'Complete Profile'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateHome;
