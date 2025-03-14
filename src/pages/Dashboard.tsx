
import React from "react";
import { motion } from "framer-motion";
import { Plus, Clock, Calendar } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import ActivityTracker from "../components/dashboard/ActivityTracker";
import { fadeIn, pageTransition, staggerContainer } from "../utils/animations";

// Mock data for upcoming tasks
const upcomingTasks = [
  {
    id: "task1",
    title: "Complete wireframes",
    project: "Website Redesign",
    dueDate: "2023-11-20",
  },
  {
    id: "task2",
    title: "Review content strategy",
    project: "Marketing Campaign",
    dueDate: "2023-11-21",
  },
  {
    id: "task3",
    title: "Finalize API endpoints",
    project: "Mobile App Development",
    dueDate: "2023-11-22",
  },
];

const Dashboard = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container mx-auto px-4 py-6"
    >
      <div className="mb-8">
        <motion.h1 
          variants={fadeIn}
          className="text-2xl font-bold mb-2"
        >
          {t("welcomeBack")}, User
        </motion.h1>
        <motion.p 
          variants={fadeIn}
          className="text-muted-foreground"
        >
          {new Date().toLocaleDateString()} · 
          {upcomingTasks.length > 0 ? 
            ` ${upcomingTasks.length} ${t("dueToday").toLowerCase()}` : 
            ` ${t("noTasks").toLowerCase()}`
          }
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Active projects card */}
        <motion.div
          variants={fadeIn}
          className="lg:col-span-2 bg-card border border-border rounded-lg p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">{t("activeProjects")}</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-sm bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} className="mr-1.5" />
              {t("newProject")}
            </motion.button>
          </div>
          <ProjectGrid limit={2} />
        </motion.div>
        
        {/* Upcoming tasks card */}
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-4"
        >
          <h2 className="font-medium mb-4">{t("dueToday")}</h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {upcomingTasks.map((task) => (
              <motion.div
                key={task.id}
                variants={fadeIn}
                whileHover={{ x: 4 }}
                className="bg-secondary/30 rounded-md p-3"
              >
                <h3 className="font-medium text-sm mb-1">{task.title}</h3>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{task.project}</span>
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Activity tracker */}
      <ActivityTracker />
    </motion.div>
  );
};

export default Dashboard;
