/* Path: src/App.jsx */
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
      <div className="w-full p-4 flex justify-end bg-transparent">
        <button onClick={toggleTheme} className="btn btn-outline btn-circle">
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="grow flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Theme Test</h1>
        <button className="btn btn-primary">Action Button</button>
      </div>
      
    </div>
  );
}

export default App;