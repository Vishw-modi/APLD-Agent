"use client";

import { BusinessRule } from "@/types";
import { X, AlertTriangle, Play } from "lucide-react";

interface Props {
  isOpen: boolean;
  rules: BusinessRule[];
  additionalInfo: string;
  analysisName: string;
  datasetName: string;
  onConfirm: () => void;
  onGoBack: () => void;
}

export default function ConfirmationModal({
  isOpen,
  rules,
  additionalInfo,
  analysisName,
  datasetName,
  onConfirm,
  onGoBack,
}: Props) {
  if (!isOpen) return null;

  const activeRules = rules.filter((r) => r.enabled);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-text-primary/60 backdrop-blur-md animate-fade-in"
        onClick={onGoBack}
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-floating animate-scale-in max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <AlertTriangle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Confirm & Run Analysis
              </h2>
              <p className="text-xs text-text-secondary">
                {analysisName} • {datasetName}
              </p>
            </div>
          </div>
          <button
            onClick={onGoBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Active Business Rules ({activeRules.length})
            </h3>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-surface">
                    <th className="px-3 py-2 text-left font-semibold text-text-primary">
                      Parameter
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-text-primary">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeRules.map((rule, idx) => (
                    <tr
                      key={rule.id}
                      className={
                        idx % 2 === 0 ? "bg-white" : "bg-surface/50"
                      }
                    >
                      <td className="px-3 py-2 font-medium text-text-primary">
                        {rule.parameter}
                      </td>
                      <td className="px-3 py-2 text-text-secondary">
                        {rule.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {additionalInfo && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                Additional Context
              </h3>
              <div className="rounded-lg bg-surface p-3 text-sm text-text-secondary">
                {additionalInfo}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4 shrink-0">
          <button
            onClick={onGoBack}
            className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-lg bg-success px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-success-light hover:shadow-md"
          >
            <Play className="h-4 w-4" />
            Run Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
