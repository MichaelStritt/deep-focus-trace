/* Path: src/App.jsx */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import { Sun, Moon, Settings as SettingsIcon, Home as HomeIcon, ListTodo, X, StopCircle } from 'lucide-react';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import { useTracking } from './hooks/useTracking';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const location = useLocation();
    const [toast, setToast] = useState(null);
    const [isManageMode, setIsManageMode] = useState(false);

    const triggerToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem("projects")) || []);
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
    const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem("logs")) || []);

    // Initialize tracking logic
    const { activeSession, startTrace, stopTrace } = useTracking(logs, setLogs, triggerToast);

    // Persistence
    useEffect(() => {
        localStorage.setItem("logs", JSON.stringify(logs));
    }, [logs]);

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <div className="h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-300">
      
            {/* Header Bar */}
            <div className="w-full p-4 flex justify-end items-center gap-2 bg-transparent">
                <button onClick={toggleTheme} className="btn btn-outline btn-circle">
                    {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
                </button>

                <Link to={location.pathname === '/tasks' ? "/" : "/tasks"} className="btn btn-outline btn-circle">
                    {location.pathname === '/tasks' ? <HomeIcon size={24} /> : <ListTodo size={24} />}
                </Link>
                
                <button onClick={() => setIsManageMode(!isManageMode)} className={`btn btn-circle ${isManageMode ? 'btn-error text-white' : 'btn-outline'}`}>
                    {isManageMode ? <X size={24} /> : <SettingsIcon size={24} />}
                </button>
            </div>

            {/* Main Content */}
            <Routes>
                <Route path="/" element={<Home projects={projects} setProjects={setProjects} logs={logs} setLogs={setLogs} triggerToast={triggerToast} isManageMode={isManageMode} startTrace={startTrace} stopTrace={stopTrace} activeSession={activeSession} />} />
                <Route path="/tasks" element={<Tasks projects={projects} tasks={tasks} setTasks={setTasks} />} />
            </Routes>

            {/* Toast Container */}
            {toast && (
                <div className="toast toast-start toast-bottom p-6 z-50">
                    <div className="alert alert-success shadow-lg">
                        <span>{toast}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;