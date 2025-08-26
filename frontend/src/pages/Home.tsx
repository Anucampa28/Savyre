import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  ClockIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leadership');

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

  const assessmentTabs = [
    { id: 'leadership', title: 'Leadership', description: 'Develop essential leadership skills through real-world scenarios' },
    { id: 'technical', title: 'Technical', description: 'Master technical competencies with hands-on problem solving' },
    { id: 'soft-skills', title: 'Soft Skills', description: 'Enhance communication, teamwork, and emotional intelligence' },
    { id: 'industry', title: 'Industry', description: 'Industry-specific challenges tailored to your professional field' }
  ];

  const industries = [
    { name: 'Technology', icon: '💻', description: 'Software development, IT infrastructure, cybersecurity' },
    { name: 'Healthcare', icon: '🏥', description: 'Patient care, medical procedures, healthcare management' },
    { name: 'Finance', icon: '💰', description: 'Banking, investment, risk management, compliance' },
    { name: 'Education', icon: '🎓', description: 'Teaching, curriculum development, student assessment' },
    { name: 'Manufacturing', icon: '🏭', description: 'Production, quality control, supply chain management' },
    { name: 'Retail', icon: '🛍️', description: 'Customer service, sales, inventory management' }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['5 assessments per month', 'Basic reporting', 'Email support', 'Standard scenarios'],
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: ['Unlimited assessments', 'Advanced analytics', 'Priority support', 'Custom scenarios', 'Team collaboration'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Everything in Professional', 'Custom integrations', 'Dedicated support', 'White-label options', 'API access'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Real-World Skills with
            <span className="block text-accent-400">On-Job Simulations</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Savyre's comprehensive assessment portal features real-life workplace scenarios, 
            industry-specific challenges, and practical problem-solving exercises that mirror 
            actual job requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/login"
              className="btn-secondary text-lg px-8 py-3"
            >
              Start Free Assessment
            </Link>
            <Link
              to="/demo"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium px-8 py-3 rounded-lg transition-colors duration-200 text-lg"
            >
              Watch Demo
            </Link>
          </div>
          
          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400">50K+</div>
              <div className="text-primary-100">Professionals Assessed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400">200+</div>
              <div className="text-primary-100">Real Scenarios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400">95%</div>
              <div className="text-primary-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Savyre?
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

      {/* Assessments Section */}
      <section id="assessments" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Assessment Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of assessment types designed to evaluate 
              every aspect of professional competency.
            </p>
          </div>

          {/* Assessment Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
              {assessmentTabs.map((tab) => (
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
              {assessmentTabs.map((tab) => (
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
                  <Link
                    to="/demo"
                    className="btn-primary text-lg px-8 py-3"
                  >
                    Try {tab.title} Assessment
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored assessments for professionals across diverse industries, 
              ensuring relevance to your specific workplace challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
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
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options designed to grow with your assessment needs, 
              from individual professionals to enterprise teams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
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
                  {plan.features.map((feature, featureIndex) => (
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your assessment experience? Contact our team 
              to learn more about how Savyre can help your organization.
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
              <div className="flex items-start">
                <EnvelopeIcon className="w-6 h-6 text-primary-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@savyre.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon className="w-6 h-6 text-primary-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="w-6 h-6 text-primary-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Innovation Drive<br />Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
