/* Path: src/components/TaskCard.jsx */
import React, { useState } from 'react';
import { Save, X, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function TaskCard({ 
    task, 
    isPlaceholder, 
    onSave, 
    onDelete, 
    onToggle, 
    isManageMode = false 
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('');

    if (isPlaceholder && !isEditing) {
        return (
            <button 
                onClick={() => setIsEditing(true)}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-base-content/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group gap-2 w-full h-23"
            >
                <Plus className="text-base-content/30 group-hover:text-primary" size={32} />
                <span className="action-label group-hover:text-primary">Add task</span>
            </button>
        );
    }

    if (isEditing) {
        const handleInternalSave = () => {
            if (!text.trim()) return;
            onSave(text);
            setText('');
            setIsEditing(false);
        };

        return (
            <div className="flex items-center p-4 bg-base-200 border-2 border-dashed border-primary rounded-2xl gap-4 w-full h-23">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                    <Circle size={24} />
                </div>
                <input 
                    autoFocus
                    className="input input-ghost grow font-bold text-lg focus:bg-transparent px-0" 
                    placeholder="Task description..." 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInternalSave()}
                />
                <div className="flex gap-2 shrink-0">
                    <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setIsEditing(false)}><X size={18} /></button>
                    <button className="btn btn-primary btn-sm" onClick={handleInternalSave}><Save size={18} /> Save</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center p-4 bg-base-200 border-2 rounded-2xl shadow-sm transition-all gap-4 w-full h-23 ${isManageMode ? 'border-error/20' : 'border-transparent hover:shadow-md'} ${task.completed ? 'opacity-50' : ''}`}>
            <button 
                disabled={isManageMode}
                onClick={() => onToggle(task.id)} 
                className={`p-3 rounded-xl shrink-0 transition-colors ${task.completed ? 'bg-success/20 text-success' : isManageMode ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
            >
                {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>
            <div className="grow">
                <h3 className={`project-card-title ${task.completed ? 'line-through' : ''}`}>{task.text}</h3>
                <p className="status-text">{task.completed ? 'Done' : `Task ID: ${task.id.slice(-4)}`}</p>
            </div>
            {isManageMode && (
                <button 
                    className="btn btn-sm btn-error btn-outline" 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
    );
}