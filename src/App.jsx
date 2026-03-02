/* Path: src/App.jsx */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import { Sun, Moon, Settings as SettingsIcon, Home as HomeIcon, ListTodo } from 'lucide-react';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  // Project, Task, and Log State
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem("projects")) || []);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem("logs")) || []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync Data to LocalStorage
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [projects, tasks, logs]);

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

        {/* Tasks / Home Toggle */}
        {location.pathname === '/tasks' ? (
          <Link to="/" className="btn btn-outline btn-circle">
            <HomeIcon size={24} />
          </Link>
        ) : (
          <Link to="/tasks" className="btn btn-outline btn-circle">
            <ListTodo size={24} />
          </Link>
        )}
        
        {/* Settings / Home Toggle */}
        {location.pathname === '/settings' ? (
          <Link to="/" className="btn btn-outline btn-circle">
            <HomeIcon size={24} />
          </Link>
        ) : (
          <Link to="/settings" className="btn btn-outline btn-circle">
            <SettingsIcon size={24} />
          </Link>
        )}
      </div>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Home projects={projects} logs={logs} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tasks" element={<Tasks projects={projects} tasks={tasks} setTasks={setTasks} />} />
      </Routes>
      
    </div>
  );
}

export default App;