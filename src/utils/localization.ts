
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// List of available languages for language picker
export const availableLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" }
];

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
    activity: "Activity",
    
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
    
    // Theme settings
    theme: "Theme",
    customizeTheme: "Customize your interface colors and typography",
    colors: "Colors",
    typography: "Typography",
    primaryColor: "Primary Color",
    accentColor: "Accent Color",
    background: "Background",
    cardBackground: "Card Background",
    preview: "Preview",
    uiElements: "UI Elements",
    cardExample: "Card Example",
    cardTitle: "Card Title",
    cardDescription: "Card content and description",
    themeChangesApplied: "Theme changes are applied immediately and saved to your account.",
    resetToDefault: "Reset to Default",
    save: "Save",
    badge: "Badge",
    
    // Typography
    fontFamily: "Font Family",
    fontSize: "Font Size",
    fontColor: "Font Color",
    selectFontFamily: "Select font family",
    selectFontSize: "Select font size",
    small: "Small",
    medium: "Medium",
    default: "Default",
    large: "Large",
    larger: "Larger",
    fontPreviewText: "The quick brown fox jumps over the lazy dog.",
    fontPreviewBold: "This text should appear bold.",
    fontPreviewItalic: "This text should appear italic.",
    textColor: "Text Color",
    
    // Color picker
    hue: "Hue",
    saturation: "Saturation",
    lightness: "Lightness",
    
    // Language
    language: "Language",
    selectLanguage: "Select your preferred language for the interface",
    interfaceLanguage: "Interface Language",
    languageDetails: "Language Preferences",
    languageDescription: "Select the language you prefer for the user interface. This setting will change all text throughout the application.",
    account: "Account",
    notifications: "Notifications",
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
    activity: "Actividad",
    
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
    
    // Theme settings
    theme: "Tema",
    customizeTheme: "Personaliza los colores e tipografía de tu interfaz",
    colors: "Colores",
    typography: "Tipografía",
    primaryColor: "Color Primario",
    accentColor: "Color de Acento",
    background: "Fondo",
    cardBackground: "Fondo de Tarjeta",
    preview: "Vista Previa",
    uiElements: "Elementos de UI",
    cardExample: "Ejemplo de Tarjeta",
    cardTitle: "Título de Tarjeta",
    cardDescription: "Contenido y descripción de tarjeta",
    themeChangesApplied: "Los cambios de tema se aplican inmediatamente y se guardan en tu cuenta.",
    resetToDefault: "Restaurar Predeterminados",
    save: "Guardar",
    badge: "Etiqueta",
    
    // Typography
    fontFamily: "Familia de Fuente",
    fontSize: "Tamaño de Fuente",
    fontColor: "Color de Fuente",
    selectFontFamily: "Seleccionar familia de fuente",
    selectFontSize: "Seleccionar tamaño de fuente",
    small: "Pequeño",
    medium: "Medio",
    default: "Predeterminado",
    large: "Grande",
    larger: "Más Grande",
    fontPreviewText: "El zorro marrón rápido salta sobre el perro perezoso.",
    fontPreviewBold: "Este texto debería aparecer en negrita.",
    fontPreviewItalic: "Este texto debería aparecer en cursiva.",
    textColor: "Color de Texto",
    
    // Color picker
    hue: "Tono",
    saturation: "Saturación",
    lightness: "Luminosidad",
    
    // Language
    language: "Idioma",
    selectLanguage: "Selecciona tu idioma preferido para la interfaz",
    interfaceLanguage: "Idioma de la Interfaz",
    languageDetails: "Preferencias de Idioma",
    languageDescription: "Selecciona el idioma que prefieres para la interfaz de usuario. Esta configuración cambiará todo el texto en la aplicación.",
    account: "Cuenta",
    notifications: "Notificaciones",
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
