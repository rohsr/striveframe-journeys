import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { 
  Sparkles, 
  Heart, 
  Cigarette, 
  GraduationCap, 
  Briefcase, 
  MapPin,
  ChevronRight,
  Loader2
} from "lucide-react";

const categories = [
  { id: "health", label: "Health & Fitness", icon: Heart, color: "from-emerald-500 to-teal-500" },
  { id: "quit", label: "Quit a Habit", icon: Cigarette, color: "from-rose-500 to-orange-500" },
  { id: "upskill", label: "Learn Something", icon: GraduationCap, color: "from-blue-500 to-indigo-500" },
  { id: "career", label: "Career Change", icon: Briefcase, color: "from-violet-500 to-purple-500" },
  { id: "move", label: "Move Cities/Countries", icon: MapPin, color: "from-amber-500 to-yellow-500" },
];

const durations = [
  { days: 30, label: "30 days", description: "Quick transformation" },
  { days: 60, label: "60 days", description: "Solid foundation" },
  { days: 100, label: "100 days", description: "Deep change" },
  { days: 180, label: "180 days", description: "Life transition" },
];

const CreateJourney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [goal, setGoal] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      navigate("/journeys/new-journey-123");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar variant="app" />

      <main className="pt-28 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 badge-accent mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Create Your Journey
            </h1>
            <p className="text-muted-foreground">
              Tell us what you want to achieve, and we'll design your path.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-8 bg-primary"
                    : s < step
                    ? "w-8 bg-primary/50"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Category */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                What kind of journey?
              </h2>
              <div className="grid gap-3">
                {categories.map((cat, index) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setStep(2);
                    }}
                    className={`glass p-4 flex items-center gap-4 text-left transition-all duration-200 hover:border-primary/50 group ${
                      selectedCategory === cat.id ? "border-primary" : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}
                    >
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-foreground font-medium flex-1">
                      {cat.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Goal */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                Describe your goal
              </h2>
              <div className="glass p-6">
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., I want to lose 10kg by building sustainable exercise and eating habits..."
                  className="w-full h-32 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-lg"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!goal.trim()}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Duration */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                How long is your journey?
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {durations.map((dur, index) => (
                  <motion.button
                    key={dur.days}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedDuration(dur.days)}
                    className={`glass p-4 text-center transition-all duration-200 hover:border-primary/50 ${
                      selectedDuration === dur.days ? "border-primary glow-primary" : ""
                    }`}
                  >
                    <p className="text-2xl font-bold text-foreground">{dur.label}</p>
                    <p className="text-sm text-muted-foreground">{dur.description}</p>
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!selectedDuration || isGenerating}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Journey
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateJourney;
