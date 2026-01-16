"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, MessageSquare, Paperclip, Plus, X, Edit } from "lucide-react";
import { toast } from "sonner";

const initialColumns = [
  { id: "todo", title: "To-Do", isCustom: false, order: 1 },
  { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
  { id: "complete", title: "Complete", isCustom: false, order: 3 }
];

const initialTasks = {
  todo: [
    {
      id: "1",
      title: "Design Homepage Mockup",
      desc: "Create initial design concepts",
      priority: "high",
      assignees: ["SJ", "MC"]
    },
    {
      id: "2",
      title: "Setup Development Environment",
      desc: "Configure local dev environment",
      priority: "medium",
      assignees: ["DK"]
    }
  ],
  inprogress: [
    {
      id: "3",
      title: "Implement Authentication",
      desc: "Add login and signup flows",
      priority: "high",
      assignees: ["ER", "LA"]
    }
  ],
  complete: [
    {
      id: "4",
      title: "Project Kickoff Meeting",
      desc: "Initial team alignment",
      priority: "low",
      assignees: ["SJ"]
    }
  ]
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-red-100 text-red-600",
    medium: "bg-orange-100 text-orange-600",
    low: "bg-green-100 text-green-600",
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[priority] || styles.low}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default function EnhancedKanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn = {
        id: `custom_${Date.now()}`,
        title: newColumnName,
        isCustom: true,
        order: columns.length + 1
      };
      setColumns([...columns, newColumn]);
      setTasks({ ...tasks, [newColumn.id]: [] });
      setNewColumnName("");
      setShowColumnDialog(false);
      toast.success("Column added successfully!");
    }
  };

  const handleDeleteColumn = (columnId) => {
    if (tasks[columnId]?.length > 0) {
      toast.error("Cannot delete column with tasks");
      return;
    }
    setColumns(columns.filter(c => c.id !== columnId));
    const newTasks = { ...tasks };
    delete newTasks[columnId];
    setTasks(newTasks);
    toast.success("Column deleted");
  };

  const handleDragStart = (e, task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;
    
    if (sourceColumn === targetColumn) {
      setDraggedTask(null);
      return;
    }

    // Remove from source
    const newTasks = { ...tasks };
    newTasks[sourceColumn] = newTasks[sourceColumn].filter(t => t.id !== task.id);
    
    // Add to target
    newTasks[targetColumn] = [...(newTasks[targetColumn] || []), task];
    
    setTasks(newTasks);
    setDraggedTask(null);
    toast.success(`Task moved to ${columns.find(c => c.id === targetColumn)?.title}`);
  };

  return (
    <>
      <div className="flex gap-6 overflow-x-auto pb-4 h-full items-start">
        {columns.sort((a, b) => a.order - b.order).map((col) => (
          <div 
            key={col.id} 
            className="w-80 shrink-0 flex flex-col gap-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 text-sm uppercase">{col.title}</span>
                <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {tasks[col.id]?.length || 0}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {col.isCustom && (
                  <button 
                    onClick={() => handleDeleteColumn(col.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {(tasks[col.id] || []).map((task) => (
              <Card 
                key={task.id} 
                className="cursor-move hover:shadow-md transition-shadow"
                draggable
                onDragStart={(e) => handleDragStart(e, task, col.id)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 leading-tight">{task.title}</h4>
                  </div>
                  
                  {task.desc && <p className="text-xs text-gray-500 line-clamp-2">{task.desc}</p>}
                  
                  <PriorityBadge priority={task.priority} />
                  
                  <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
                    <div className="flex -space-x-2">
                      {task.assignees.map((initials, i) => (
                        <Avatar key={i} className="w-6 h-6 border-2 border-white">
                          <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 py-2 w-full justify-center border border-dashed border-gray-300 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Task</span>
            </button>
          </div>
        ))}

        <button 
          onClick={() => setShowColumnDialog(true)}
          className="w-80 shrink-0 flex items-center gap-2 text-gray-500 hover:text-purple-600 py-4 justify-center border-2 border-dashed border-gray-300 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Custom Column</span>
        </button>
      </div>

      <Dialog open={showColumnDialog} onOpenChange={setShowColumnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Column</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Column name (e.g., Testing, Deployed)"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowColumnDialog(false)}>Cancel</Button>
            <Button onClick={handleAddColumn}>Add Column</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
