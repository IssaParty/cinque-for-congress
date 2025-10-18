import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumb on homepage
  if (location.pathname === '/') {
    return null;
  }

  const generateBreadcrumbName = (pathname) => {
    // Convert pathname to readable format
    return pathname
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="bg-light-gray border-b border-muted-gray" aria-label="Breadcrumb">
      <div className="container-custom">
        <ol className="flex items-center space-x-2 py-3 text-sm">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-accent-blue transition-colors duration-200"
            >
              Home
            </Link>
          </li>

          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={name} className="flex items-center">
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>

                {isLast ? (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {generateBreadcrumbName(name)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-600 hover:text-accent-blue transition-colors duration-200"
                  >
                    {generateBreadcrumbName(name)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;