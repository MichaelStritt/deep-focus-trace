/* Path: src/components/ProjectCard.jsx */
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Save, X, Plus } from 'lucide-react';

export default function ProjectCard({ 
  project, 
  isPlaceholder, 
  onSave, 
  onClick, 
  dailyTotal = "0h 0m" 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  // 1. Placeholder State
  if (isPlaceholder && !isEditing) {
    return (
      <button 
        onClick={() => setIsEditing(true)}
        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-base-content/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group gap-2 w-full"
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
      onSave(name);
      setName('');
      setIsEditing(false);
    };

    return (
      <div className="flex items-center p-4 bg-base-200 border-2 border-dashed border-primary rounded-2xl gap-4 w-full">
        <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
          <Icons.Briefcase size={24} />
        </div>
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
  return (
    <div className="flex items-center p-4 bg-base-200 border-2 border-transparent rounded-2xl shadow-sm hover:shadow-md transition-all gap-4 w-full">
      <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
        <LucideIcon size={24} />
      </div>
      <div className="grow">
        <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
        <p className="text-xs opacity-50">Ready to focus?</p>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="text-xs font-mono opacity-60 bg-base-300 px-2 py-1 rounded-lg">
          {dailyTotal}
        </span>
        <button className="btn btn-primary btn-sm" onClick={() => onClick(project.id)}>
          Start Trace
        </button>
      </div>
    </div>
  );
}