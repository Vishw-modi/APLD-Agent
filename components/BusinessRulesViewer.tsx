"use client";

import { FileText } from "lucide-react";
import { generalBusinessRulesText } from "@/data/generalBusinessRules";

export default function BusinessRulesViewer() {
  return (
    <div className="rounded-xl border border-border bg-white shadow-sm animate-slide-up flex flex-col shrink-0">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-surface/50">
        <FileText className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-text-primary">
          Initial Business Context
        </span>
      </div>
      <div className="p-4 bg-surface/30">
        <pre className="whitespace-pre-wrap text-xs leading-relaxed text-text-secondary font-mono bg-surface rounded-lg p-3 max-h-[180px] overflow-y-auto border border-border-light">
          {generalBusinessRulesText}
        </pre>
      </div>
    </div>
  );
}
