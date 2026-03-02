/* Path: src/components/ProjectCard.jsx */
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Save, X, Plus, Trash2, Eraser } from 'lucide-react';

export default function ProjectCard({ 
    project, 
    isPlaceholder, 
    onSave, 
    onClick, 
    onClearLogs,
    onStart,
    onStop,
    activeSession,
    dailyTotal = "0h 0m",
    isManageMode = false 
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');

    // Icon cycling logic
    const iconList = ['Book', 'FlaskConical', 'Briefcase', 'Code', 'Car', 'Zap', 'Music', 'Coffee', 'Sun'];
    const [iconIndex, setIconIndex] = useState(0);

    const cycleIcon = () => {
    setIconIndex((prev) => (prev + 1) % iconList.length);
    };

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
        {/* Clickable Icon to Cycle */}
        <button 
            onClick={cycleIcon}
            className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 hover:bg-primary/20 transition-colors"
            title="Click to change icon"
        >
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
            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setIsEditing(false)}>
            <X size={18} />
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleInternalSave}>
            <Save size={18} /> Save
            </button>
        </div>
        </div>
    );
    }

    // 3. Standard Display State
    const LucideIcon = Icons[project.icon] || Icons.Briefcase;

    // Determine tracking state
    const isActive = activeSession?.projectId === project.id;
    const isOtherActive = activeSession && !isActive;

    return (
    <div 
        className={`relative flex items-center p-4 bg-base-200 border-2 rounded-2xl shadow-sm transition-all gap-4 w-full h-23 ${
        isActive ? 'border-primary/50 bg-primary/5' : isManageMode ? 'border-error/20' : 'border-transparent hover:shadow-md'
        }`}
    >
        <div className={`p-3 rounded-xl shrink-0 ${isManageMode ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
        <LucideIcon size={24} />
        </div>

        <div className="grow">
        <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
        <p className="text-xs opacity-50">
            {isManageMode ? 'Manage project data' : isActive ? 'Currently tracking...' : 'Ready to focus?'}
        </p>
        </div>

        <div className="flex flex-col items-end justify-center gap-2 shrink-0 h-full">
        {isManageMode ? (
            <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost text-warning hover:bg-warning/10" onClick={() => onClearLogs(project.id, project.name)} title="Clear all logs">
                <Eraser size={18} />
            </button>
            <button className="btn btn-sm btn-error btn-outline" onClick={() => onClick(project.id)} title="Delete project">
                <Trash2 size={18} />
            </button>
            </div>
        ) : (
            <>
            <span className="text-xs font-mono opacity-60 bg-base-300 px-2 py-1 rounded-lg">
                {dailyTotal}
            </span>
            <button 
                // Width fixed to w-20 to prevent layout shift between "Start/Stop/Switch"
                className={`btn btn-sm w-20 ${isActive ? 'btn-error' : isOtherActive ? 'btn-outline btn-primary' : 'btn-primary'}`} 
                onClick={() => isActive ? onStop() : onStart(project.id, project.name)}
            >
                {isActive ? 'Stop' : isOtherActive ? 'Switch' : 'Start'}
            </button>
            </>
        )}
        </div>
    </div>
    );
}