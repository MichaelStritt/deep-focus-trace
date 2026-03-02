/* Path: src/App.jsx */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import { Sun, Moon, Settings, Home } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation(); // Get current path

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-300">
      
      {/* Header Bar */}
      <div className="w-full p-4 flex justify-end items-center gap-2 bg-transparent">

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-outline btn-circle">
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        
        {/* Settings / Home Toggle */}
        {location.pathname === '/settings' ? (
          <Link to="/" className="btn btn-outline btn-circle">
            <Home size={24} />
          </Link>
        ) : (
          <Link to="/settings" className="btn btn-outline btn-circle">
            <Settings size={24} />
          </Link>
        )}
      </div>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={
          <div className="grow flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Theme Test</h1>
            <button className="btn btn-primary">Action Button</button>
          </div>
        } />
        
        <Route path="/settings" element={
          <div className="grow flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Settings Page</h1>
          </div>
        } />
      </Routes>
      
    </div>
  );
}

export default App;