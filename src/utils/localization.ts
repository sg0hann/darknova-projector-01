import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const translations: Record<string, Record<string, string>> = {
  en: {
    welcomeBack: "Welcome Back",
    dashboard: "Dashboard",
    projects: "Projects",
    analytics: "Analytics",
    settings: "Settings",
    allProjects: "All Projects",
    searchProjects: "Search projects...",
    newProject: "New Project",
    activeProjects: "Active Projects",
    dueToday: "Due Today",
    noTasks: "No tasks due today",
    loading: "Loading",
    noProjects: "No projects",
    
    // Auth
    login: "Login",
    register: "Register",
    logout: "Logout",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    
    // Project creation
    newProject: "New Project",
    createProject: "Create Project",
    projectTitle: "Project Title",
    projectTitlePlaceholder: "Enter project title",
    projectDescription: "Description",
    projectDescriptionPlaceholder: "Describe the project...",
    startDate: "Start Date",
    dueDate: "Due Date",
    projectThumbnail: "Project Thumbnail",
    projectThumbnailUrlPlaceholder: "Enter image URL",
    cancel: "Cancel",
    projectTitleRequired: "Project title is required",
    projectDueDateRequired: "Due date is required",
    projectCreatedSuccess: "Project created successfully",
    
    // General
    success: "Success",
    error: "Error",
    projectDeleted: "Project deleted successfully",
  },
  
  es: {
    welcomeBack: "Bienvenido",
    dashboard: "Panel",
    projects: "Proyectos",
    analytics: "Analítica",
    settings: "Configuración",
    allProjects: "Todos los Proyectos",
    searchProjects: "Buscar proyectos...",
    newProject: "Nuevo Proyecto",
    activeProjects: "Proyectos Activos",
    dueToday: "Debido Hoy",
    noTasks: "No hay tareas para hoy",
    loading: "Cargando",
    noProjects: "No hay proyectos",
    
    // Auth
    login: "Iniciar Sesión",
    register: "Registrarse",
    logout: "Cerrar Sesión",
    name: "Nombre",
    email: "Correo Electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    dontHaveAccount: "¿No tienes una cuenta?",
    
    // Project creation
    newProject: "Nuevo Proyecto",
    createProject: "Crear Proyecto",
    projectTitle: "Título del Proyecto",
    projectTitlePlaceholder: "Ingresa el título del proyecto",
    projectDescription: "Descripción",
    projectDescriptionPlaceholder: "Describe el proyecto...",
    startDate: "Fecha de Inicio",
    dueDate: "Fecha de Entrega",
    projectThumbnail: "Imagen del Proyecto",
    projectThumbnailUrlPlaceholder: "Ingresa la URL de la imagen",
    cancel: "Cancelar",
    projectTitleRequired: "El título del proyecto es obligatorio",
    projectDueDateRequired: "La fecha de entrega es obligatoria",
    projectCreatedSuccess: "Proyecto creado exitosamente",
    
    // General
    success: "Éxito",
    error: "Error",
    projectDeleted: "Proyecto eliminado exitosamente",
  },
};

export const getTranslation = (
  language: string,
  key: string,
  defaultValue: string = key
): string => {
  const lang = translations[language] || translations["en"];
  return lang[key] || defaultValue;
};

export default i18n;
