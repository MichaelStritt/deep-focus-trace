/* Path: src/hooks/useProjects.js */
export const useProjects = (projects, setProjects, triggerToast) => {
  
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
    // Normalize indices to prevent gaps
    const normalized = filtered.map((p, i) => ({ ...p, index: i }));
    setProjects(normalized);
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
    const newItems = importedData.filter(p => !existingIds.has(p.id));
    const skipCount = importedData.length - newItems.length;

    if (newItems.length > 0) {
      // Append new items and re-index the entire resulting array
      const combined = [...projects, ...newItems];
      const normalized = combined.map((p, i) => ({ ...p, index: i }));
      
      setProjects(normalized);
      triggerToast(`Imported ${newItems.length} projects.${skipCount > 0 ? ` Skipped ${skipCount} duplicates.` : ''}`);
    } else if (skipCount > 0) {
      triggerToast("No new projects found.");
    }
  };

  const handleReorder = (result) => {
    // dropped outside the list
    if (!result.destination) return;
    // position hasn't changed
    if (result.destination.index === result.source.index) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Re-normalize indices to match new array order
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