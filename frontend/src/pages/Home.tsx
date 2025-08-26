import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Real-Life Scenarios',
      description: 'Authentic workplace challenges that mirror actual job requirements'
    },
    {
      icon: UserGroupIcon,
      title: 'Industry-Specific',
      description: 'Tailored evaluations for different professional domains'
    },
    {
      icon: ChartBarIcon,
      title: 'Interactive Assessments',
      description: 'Dynamic content switching between multiple skill categories'
    },
    {
      icon: ClockIcon,
      title: 'Performance Tracking',
      description: 'Monitor progress and identify areas for improvement'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Laksham Assessment Portal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            A modern assessment portal for real-life on-job simulated question library. 
            Evaluate skills, track progress, and prepare for workplace challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="btn-secondary text-lg px-8 py-3"
            >
              Try Demo
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium px-8 py-3 rounded-lg transition-colors duration-200 text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Laksham?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with real-world scenarios 
              to provide the most effective assessment experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-200">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Assessment Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who trust Laksham for their skill evaluation needs.
          </p>
          <Link
            to="/login"
            className="btn-primary text-lg px-8 py-3"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
