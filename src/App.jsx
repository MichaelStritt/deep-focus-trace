/* Path: src/App.jsx */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import { Sun, Moon, Settings, Home as HomeIcon } from 'lucide-react';
import Home from './pages/Home';
import SettingsPage from './pages/Settings';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

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
            <HomeIcon size={24} />
          </Link>
        ) : (
          <Link to="/settings" className="btn btn-outline btn-circle">
            <Settings size={24} />
          </Link>
        )}
      </div>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
    </div>
  );
}

export default App;