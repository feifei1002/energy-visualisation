import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import BeforeAfterHeatDemandPage from './pages/BeforeAfterHeatDemandPage';
import LandingPage from './pages/LandingPage'
import VisualisationPage from './VisualisationPage'
import GasBoilersPage from './pages/GasBoilersPage.jsx'
import Login from './pages/Login.jsx';
import ProfileDashboardPage from "./ProfileDashboardPage.jsx";
import ResistanceHeatersPage from "./pages/ResistanceHeatersPage.jsx";
import BreakDownOfHeatDemandPage from "./pages/BreakDownOfHeatDemandPage.jsx";
import RegistrationPage from "./pages/RegistrationPage";
import WebAdminDashboard from "./pages/WebAdminDashboard"
import { NotificationProvider } from './contexts/NotificationContext';

export default function App() {
  return (
      <NotificationProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/visualisations/beforeafterheatdemand" element={<BeforeAfterHeatDemandPage/>} />
                <Route path="/visualisations/heatdemandbreakdown" element={<BreakDownOfHeatDemandPage />} />
                <Route path="/visualisations" element={<VisualisationPage />} />
                <Route path="/visualisations/halfhourlyresistanceheaters" element={<ResistanceHeatersPage />}  />
                <Route path="/profiledashboard" element={<ProfileDashboardPage />} />
                <Route path="/webadmindashboard" element={<WebAdminDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/visualisations/halfhourlygasboilers" element={<GasBoilersPage />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>
            <ToastContainer />
        </Router>
      </NotificationProvider>
  )
}

