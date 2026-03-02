/* Path: src/hooks/useLogs.js */
export const useLogs = (logs, setLogs, triggerToast) => {
  
  const handleClearProjectLogs = (projectId, projectName) => {
    const updatedLogs = logs.filter(log => log.projectId !== projectId);
    setLogs(updatedLogs);
    triggerToast(`Cleared all logs for ${projectName}.`);
  };

  return { handleClearProjectLogs };
};