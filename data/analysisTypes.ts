import { AnalysisType } from "@/types";

export const analysisTypes: AnalysisType[] = [
  {
    id: "cohort-builder",
    name: "Exploratory Bot (Cohort Builder)",
    description:
      "Build custom patient cohorts using AI-guided criteria selection. Define inclusion/exclusion criteria, demographics, and clinical parameters interactively.",
    icon: "Users",
    isHighlighted: true,
  },
  {
    id: "market-sizing",
    name: "Market Sizing",
    description:
      "Estimate patient population sizes across therapeutic areas, lines of therapy, and geographic regions using claims data.",
    icon: "BarChart3",
  },
  {
    id: "lot",
    name: "Line of Therapy (LoT)",
    description:
      "Identify and analyze treatment sequences and line assignments across patient journeys in oncology and specialty markets.",
    icon: "GitBranch",
  },
  {
    id: "switch-analysis",
    name: "Switch Analysis",
    description:
      "Analyze brand-to-brand and therapy switching patterns, identify triggers, and quantify switch rates across treatment lines.",
    icon: "ArrowLeftRight",
  },
  {
    id: "adherence",
    name: "Adherence",
    description:
      "Measure medication adherence using PDC, MPR, and gap analysis metrics to understand patient compliance patterns.",
    icon: "CheckCircle",
  },
  {
    id: "persistence",
    name: "Persistence",
    description:
      "Evaluate treatment persistence and time-to-discontinuation using Kaplan-Meier and survival analysis methods.",
    icon: "Timer",
  },
  {
    id: "treatment-patterns",
    name: "Treatment Patterns",
    description:
      "Map real-world treatment sequences, combination therapies, and regimen patterns across patient populations.",
    icon: "Network",
  },
  {
    id: "patient-journey",
    name: "Patient Journey",
    description:
      "Visualize end-to-end patient pathways from diagnosis through treatment, including time between key milestones.",
    icon: "Route",
  },
];
