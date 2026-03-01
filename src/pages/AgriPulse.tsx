import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Thermometer, FlaskConical, CloudSun, CloudRain, Sun, Wind, Leaf, Bug, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Simulated sensor data (non-moisture)
const staticSensors = [
  { label: "Temperature", value: 28, unit: "°C", icon: Thermometer, fill: 56, color: "from-gold-wash to-earth-light", live: false },
  { label: "Nitrogen (N)", value: 42, unit: "mg/kg", icon: FlaskConical, fill: 42, color: "from-forest to-mint", live: false },
  { label: "Phosphorus (P)", value: 35, unit: "mg/kg", icon: FlaskConical, fill: 35, color: "from-bloom to-earth-light", live: false },
  { label: "Potassium (K)", value: 55, unit: "mg/kg", icon: FlaskConical, fill: 55, color: "from-forest to-accent", live: false },
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
  const [moisture, setMoisture] = useState<number | null>(null);

  useEffect(() => {
    // Fetch latest moisture value
    const fetchLatest = async () => {
      const { data } = await supabase
        .from("sensor_data")
        .select("moisture")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) setMoisture(Number(data.moisture));
    };
    fetchLatest();

    // Subscribe to realtime inserts
    const channel = supabase
      .channel("sensor_data_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sensor_data" },
        (payload) => {
          setMoisture(Number(payload.new.moisture));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const moistureFill = moisture !== null ? Math.min(100, (moisture / 4095) * 100) : 0;
  const needsWater = moisture !== null && moisture > 3000;

  const allSensors = [
    {
      label: "Soil Moisture",
      value: moisture !== null ? moisture : "—",
      unit: "raw",
      icon: Droplets,
      fill: moistureFill,
      color: "from-accent to-sky-wash",
      live: true,
    },
    ...staticSensors,
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="ink-heading text-3xl md:text-4xl mb-1">Agri-Pulse</h1>
        <p className="font-sans text-sm text-muted-foreground">Smart farming insights · Real-time monitoring</p>
      </motion.div>

      {/* Needs Water Alert */}
      {needsWater && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Alert className="paper-card border-l-4 border-l-bloom bg-bloom/10">
            <AlertTriangle className="h-5 w-5 text-bloom" />
            <AlertTitle className="font-display text-lg font-semibold text-ink">Needs Water!</AlertTitle>
            <AlertDescription className="font-body text-sm text-muted-foreground">
              Soil moisture is at <strong>{moisture}</strong> (above 3000 threshold). Irrigate immediately.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Sensor Cards */}
      <section>
        <h2 className="ink-label mb-4">Live Sensors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {allSensors.map((sensor, i) => (
            <motion.div
              key={sensor.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`paper-card flex flex-col items-center text-center ${sensor.live ? "ring-2 ring-accent/40" : ""}`}
            >
              <sensor.icon className="w-6 h-6 botanical-icon mb-3" strokeWidth={1.5} />
              <span className="ink-label mb-2">
                {sensor.label}
                {sensor.live && <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />}
              </span>

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
