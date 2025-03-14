
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import ActivityTracker from "../components/dashboard/ActivityTracker";
import { fadeIn, pageTransition } from "../utils/animations";
import { BarChart3, Clock, CheckSquare, Layers } from "lucide-react";

// Example chart configuration for task completion
const taskCompletionChart = {
  data: [
    { name: "Mon", complete: 5, incomplete: 2 },
    { name: "Tue", complete: 7, incomplete: 3 },
    { name: "Wed", complete: 4, incomplete: 6 },
    { name: "Thu", complete: 8, incomplete: 1 },
    { name: "Fri", complete: 6, incomplete: 4 },
    { name: "Sat", complete: 2, incomplete: 1 },
    { name: "Sun", complete: 1, incomplete: 0 },
  ],
};

// Example time spent data
const timeSpentData = [
  { project: "Website Redesign", hours: 12.5 },
  { project: "Mobile App Development", hours: 8.2 },
  { project: "Marketing Campaign", hours: 5.7 },
  { project: "Database Migration", hours: 3.3 },
];

// Example productivity score
const productivityScore = 82;

const Analytics = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container mx-auto px-4 py-6"
    >
      <motion.h1 
        variants={fadeIn}
        className="text-2xl font-bold mb-6"
      >
        {t("analytics")}
      </motion.h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm text-muted-foreground">{t("productivity")}</h2>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart3 size={16} className="text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold">{productivityScore}%</div>
          <div className="text-xs text-muted-foreground">+12% from last week</div>
        </motion.div>
        
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm text-muted-foreground">{t("timeSpent")}</h2>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock size={16} className="text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold">29.7h</div>
          <div className="text-xs text-muted-foreground">This week</div>
        </motion.div>
        
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm text-muted-foreground">{t("taskCompletion")}</h2>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckSquare size={16} className="text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold">33</div>
          <div className="text-xs text-muted-foreground">Tasks completed this week</div>
        </motion.div>
        
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm text-muted-foreground">{t("projectProgress")}</h2>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Layers size={16} className="text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold">4</div>
          <div className="text-xs text-muted-foreground">Active projects</div>
        </motion.div>
      </div>
      
      {/* Task completion chart */}
      <motion.div
        variants={fadeIn}
        className="bg-card border border-border rounded-lg p-4 mb-8"
      >
        <h2 className="font-medium mb-4">{t("taskCompletion")}</h2>
        <div className="h-80 w-full">
          {/* In a real app, this would be a real chart using recharts */}
          <div className="flex h-full items-end space-x-2">
            {taskCompletionChart.data.map((day, index) => (
              <div key={day.name} className="flex-1 flex flex-col items-center">
                <div className="flex flex-col w-full">
                  <div 
                    className="bg-primary/20 rounded-t-sm w-full" 
                    style={{ height: `${day.incomplete * 20}px` }}
                  ></div>
                  <div 
                    className="bg-primary rounded-t-sm w-full" 
                    style={{ height: `${day.complete * 20}px` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">{day.name}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Time spent by project */}
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-4"
        >
          <h2 className="font-medium mb-4">{t("timeSpent")}</h2>
          <div className="space-y-4">
            {timeSpentData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.project}</span>
                  <span>{item.hours}h</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.hours / Math.max(...timeSpentData.map(d => d.hours))) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Activity tracker */}
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-4"
        >
          <h2 className="font-medium mb-4">{t("activity")}</h2>
          <div className="h-[280px]">
            <ActivityTracker />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
