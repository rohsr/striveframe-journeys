import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "goal" | "milestone" | "streak" | "progress" | "star";
  label?: string;
}

const goalLabels = [
  "Lose 10kg",
  "Learn React",
  "Run 5K",
  "Read 20 Books",
  "Save $10K",
  "Quit Smoking",
  "Wake Up Early",
  "Meditate Daily",
  "Learn Guitar",
  "Start Business",
];

const generateElements = (): FloatingElement[] => {
  const elements: FloatingElement[] = [];
  const types: FloatingElement["type"][] = ["goal", "milestone", "streak", "progress", "star"];
  
  for (let i = 0; i < 15; i++) {
    elements.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 60,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      type: types[Math.floor(Math.random() * types.length)],
      label: goalLabels[Math.floor(Math.random() * goalLabels.length)],
    });
  }
  return elements;
};

const ElementIcon = ({ type, label, size }: { type: FloatingElement["type"]; label?: string; size: number }) => {
  const iconSize = size * 0.4;
  
  switch (type) {
    case "goal":
      return (
        <div 
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm"
          style={{ width: size, height: size }}
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" className="text-primary">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          {size > 60 && label && (
            <span className="text-[8px] font-medium text-primary/80 mt-1 truncate max-w-full px-1">
              {label}
            </span>
          )}
        </div>
      );
    case "milestone":
      return (
        <div 
          className="flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 backdrop-blur-sm"
          style={{ width: size, height: size }}
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" className="text-accent">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="4" y1="22" x2="4" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      );
    case "streak":
      return (
        <div 
          className="flex flex-col items-center justify-center rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
          style={{ width: size, height: size }}
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 2L8 8l-6 1 4.5 4.5L5 20l7-4 7 4-1.5-6.5L22 9l-6-1-4-6z" fill="currentColor" opacity="0.3"/>
            <path d="M12 2L8 8l-6 1 4.5 4.5L5 20l7-4 7 4-1.5-6.5L22 9l-6-1-4-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {size > 50 && (
            <span className="text-[10px] font-bold text-primary/80">{Math.floor(Math.random() * 30) + 1}d</span>
          )}
        </div>
      );
    case "progress":
      const progress = 30 + Math.random() * 60;
      return (
        <div 
          className="flex flex-col items-center justify-center rounded-xl bg-accent/10 border border-accent/20 backdrop-blur-sm p-2"
          style={{ width: size, height: size }}
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 36 36" className="text-accent">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.2"/>
            <circle 
              cx="18" cy="18" r="15" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${progress} 100`}
              transform="rotate(-90 18 18)"
            />
          </svg>
          {size > 50 && (
            <span className="text-[9px] font-bold text-accent/80 -mt-1">{Math.round(progress)}%</span>
          )}
        </div>
      );
    case "star":
      return (
        <div 
          className="flex items-center justify-center"
          style={{ width: size * 0.5, height: size * 0.5 }}
        >
          <svg width={iconSize * 0.6} height={iconSize * 0.6} viewBox="0 0 24 24" fill="currentColor" className="text-primary/60">
            <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
          </svg>
        </div>
      );
  }
};

export const AnimatedBackground = () => {
  const [elements] = useState<FloatingElement[]>(generateElements);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
      
      setMousePosition({
        x: clientX / innerWidth,
        y: clientY / innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs that respond to mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          x: useTransform(mouseXSpring, (v) => v * 20 - 100),
          y: useTransform(mouseYSpring, (v) => v * 20 - 100),
          left: "10%",
          top: "10%",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)",
          x: useTransform(mouseXSpring, (v) => -v * 15 + 50),
          y: useTransform(mouseYSpring, (v) => -v * 15 + 50),
          right: "5%",
          bottom: "20%",
        }}
      />

      {/* Floating elements */}
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{ 
            left: `${element.x}%`, 
            top: `${element.y}%`,
            opacity: 0,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 15 : -15, 0],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            x: useTransform(mouseXSpring, (v) => v * (element.id % 3 + 1) * 2),
            y: useTransform(mouseYSpring, (v) => v * (element.id % 3 + 1) * 2),
          }}
        >
          <ElementIcon type={element.type} label={element.label} size={element.size} />
        </motion.div>
      ))}

      {/* Connection lines (subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {elements.slice(0, 8).map((el, i) => {
          const next = elements[(i + 1) % elements.length];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${el.x}%`}
              y1={`${el.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          );
        })}
      </svg>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};
