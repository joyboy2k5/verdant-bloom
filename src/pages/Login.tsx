import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Leaf, Mail, Lock, ArrowRight } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login Successful", {
      description: "Welcome to BioSync — your sustainability dashboard.",
    });
    setTimeout(() => navigate("/dashboard/agri-pulse"), 600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background painting */}
      <img
        src={loginBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-forest-deep/40 backdrop-blur-[2px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="paper-card p-8 md:p-10 backdrop-blur-sm bg-parchment/85">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center shadow-botanical">
              <Leaf className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-ink tracking-wide">
                BioSync
              </h1>
              <p className="font-sans text-xs text-ink-light tracking-widest uppercase">
                Sustainability · Wellness
              </p>
            </div>
          </div>

          <p className="text-center font-body text-sm text-muted-foreground mb-8">
            Sign in to your botanical dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="ink-label flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 botanical-icon" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-mint-soft/60 border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="ink-label flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 botanical-icon" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-mint-soft/60 border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 rounded-lg bg-forest text-primary-foreground font-sans font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-botanical hover:bg-forest-deep transition-colors"
            >
              Enter the Garden
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground font-sans">
            Demo mode — any credentials will work
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
