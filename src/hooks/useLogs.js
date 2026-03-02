/* Path: src/hooks/useLogs.js */
export const useLogs = (logs, setLogs, triggerToast) => {
    
    const getProjectDailyTotal = (projectId) => {
        const today = new Date().toISOString().split('T')[0];
        
        const ms = logs
            .filter(log => log.projectId === projectId && log.startTime.startsWith(today))
            .reduce((sum, log) => sum + (log.durationMs || 0), 0);

        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
    };

    const handleClearProjectLogs = (projectId, projectName) => {
        setLogs(prev => prev.filter(log => log.projectId !== projectId));
        triggerToast(`Cleared logs for ${projectName}`);
    };

    const handleUpdateLogTask = (logId, taskId) => {
        setLogs(prevLogs => prevLogs.map(log => 
            log.id === logId ? { ...log, taskId } : log
        ));
    };

    return { 
        handleClearProjectLogs, 
        getProjectDailyTotal, 
        handleUpdateLogTask 
    };
};