"use client";

import { useState } from "react";
import { Dataset } from "@/types";
import { datasets } from "@/data/datasets";
import { X, Database, ChevronRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  analysisName: string;
  onSelect: (dataset: Dataset) => void;
  onClose: () => void;
}

export default function DatasetModal({
  isOpen,
  analysisName,
  onSelect,
  onClose,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleContinue = () => {
    const dataset = datasets.find((d) => d.id === selectedId);
    if (dataset) onSelect(dataset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Select Dataset
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Choose a data source for{" "}
              <span className="font-medium text-primary">{analysisName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface hover:text-text-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dataset List */}
        <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
          {datasets.map((dataset) => (
            <button
              key={dataset.id}
              id={`dataset-${dataset.id}`}
              onClick={() => setSelectedId(dataset.id)}
              className={`w-full flex items-start gap-3 rounded-xl p-4 text-left transition-all duration-200 ${
                selectedId === dataset.id
                  ? "bg-primary/8 border-2 border-primary shadow-sm"
                  : "bg-surface border-2 border-transparent hover:bg-primary/4 hover:border-border"
              }`}
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  selectedId === dataset.id
                    ? "bg-primary text-white"
                    : "bg-white text-primary border border-border"
                }`}
              >
                <Database className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary text-sm">
                  {dataset.name}
                </p>
                <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                  {dataset.description}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {dataset.recordCount}
                </p>
              </div>
              {selectedId === dataset.id && (
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedId}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-all hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
