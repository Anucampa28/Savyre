import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
  };

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              Savyre
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Main navigation - same for all users */}
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              
              {isHomePage ? (
                <>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection('assessments')}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Assessments
                  </button>
                  <button
                    onClick={() => scrollToSection('industries')}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Industries
                  </button>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Contact
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/#features"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Features
                  </Link>
                  <Link
                    to="/#assessments"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Assessments
                  </Link>
                  <Link
                    to="/#industries"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Industries
                  </Link>
                  <Link
                    to="/#pricing"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/#contact"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </>
              )}

              {/* User-specific navigation */}
              {user && (
                <>
                  {user.user_type === 'candidate' && (
                    <>
                      <Link
                        to="/candidate-home"
                        className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        My Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/assessments"
                        className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        My Assessments
                      </Link>
                    </>
                  )}
                  {user.user_type === 'employer' && (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/assessments"
                        className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Manage Assessments
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm">
                    Welcome, {user.first_name}!
                  </span>
                  <Link
                    to="/dashboard"
                    className="btn-secondary text-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    className="btn-primary text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 p-2 rounded-md"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {/* Main navigation - same for all users */}
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('assessments')}
                  className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Assessments
                </button>
                <button
                  onClick={() => scrollToSection('industries')}
                  className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Industries
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Contact
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/#features"
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/#assessments"
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Assessments
                </Link>
                <Link
                  to="/#industries"
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Industries
                </Link>
                <Link
                  to="/#pricing"
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/#contact"
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}

            {/* User-specific navigation */}
            {user && (
              <>
                {user.user_type === 'candidate' && (
                  <>
                    <Link
                      to="/candidate-home"
                      className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/assessments"
                      className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      My Assessments
                    </Link>
                  </>
                )}
                {user.user_type === 'employer' && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/assessments"
                      className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage Assessments
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-gray-700 hover:text-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}

            {/* Auth buttons for non-logged-in users */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="btn-primary block text-center mx-3 my-2"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
