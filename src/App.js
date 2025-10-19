import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import VisionPage from './pages/VisionPage';
import MyPlanPage from './pages/MyPlanPage';
import JoinPage from './pages/JoinPage';
import ExpendituresPage from './pages/ExpendituresPage';
import RoadToCongressPage from './pages/RoadToCongressPage';
import RequestEventPage from './pages/RequestEventPage';
import Layout from './components/Layout';
import Breadcrumb from './components/Breadcrumb';

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Placeholder components for other pages
const PageWrapper = ({ title, children }) => (
  <Layout>
    <Breadcrumb />
    <div className="container-custom py-16">
      <h1 className="text-3xl font-heading font-bold text-navy mb-6">{title}</h1>
      {children}
    </div>
  </Layout>
);

const MissionPage = () => (
  <PageWrapper title="Our Mission">
    <p className="text-gray-700 leading-relaxed">
      Our mission content will go here. This is a placeholder page.
    </p>
  </PageWrapper>
);

const LeadershipPage = () => (
  <PageWrapper title="Leadership">
    <p className="text-gray-700 leading-relaxed">
      Leadership content will go here. This is a placeholder page.
    </p>
  </PageWrapper>
);

const ProgramsPage = () => (
  <PageWrapper title="Programs">
    <p className="text-gray-700 leading-relaxed">
      Programs content will go here. This is a placeholder page.
    </p>
  </PageWrapper>
);

const MediaPage = () => (
  <PageWrapper title="Media">
    <p className="text-gray-700 leading-relaxed">
      Media content will go here. This is a placeholder page.
    </p>
  </PageWrapper>
);

const ResourcesPage = () => (
  <PageWrapper title="Resources">
    <p className="text-gray-700 leading-relaxed">
      Resources content will go here. This is a placeholder page.
    </p>
  </PageWrapper>
);

const ContactPage = () => (
  <PageWrapper title="Contact">
    <p className="text-gray-700 leading-relaxed">
      Contact content will go here. This is a placeholder page.
    </p>
  </PageWrapper>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/vision" element={<Layout><VisionPage /></Layout>} />
        <Route path="/my-plan" element={<Layout><MyPlanPage /></Layout>} />
        <Route path="/join" element={<Layout><JoinPage /></Layout>} />
        <Route path="/expenditures" element={<Layout><ExpendituresPage /></Layout>} />
        <Route path="/road-to-congress" element={<Layout><RoadToCongressPage /></Layout>} />
        <Route path="/request-event" element={<Layout><RequestEventPage /></Layout>} />
        <Route path="/about/mission" element={<MissionPage />} />
        <Route path="/about/leadership" element={<LeadershipPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/community-support" element={<ProgramsPage />} />
        <Route path="/programs/volunteering" element={<ProgramsPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/media/press-releases" element={<MediaPage />} />
        <Route path="/media/news" element={<MediaPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/forms" element={<ResourcesPage />} />
        <Route path="/resources/guides" element={<ResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Catch all route */}
        <Route path="*" element={
          <PageWrapper title="Page Not Found">
            <p className="text-gray-700 leading-relaxed mb-8">
              The page you're looking for doesn't exist.
            </p>
            <a href="/" className="btn-primary">
              Return Home
            </a>
          </PageWrapper>
        } />
      </Routes>
    </Router>
  );
};

export default App;