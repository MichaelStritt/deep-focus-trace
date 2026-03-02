/* Path: src/components/ProjectImport.jsx */
import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function ProjectImport({ onImport, triggerToast }) {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file) => {
    if (!file || file.type !== "application/json") {
      triggerToast("Please upload a valid JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          onImport(imported);
        } else {
          throw new Error();
        }
      } catch (err) {
        triggerToast("Invalid project data format.");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <label 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer group gap-2 h-23 ${
            isDragging ? 'border-primary bg-primary/10' : 'border-base-content/20 hover:border-primary hover:bg-primary/5'
        }`}
    >
    <UploadCloud className={`${isDragging ? 'text-primary' : 'text-base-content/30 group-hover:text-primary'}`} size={32} />
        <span className={`text-sm font-medium ${isDragging ? 'text-primary' : 'text-base-content/30 group-hover:text-primary'}`}>
        {isDragging ? "Drop to Import" : "Click or Drag to Import Projects"}
        </span>
        <input type="file" accept=".json" className="hidden" onChange={(e) => processFile(e.target.files[0])} />
    </label>
  );
}