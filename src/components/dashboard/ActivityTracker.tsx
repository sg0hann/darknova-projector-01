
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animations";
import { useLanguage } from "../../hooks/useLanguage";

// Helper function to get a color based on activity level
const getActivityColor = (count: number) => {
  if (count === 0) return "bg-secondary/40";
  if (count < 3) return "bg-primary/30";
  if (count < 6) return "bg-primary/60";
  return "bg-primary";
};

// Helper to generate mock data for the last 20 weeks
const generateMockData = () => {
  const weeks = 20;
  const daysPerWeek = 7;
  const data = [];

  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // Generate random activity count (more activity for recent weeks)
      const recencyBoost = Math.max(0, (weeks - w) / weeks);
      const randomFactor = Math.random();
      const activityCount = Math.floor(randomFactor * 10 * recencyBoost);
      
      week.push({
        count: activityCount,
        color: getActivityColor(activityCount),
      });
    }
    data.push(week);
  }

  return data;
};

const activityData = generateMockData();

const ActivityTracker: React.FC = () => {
  const { t } = useLanguage();
  
  // Helper to get day label
  const getDayLabel = (dayIndex: number) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[dayIndex];
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="bg-card border border-border rounded-lg p-4"
    >
      <h3 className="font-medium mb-4">{t("activity")}</h3>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[700px]">
          {/* Day labels */}
          <div className="flex flex-col pr-2 pt-6">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div key={day} className="h-[14px] text-xs text-muted-foreground mb-1">
                {getDayLabel(day)}
              </div>
            ))}
          </div>
          
          {/* Activity grid */}
          <div className="flex space-x-1">
            {activityData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[14px] h-[14px] rounded-sm ${day.color} cursor-pointer`}
                    whileHover={{ scale: 1.2 }}
                    title={`${day.count} activities`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-2 text-xs text-muted-foreground">
        <span className="mr-1">Less</span>
        <div className="flex space-x-1">
          <div className="w-[10px] h-[10px] rounded-sm bg-secondary/40"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-primary/30"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-primary/60"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-primary"></div>
        </div>
        <span className="ml-1">More</span>
      </div>
    </motion.div>
  );
};

export default ActivityTracker;
