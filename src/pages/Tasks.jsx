/* Path: src/pages/Tasks.jsx */
import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskCard from '../components/TaskCard';

export default function Tasks({ isManageMode }) {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (text) => {
        // Add index to match Project logic
        const newTask = { 
            id: Date.now().toString(), 
            text, 
            completed: false,
            index: tasks.length 
        };
        setTasks([...tasks, newTask]);
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleToggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    // Logic to handle the drag-and-drop result
    const handleReorder = (result) => {
        if (!result.destination) return;
        
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update indexes to persist order
        const updatedTasks = items.map((task, idx) => ({ ...task, index: idx }));
        setTasks(updatedTasks);
    };

    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className="grow p-6 flex flex-col items-center">
            <div className="w-[85%] max-w-4xl flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-2">Tasks</h1>

                {/* Replaced manual map with TaskList */}
                <TaskList 
                    tasks={pendingTasks}
                    isManageMode={isManageMode}
                    onReorder={handleReorder}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleTask}
                />

                {!isManageMode && (
                    <TaskCard isPlaceholder onSave={handleAddTask} />
                )}

                {completedTasks.length > 0 && (
                    <div className="mt-8 flex flex-col gap-4">
                        <h2 className="text-sm font-black uppercase tracking-widest opacity-30 px-2">Completed</h2>
                        {/* We use TaskList here too, but pass isManageMode={false} 
                            if you don't want completed tasks to be draggable 
                        */}
                        <TaskList 
                            tasks={completedTasks}
                            isManageMode={isManageMode}
                            onReorder={handleReorder}
                            onDelete={handleDeleteTask}
                            onToggle={handleToggleTask}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}