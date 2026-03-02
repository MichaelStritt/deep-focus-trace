/* Path: src/pages/Home.jsx */
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectImport from '../components/ProjectImport';
import { Download } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

export default function Home({ projects, setProjects, logs, triggerToast, isManageMode }) {
  const { handleSaveProject, handleDeleteProject, handleExport, handleImport } = 
    useProjects(projects, setProjects, triggerToast);

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
          <ProjectImport onImport={handleImport} triggerToast={triggerToast} />
        )}
      </div>
    </div>
  );
}