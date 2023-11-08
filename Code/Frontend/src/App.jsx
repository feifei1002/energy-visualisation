import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import BeforeAfterHeatDemandPage from './pages/BeforeAfterHeatDemandPage';
import LandingPage from './pages/LandingPage'
import VisualisationPage from './VisualisationPage'
// import Graph1 from './Graph1'
import ProfileDashboardPage from "./ProfileDashboardPage.jsx";
import Graph1 from "./Graph1.jsx";
import Login from './pages/Login.jsx';


export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/visualisations/beforeafterheatdemand" element={<BeforeAfterHeatDemandPage/>} />
            <Route path="/visualisations" element={<VisualisationPage />} />
            <Route path="/visualisations/graph1" element={<Graph1 />}  />
            <Route path="/profiledashboard" element={<ProfileDashboardPage />} />
            <Route path="/login" element={<Login />} />
        </Routes>
  </Router>
  )
}
