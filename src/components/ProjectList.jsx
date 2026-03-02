/* Path: src/components/ProjectList.jsx */
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ProjectCard from './ProjectCard';

export default function ProjectList({ 
  projects, 
  isManageMode, 
  onReorder, 
  onDelete, 
  onStartTrace 
}) {
  const sortedProjects = [...projects].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  return (
    <DragDropContext onDragEnd={onReorder}>
      <Droppable droppableId="projects-list" isDropDisabled={!isManageMode}>
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            className="flex flex-col gap-4"
          >
            {sortedProjects.map((project, index) => (
              <Draggable 
                key={project.id} 
                draggableId={project.id} 
                index={index} 
                isDragDisabled={!isManageMode}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "z-50" : ""}
                  >
                    <ProjectCard 
                      project={project} 
                      onClick={isManageMode ? () => onDelete(project.id) : onStartTrace} 
                      dailyTotal="0h 0m"
                      isManageMode={isManageMode}
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