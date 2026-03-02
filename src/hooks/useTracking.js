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

        // DEBUG LOGS
        console.group(`Timer Debug: ${activeSession.projectName}`);
        console.log("Start ISO:", activeSession.startTime);
        console.log("End ISO:", endTime.toISOString());
        console.log("Diff (ms):", durationMs);
        console.log("Diff (min):", Math.floor(durationMs / 60000));
        console.groupEnd();

        const newLog = {
            id: Date.now().toString(),
            projectId: activeSession.projectId,
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
    // If something is running, stop it first (Switch logic)
    if (activeSession) {
        stopTrace(true); 
    }

    const newSession = {
        projectId,
        projectName,
        startTime: new Date().toISOString(),
    };

    setActiveSession(newSession);
    triggerToast(`Tracing: ${projectName}`);
    };

    return { activeSession, startTrace, stopTrace };
};