/* Path: src/components/ProjectCard.jsx */
import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Save, X, Plus, Trash2, Eraser, ChevronDown, Clock } from 'lucide-react';

export default function ProjectCard({ 
    project, 
    tasks = [],
    logs = [],
    isPlaceholder, 
    onSave, 
    onClick, 
    onClearLogs,
    onUpdateLogTask,
    onUpdateActiveTask,
    onStart,
    onStop,
    activeSession,
    dailyTotal = "0h 0m",
    isManageMode = false 
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [name, setName] = useState('');
    const [elapsed, setElapsed] = useState("00:00:00");

    // Icon cycling logic
    const iconList = ['Book', 'FlaskConical', 'Briefcase', 'Code', 'Car', 'Zap', 'Music', 'Coffee', 'Sun'];
    const [iconIndex, setIconIndex] = useState(0);

    const cycleIcon = () => setIconIndex((prev) => (prev + 1) % iconList.length);

    // 1. Placeholder State
    if (isPlaceholder && !isEditing) {
        return (
            <button 
                onClick={() => setIsEditing(true)}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-base-content/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group gap-2 w-full h-23"
            >
                <Plus className="text-base-content/30 group-hover:text-primary" size={32} />
                <span className="text-sm font-medium text-base-content/30 group-hover:text-primary">Add project</span>
            </button>
        );
    }

    // 2. Active Creation State
    if (isEditing) {
        const handleInternalSave = () => {
            if (!name.trim()) return;
            onSave(name, iconList[iconIndex]);
            setName('');
            setIconIndex(0);
            setIsEditing(false);
        };

        const CurrentIcon = Icons[iconList[iconIndex]];

        return (
            <div className="flex items-center p-4 bg-base-200 border-2 border-dashed border-primary rounded-2xl gap-4 w-full h-23">
                <button onClick={cycleIcon} className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 hover:bg-primary/20 transition-colors">
                    <CurrentIcon size={24} />
                </button>
                <input 
                    autoFocus
                    className="input input-ghost grow font-bold text-lg focus:bg-transparent px-0" 
                    placeholder="Project Name..." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInternalSave()}
                />
                <div className="flex gap-2 shrink-0">
                    <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setIsEditing(false)}><X size={18} /></button>
                    <button className="btn btn-primary btn-sm" onClick={handleInternalSave}><Save size={18} /> Save</button>
                </div>
            </div>
        );
    }

    const isActive = activeSession?.projectId === project.id;
    const isOtherActive = activeSession && !isActive;

    const today = new Date().toISOString().split('T')[0];
    const projectLogs = logs
        .filter(log => log.projectId === project.id && log.startTime.startsWith(today))
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    useEffect(() => {
        let interval;
        if (isActive && isExpanded) {
            const updateTicker = () => {
                const diff = new Date() - new Date(activeSession.startTime);
                const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
                const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
                const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
                setElapsed(`${h}:${m}:${s}`);
            };
            updateTicker();
            interval = setInterval(updateTicker, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, isExpanded, activeSession]);

    const LucideIcon = Icons[project.icon] || Icons.Briefcase;

    return (
        <div className={`relative flex flex-col p-4 bg-base-200 border-2 rounded-2xl shadow-sm transition-all gap-2 w-full ${isActive ? 'border-primary/50 bg-primary/5' : isManageMode ? 'border-error/20' : 'border-transparent hover:shadow-md'} ${isExpanded ? 'h-auto' : 'h-23'}`}>
            <div className="flex items-center gap-4 w-full">
                <div className={`p-3 rounded-xl shrink-0 ${isManageMode ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                    <LucideIcon size={24} />
                </div>
                <div className="grow">
                    <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
                    <p className="text-xs opacity-50">{isManageMode ? 'Manage project data' : isActive ? 'Currently tracking...' : 'Ready to focus?'}</p>
                </div>
                <div className="flex flex-col items-end justify-center gap-2 shrink-0 h-full">
                    {isManageMode ? (
                        <div className="flex gap-2">
                            <button className="btn btn-sm btn-ghost text-warning hover:bg-warning/10" onClick={() => onClearLogs(project.id, project.name)}><Eraser size={18} /></button>
                            <button className="btn btn-sm btn-error btn-outline" onClick={() => onClick(project.id)}><Trash2 size={18} /></button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono opacity-60 bg-base-300 px-2 py-1 rounded-lg">{dailyTotal}</span>
                                <button onClick={() => setIsExpanded(!isExpanded)} className={`btn btn-ghost btn-xs btn-circle transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}><ChevronDown size={16} /></button>
                            </div>
                            <button className={`btn btn-sm w-20 ${isActive ? 'btn-error' : isOtherActive ? 'btn-outline btn-primary' : 'btn-primary'}`} onClick={() => isActive ? onStop() : onStart(project.id, project.name)}>
                                {isActive ? 'Stop' : isOtherActive ? 'Switch' : 'Start'}
                            </button>
                        </>
                    )}
                </div>
            </div>
            {isExpanded && (
                <div className="mt-2 pt-2 border-t border-base-content/5 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* Live Section */}
                    <div className="flex justify-between items-center bg-base-300/30 p-3 rounded-xl gap-4">
                        <div className="flex flex-col gap-1 grow">
                            <div className="flex items-center gap-2 text-xs font-medium">
                                <Clock size={14} className={isActive ? "text-primary animate-pulse" : "opacity-40"} />
                                <span className={isActive ? "text-primary font-bold" : "opacity-40"}>{isActive ? "Live Session" : "No Active Session"}</span>
                            </div>
                            {isActive && (
                                <select 
                                    className="select select-ghost select-xs p-0 h-auto min-h-0 font-medium text-primary focus:bg-transparent focus:outline-none w-fit"
                                    value={activeSession.taskId || ""}
                                    onChange={(e) => {
                                        console.log("Live task selection:", e.target.value);
                                        onUpdateActiveTask(e.target.value);
                                    }}
                                >
                                    <option value="">Tag a task...</option>
                                    {tasks.map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.completed ? '✓ ' : ''}{t.text}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                        {isActive && (
                            <div className="flex flex-col items-end shrink-0">
                                <span className="text-sm font-mono font-bold text-primary">{elapsed}</span>
                                <span className="text-[10px] opacity-50 font-mono text-primary">Started: {new Date(activeSession.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        )}
                    </div>

                    {/* History Section */}
                    <div className="flex flex-col gap-2 px-1">
                        <span className="text-[10px] uppercase font-black tracking-widest opacity-30">Today's History</span>
                        {projectLogs.length > 0 ? (
                            projectLogs.map(log => (
                                <div key={log.id} className="flex justify-between items-center text-xs py-3 border-b border-base-content/5 last:border-0 min-h-14">
                                    <div className="flex flex-col gap-1 grow">
                                        <span className="opacity-60 font-mono">
                                            {new Date(log.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(log.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <select 
                                            className="select select-ghost select-xs p-0 h-auto min-h-0 font-medium text-primary focus:bg-transparent focus:outline-none w-fit"
                                            value={log.taskId || ""}
                                            onChange={(e) => onUpdateLogTask(log.id, e.target.value)}
                                        >
                                            <option value="">No task assigned</option>
                                            {tasks.map(t => <option key={t.id} value={t.id}>{t.completed ? '✓ ' : ''}{t.text}</option>)}
                                        </select>
                                    </div>
                                    <span className="font-bold opacity-80 shrink-0">{Math.floor(log.durationMs / 60000)}m</span>
                                </div>
                            ))
                        ) : (
                            <span className="text-xs italic opacity-30">No completed sessions yet today.</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}