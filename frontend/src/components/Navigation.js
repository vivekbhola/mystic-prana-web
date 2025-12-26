import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            data-testid="logo-link"
          >
            <div className="relative">
              <img 
                src="https://customer-assets.emergentagent.com/job_prana-wellness/artifacts/l5mux881_logo.jpeg"
                alt="Mystic Prana Logo"
                className="h-12 w-12 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-semibold text-xl transition-colors duration-300 ${
                isScrolled ? 'text-green-800' : 'text-white'
              }`}>
                Mystic Prana
              </span>
              <span className={`text-xs font-light transition-colors duration-300 ${
                isScrolled ? 'text-green-600' : 'text-green-100'
              }`}>
                Energy Healing Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === item.path
                    ? isScrolled
                      ? 'text-green-700'
                      : 'text-green-200'
                    : isScrolled
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-white hover:text-green-200'
                } group`}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            
            <Link
              to="/contact"
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isScrolled
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
              data-testid="book-session-btn"
            >
              Book Session
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/20'
            }`}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-b-2xl mt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-green-50 hover:pl-8 ${
                  location.pathname === item.path
                    ? 'text-green-700 bg-green-50 border-r-2 border-green-500'
                    : 'text-gray-700'
                }`}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-6 py-3">
              <Link
                to="/contact"
                className="block w-full text-center px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors duration-300"
                data-testid="mobile-book-session-btn"
              >
                Book Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
