/* Path: src/hooks/useProjects.js */
export const useProjects = (projects, setProjects, triggerToast) => {
  
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

  const handleImport = (importedData) => {
    const existingIds = new Set(projects.map(p => p.id));
    const newProjects = importedData.filter(p => !existingIds.has(p.id));
    const skipCount = importedData.length - newProjects.length;

    if (newProjects.length > 0) {
      setProjects([...projects, ...newProjects]);
      triggerToast(`Imported ${newProjects.length} projects.${skipCount > 0 ? ` Skipped ${skipCount} duplicates.` : ''}`);
    } else if (skipCount > 0) {
      triggerToast("No new projects found.");
    }
  };

  return { handleSaveProject, handleDeleteProject, handleExport, handleImport };
};