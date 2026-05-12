"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold text-text-primary text-center mb-2">
          Running Analysis Pipeline
        </h3>
        <p className="text-sm text-text-secondary text-center mb-8">
          Please wait while we process your analysis...
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-border rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-all duration-500 ${
                idx <= currentStep ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                {idx < currentStep ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : idx === currentStep ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <div className="h-3 w-3 rounded-full bg-border" />
                )}
              </div>
              <span
                className={`text-sm ${
                  idx <= currentStep
                    ? "text-text-primary font-medium"
                    : "text-text-muted"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
