/* Path: src/App.jsx */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import { Sun, Moon, Settings as SettingsIcon, Home as HomeIcon, ListTodo, X } from 'lucide-react';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const [isManageMode, setIsManageMode] = useState(false);

  const triggerToast = (message) => {
    console.log(`${message}`);
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem("projects")) || []);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem("logs")) || []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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

        <button onClick={toggleTheme} className="btn btn-outline btn-circle">
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>

        {location.pathname === '/tasks' ? (
          <Link to="/" className="btn btn-outline btn-circle">
            <HomeIcon size={24} />
          </Link>
        ) : (
          <Link to="/tasks" className="btn btn-outline btn-circle">
            <ListTodo size={24} />
          </Link>
        )}
        
        {/* Management Toggle - Replaces Settings Link */}
        <button 
          onClick={() => setIsManageMode(!isManageMode)} 
          className={`btn btn-circle ${isManageMode ? 'btn-error text-white' : 'btn-outline'}`}
        >
          {isManageMode ? <X size={24} /> : <SettingsIcon size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Home projects={projects} setProjects={setProjects} logs={logs} triggerToast={triggerToast} isManageMode={isManageMode} />} />
        <Route path="/tasks" element={<Tasks projects={projects} tasks={tasks} setTasks={setTasks} />} />
      </Routes>

      {/* Toast Container */}
      {toast && (
        <div className="toast toast-start toast-bottom p-6">
          <div className="alert alert-success shadow-lg">
            <span>{toast}</span>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;