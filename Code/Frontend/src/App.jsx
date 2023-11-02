import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisualisationPage from './VisualisationPage';

function App() {

    return (
        <>


            <Router>
                <Routes>
                    <Route path="/visualisation" element={<VisualisationPage />} />
            </Routes>
            </Router>
        </>
    )
}

export default App
