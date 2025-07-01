// File: src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// import HIPAABanner from './components/HIPAABanner';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-tr from-white via-blue-50 to-blue-100 font-sans">
        {/* <HIPAABanner /> */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
