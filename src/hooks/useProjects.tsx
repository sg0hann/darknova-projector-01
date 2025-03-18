
import { useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { useLanguage } from "./useLanguage";

// Define la interfaz para un proyecto
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  startDate: string;
  dueDate: string;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export const useProjects = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar proyectos desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        // Si no hay proyectos guardados, usar datos de ejemplo
        // En una aplicación real, esto vendría de una API
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
        
        setProjects(mockProjects);
        localStorage.setItem("projects", JSON.stringify(mockProjects));
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar proyectos en localStorage cada vez que cambien
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects, isLoading]);

  // Función para crear un nuevo proyecto
  const createProject = (newProject: Omit<Project, 'id' | 'tasks'>) => {
    const id = `project-${Date.now()}`;
    const projectWithId: Project = {
      ...newProject,
      id,
      tasks: [],
    };

    setProjects(prevProjects => [...prevProjects, projectWithId]);
    
    return projectWithId;
  };

  // Función para actualizar un proyecto existente
  const updateProject = (updatedProject: Project) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  // Función para eliminar un proyecto
  const deleteProject = (projectId: string) => {
    setProjects(prevProjects =>
      prevProjects.filter(project => project.id !== projectId)
    );
    
    toast({
      title: t("success"),
      description: t("projectDeleted"),
    });
  };

  return {
    projects,
    isLoading,
    createProject,
    updateProject,
    deleteProject
  };
};
