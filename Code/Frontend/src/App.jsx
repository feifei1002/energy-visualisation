import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisualisationPage from './VisualisationPage';
import Graph1 from './Graph1';
import ProfileDashboardPage from './ProfileDashboardPage';

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/visualisations" element={<VisualisationPage />} />
                    <Route path="/visualisations/graph1" element={<Graph1 />}  />
                    <Route path="/profiledashboard" element={<ProfileDashboardPage />} />
                </Routes>
            </Router>
        </>
    )
    //Please replace the path and the element with the actual graph file later
}

export default App
