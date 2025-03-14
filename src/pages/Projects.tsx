
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Grid, List, Filter } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import { fadeIn, pageTransition } from "../utils/animations";

const Projects = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container mx-auto px-4 py-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <motion.h1 
          variants={fadeIn}
          className="text-2xl font-bold"
        >
          {t("allProjects")}
        </motion.h1>
        
        <motion.button
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          {t("newProject")}
        </motion.button>
      </div>
      
      <motion.div
        variants={fadeIn}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchProjects")}
            className="w-full py-2 pl-10 pr-4 rounded-md bg-secondary/50 border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md bg-secondary/50 border border-border hover:bg-secondary/80 transition-colors">
            <Filter size={18} />
          </button>
          <div className="flex items-center bg-secondary/50 border border-border rounded-md p-1">
            <button
              className={`p-1 rounded ${viewMode === "grid" ? "bg-primary text-white" : "hover:bg-secondary/80 transition-colors"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={18} />
            </button>
            <button
              className={`p-1 rounded ${viewMode === "list" ? "bg-primary text-white" : "hover:bg-secondary/80 transition-colors"}`}
              onClick={() => setViewMode("list")}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </motion.div>
      
      <ProjectGrid />
    </motion.div>
  );
};

export default Projects;
