import { motion } from "framer-motion";
import { useState } from "react";
import { format, subDays, startOfWeek, addDays } from "date-fns";

interface DayData {
  date: Date;
  count: number;
  notes?: string;
}

interface ContributionGraphProps {
  data?: DayData[];
  onDayClick?: (date: Date, notes?: string) => void;
}

const getIntensityClass = (count: number) => {
  if (count === 0) return "bg-muted";
  if (count === 1) return "bg-primary/30";
  if (count === 2) return "bg-primary/50";
  if (count === 3) return "bg-primary/70";
  return "bg-primary";
};

export const ContributionGraph = ({ data = [], onDayClick }: ContributionGraphProps) => {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Generate last 365 days
  const today = new Date();
  const startDate = startOfWeek(subDays(today, 364));
  
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];
  
  for (let i = 0; i < 371; i++) {
    const date = addDays(startDate, i);
    if (date > today) break;
    
    const dayData = data.find(
      (d) => format(d.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    ) || { date, count: 0 };
    
    currentWeek.push(dayData);
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleMouseEnter = (day: DayData, e: React.MouseEvent) => {
    setHoveredDay(day);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="glass p-6 overflow-x-auto">
      <h3 className="text-lg font-semibold text-foreground mb-4">Activity Overview</h3>
      
      <div className="inline-block min-w-max">
        {/* Month labels */}
        <div className="flex ml-8 mb-1">
          {weeks.map((week, weekIndex) => {
            const firstDay = week[0];
            const showMonth = weekIndex === 0 || firstDay.date.getDate() <= 7;
            return (
              <div key={weekIndex} className="w-3 mx-[1px]">
                {showMonth && firstDay.date.getDate() <= 7 && (
                  <span className="text-[10px] text-muted-foreground">
                    {months[firstDay.date.getMonth()]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col mr-2">
            {days.map((day, i) => (
              <div key={day} className="h-3 my-[1px] text-[10px] text-muted-foreground leading-3">
                {i % 2 === 1 ? day : ""}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col">
                {week.map((day, dayIndex) => (
                  <motion.button
                    key={`${weekIndex}-${dayIndex}`}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-3 h-3 m-[1px] rounded-sm ${getIntensityClass(day.count)} transition-colors cursor-pointer hover:ring-2 hover:ring-primary/50`}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={() => setHoveredDay(null)}
                    onClick={() => onDayClick?.(day.date, day.notes)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-4 gap-2">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getIntensityClass(level)}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed z-50 bg-popover border border-border rounded-lg px-3 py-2 shadow-lg pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 40,
          }}
        >
          <p className="text-sm font-medium text-foreground">
            {format(hoveredDay.date, "MMM d, yyyy")}
          </p>
          <p className="text-xs text-muted-foreground">
            {hoveredDay.count} {hoveredDay.count === 1 ? "activity" : "activities"}
          </p>
          {hoveredDay.notes && (
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate">
              {hoveredDay.notes}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};
