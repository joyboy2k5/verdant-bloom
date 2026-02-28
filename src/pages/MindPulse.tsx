import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BookOpen, Moon, Activity, Timer, Play, Pause, RotateCcw } from "lucide-react";

const MindPulse = () => {
  const [examLoad, setExamLoad] = useState(3);
  const [sleepHours, setSleepHours] = useState(7);
  const [wellnessScore, setWellnessScore] = useState(72);

  // Study timer
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Recalc wellness based on inputs
    const sleepFactor = Math.min(sleepHours / 8, 1) * 50;
    const loadFactor = Math.max(0, (6 - examLoad) / 6) * 50;
    setWellnessScore(Math.round(sleepFactor + loadFactor));
  }, [examLoad, sleepHours]);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds((s) => {
          if (s === 0) {
            setTimerMinutes((m) => {
              if (m === 0) {
                setTimerRunning(false);
                return 0;
              }
              return m - 1;
            });
            return 59;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerRunning]);

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  const scoreColor = wellnessScore >= 70 ? "text-forest" : wellnessScore >= 40 ? "text-gold-wash" : "text-bloom";
  const needleRotation = (wellnessScore / 100) * 180 - 90;

  return (
    <div className="space-y-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="ink-heading text-3xl md:text-4xl mb-1">Mind-Pulse</h1>
        <p className="font-sans text-sm text-muted-foreground">Academic wellness · Personal balance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logging Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="paper-card space-y-6"
        >
          <h2 className="ink-label">Daily Check-In</h2>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 botanical-icon" strokeWidth={1.5} />
              <label className="font-sans text-sm text-ink">Exam/Assignment Load</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0} max={6} value={examLoad}
                onChange={(e) => setExamLoad(Number(e.target.value))}
                className="flex-1 accent-forest h-2 rounded-full appearance-none bg-mint cursor-pointer"
              />
              <span className="font-display text-xl font-bold text-ink w-8 text-right">{examLoad}</span>
            </div>
            <p className="font-sans text-xs text-muted-foreground">Active exams/assignments this week</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 botanical-icon" strokeWidth={1.5} />
              <label className="font-sans text-sm text-ink">Sleep Hours</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0} max={12} step={0.5} value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="flex-1 accent-forest h-2 rounded-full appearance-none bg-mint cursor-pointer"
              />
              <span className="font-display text-xl font-bold text-ink w-8 text-right">{sleepHours}</span>
            </div>
            <p className="font-sans text-xs text-muted-foreground">Hours of sleep last night</p>
          </div>
        </motion.div>

        {/* Wellness Score Compass */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="paper-card flex flex-col items-center justify-center"
        >
          <h2 className="ink-label mb-4">Wellness Score</h2>

          <div className="compass-gauge w-48 h-48 rounded-full flex items-center justify-center relative">
            {/* Gauge arc */}
            <svg viewBox="0 0 200 200" className="w-full h-full absolute">
              <path
                d="M 30 150 A 80 80 0 0 1 170 150"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 30 150 A 80 80 0 0 1 170 150"
                fill="none"
                stroke="hsl(var(--forest))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${(wellnessScore / 100) * 220} 220`}
                className="transition-all duration-1000"
              />
            </svg>

            {/* Needle */}
            <motion.div
              className="absolute w-1 h-16 bg-ink rounded-full origin-bottom"
              style={{ bottom: "50%", left: "calc(50% - 2px)" }}
              animate={{ rotate: needleRotation }}
              transition={{ duration: 1, type: "spring", stiffness: 40 }}
            />

            {/* Center dot */}
            <div className="absolute w-4 h-4 rounded-full bg-forest shadow-botanical" />

            {/* Score text */}
            <div className="absolute bottom-6 text-center">
              <span className={`font-display text-3xl font-bold ${scoreColor}`}>{wellnessScore}</span>
              <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">/ 100</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-4">
            <Activity className="w-4 h-4 botanical-icon" strokeWidth={1.5} />
            <span className="font-sans text-xs text-muted-foreground">
              {wellnessScore >= 70 ? "Thriving" : wellnessScore >= 40 ? "Needs Attention" : "Critical"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Study Focus Timer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="ink-label mb-4">Study Focus Timer</h2>
        <div className="paper-card bg-forest-deep/5">
          <div className="flex flex-col items-center py-6">
            <Timer className="w-8 h-8 botanical-icon mb-4 animate-pulse-soft" strokeWidth={1.2} />

            <div className="font-display text-6xl font-bold text-ink tracking-wider mb-6">
              {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTimerRunning(!timerRunning)}
                className="px-6 py-2.5 rounded-lg bg-forest text-primary-foreground font-sans text-sm font-semibold flex items-center gap-2 shadow-botanical hover:bg-forest-deep transition-colors"
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {timerRunning ? "Pause" : "Start"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="px-4 py-2.5 rounded-lg border border-border bg-parchment font-sans text-sm text-ink flex items-center gap-2 hover:bg-mint-soft transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>
            </div>

            <p className="font-sans text-xs text-muted-foreground mt-4">Pomodoro technique — 25 min focus blocks</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MindPulse;
