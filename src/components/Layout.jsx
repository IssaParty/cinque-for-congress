import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;