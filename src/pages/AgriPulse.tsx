import { motion } from "framer-motion";
import { Droplets, Thermometer, FlaskConical, CloudSun, CloudRain, Sun, Wind, AlertTriangle, Leaf, Bug } from "lucide-react";

// Simulated sensor data
const sensors = [
  { label: "Soil Moisture", value: 68, unit: "%", icon: Droplets, fill: 68, color: "from-accent to-sky-wash" },
  { label: "Temperature", value: 28, unit: "°C", icon: Thermometer, fill: 56, color: "from-gold-wash to-earth-light" },
  { label: "Nitrogen (N)", value: 42, unit: "mg/kg", icon: FlaskConical, fill: 42, color: "from-forest to-mint" },
  { label: "Phosphorus (P)", value: 35, unit: "mg/kg", icon: FlaskConical, fill: 35, color: "from-bloom to-earth-light" },
  { label: "Potassium (K)", value: 55, unit: "mg/kg", icon: FlaskConical, fill: 55, color: "from-forest to-accent" },
];

const weather = [
  { day: "Today", icon: Sun, temp: "32°", desc: "Clear Skies" },
  { day: "Tomorrow", icon: CloudSun, temp: "29°", desc: "Partly Cloudy" },
  { day: "Wed", icon: CloudRain, temp: "24°", desc: "Light Rain" },
  { day: "Thu", icon: Wind, temp: "27°", desc: "Breezy" },
];

const alerts = [
  {
    title: "Fertilizer Recommendation",
    desc: "Apply 45kg/ha Urea for nitrogen boost. Soil N levels are below optimal threshold.",
    icon: Leaf,
    severity: "warning" as const,
  },
  {
    title: "Pesticide Advisory",
    desc: "Organic neem spray recommended. Early signs of aphid activity detected in Zone B.",
    icon: Bug,
    severity: "alert" as const,
  },
];

const AgriPulse = () => {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="ink-heading text-3xl md:text-4xl mb-1">Agri-Pulse</h1>
        <p className="font-sans text-sm text-muted-foreground">Smart farming insights · Real-time monitoring</p>
      </motion.div>

      {/* Sensor Cards */}
      <section>
        <h2 className="ink-label mb-4">Live Sensors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sensors.map((sensor, i) => (
            <motion.div
              key={sensor.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="paper-card flex flex-col items-center text-center"
            >
              <sensor.icon className="w-6 h-6 botanical-icon mb-3" strokeWidth={1.5} />
              <span className="ink-label mb-2">{sensor.label}</span>

              {/* Watercolor tank */}
              <div className="relative w-16 h-24 rounded-lg border border-border overflow-hidden bg-mint-soft/30 my-2">
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${sensor.color} rounded-b-md opacity-60`}
                  initial={{ height: "0%" }}
                  animate={{ height: `${sensor.fill}%` }}
                  transition={{ duration: 1.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-ink">{sensor.value}</span>
                </div>
              </div>

              <span className="font-sans text-xs text-muted-foreground">{sensor.unit}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Weather Widget */}
      <section>
        <h2 className="ink-label mb-4">Weather Forecast</h2>
        <div className="paper-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weather.map((w, i) => (
              <motion.div
                key={w.day}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex flex-col items-center p-4 rounded-lg bg-mint-soft/30 text-center"
              >
                <span className="ink-label mb-2">{w.day}</span>
                <w.icon className="w-8 h-8 botanical-icon mb-2 animate-float" strokeWidth={1.2} style={{ animationDelay: `${i * 0.5}s` }} />
                <span className="font-display text-2xl font-bold text-ink">{w.temp}</span>
                <span className="font-sans text-xs text-muted-foreground mt-1">{w.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Farm Coach */}
      <section>
        <h2 className="ink-label mb-4">AI Farm Coach</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.title}
              initial={{ opacity: 0, x: i === 0 ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className={`paper-card border-l-4 ${
                alert.severity === "warning" ? "border-l-gold-wash" : "border-l-bloom"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  alert.severity === "warning" ? "bg-gold-wash/20" : "bg-bloom/20"
                }`}>
                  <alert.icon className="w-5 h-5 botanical-icon" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-1">{alert.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{alert.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AgriPulse;
