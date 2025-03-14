
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, Edit2, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import TaskList from "./TaskList";
import ImageUpload from "../ui/ImageUpload";
import { fadeIn, pageTransition } from "../../utils/animations";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface ProjectDetailProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  startDate: string;
  dueDate: string;
  tasks: Task[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  id,
  title: initialTitle,
  description: initialDescription,
  thumbnail: initialThumbnail,
  startDate: initialStartDate,
  dueDate: initialDueDate,
  tasks: initialTasks,
}) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  
  // State for project data
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Calculate completion percentage
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  // Task handlers
  const handleTaskAdd = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleTaskToggle = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleTaskDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleTaskEdit = (id: string, title: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title } : task
    ));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      // In a real app, this would upload the file to a server
      // For now, we'll just create a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnail(undefined);
    }
  };

  const handleSave = () => {
    // In a real app, this would save data to the server
    setIsEditing(false);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container mx-auto px-4 py-6"
    >
      {/* Project header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold bg-secondary/30 border border-border rounded-md px-3 py-2 w-full max-w-md focus:outline-none focus:border-primary"
            />
          ) : (
            <h1 className="text-2xl font-bold">{title}</h1>
          )}
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  {t("save")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  {t("cancel")}
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Edit2 size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 size={18} />
                </motion.button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className={`w-full md:w-2/3 ${isEditing ? 'md:pr-4' : ''}`}>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t("description")}</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-secondary/30 border border-border rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("startDate")}</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-secondary/30 border border-border rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("dueDate")}</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full bg-secondary/30 border border-border rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-muted-foreground mb-2">{t("description")}</h2>
                  <p className="text-sm">{description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-card/50 border border-border rounded-md p-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar size={14} className="mr-1.5" />
                      {t("startDate")}
                    </div>
                    <div className="font-medium">
                      {new Date(startDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="bg-card/50 border border-border rounded-md p-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar size={14} className="mr-1.5" />
                      {t("dueDate")}
                    </div>
                    <div className="font-medium">
                      {new Date(dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-muted-foreground mb-2">{t("projectProgress")}</h2>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden mr-3">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span className="text-sm font-medium">{completionPercentage}%</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="w-full md:w-1/3">
            {isEditing ? (
              <div>
                <label className="block text-sm font-medium mb-1">{t("uploadThumbnail")}</label>
                <ImageUpload 
                  onImageChange={handleImageChange}
                  defaultImage={thumbnail}
                  className="w-full"
                />
              </div>
            ) : (
              thumbnail ? (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img 
                    src={thumbnail} 
                    alt={title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      
      {/* Tasks section */}
      <TaskList
        tasks={tasks}
        onTaskAdd={handleTaskAdd}
        onTaskToggle={handleTaskToggle}
        onTaskDelete={handleTaskDelete}
        onTaskEdit={handleTaskEdit}
      />
    </motion.div>
  );
};

export default ProjectDetail;
