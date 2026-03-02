/* Path: src/pages/Home.jsx */
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { Download, UploadCloud } from 'lucide-react';

export default function Home({ projects, setProjects, logs, triggerToast, isManageMode }) {
  
  const handleSaveProject = (name, icon) => {
    const projectToAdd = { id: Date.now().toString(), name, icon: icon || 'Book' };
    setProjects([...projects, projectToAdd]);
    triggerToast("Project added successfully!");
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    triggerToast("Project removed.");
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "projects_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    triggerToast("Projects exported!");
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setProjects([...projects, ...imported]);
        triggerToast("Projects imported!");
      } catch (err) {
        triggerToast("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="grow p-6 flex flex-col items-center">
      <div className="w-[85%] max-w-4xl flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Your Projects</h1>
          {isManageMode && (
            <button onClick={handleExport} className="btn btn-ghost btn-sm gap-2">
              <Download size={18} /> Export JSON
            </button>
          )}
        </div>
        
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={isManageMode ? () => handleDeleteProject(project.id) : (id) => console.log("Start Trace:", id)} 
            dailyTotal="0h 0m"
            isManageMode={isManageMode}
          />
        ))}

        {!isManageMode ? (
          <ProjectCard isPlaceholder onSave={handleSaveProject} />
        ) : (
          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-base-content/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group gap-2">
            <UploadCloud className="text-base-content/30 group-hover:text-primary" size={32} />
            <span className="text-sm font-medium text-base-content/30 group-hover:text-primary">Click or Drag to Import Projects</span>
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
        )}
      </div>
    </div>
  );
}