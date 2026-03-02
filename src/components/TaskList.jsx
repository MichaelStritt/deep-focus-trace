/* Path: src/components/TaskList.jsx */
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

export default function TaskList({ 
    tasks, 
    isManageMode, 
    onReorder,
    onDelete,
    onToggle
}) {
    const sortedTasks = [...tasks].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

    return (
        <DragDropContext onDragEnd={onReorder}>
            <Droppable droppableId="tasks-list" isDropDisabled={!isManageMode}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4">
                        {sortedTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={!isManageMode}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={snapshot.isDragging ? "z-50" : ""}
                                    >
                                        <TaskCard 
                                            task={task}
                                            isManageMode={isManageMode}
                                            onDelete={onDelete}
                                            onToggle={onToggle}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}