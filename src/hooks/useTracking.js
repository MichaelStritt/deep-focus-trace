/* Path: src/hooks/useTracking.js */
import { useState, useEffect } from 'react';

export const useTracking = (logs, setLogs, triggerToast) => {
    const [activeSession, setActiveSession] = useState(() => {
        const saved = localStorage.getItem('activeSession');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        localStorage.setItem('activeSession', JSON.stringify(activeSession));
    }, [activeSession]);

    const stopTrace = (silent = false) => {
        if (!activeSession) return null;

        const endTime = new Date();
        const startTime = new Date(activeSession.startTime);
        const durationMs = endTime - startTime;

        const newLog = {
            id: Date.now().toString(),
            projectId: activeSession.projectId,
            taskId: activeSession.taskId || null,
            startTime: activeSession.startTime,
            endTime: endTime.toISOString(),
            durationMs
        };

        setLogs(prev => [...prev, newLog]);
        setActiveSession(null);

        if (!silent) {
            triggerToast(`Trace saved: ${Math.floor(durationMs / 60000)}m recorded.`);
        }

        return newLog;
    };

    const startTrace = (projectId, projectName) => {
        if (activeSession) {
            stopTrace(true); 
        }

        const newSession = {
            id: Date.now().toString(), 
            projectId,
            projectName,
            startTime: new Date().toISOString(),
            taskId: null 
        };

        setActiveSession(newSession);
        triggerToast(`Tracing: ${projectName}`);
    };

    const updateActiveTask = (taskId) => {
        //console.log("TrackingHook: Updating active task to:", taskId);
        if (!activeSession) {
            console.warn("TrackingHook: No active session found to update!");
            return;
        }
        setActiveSession(prev => ({ ...prev, taskId }));
    };

    return { activeSession, startTrace, stopTrace, updateActiveTask };
};