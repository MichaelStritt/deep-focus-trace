/* Path: src/hooks/useProjects.js */
export const useProjects = (projects, setProjects, tasks, setTasks, logs, setLogs, triggerToast) => {
  
  const handleSaveProject = (name, icon) => {
    const projectToAdd = { 
      id: Date.now().toString(), 
      name, 
      icon: icon || 'Book',
      index: projects.length 
    };
    setProjects([...projects, projectToAdd]);
    triggerToast("Project added successfully!");
  };

  const handleDeleteProject = (id) => {
    const filtered = projects.filter(p => p.id !== id);
    const normalized = filtered.map((p, i) => ({ ...p, index: i }));
    setProjects(normalized);
    triggerToast("Project removed.");
  };

  const handleExport = () => {
    const exportData = {
      projects,
      logs: logs.map(log => ({
        id: log.id,
        projectId: log.projectId,
        taskId: log.taskId,
        startTime: log.startTime,
        endTime: log.endTime,
        durationMs: log.durationMs
      })),
      tasks,
      exportDate: new Date().toISOString(),
      version: "1.1"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `time-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast("Data exported successfully");
  };

  const handleImport = (importedData) => {
    // Handle version 1.1 structure (object with projects, tasks, logs)
    if (importedData.version === "1.1") {
      setProjects(importedData.projects || []);
      setTasks(importedData.tasks || []);
      setLogs(importedData.logs || []);
      triggerToast("All data restored from backup.");
      return;
    }

    // Fallback for legacy array-only imports (projects only)
    if (Array.isArray(importedData)) {
      const existingIds = new Set(projects.map(p => p.id));
      const newItems = importedData.filter(p => !existingIds.has(p.id));
      if (newItems.length > 0) {
        const combined = [...projects, ...newItems];
        const normalized = combined.map((p, i) => ({ ...p, index: i }));
        setProjects(normalized);
        triggerToast(`Imported ${newItems.length} projects.`);
      } else {
        triggerToast("No new projects found.");
      }
    }
  };

  const handleReorder = (result) => {
    if (!result.destination || result.destination.index === result.source.index) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const normalized = items.map((p, i) => ({ ...p, index: i }));
    setProjects(normalized);
  };

  return { 
    handleSaveProject, 
    handleDeleteProject, 
    handleExport, 
    handleImport, 
    handleReorder 
  };
};