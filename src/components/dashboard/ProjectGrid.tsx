
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { staggerContainer } from "../../utils/animations";
import { useLanguage } from "../../hooks/useLanguage";
import { useProjects } from "../../hooks/useProjects";

interface ProjectGridProps {
  limit?: number;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ limit }) => {
  const { t } = useLanguage();
  const { projects, isLoading } = useProjects();
  
  // Show limited number of projects if specified
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t("loading")}...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t("noProjects")}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {displayedProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          thumbnail={project.thumbnail}
          startDate={project.startDate}
          dueDate={project.dueDate}
          tasks={project.tasks}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
