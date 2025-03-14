
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, Shield, Clock, BarChart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/ui/LanguageToggle";

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const features = [
    { 
      icon: <Zap className="text-primary h-5 w-5" />, 
      title: language === 'en' ? 'Efficient Project Management' : 'Gestión de Proyectos Eficiente',
      description: language === 'en' 
        ? 'Organize and track your projects with ease'
        : 'Organiza y rastrea tus proyectos con facilidad'
    },
    { 
      icon: <Shield className="text-accent h-5 w-5" />, 
      title: language === 'en' ? 'Secure Task Organization' : 'Organización Segura de Tareas',
      description: language === 'en'
        ? 'Keep your tasks organized and secure'
        : 'Mantén tus tareas organizadas y seguras'
    },
    { 
      icon: <Clock className="text-yellow-500 h-5 w-5" />, 
      title: language === 'en' ? 'Time Tracking' : 'Seguimiento de Tiempo',
      description: language === 'en'
        ? 'Track time spent on projects and tasks'
        : 'Rastrea el tiempo dedicado a proyectos y tareas'
    },
    { 
      icon: <BarChart className="text-emerald-500 h-5 w-5" />, 
      title: language === 'en' ? 'Insightful Analytics' : 'Análisis Detallados',
      description: language === 'en'
        ? 'Gain insights from your productivity data'
        : 'Obtén información de tus datos de productividad'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            x: ['-20%', '30%', '-20%'],
            y: ['10%', '60%', '10%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute w-72 h-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ 
            x: ['110%', '60%', '110%'],
            y: ['60%', '0%', '60%'],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
      
      {/* Navigation */}
      <header className="relative z-10 p-4 md:p-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <h1 className="text-2xl font-bold text-gradient-primary">Execute</h1>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm bg-transparent hover:bg-secondary/40 rounded-md transition-colors"
            >
              {language === 'en' ? 'Sign In' : 'Iniciar Sesión'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {language === 'en' ? 'Register' : 'Registrarse'}
            </motion.button>
          </motion.div>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div 
          className="max-w-4xl w-full mx-auto text-center z-10"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div
            variants={item}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary/50 backdrop-blur-md border border-border/50"
          >
            <span className="text-sm font-medium text-foreground">
              {language === 'en' ? '✨ Welcome to Execute' : '✨ Bienvenido a Execute'}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl md:text-6xl font-bold mb-6 glow-text-primary tracking-tight"
          >
            <span className="text-gradient-primary">
              {language === 'en' ? 'Supercharge your' : 'Potencia tu'}
            </span>
            <br />
            {language === 'en' ? 'productivity workflow' : 'flujo de productividad'}
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {language === 'en' 
              ? 'A powerful, intuitive platform for managing your projects and tasks with advanced analytics and progress tracking.'
              : 'Una plataforma potente e intuitiva para gestionar tus proyectos y tareas con análisis avanzados y seguimiento de progreso.'}
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {language === 'en' ? 'Get Started' : 'Comenzar'} 
                <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-primary"
                initial={false}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>
            
            <Button
              onClick={() => navigate("/register")}
              variant="outline"
              size="lg"
              className="border-primary/50 hover:border-primary/80 transition-colors"
            >
              {language === 'en' ? 'Sign Up Free' : 'Registrarse Gratis'}
            </Button>
          </motion.div>
          
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-secondary/30 backdrop-blur-md border border-border/30 p-6 rounded-xl hover:glow-border-primary transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="rounded-full bg-background/60 w-10 h-10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 p-6 text-center text-sm text-muted-foreground"
      >
        <p>© 2023 Execute. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}</p>
      </motion.footer>
      
      {/* Grid overlay for futuristic effect */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
    </div>
  );
};

export default Index;
