/* Path: src/components/ProjectList.jsx */
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ProjectCard from './ProjectCard';

export default function ProjectList({ 
    projects, 
    logs,
    getProjectDailyTotal,
    isManageMode, 
    onReorder, 
    onDelete, 
    onClearLogs,
    onStartTrace,
    onStopTrace,
    activeSession 
}) {
    const sortedProjects = [...projects].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

    return (
    <DragDropContext onDragEnd={onReorder}>
        <Droppable droppableId="projects-list" isDropDisabled={!isManageMode}>
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4">
            {sortedProjects.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index} isDragDisabled={!isManageMode}>
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "z-50" : ""}
                    >
                    <ProjectCard 
                        project={project}
                        logs={logs}
                        activeSession={activeSession}
                        isManageMode={isManageMode}
                        onStart={onStartTrace}
                        onStop={onStopTrace}
                        onClick={onDelete}
                        onClearLogs={onClearLogs}
                        dailyTotal={getProjectDailyTotal(project.id)}
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