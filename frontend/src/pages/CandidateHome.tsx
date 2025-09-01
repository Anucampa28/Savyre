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

const CandidateHome: React.FC = () => {
  const { user } = useAuth();

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
              Welcome back, {user?.first_name || 'Candidate'}!
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Level Up Your
              <span className="text-primary-600 block">Career Skills</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Take real-world assessments, track your progress, and showcase your expertise to top employers. 
              Your journey to professional excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/assessments"
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
              >
                <ChartBarIcon className="w-5 h-5 mr-2" />
                View My Assessments
              </Link>
              <Link
                to="/profile"
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5</h3>
              <p className="text-gray-600">Total Assessments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2</h3>
              <p className="text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">85%</h3>
              <p className="text-gray-600">Average Score</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">3</h3>
              <p className="text-gray-600">Skills Mastered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Savyre Assessments?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to help you showcase your skills and advance your career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AcademicCapIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-World Scenarios</h3>
              <p className="text-gray-600">
                Practice with assessments that mirror actual workplace challenges and industry standards.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChartBarIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed analytics and performance insights.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BriefcaseIcon className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Growth</h3>
              <p className="text-gray-600">
                Build a portfolio of verified skills that employers recognize and value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Categories */}
      <section id="assessments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Assessment Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore assessments across different domains and skill levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Frontend Development', icon: '💻', count: 12, color: 'bg-blue-100 text-blue-800' },
              { title: 'Backend Engineering', icon: '⚙️', count: 15, color: 'bg-green-100 text-green-800' },
              { title: 'Data Science', icon: '📊', count: 8, color: 'bg-purple-100 text-purple-800' },
              { title: 'DevOps', icon: '🚀', count: 10, color: 'bg-orange-100 text-orange-800' },
              { title: 'Mobile Development', icon: '📱', count: 6, color: 'bg-pink-100 text-pink-800' },
              { title: 'System Design', icon: '🏗️', count: 9, color: 'bg-indigo-100 text-indigo-800' },
              { title: 'Database Design', icon: '🗄️', count: 7, color: 'bg-teal-100 text-teal-800' },
              { title: 'Security', icon: '🔒', count: 5, color: 'bg-red-100 text-red-800' }
            ].map((category, index) => (
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Take Your Next Assessment?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are advancing their careers with Savyre assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessments"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Start Assessment
            </Link>
            <Link
              to="/profile"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Complete Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateHome;
