
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { staggerContainer } from "../../utils/animations";
import { useLanguage } from "../../hooks/useLanguage";

// Mock data - this would come from API in a real app
const mockProjects = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website with modern design principles",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    startDate: "2023-10-15",
    dueDate: "2023-12-20",
    tasks: [
      { id: "t1", title: "Wireframes", completed: true },
      { id: "t2", title: "UI Design", completed: true },
      { id: "t3", title: "Frontend Development", completed: false },
      { id: "t4", title: "Backend Integration", completed: false },
    ],
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Creating a cross-platform mobile app for tracking fitness activities",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    startDate: "2023-11-01",
    dueDate: "2024-02-28",
    tasks: [
      { id: "t5", title: "Requirements Gathering", completed: true },
      { id: "t6", title: "App Design", completed: true },
      { id: "t7", title: "Development", completed: false },
      { id: "t8", title: "Testing", completed: false },
      { id: "t9", title: "Deployment", completed: false },
    ],
  },
  {
    id: "3",
    title: "Marketing Campaign",
    description: "Q1 digital marketing campaign for product launch",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    startDate: "2023-12-01",
    dueDate: "2024-01-15",
    tasks: [
      { id: "t10", title: "Strategy", completed: true },
      { id: "t11", title: "Content Creation", completed: false },
      { id: "t12", title: "Social Media", completed: false },
    ],
  },
  {
    id: "4",
    title: "Database Migration",
    description: "Migrate legacy database to new cloud infrastructure",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    startDate: "2023-09-10",
    dueDate: "2023-11-30",
    tasks: [
      { id: "t13", title: "Planning", completed: true },
      { id: "t14", title: "Data Mapping", completed: true },
      { id: "t15", title: "Migration Scripts", completed: true },
      { id: "t16", title: "Testing", completed: false },
      { id: "t17", title: "Go Live", completed: false },
    ],
  },
];

interface ProjectGridProps {
  limit?: number;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ limit }) => {
  const { t } = useLanguage();
  const projects = limit ? mockProjects.slice(0, limit) : mockProjects;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {projects.map((project, index) => (
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
