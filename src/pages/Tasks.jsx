/* Path: src/pages/Tasks.jsx */
import React from 'react';
import TaskList from '../components/TaskList';
import TaskCard from '../components/TaskCard';

export default function Tasks({ 
    tasks, 
    isManageMode, 
    handleAddTask, 
    handleDeleteTask, 
    handleToggleTask, 
    handleReorderTasks 
}) {
    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className="grow p-6 flex flex-col items-center">
            <div className="w-[85%] max-w-4xl flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-2">Tasks</h1>

                <TaskList 
                    tasks={pendingTasks}
                    isManageMode={isManageMode}
                    onReorder={handleReorderTasks}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleTask}
                />

                {!isManageMode && (
                    <TaskCard isPlaceholder onSave={handleAddTask} />
                )}

                {completedTasks.length > 0 && (
                    <div className="mt-8 flex flex-col gap-4">
                        <h2 className="text-sm font-black uppercase tracking-widest opacity-30 px-2">Completed</h2>
                        <TaskList 
                            tasks={completedTasks}
                            isManageMode={isManageMode}
                            onReorder={handleReorderTasks}
                            onDelete={handleDeleteTask}
                            onToggle={handleToggleTask}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}