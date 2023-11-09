import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import BeforeAfterHeatDemandPage from './pages/BeforeAfterHeatDemandPage';
import LandingPage from './pages/LandingPage'
import VisualisationPage from './VisualisationPage'
import ProfileDashboardPage from "./ProfileDashboardPage.jsx";
import ResistanceHeatersPage from "./pages/ResistanceHeatersPage.jsx";

export default function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visualisations/beforeafterheatdemand" element={<BeforeAfterHeatDemandPage/>} />
        <Route path="/visualisations/halfhourlyresistanceheaters" element={<ResistanceHeatersPage/>} />
        <Route path="/visualisations" element={<VisualisationPage />} />
        <Route path="/profiledashboard" element={<ProfileDashboardPage />} />
        </Routes>
  </Router>
  )
}
