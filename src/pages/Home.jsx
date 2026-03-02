/* Path: src/pages/Home.jsx */
import React from 'react';
import ProjectCard from '../components/ProjectCard';

export default function Home({ projects, setProjects, logs }) {
  
  // Updated to receive the icon from the ProjectCard
  const handleSaveProject = (name, icon) => {
    const projectToAdd = {
      id: Date.now().toString(),
      name: name,
      icon: icon, 
    };
    setProjects([...projects, projectToAdd]);
  };

  const handleStartTrace = (projectId) => {
    console.log("Start Trace:", projectId);
  };

  return (
    <div className="grow p-6 flex flex-col items-center">
      <div className="w-[85%] max-w-4xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 self-start">Your Projects</h1>
        
        {/* Project List */}
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={handleStartTrace} 
            dailyTotal="0h 0m" 
          />
        ))}
        
        <ProjectCard 
          isPlaceholder 
          onSave={handleSaveProject} 
        />
      </div>
    </div>
  );
}