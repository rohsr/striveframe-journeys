import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Brain, Code, Languages, Music, Camera, Palette, 
  Dumbbell, Heart, Salad, Moon, Cigarette, Wine, Gamepad2, 
  Smartphone, ShoppingBag, Droplets, Pill, Sunrise, Activity,
  Timer, Focus, Headphones, Calendar, Target, Zap, Trophy,
  Footprints, Mountain, Bike, Briefcase, GraduationCap, Home,
  Plane, Users, HandHeart, Leaf, Sparkles, Clock, Bell,
  Coffee, Apple, Eye, Smile, PenTool, ChevronRight, Check,
  X
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

type CategoryGroup = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  categories: Category[];
};

const categoryGroups: CategoryGroup[] = [
  {
    id: "learn",
    title: "Learn Something New",
    subtitle: "Expand your skills and knowledge",
    color: "from-blue-500 to-cyan-500",
    categories: [
      { id: "coding", icon: Code, title: "Coding & Tech", description: "Programming, web dev, AI" },
      { id: "languages", icon: Languages, title: "Languages", description: "Learn a new language" },
      { id: "music", icon: Music, title: "Music & Instruments", description: "Piano, guitar, singing" },
      { id: "art", icon: Palette, title: "Art & Design", description: "Drawing, painting, design" },
      { id: "photography", icon: Camera, title: "Photography", description: "Photo & video skills" },
      { id: "writing", icon: PenTool, title: "Writing", description: "Creative & professional" },
      { id: "reading", icon: BookOpen, title: "Reading", description: "Books & knowledge" },
      { id: "brain", icon: Brain, title: "Mental Skills", description: "Memory, focus, thinking" },
    ]
  },
  {
    id: "quit",
    title: "Quit Bad Habits",
    subtitle: "Break free from what holds you back",
    color: "from-red-500 to-orange-500",
    categories: [
      { id: "smoking", icon: Cigarette, title: "Quit Smoking", description: "Tobacco & vaping" },
      { id: "alcohol", icon: Wine, title: "Reduce Alcohol", description: "Drink less or quit" },
      { id: "gaming", icon: Gamepad2, title: "Gaming Addiction", description: "Balance your gaming" },
      { id: "phone", icon: Smartphone, title: "Phone Addiction", description: "Screen time control" },
      { id: "shopping", icon: ShoppingBag, title: "Shopping", description: "Impulse buying" },
      { id: "junkfood", icon: Coffee, title: "Junk Food", description: "Unhealthy eating" },
      { id: "procrastination", icon: Clock, title: "Procrastination", description: "Stop delaying" },
      { id: "negativity", icon: Smile, title: "Negative Thinking", description: "Mental patterns" },
    ]
  },
  {
    id: "health",
    title: "Health & Fitness",
    subtitle: "Transform your body and mind",
    color: "from-green-500 to-emerald-500",
    categories: [
      { id: "workout", icon: Dumbbell, title: "Exercise", description: "Gym, home workouts" },
      { id: "running", icon: Footprints, title: "Running", description: "Jogging, marathons" },
      { id: "yoga", icon: Activity, title: "Yoga & Flexibility", description: "Mind-body practice" },
      { id: "nutrition", icon: Salad, title: "Nutrition", description: "Healthy eating" },
      { id: "weight", icon: Apple, title: "Weight Goals", description: "Lose or gain weight" },
      { id: "sleep", icon: Moon, title: "Better Sleep", description: "Sleep hygiene" },
      { id: "meditation", icon: Heart, title: "Meditation", description: "Mindfulness practice" },
      { id: "outdoor", icon: Mountain, title: "Outdoor Activities", description: "Hiking, cycling" },
    ]
  },
  {
    id: "daily",
    title: "Daily Reminders",
    subtitle: "Build micro-habits that stick",
    color: "from-purple-500 to-pink-500",
    categories: [
      { id: "water", icon: Droplets, title: "Drink Water", description: "Stay hydrated" },
      { id: "vitamins", icon: Pill, title: "Take Vitamins", description: "Daily supplements" },
      { id: "morning", icon: Sunrise, title: "Morning Routine", description: "Start day right" },
      { id: "stretch", icon: Activity, title: "Stretch Breaks", description: "Move your body" },
      { id: "eyes", icon: Eye, title: "Eye Breaks", description: "20-20-20 rule" },
      { id: "gratitude", icon: HandHeart, title: "Gratitude", description: "Daily reflection" },
      { id: "journal", icon: PenTool, title: "Journaling", description: "Write daily" },
      { id: "steps", icon: Footprints, title: "Daily Steps", description: "Walk more" },
    ]
  },
  {
    id: "routine",
    title: "Start a Routine",
    subtitle: "Structure your day for success",
    color: "from-amber-500 to-yellow-500",
    categories: [
      { id: "morning-routine", icon: Sunrise, title: "Morning Routine", description: "Productive mornings" },
      { id: "night-routine", icon: Moon, title: "Night Routine", description: "Wind down properly" },
      { id: "work-routine", icon: Briefcase, title: "Work Routine", description: "Professional habits" },
      { id: "study-routine", icon: GraduationCap, title: "Study Routine", description: "Learning schedule" },
      { id: "fitness-routine", icon: Dumbbell, title: "Fitness Routine", description: "Exercise schedule" },
      { id: "self-care", icon: Sparkles, title: "Self-Care", description: "Personal wellness" },
      { id: "productivity", icon: Zap, title: "Productivity", description: "Get things done" },
      { id: "mindfulness", icon: Leaf, title: "Mindfulness", description: "Present moment" },
    ]
  },
  {
    id: "challenge",
    title: "Start a Challenge",
    subtitle: "Push your limits with time-bound goals",
    color: "from-indigo-500 to-violet-500",
    categories: [
      { id: "30-day", icon: Calendar, title: "30-Day Challenge", description: "Month transformation" },
      { id: "75-hard", icon: Trophy, title: "75 Hard", description: "Mental toughness" },
      { id: "no-sugar", icon: Apple, title: "No Sugar", description: "Cut out sugar" },
      { id: "cold-shower", icon: Droplets, title: "Cold Showers", description: "Build discipline" },
      { id: "early-wake", icon: Sunrise, title: "5 AM Club", description: "Wake up early" },
      { id: "digital-detox", icon: Smartphone, title: "Digital Detox", description: "Unplug & reset" },
      { id: "reading-challenge", icon: BookOpen, title: "Reading Challenge", description: "Books per month" },
      { id: "fitness-challenge", icon: Target, title: "Fitness Challenge", description: "Physical goals" },
    ]
  },
  {
    id: "life",
    title: "Life Transitions",
    subtitle: "Navigate major life changes",
    color: "from-teal-500 to-cyan-500",
    categories: [
      { id: "career-change", icon: Briefcase, title: "Career Change", description: "New profession" },
      { id: "moving", icon: Home, title: "Moving Cities", description: "Relocate smoothly" },
      { id: "travel", icon: Plane, title: "Long-term Travel", description: "Extended trips" },
      { id: "relationship", icon: Users, title: "Relationships", description: "Better connections" },
      { id: "graduation", icon: GraduationCap, title: "Post-Graduation", description: "Life after school" },
      { id: "parenthood", icon: Heart, title: "Parenthood", description: "New parent journey" },
      { id: "retirement", icon: Leaf, title: "Retirement", description: "Next chapter" },
      { id: "entrepreneurship", icon: Zap, title: "Entrepreneurship", description: "Start a business" },
    ]
  },
];

const toolFeatures = [
  { id: "timer", icon: Timer, title: "Focus Timer", description: "Pomodoro & custom timers" },
  { id: "focus", icon: Focus, title: "Focus Mode", description: "Block distractions" },
  { id: "music", icon: Headphones, title: "Focus Music", description: "Connect to Spotify" },
  { id: "calendar", icon: Calendar, title: "Calendar Sync", description: "Google, Apple, Outlook" },
  { id: "reminders", icon: Bell, title: "Smart Reminders", description: "Never miss a task" },
  { id: "analytics", icon: Target, title: "Analytics", description: "Track your progress" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"categories" | "tools" | "complete">("categories");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [expandedGroup, setExpandedGroup] = useState<string | null>("learn");

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTool = (toolId: string) => {
    setSelectedTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleContinue = () => {
    if (step === "categories") {
      setStep("tools");
    } else if (step === "tools") {
      setStep("complete");
      setTimeout(() => navigate("/home"), 2000);
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle overflow-hidden relative">
      <AnimatedBackground />
      <Navbar variant="landing" />

      <main className="pt-24 pb-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {["categories", "tools", "complete"].map((s, i) => (
              <div
                key={s}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  step === s ? "w-12 bg-primary" : 
                  ["categories", "tools", "complete"].indexOf(step) > i ? "w-8 bg-primary/60" : "w-8 bg-muted"
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === "categories" && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-10">
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                    What would you like to <span className="text-gradient">achieve</span>?
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Select the areas you want to focus on. You can always change these later.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {categoryGroups.map((group) => (
                    <motion.div
                      key={group.id}
                      layout
                      className="glass overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                            group.color
                          )}>
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-foreground">{group.title}</h3>
                            <p className="text-sm text-muted-foreground">{group.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {selectedCategories.filter(id => 
                            group.categories.some(c => c.id === id)
                          ).length > 0 && (
                            <span className="badge-primary">
                              {selectedCategories.filter(id => 
                                group.categories.some(c => c.id === id)
                              ).length} selected
                            </span>
                          )}
                          <ChevronRight className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform duration-300",
                            expandedGroup === group.id && "rotate-90"
                          )} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedGroup === group.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {group.categories.map((category) => (
                                <motion.button
                                  key={category.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleCategory(category.id)}
                                  className={cn(
                                    "p-4 rounded-xl border-2 text-left transition-all duration-300",
                                    selectedCategories.includes(category.id)
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50 bg-muted/30"
                                  )}
                                >
                                  <category.icon className={cn(
                                    "w-6 h-6 mb-2 transition-colors",
                                    selectedCategories.includes(category.id)
                                      ? "text-primary"
                                      : "text-muted-foreground"
                                  )} />
                                  <h4 className="font-medium text-foreground text-sm">{category.title}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                                  {selectedCategories.includes(category.id) && (
                                    <Check className="w-4 h-4 text-primary mt-2" />
                                  )}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  <button onClick={handleSkip} className="btn-ghost-interactive">
                    Skip for now
                  </button>
                  <button 
                    onClick={handleContinue}
                    disabled={selectedCategories.length === 0}
                    className={cn(
                      "btn-interactive",
                      selectedCategories.length === 0 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Continue ({selectedCategories.length} selected)
                    <ChevronRight className="w-4 h-4 ml-2 inline" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "tools" && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-10">
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                    Power up your <span className="text-gradient">journey</span>
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Choose the tools that'll help you stay focused and on track.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {toolFeatures.map((tool) => (
                    <motion.button
                      key={tool.id}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleTool(tool.id)}
                      className={cn(
                        "card-interactive text-left",
                        selectedTools.includes(tool.id) && "border-primary bg-primary/10"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-3 rounded-xl transition-colors",
                          selectedTools.includes(tool.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}>
                          <tool.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{tool.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                        </div>
                        {selectedTools.includes(tool.id) && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  <button onClick={() => setStep("categories")} className="btn-ghost-interactive">
                    Back
                  </button>
                  <button onClick={handleContinue} className="btn-interactive">
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-2 inline" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  You're all set!
                </h1>
                <p className="text-muted-foreground">
                  Redirecting to your dashboard...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;