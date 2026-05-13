"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  "Validating business rules",
  "Connecting to dataset",
  "Running analysis pipeline",
  "Generating insights & visualizations",
];

interface Props {
  onComplete: () => void;
}

export default function PipelineProgress({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 2000;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const target = ((currentStep + 1) / steps.length) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [currentStep]);

  return (
    <div className="relative w-full h-[800px] overflow-hidden rounded-3xl border border-border bg-surface/30">
      
      {/* Background Dashboard Skeleton */}
      <div className="absolute inset-0 p-8 grid grid-cols-3 gap-6 opacity-40 blur-[2px] pointer-events-none">
        {/* Top Summary Cards */}
        <div className="col-span-3 flex gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 flex-1 bg-white rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-3 relative overflow-hidden">
              <div className="h-4 w-1/3 bg-surface rounded animate-pulse" />
              <div className="h-8 w-1/2 bg-surface rounded animate-pulse" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          ))}
        </div>
        
        {/* Main Chart Skeleton */}
        <div className="col-span-2 h-96 bg-white rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden flex flex-col gap-4">
          <div className="h-5 w-1/4 bg-surface rounded animate-pulse" />
          <div className="flex-1 bg-surface/50 rounded-xl animate-pulse" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Side Donut Skeleton */}
        <div className="col-span-1 h-96 bg-white rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden flex flex-col gap-4 items-center justify-center">
          <div className="h-48 w-48 rounded-full border-8 border-surface animate-pulse" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      </div>

      {/* Foreground Progress Modal */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-3xl shadow-floating border border-border p-8"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-16 w-16 bg-gradient-to-tr from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-elevated rotate-3">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-text-primary text-center mb-2 tracking-tight">
            Synthesizing Insights
          </h3>
          <p className="text-sm text-text-secondary text-center mb-8">
            Our AI is processing the dataset and generating visualizations.
          </p>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-surface rounded-full mb-8 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary-light to-accent rounded-full relative"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            >
              {/* Shine effect on progress bar */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1s_infinite]" />
            </motion.div>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((step, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{ 
                    opacity: isPast || isCurrent ? 1 : 0.4,
                    x: isCurrent ? 5 : 0 
                  }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    {isPast ? (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ type: "spring" }}
                      >
                        <CheckCircle className="h-6 w-6 text-success drop-shadow-sm" />
                      </motion.div>
                    ) : isCurrent ? (
                      <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-border" />
                    )}
                  </div>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isPast
                        ? "text-text-secondary"
                        : isCurrent
                        ? "text-primary font-semibold"
                        : "text-text-muted"
                    }`}
                  >
                    {step}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
