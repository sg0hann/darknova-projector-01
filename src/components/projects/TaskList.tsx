
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle, Circle, X, GripVertical, Pencil } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { fadeIn, listItem } from "../../utils/animations";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskAdd: (task: Task) => void;
  onTaskToggle: (id: string) => void;
  onTaskDelete: (id: string) => void;
  onTaskEdit: (id: string, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskAdd,
  onTaskToggle,
  onTaskDelete,
  onTaskEdit,
}) => {
  const { t } = useLanguage();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onTaskAdd({
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
      });
      setNewTaskTitle("");
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditingTitle(task.title);
  };

  const saveEdit = () => {
    if (editingTask && editingTitle.trim()) {
      onTaskEdit(editingTask, editingTitle);
      setEditingTask(null);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <div className="p-4 border-b border-border">
        <h3 className="font-medium">{t("tasks")}</h3>
      </div>
      
      <div className="p-4">
        {/* New task input */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder={t("addTask")}
            className="flex-1 bg-secondary/50 border border-border rounded-l-md py-2 px-3 focus:outline-none focus:border-primary"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            disabled={!newTaskTitle.trim()}
            className="bg-primary text-white py-2 px-4 rounded-r-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
          </button>
        </div>
        
        {/* Incomplete tasks */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">{t("incomplete")}</h4>
          <AnimatePresence>
            {incompleteTasks.length === 0 ? (
              <motion.p
                variants={listItem}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-sm text-muted-foreground py-2"
              >
                {t("noTasks")}
              </motion.p>
            ) : (
              <ul className="space-y-1">
                {incompleteTasks.map((task) => (
                  <AnimatePresence key={task.id} mode="wait">
                    {editingTask === task.id ? (
                      <motion.li
                        variants={listItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex items-center bg-secondary/30 rounded-md border border-border p-2"
                      >
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          autoFocus
                          className="flex-1 bg-transparent border-none focus:outline-none"
                          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                        />
                        <button
                          onClick={saveEdit}
                          className="p-1 text-primary hover:bg-secondary/50 rounded-md ml-1"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-muted-foreground hover:bg-secondary/50 rounded-md ml-1"
                        >
                          <X size={16} />
                        </button>
                      </motion.li>
                    ) : (
                      <motion.li
                        variants={listItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex items-center hover:bg-secondary/30 rounded-md px-2 py-1.5 group"
                        whileHover={{ x: 4 }}
                      >
                        <GripVertical 
                          size={14} 
                          className="text-muted-foreground/40 mr-2 opacity-0 group-hover:opacity-100 cursor-grab" 
                        />
                        <button
                          onClick={() => onTaskToggle(task.id)}
                          className="text-muted-foreground hover:text-primary transition-colors mr-2"
                        >
                          <Circle size={16} />
                        </button>
                        <span className="flex-1 text-sm">{task.title}</span>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEditing(task)}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => onTaskDelete(task.id)}
                            className="p-1 text-muted-foreground hover:text-destructive hover:bg-secondary/50 rounded-md"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </motion.li>
                    )}
                  </AnimatePresence>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>
        
        {/* Completed tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">{t("completed")}</h4>
            <ul className="space-y-1">
              {completedTasks.map((task) => (
                <motion.li
                  key={task.id}
                  variants={listItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center hover:bg-secondary/30 rounded-md px-2 py-1.5 group"
                >
                  <button
                    onClick={() => onTaskToggle(task.id)}
                    className="text-primary hover:text-primary/80 transition-colors mr-2"
                  >
                    <CheckCircle size={16} />
                  </button>
                  <span className="flex-1 text-sm text-muted-foreground line-through">
                    {task.title}
                  </span>
                  <button
                    onClick={() => onTaskDelete(task.id)}
                    className="p-1 text-muted-foreground hover:text-destructive hover:bg-secondary/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;
