import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthCard } from "@/components/AuthCard";
import { Logo } from "@/components/Logo";

const Login = () => {
  return (
    <AuthCard>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo size="lg" showText={false} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Log in to Striveframe
        </h1>
        <p className="text-muted-foreground">Welcome back</p>
      </div>

      {/* Google Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-3 px-4 bg-foreground text-background rounded-lg font-medium flex items-center justify-center gap-3 mb-6 hover:bg-foreground/90 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </motion.button>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-4 text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="input-dark"
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input-dark"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <Link to="/home">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            className="btn-primary w-full mt-2"
          >
            Log in
          </motion.button>
        </Link>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Create one
        </Link>
      </p>
    </AuthCard>
  );
};

export default Login;
