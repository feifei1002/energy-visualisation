import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import BeforeAfterHeatDemandPage from './pages/BeforeAfterHeatDemandPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/visualisations/beforeafterheatdemand" element={<BeforeAfterHeatDemandPage/>} /> 
      </Routes>
    </Router>
  )
}

export default App
