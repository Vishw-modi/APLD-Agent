"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { analysisTypes } from "@/data/analysisTypes";
import { Dataset } from "@/types";
import AnalysisCard from "@/components/AnalysisCard";
import DatasetModal from "@/components/DatasetModal";
import { Sparkles, Loader2 } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const selectedAnalysisType = analysisTypes.find(
    (a) => a.id === selectedAnalysis
  );

  const handleCardClick = (id: string) => {
    setSelectedAnalysis(id);
    if (id === "market-sizing") {
      setIsNavigating(true);
      router.push(`/analysis/${id}?dataset=none&datasetName=None`);
    } else {
      setModalOpen(true);
    }
  };

  const handleDatasetSelect = (selectedDatasets: Dataset[]) => {
    setModalOpen(false);
    setIsNavigating(true);
    const ids = selectedDatasets.map((d) => d.id).join(",");
    const names = selectedDatasets.map((d) => d.name).join(", ");
    router.push(
      `/analysis/${selectedAnalysis}?dataset=${ids}&datasetName=${encodeURIComponent(names)}`
    );
  };

  // Separate highlighted from regular cards
  const highlighted = analysisTypes.filter((a) => a.isHighlighted);
  const regular = analysisTypes.filter((a) => !a.isHighlighted);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-1.5 text-xs font-medium text-primary mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered APLD Analytics
        </div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Analytics Pipeline
        </h1>
        <p className="mt-2 text-base text-text-secondary max-w-xl mx-auto">
          Select an analysis type to begin your AI-assisted APLD study.
          Configure business rules, refine with our chatbot, and get
          actionable insights.
        </p>
      </div>

      {/* Highlighted Card (Exploratory Bot / Cohort Builder) */}
      {highlighted.map((analysis, idx) => (
        <div key={analysis.id} className="mb-6">
          <AnalysisCard
            analysis={analysis}
            onClick={() => handleCardClick(analysis.id)}
            index={idx}
          />
        </div>
      ))}

      {/* Regular Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {regular.map((analysis, idx) => (
          <AnalysisCard
            key={analysis.id}
            analysis={analysis}
            onClick={() => handleCardClick(analysis.id)}
            index={idx + highlighted.length}
          />
        ))}
      </div>

      {/* Dataset Selection Modal */}
      <DatasetModal
        isOpen={modalOpen}
        analysisName={selectedAnalysisType?.name || ""}
        onSelect={handleDatasetSelect}
        onClose={() => setModalOpen(false)}
      />

      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-floating border border-border">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-16 w-16 bg-gradient-to-tr from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-elevated">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-text-primary tracking-tight">
                Initializing Workspace
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Loading AI assistant and datasets...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
