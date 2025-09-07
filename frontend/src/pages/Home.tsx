import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { usePage } from '../hooks/useContent';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBoundary from '../components/ErrorBoundary';
import NotFound from '../components/NotFound';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leadership');
  
  // Fetch content from database
  const { page, loading, error } = usePage('home');

  // Handle loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <ErrorBoundary 
        error={error}
        title="Unable to load content"
        message="We're having trouble loading the page content. Please check your connection and try again."
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
  const featuresSection = getSectionContent('features');
  const assessmentsSection = getSectionContent('assessments');
  const industriesSection = getSectionContent('industries');
  const pricingSection = getSectionContent('pricing');
  const contactSection = getSectionContent('contact');

  // Extract data from sections (database content only)
  const features = featuresSection?.meta_data?.features || [];
  const assessmentTabs = assessmentsSection?.meta_data?.categories || [];
  const industries = industriesSection?.meta_data?.industries || [];
  const pricingPlans = pricingSection?.meta_data?.plans || [];
  const heroStats = heroSection?.meta_data?.stats || [];
  const contactInfo = contactSection?.meta_data?.contact_info || {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {heroSection?.title || 'Welcome to Savyre'}
            <span className="block text-accent-400">Assessment Portal</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            {heroSection?.content || 'Your comprehensive assessment platform for real-world skills evaluation.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/login"
              className="btn-secondary text-lg px-8 py-3"
            >
              {heroSection?.meta_data?.cta_primary || 'Get Started'}
            </Link>
            <Link
              to="/assessment"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium px-8 py-3 rounded-lg transition-colors duration-200 text-lg"
            >
              {heroSection?.meta_data?.cta_secondary || 'Learn More'}
            </Link>
          </div>
          
          {/* Hero Stats */}
          {heroStats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {heroStats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent-400">{stat.value}</div>
                  <div className="text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {featuresSection?.title || 'Features'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {featuresSection?.content || 'Discover what makes our platform unique.'}
            </p>
          </div>
          
          {features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature: any, index: number) => {
                const IconComponent = AcademicCapIcon; // Default icon
                return (
                  <div key={index} className="card text-center group hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-200">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
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

      {/* Assessments Section */}
      <section id="assessments" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {assessmentsSection?.title || 'Assessment Categories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {assessmentsSection?.content || 'Explore our assessment options.'}
            </p>
          </div>

          {assessmentTabs.length > 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
                {assessmentTabs.map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="text-center py-12">
                {assessmentTabs.map((tab: any) => (
                  <div
                    key={tab.id}
                    className={activeTab === tab.id ? 'block' : 'hidden'}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {tab.title} Assessments
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                      {tab.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/assessment"
                        className="btn-secondary text-lg px-8 py-3"
                      >
                        Try {tab.title} Assessment
                      </Link>
                      <Link
                        to="/assessment"
                        className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2 hover:bg-primary-700 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Start Assessment
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No assessment categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {industriesSection?.title || 'Industry-Specific Solutions'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {industriesSection?.content || 'Tailored assessments for professionals across diverse industries, ensuring relevance to your specific workplace challenges.'}
            </p>
          </div>
          
          {industries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry: any, index: number) => (
                <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-gray-600">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No industries available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {pricingSection?.title || 'Choose Your Plan'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {pricingSection?.content || 'Flexible pricing options designed to grow with your assessment needs, from individual professionals to enterprise teams.'}
            </p>
          </div>
          
          {pricingPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan: any, index: number) => (
                <div key={index} className={`card relative ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-primary-600">
                      {plan.price}
                      <span className="text-lg text-gray-500">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No pricing plans available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {contactSection?.title || 'Get in Touch'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {contactSection?.content || 'Ready to transform your assessment experience? Contact our team to learn more about how Savyre can help your organization.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="input-field"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="input-field"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="input-field"
                    placeholder="Tell us about your assessment needs..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.email && (
                <div className="flex items-start">
                  <EnvelopeIcon className="w-6 h-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
              )}
              {contactInfo.phone && (
                <div className="flex items-start">
                  <PhoneIcon className="w-6 h-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>
              )}
              {contactInfo.address && (
                <div className="flex items-start">
                  <MapPinIcon className="w-6 h-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: contactInfo.address }} />
                  </div>
                </div>
              )}
              {!contactInfo.email && !contactInfo.phone && !contactInfo.address && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Contact information not available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
