
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    projects: "Projects",
    analytics: "Analytics",
    settings: "Settings",
    // Dashboard
    welcomeBack: "Welcome back",
    activeProjects: "Active Projects",
    activity: "Recent Activity",
    dueToday: "Due Today",
    // Projects
    newProject: "New Project",
    allProjects: "All Projects",
    searchProjects: "Search projects...",
    noProjects: "No projects found",
    // Project details
    description: "Description",
    tasks: "Tasks",
    dueDate: "Due Date",
    startDate: "Start Date",
    addTask: "Add Task",
    // Tasks
    completed: "Completed",
    incomplete: "Incomplete",
    // Form labels
    projectName: "Project Name",
    projectDescription: "Project Description",
    uploadThumbnail: "Upload Thumbnail",
    // Buttons
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    // Settings
    language: "Language",
    theme: "Theme",
    account: "Account",
    notifications: "Notifications",
    // Analytics
    productivity: "Productivity",
    taskCompletion: "Task Completion",
    projectProgress: "Project Progress",
    timeSpent: "Time Spent",
    // Language selector
    selectLanguage: "Select Language",
  },
  es: {
    // Navigation
    dashboard: "Panel",
    projects: "Proyectos",
    analytics: "Análisis",
    settings: "Configuración",
    // Dashboard
    welcomeBack: "Bienvenido de nuevo",
    activeProjects: "Proyectos Activos",
    activity: "Actividad Reciente",
    dueToday: "Vence Hoy",
    // Projects
    newProject: "Nuevo Proyecto",
    allProjects: "Todos los Proyectos",
    searchProjects: "Buscar proyectos...",
    noProjects: "No se encontraron proyectos",
    // Project details
    description: "Descripción",
    tasks: "Tareas",
    dueDate: "Fecha de Entrega",
    startDate: "Fecha de Inicio",
    addTask: "Agregar Tarea",
    // Tasks
    completed: "Completado",
    incomplete: "Incompleto",
    // Form labels
    projectName: "Nombre del Proyecto",
    projectDescription: "Descripción del Proyecto",
    uploadThumbnail: "Subir Miniatura",
    // Buttons
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    // Settings
    language: "Idioma",
    theme: "Tema",
    account: "Cuenta",
    notifications: "Notificaciones",
    // Analytics
    productivity: "Productividad",
    taskCompletion: "Completado de Tareas",
    projectProgress: "Progreso de Proyectos",
    timeSpent: "Tiempo Empleado",
    // Language selector
    selectLanguage: "Seleccionar Idioma",
  },
  // Structure ready for adding more languages
};

export const getTranslation = (
  language: string,
  key: string,
  defaultValue?: string
): string => {
  return translations[language]?.[key] || defaultValue || key;
};

export const availableLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  // Easy to add more languages here
];

export default translations;
