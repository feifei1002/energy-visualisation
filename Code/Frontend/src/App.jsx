import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisualisationPage from './VisualisationPage';
import Graph1 from './Graph1';

function App() {

    return (
        <>


            <Router>
                <Routes>
                    <Route path="/visualisation" element={<VisualisationPage />} />
                    <Route path="/graph1" element={<Graph1 />} />
            </Routes>
            </Router>
        </>
    )
}

export default App
