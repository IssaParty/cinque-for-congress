import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
      href: '/about',
      dropdown: [
        { name: 'Mission', href: '/about/mission' },
        { name: 'Leadership', href: '/about/leadership' }
      ]
    },
    {
      name: 'Programs',
      href: '/programs',
      dropdown: [
        { name: 'Community Support', href: '/programs/community-support' },
        { name: 'Volunteering', href: '/programs/volunteering' }
      ]
    },
    {
      name: 'Media',
      href: '/media',
      dropdown: [
        { name: 'Press Releases', href: '/media/press-releases' },
        { name: 'News', href: '/media/news' }
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      dropdown: [
        { name: 'Forms', href: '/resources/forms' },
        { name: 'Guides', href: '/resources/guides' }
      ]
    },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Alert Banner */}
      <div className="bg-light-gray border-b border-muted-gray">
        <div className="container-custom">
          <div className="py-2 text-center text-sm text-gray-700">
            <span className="font-medium">Notice:</span> Office hours are Monday-Friday, 9 AM - 5 PM MST
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">

            {/* Logo/Title */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 group"
                aria-label="Cinque Mason for Congress - Home"
              >
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CM</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-heading font-bold text-navy group-hover:text-accent-blue transition-colors">
                    Cinque Mason
                  </h1>
                  <p className="text-sm text-gray-600">
                    Serving Colorado District 2
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block" role="navigation" aria-label="Main navigation">
              <ul className="flex space-x-8">
                {navigation.map((item) => (
                  <li key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      className={`nav-link pb-2 ${
                        isActiveLink(item.href) ? 'active' : ''
                      }`}
                      aria-haspopup={item.dropdown ? 'true' : 'false'}
                    >
                      {item.name}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.dropdown && (
                      <ul className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-light-gray hover:text-accent-blue transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button
                className="p-2 text-gray-600 hover:text-accent-blue transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-accent-blue transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="container-custom py-4" role="navigation" aria-label="Mobile navigation">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`block py-2 px-4 text-gray-700 hover:bg-light-gray hover:text-accent-blue transition-colors rounded ${
                        isActiveLink(item.href) ? 'bg-light-gray text-accent-blue' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>

                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.href}
                              className="block py-2 px-4 text-sm text-gray-600 hover:bg-light-gray hover:text-accent-blue transition-colors rounded"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;