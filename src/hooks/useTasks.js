/* Path: src/hooks/useTasks.js */
export const useTasks = (tasks, setTasks, triggerToast) => {
    
    const handleAddTask = (text) => {
        const newTask = { 
            id: Date.now().toString(), 
            text, 
            completed: false,
            index: tasks.length 
        };
        setTasks([...tasks, newTask]);
        if (triggerToast) triggerToast("Task added!");
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        if (triggerToast) triggerToast("Task deleted");
    };

    const handleToggleTask = (id) => {
        setTasks(tasks.map(t => 
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const handleReorderTasks = (result) => {
        if (!result.destination) return;
        
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedTasks = items.map((task, idx) => ({ ...task, index: idx }));
        setTasks(updatedTasks);
    };

    return {
        handleAddTask,
        handleDeleteTask,
        handleToggleTask,
        handleReorderTasks
    };
};