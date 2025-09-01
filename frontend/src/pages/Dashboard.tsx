import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  TrophyIcon,
  StarIcon,
  CogIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('30');

  // Mock data for dashboard metrics
  const [metrics, setMetrics] = useState({
    assessmentCandidates: 0,
    videoCandidates: 0,
    chatbotCandidates: 0,
    totalAssessments: 0,
    completionRate: 0,
    averageScore: 0
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        assessmentCandidates: 24,
        videoCandidates: 18,
        chatbotCandidates: 12,
        totalAssessments: 156,
        completionRate: 87,
        averageScore: 82
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock chart data
  const chartData = [
    { day: 'Mon', candidates: 4 },
    { day: 'Tue', candidates: 6 },
    { day: 'Wed', candidates: 8 },
    { day: 'Thu', candidates: 5 },
    { day: 'Fri', candidates: 7 },
    { day: 'Sat', candidates: 3 },
    { day: 'Sun', candidates: 2 }
  ];

  const funnelData = [
    { stage: 'Started', count: 45, percentage: 100 },
    { stage: 'In Progress', count: 38, percentage: 84 },
    { stage: 'Completed', count: 32, percentage: 71 },
    { stage: 'Passed', count: 28, percentage: 62 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-primary-600">Savyre</div>
              <nav className="hidden md:flex space-x-6">
                <Link to="/assessments" className="text-gray-700 hover:text-primary-600 font-medium">
                  Assessments
                </Link>
                <Link to="/candidates" className="text-gray-700 hover:text-primary-600 font-medium">
                  Candidates
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-yellow-600">
                <TrophyIcon className="h-4 w-4" />
                <span>Go Pro</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <BellIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Savyre</h1>
          <p className="text-gray-600">Monitor your assessment portal performance and candidate activity</p>
        </div>

        {/* Time Filter */}
        <div className="mb-6">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm text-gray-500">Assessment candidates</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.assessmentCandidates}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +12% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <VideoCameraIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-sm text-gray-500">Video interview candidates</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.videoCandidates}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +8% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-sm text-gray-500">Chatbot candidates</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.chatbotCandidates}</div>
            <div className="flex items-center text-sm text-red-600">
              <ArrowDownIcon className="h-4 w-4 mr-1" />
              -3% from last month
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Candidates per Day Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidates per Day</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-primary-600 rounded-t-lg w-8 transition-all duration-300 hover:bg-primary-700"
                    style={{ height: `${(item.candidates / 8) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                  <div className="text-xs font-medium text-gray-900">{item.candidates}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Engagement Funnel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Engagement Funnel</h3>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                    <span className="text-xs text-gray-500">({stage.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{metrics.totalAssessments}</div>
            <div className="text-sm text-gray-600">Total Assessments Created</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{metrics.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{metrics.averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/assessments/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <DocumentTextIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Create Assessment</h4>
                <p className="text-sm text-gray-500">Build a new assessment</p>
              </div>
            </Link>
            
            <Link
              to="/questions"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <AcademicCapIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Browse Questions</h4>
                <p className="text-sm text-gray-500">Explore question library</p>
              </div>
            </Link>
            
            <Link
              to="/assessments"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <ChartBarIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">View Analytics</h4>
                <p className="text-sm text-gray-500">Check detailed reports</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New assessment "Frontend Developer Test" created</span>
              <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Candidate John Doe completed "Python Basics" assessment</span>
              <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New question added to "Database" category</span>
              <span className="text-xs text-gray-400 ml-auto">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
