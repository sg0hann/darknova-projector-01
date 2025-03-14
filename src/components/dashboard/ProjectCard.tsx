
import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Circle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { fadeIn } from "../../utils/animations";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  startDate: string;
  dueDate: string;
  tasks: Task[];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  startDate,
  dueDate,
  tasks,
  index
}) => {
  const { t } = useLanguage();
  
  // Calculate completion percentage
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  // Parse dates
  const formattedDueDate = new Date(dueDate).toLocaleDateString();
  
  // Determine if the project is due soon (within 3 days)
  const today = new Date();
  const dueDateTime = new Date(dueDate);
  const timeDiff = dueDateTime.getTime() - today.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  const isDueSoon = daysDiff <= 3 && daysDiff >= 0;
  const isOverdue = daysDiff < 0;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors"
    >
      <Link to={`/projects/${id}`} className="block h-full">
        {thumbnail ? (
          <div className="h-32 overflow-hidden">
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
            />
          </div>
        ) : (
          <div className="h-32 bg-secondary/50 flex items-center justify-center">
            <span className="text-muted-foreground">{title.charAt(0)}</span>
          </div>
        )}
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
            {description}
          </p>
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Calendar size={14} className="text-muted-foreground mr-1.5" />
              <span className={`text-xs ${isOverdue ? 'text-destructive' : isDueSoon ? 'text-amber-400' : 'text-muted-foreground'}`}>
                {formattedDueDate}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium mr-1.5">{completionPercentage}%</span>
              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {tasks.slice(0, 3).map((task) => (
              <div 
                key={task.id} 
                className="px-1.5 py-0.5 text-xs rounded bg-secondary/70 flex items-center"
              >
                {task.completed ? (
                  <CheckCircle2 size={10} className="mr-1 text-primary" />
                ) : (
                  <Circle size={10} className="mr-1 text-muted-foreground" />
                )}
                <span className="truncate max-w-[80px]">{task.title}</span>
              </div>
            ))}
            {tasks.length > 3 && (
              <div className="px-1.5 py-0.5 text-xs rounded bg-secondary/70">
                +{tasks.length - 3}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
