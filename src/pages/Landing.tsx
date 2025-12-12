import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { FeatureCard } from "@/components/FeatureCard";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Sparkles, Flame, ArrowRightLeft } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle overflow-hidden relative">
      <AnimatedBackground />
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
              >
                Get ready for{" "}
                <span className="text-gradient">anything</span>, one journey at
                a time.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-muted-foreground mb-4 max-w-xl leading-relaxed"
              >
                Create structured, time-bound journeys for life's biggest changes. 
                Whether you're losing weight, quitting smoking, switching careers, or
                moving countries — Striveframe breaks it down into daily, actionable steps.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm text-muted-foreground mb-8"
              >
                No overwhelm. Just one day at a time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/signup" className="btn-interactive text-center inline-flex items-center justify-center">
                  Start your journey
                </Link>
                <Link to="/onboarding" className="btn-secondary-interactive text-center inline-flex items-center justify-center">
                  Explore features
                </Link>
              </motion.div>
            </div>

            {/* Right: Feature Carousel */}
            <div className="flex justify-center lg:justify-end">
              <FeatureCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Built for life's biggest transitions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From small habits to major life changes, Striveframe helps you stay
              on track with AI-powered guidance.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Sparkles}
              title="AI-Designed Journeys"
              description="Tell us your goal, and our AI creates a personalized journey with phases, milestones, and daily tasks tailored to you."
              delay={0.1}
            />
            <FeatureCard
              icon={Flame}
              title="Daily Tracker & Streaks"
              description="Stay motivated with daily check-ins, progress tracking, and streak rewards that celebrate your consistency."
              delay={0.2}
            />
            <FeatureCard
              icon={ArrowRightLeft}
              title="Life Transitions"
              description="Purpose-built for major changes: quitting habits, switching careers, moving cities, or transforming your health."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Striveframe. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
