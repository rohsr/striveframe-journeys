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

      {/* Download App Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Take Striveframe with you
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Download our mobile app to track your journeys, get reminders, and stay on top of your goals anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <p className="text-xs opacity-80">Download on the</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <p className="text-xs opacity-80">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
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
