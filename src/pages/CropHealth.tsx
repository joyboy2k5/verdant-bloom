import { useState } from "react";
import { Upload, Leaf, AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const CropHealth = () => {
  const [uploaded, setUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setUploaded(true);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="ink-heading text-3xl mb-1">Crop Health Scanner</h1>
        <p className="text-ink-light font-sans-body text-sm">Upload a leaf image for AI-powered disease diagnostics.</p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => setUploaded(true)}
          className={`paper-card cursor-pointer flex flex-col items-center justify-center py-16 gap-4 transition-all duration-300 border-2 border-dashed ${
            dragOver ? "border-primary bg-mint-soft/60 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-mint-soft/30"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center">
            <Upload className="w-7 h-7 botanical-icon" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="font-display text-lg text-ink font-semibold">Upload Leaf Image</p>
            <p className="text-ink-light font-sans-body text-xs mt-1">Drag & drop or click to browse · JPG, PNG up to 10 MB</p>
          </div>
          {uploaded && (
            <Badge variant="secondary" className="mt-2 gap-1.5 font-sans-body">
              <CheckCircle className="w-3.5 h-3.5" /> Image uploaded
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Diagnostic Results */}
      {uploaded && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="paper-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="ink-heading text-xl flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 botanical-icon" strokeWidth={1.5} />
                Diagnostic Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="ink-label">Status</span>
                <Badge className="gap-1.5 bg-gold-wash/20 text-earth border-gold-wash/40 font-sans-body text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-gold-wash" />
                  Early Blight Detected
                </Badge>
              </div>

              {/* Confidence */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="ink-label">Confidence</span>
                  <span className="font-sans-body text-sm font-semibold text-ink">94%</span>
                </div>
                <Progress value={94} className="h-2.5 bg-mint" />
              </div>

              {/* Recommendation */}
              <div className="rounded-lg bg-mint-soft/60 border border-border/50 p-4 flex items-start gap-3">
                <Leaf className="w-5 h-5 botanical-icon mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="ink-label mb-1">Recommended Action</p>
                  <p className="font-body text-sm text-ink">Apply <strong>Copper Fungicide</strong> — spray evenly on affected foliage during early morning hours for optimal absorption.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default CropHealth;
