
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
    // Theme settings
    primaryColor: "Primary Color",
    accentColor: "Accent Color",
    background: "Background",
    cardBackground: "Card Background",
    customizeTheme: "Customize the appearance of the application by adjusting colors to match your preferences.",
    preview: "Preview",
    uiElements: "UI Elements",
    cardExample: "Card Example",
    cardTitle: "Card Title",
    cardDescription: "This is how card elements will appear with your chosen theme.",
    colorChangesApplied: "Color changes are applied immediately and saved to your browser automatically.",
    resetToDefault: "Reset to Default",
    hue: "Hue",
    saturation: "Saturation",
    lightness: "Lightness",
    interfaceLanguage: "Interface Language",
    languageDetails: "Language Details",
    languageDescription: "The application will automatically use your selected language for all interface elements, including navigation, buttons, forms, and content. Your language preference is stored in your browser and will be remembered for future visits.",
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
    // Theme settings
    primaryColor: "Color Primario",
    accentColor: "Color de Acento",
    background: "Fondo",
    cardBackground: "Fondo de Tarjeta",
    customizeTheme: "Personaliza la apariencia de la aplicación ajustando los colores según tus preferencias.",
    preview: "Vista Previa",
    uiElements: "Elementos de UI",
    cardExample: "Ejemplo de Tarjeta",
    cardTitle: "Título de Tarjeta",
    cardDescription: "Así es como aparecerán los elementos de tarjeta con tu tema elegido.",
    colorChangesApplied: "Los cambios de color se aplican inmediatamente y se guardan automáticamente en tu navegador.",
    resetToDefault: "Restablecer por Defecto",
    hue: "Tono",
    saturation: "Saturación",
    lightness: "Luminosidad",
    interfaceLanguage: "Idioma de Interfaz",
    languageDetails: "Detalles de Idioma",
    languageDescription: "La aplicación utilizará automáticamente el idioma seleccionado para todos los elementos de la interfaz, incluida la navegación, los botones, los formularios y el contenido. Tu preferencia de idioma se almacena en tu navegador y se recordará para futuras visitas.",
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
