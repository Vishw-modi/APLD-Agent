"use client";

import { AnalysisType } from "@/types";
import {
  BarChart3,
  GitBranch,
  ArrowLeftRight,
  CheckCircle,
  Timer,
  Network,
  Route,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  GitBranch,
  ArrowLeftRight,
  CheckCircle,
  Timer,
  Network,
  Route,
  Users,
};

interface Props {
  analysis: AnalysisType;
  onClick: () => void;
  index: number;
}

export default function AnalysisCard({ analysis, onClick, index }: Props) {
  const Icon = iconMap[analysis.icon] || BarChart3;
  const isHighlighted = analysis.isHighlighted;

  return (
    <button
      onClick={onClick}
      id={`analysis-card-${analysis.id}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className={`
        group relative flex flex-col items-start gap-3 rounded-2xl p-6 text-left
        transition-all duration-300 ease-out animate-slide-up
        hover:-translate-y-1.5 hover:shadow-floating active:scale-[0.98]
        ${
          isHighlighted
            ? "bg-gradient-to-br from-accent to-accent-dark text-white shadow-elevated shadow-accent/20 col-span-full sm:col-span-2 lg:col-span-full"
            : "bg-white border border-border hover:border-primary/40 shadow-sm hover:shadow-elevated"
        }
      `}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
          isHighlighted
            ? "bg-white/20 shadow-inner"
            : "bg-primary/8 group-hover:bg-primary/15 text-primary"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            isHighlighted ? "text-white" : "text-primary"
          }`}
        />
      </div>

      <div>
        <h3
          className={`text-base font-semibold ${
            isHighlighted ? "text-white" : "text-text-primary"
          }`}
        >
          {analysis.name}
        </h3>
        <p
          className={`mt-1 text-sm leading-relaxed ${
            isHighlighted ? "text-white/80" : "text-text-secondary"
          }`}
        >
          {analysis.description}
        </p>
      </div>

      <div
        className={`absolute right-4 top-4 text-xs font-medium px-2 py-0.5 rounded-full ${
          isHighlighted
            ? "bg-white/20 text-white"
            : "bg-primary/8 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        }`}
      >
        {isHighlighted ? "AI-Powered" : "Select →"}
      </div>
    </button>
  );
}
