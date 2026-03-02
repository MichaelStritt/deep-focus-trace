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
    <div className="h-screen flex flex-col items-center justify-center bg-base-100 gap-4 text-base-content transition-colors duration-300">
      <h1 className="text-2xl font-bold">Theme Test</h1>
      
      <button onClick={toggleTheme} className="btn btn-outline btn-circle">
        {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
      </button>

      <button className="btn btn-primary">Action Button</button>
    </div>
  );
}

export default App;