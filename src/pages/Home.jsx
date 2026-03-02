/* Path: src/pages/Home.jsx */
import React from 'react';
import ProjectList from '../components/ProjectList';
import ProjectCard from '../components/ProjectCard';
import ProjectImport from '../components/ProjectImport';
import { Download } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export default function Home({ 
    projects, logs, setLogs, triggerToast, isManageMode, 
    startTrace, stopTrace, activeSession,
    handleSaveProject, handleDeleteProject, handleExport, handleImport, handleReorder 
}) {
  const { handleClearProjectLogs, getProjectDailyTotal } = useLogs(logs, setLogs, triggerToast);

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
        
        <ProjectList 
            projects={projects}
            logs={logs}
            getProjectDailyTotal={getProjectDailyTotal}
            isManageMode={isManageMode}
            activeSession={activeSession}
            onReorder={handleReorder}
            onDelete={handleDeleteProject}
            onClearLogs={handleClearProjectLogs}
            onStartTrace={startTrace} 
            onStopTrace={stopTrace}
        />

        {!isManageMode ? (
          <ProjectCard isPlaceholder onSave={handleSaveProject} />
        ) : (
          <ProjectImport onImport={handleImport} triggerToast={triggerToast} />
        )}
      </div>
    </div>
  );
}