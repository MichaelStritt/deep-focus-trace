/* Path: src/pages/Home.jsx */
import React from 'react';
import ProjectList from '../components/ProjectList';
import ProjectCard from '../components/ProjectCard';
import ProjectImport from '../components/ProjectImport';
import { Download } from 'lucide-react';

export default function Home({ 
    projects, tasks, logs, triggerToast, isManageMode, 
    startTrace, stopTrace, activeSession, onUpdateActiveTask,
    handleSaveProject, handleDeleteProject, handleExport, handleImport, handleReorder,
    handleClearProjectLogs, getProjectDailyTotal, handleUpdateLogTask 
}) {
  return (
    <div className="grow p-6 flex flex-col items-center">
      <div className="w-[85%] max-w-4xl flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="page-title">Your Projects</h1>
          {isManageMode && (
            <button onClick={handleExport} className="btn btn-ghost btn-sm gap-2">
              <Download size={18} /> <span className="status-text font-bold">Export JSON</span>
            </button>
          )}
        </div>
        
        <ProjectList 
            projects={projects}
            tasks={tasks}
            logs={logs}
            getProjectDailyTotal={getProjectDailyTotal}
            isManageMode={isManageMode}
            activeSession={activeSession}
            onUpdateActiveTask={onUpdateActiveTask} 
            onReorder={handleReorder}
            onDelete={handleDeleteProject}
            onClearLogs={handleClearProjectLogs}
            onUpdateLogTask={handleUpdateLogTask}
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