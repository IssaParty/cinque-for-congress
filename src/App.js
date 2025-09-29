import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Analytics from './components/Analytics';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PoliciesPage from './pages/PoliciesPage';
import VisionPage from './pages/VisionPage';
import MyPlanPage from './pages/MyPlanPage';
import JoinPage from './pages/JoinPage';
import RequestEventPage from './pages/RequestEventPage';
import PressPage from './pages/PressPage';
import ExpendituresPage from './pages/ExpendituresPage';
import RoadToCongressPage from './pages/RoadToCongressPage';

const App = () => {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="policies" element={<PoliciesPage />} />
          <Route path="vision" element={<VisionPage />} />
          <Route path="my-plan" element={<MyPlanPage />} />
          <Route path="expenditures" element={<ExpendituresPage />} />
          <Route path="road-to-congress" element={<RoadToCongressPage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="request-event" element={<RequestEventPage />} />
          <Route path="press" element={<PressPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;