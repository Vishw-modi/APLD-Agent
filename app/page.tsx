"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { analysisTypes } from "@/data/analysisTypes";
import { Dataset } from "@/types";
import AnalysisCard from "@/components/AnalysisCard";
import DatasetModal from "@/components/DatasetModal";
import { Sparkles } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedAnalysisType = analysisTypes.find(
    (a) => a.id === selectedAnalysis
  );

  const handleCardClick = (id: string) => {
    setSelectedAnalysis(id);
    setModalOpen(true);
  };

  const handleDatasetSelect = (dataset: Dataset) => {
    setModalOpen(false);
    router.push(
      `/analysis/${selectedAnalysis}?dataset=${dataset.id}&datasetName=${encodeURIComponent(dataset.name)}`
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
    </div>
  );
}
