import { AnalysisResult } from "@/types";

const COLORS = {
  teal1: "#0F6D8E",
  teal2: "#1A8AAF",
  teal3: "#25A7D0",
  amber1: "#E8913A",
  amber2: "#F0A856",
  green1: "#2D8A56",
  green2: "#3DA86A",
  slate1: "#4A5568",
  slate2: "#718096",
};

export const dummyResultsByType: Record<string, AnalysisResult> = {
  "switch-analysis": {
    summary:
      "Analysis of therapy switching patterns in the Psoriasis (PsO) market reveals significant movement from Line 2 to Line 3 therapies. Among 24,350 eligible patients, 38.2% experienced at least one switch event during the study period. IL-17 inhibitors were the most common switch-to therapy class, while TNF-alpha inhibitors had the highest switch-away rate.",
    insights: [
      "38.2% of L2 patients switched to L3 therapy within 12 months",
      "Median time-to-switch: 7.3 months from L2 initiation",
      "IL-17 inhibitors captured 42% of switch-to share in L3",
      "TNF-alpha inhibitors had 56% switch-away rate from L2",
      "Top 3 switch triggers: lack of efficacy (61%), adverse events (22%), insurance changes (11%)",
      "Patients who switched showed 34% higher healthcare utilization in the 6 months pre-switch",
    ],
    barChartData: [
      { name: "TNF-α → IL-17", value: 4200, fill: COLORS.teal1 },
      { name: "TNF-α → IL-23", value: 3100, fill: COLORS.teal2 },
      { name: "IL-17 → IL-23", value: 2800, fill: COLORS.teal3 },
      { name: "IL-17 → JAK", value: 1900, fill: COLORS.amber1 },
      { name: "IL-23 → IL-17", value: 1200, fill: COLORS.amber2 },
      { name: "Other", value: 2100, fill: COLORS.slate2 },
    ],
    barChartTitle: "Top Switch Pathways (Patient Count)",
    pieChartData: [
      { name: "Lack of Efficacy", value: 61, fill: COLORS.teal1 },
      { name: "Adverse Events", value: 22, fill: COLORS.amber1 },
      { name: "Insurance", value: 11, fill: COLORS.teal3 },
      { name: "Patient Pref.", value: 6, fill: COLORS.slate2 },
    ],
    pieChartTitle: "Switch Triggers Distribution (%)",
    lineChartData: [
      { name: "Month 1", value: 2, value2: 5 },
      { name: "Month 3", value: 8, value2: 14 },
      { name: "Month 6", value: 18, value2: 28 },
      { name: "Month 9", value: 29, value2: 36 },
      { name: "Month 12", value: 38, value2: 42 },
      { name: "Month 18", value: 48, value2: 51 },
    ],
    lineChartTitle: "Cumulative Switch Rate Over Time (%)",
    tableColumns: [
      { key: "pathway", label: "Switch Pathway" },
      { key: "n", label: "N" },
      { key: "pct", label: "% of Switches" },
      { key: "medianTime", label: "Median Time (months)" },
      { key: "reason", label: "Top Reason" },
    ],
    tableRows: [
      { pathway: "TNF-α → IL-17i", n: 4200, pct: "27.4%", medianTime: 6.8, reason: "Efficacy" },
      { pathway: "TNF-α → IL-23i", n: 3100, pct: "20.2%", medianTime: 8.1, reason: "Efficacy" },
      { pathway: "IL-17i → IL-23i", n: 2800, pct: "18.3%", medianTime: 7.5, reason: "AE" },
      { pathway: "IL-17i → JAKi", n: 1900, pct: "12.4%", medianTime: 5.2, reason: "Efficacy" },
      { pathway: "IL-23i → IL-17i", n: 1200, pct: "7.8%", medianTime: 9.3, reason: "Insurance" },
      { pathway: "Other pathways", n: 2100, pct: "13.7%", medianTime: 7.1, reason: "Various" },
    ],
    tableTitle: "Detailed Switch Pathway Analysis",
    downloadLink: "#download-switch-analysis-results",
    sankeyChartData: {
      nodes: [
        { name: "STALIXIMA" }, // 0
        { name: "DERMIZENITH AUTOINJECTOR" }, // 1
        { name: "INFLIXIMAB" }, // 2
        { name: "LYNTIX" }, // 3
        { name: "DERMIZENITH SYRINGE (2 PACK)" }, // 4
        { name: "DERMIGENT PEN" }, // 5
        { name: "PSORIAIFEN(CF)" }, // 6
        { name: "PSORIFIXA" }, // 7
        { name: "PSORIAIFEN" }, // 8
        { name: "XERODERMIX" } // 9
      ],
      links: [
        { source: 0, target: 4, value: 4200 },
        { source: 0, target: 5, value: 3100 },
        { source: 0, target: 6, value: 1500 },
        { source: 0, target: 8, value: 800 },
        
        { source: 1, target: 4, value: 2800 },
        { source: 1, target: 7, value: 1900 },
        { source: 1, target: 9, value: 1200 },
        
        { source: 2, target: 5, value: 2100 },
        { source: 2, target: 8, value: 1600 },
        { source: 2, target: 9, value: 900 },
        
        { source: 3, target: 4, value: 1000 },
        { source: 3, target: 6, value: 1100 },
        { source: 3, target: 7, value: 800 }
      ]
    },
    generatedTables: [
      {
        name: "Final Analysis Dataset",
        description: "Complete patient-level dataset with calculated switch pathways and triggers.",
        link: "#download-final-dataset",
      },
      {
        name: "Cohort Attrition Table",
        description: "Intermediate table showing patient counts at each inclusion/exclusion step.",
        link: "#download-attrition",
      },
      {
        name: "Monthly Switch Events",
        description: "Aggregated time-series data of switch events by month.",
        link: "#download-monthly-events",
      },
    ],
  },

  "market-sizing": {
    summary:
      "Market sizing analysis for the Psoriasis therapeutic area identifies approximately 8.2 million diagnosed patients in the US, with 3.1 million receiving active treatment. The biologic-treated segment comprises 1.2 million patients, showing 12% year-over-year growth driven by IL-23 inhibitor adoption.",
    insights: [
      "8.2M diagnosed PsO patients in the US (prevalence: 3.1%)",
      "3.1M patients receiving active systemic treatment",
      "1.2M patients on biologic therapies (38.7% of treated)",
      "IL-23 inhibitor segment growing at 12% YoY",
      "Moderate-to-severe segment: 2.4M patients",
      "Average annual treatment cost: $42,300 for biologics",
    ],
    barChartData: [
      { name: "Topicals", value: 1900, fill: COLORS.slate2 },
      { name: "Oral Systemics", value: 800, fill: COLORS.teal3 },
      { name: "TNF-α", value: 420, fill: COLORS.teal1 },
      { name: "IL-17i", value: 380, fill: COLORS.teal2 },
      { name: "IL-23i", value: 310, fill: COLORS.amber1 },
      { name: "JAKi", value: 90, fill: COLORS.amber2 },
    ],
    barChartTitle: "Treated Patients by Therapy Class (thousands)",
    pieChartData: [
      { name: "Mild", value: 58, fill: COLORS.slate2 },
      { name: "Moderate", value: 29, fill: COLORS.teal2 },
      { name: "Severe", value: 13, fill: COLORS.teal1 },
    ],
    pieChartTitle: "Patient Distribution by Severity",
    lineChartData: [
      { name: "2020", value: 2800, value2: 950 },
      { name: "2021", value: 2900, value2: 1020 },
      { name: "2022", value: 3000, value2: 1100 },
      { name: "2023", value: 3050, value2: 1150 },
      { name: "2024", value: 3100, value2: 1200 },
    ],
    lineChartTitle: "Treatment Trends Over Time (thousands)",
    tableColumns: [
      { key: "segment", label: "Market Segment" },
      { key: "patients", label: "Patient Count" },
      { key: "share", label: "Market Share" },
      { key: "growth", label: "YoY Growth" },
    ],
    tableRows: [
      { segment: "Total Diagnosed", patients: "8,200,000", share: "100%", growth: "2.1%" },
      { segment: "Active Treatment", patients: "3,100,000", share: "37.8%", growth: "4.5%" },
      { segment: "Biologic-Treated", patients: "1,200,000", share: "14.6%", growth: "8.2%" },
      { segment: "IL-23i Segment", patients: "310,000", share: "3.8%", growth: "12.0%" },
    ],
    tableTitle: "Market Sizing Summary",
    downloadLink: "#download-market-sizing-results",
    generatedTables: [
      {
        name: "Total Projected Market",
        description: "Patient counts extrapolated across all regions with demographics.",
        link: "#download-projected-market",
      },
      {
        name: "Diagnosis Codes Frequencies",
        description: "Raw frequency counts of all ICD-10 codes used for inclusion.",
        link: "#download-icd10-frequencies",
      },
    ],
  },

  "patient-cohort": {
    summary:
      "Patient cohort generation complete. Starting with 8.2M diagnosed patients, the final eligible cohort comprises 24,350 patients who met all inclusion and exclusion criteria, including continuous enrollment and specific treatment requirements.",
    insights: [
      "Initial pool: 8.2M patients",
      "After applying 12-month continuous enrollment: 1.4M patients",
      "After requiring IL-17 or IL-23 treatment: 312K patients",
      "Final cohort after applying all specific exclusion criteria: 24,350 patients",
    ],
    barChartData: [],
    barChartTitle: "",
    pieChartData: [],
    pieChartTitle: "",
    lineChartData: [],
    lineChartTitle: "",
    funnelChartData: [
      { name: "Diagnosed PsO", value: 5, realValue: 8200000, fill: "#004B87" },
      { name: "12mo Continuous Enrollment", value: 4, realValue: 1400000, fill: "#1E73E8" },
      { name: "Biologic Treated", value: 3, realValue: 1200000, fill: "#749EEA" },
      { name: "Specific Drug Class", value: 2, realValue: 312000, fill: "#60A5FA" },
      { name: "Final Cohort", value: 1, realValue: 24350, fill: "#2563EB", stroke: "#22C55E", strokeWidth: 4 }
    ],
    tableColumns: [
      { key: "step", label: "Attrition Step" },
      { key: "remaining", label: "Patients Remaining" },
      { key: "dropped", label: "Patients Dropped" },
    ],
    tableRows: [
      { step: "Diagnosed PsO", remaining: "8,200,000", dropped: "—" },
      { step: "12mo Continuous Enrollment", remaining: "1,400,000", dropped: "6,800,000" },
      { step: "Biologic Treated", remaining: "1,200,000", dropped: "200,000" },
      { step: "Specific Drug Class", remaining: "312,000", dropped: "888,000" },
      { step: "Final Cohort", remaining: "24,350", dropped: "287,650" },
    ],
    tableTitle: "Cohort Attrition Summary",
    downloadLink: "#download-cohort-results"
  },
};

// Fallback for analysis types without specific dummy data
export const defaultDummyResult: AnalysisResult = {
  summary:
    "Analysis completed successfully. The pipeline processed 45,200 patient records matching the specified criteria. Key findings indicate significant treatment pattern variations across demographic segments, with actionable insights for strategic planning.",
  insights: [
    "45,200 patients met all inclusion/exclusion criteria",
    "82% data completeness across the selected cohort",
    "3 key patient segments identified with distinct patterns",
    "Statistically significant differences found (p < 0.001)",
    "Regional variation observed across 4 major US census regions",
    "Results align with published real-world evidence benchmarks",
  ],
  barChartData: [
    { name: "Segment A", value: 12500, fill: COLORS.teal1 },
    { name: "Segment B", value: 9800, fill: COLORS.teal2 },
    { name: "Segment C", value: 8400, fill: COLORS.teal3 },
    { name: "Segment D", value: 7200, fill: COLORS.amber1 },
    { name: "Segment E", value: 4300, fill: COLORS.amber2 },
    { name: "Other", value: 3000, fill: COLORS.slate2 },
  ],
  barChartTitle: "Patient Distribution by Segment",
  pieChartData: [
    { name: "Category 1", value: 40, fill: COLORS.teal1 },
    { name: "Category 2", value: 30, fill: COLORS.amber1 },
    { name: "Category 3", value: 20, fill: COLORS.teal3 },
    { name: "Category 4", value: 10, fill: COLORS.slate2 },
  ],
  pieChartTitle: "Distribution by Category",
  lineChartData: [
    { name: "Q1 2022", value: 15, value2: 20 },
    { name: "Q2 2022", value: 22, value2: 28 },
    { name: "Q3 2022", value: 30, value2: 35 },
    { name: "Q4 2022", value: 38, value2: 41 },
    { name: "Q1 2023", value: 42, value2: 48 },
    { name: "Q2 2023", value: 48, value2: 52 },
  ],
  lineChartTitle: "Trend Over Time",
  tableColumns: [
    { key: "metric", label: "Metric" },
    { key: "value", label: "Value" },
    { key: "ci", label: "95% CI" },
    { key: "pValue", label: "P-Value" },
  ],
  tableRows: [
    { metric: "Total Cohort Size", value: "45,200", ci: "—", pValue: "—" },
    { metric: "Primary Outcome Rate", value: "34.2%", ci: "33.1–35.3%", pValue: "<0.001" },
    { metric: "Secondary Outcome Rate", value: "21.8%", ci: "20.9–22.7%", pValue: "<0.001" },
    { metric: "Median Follow-up", value: "14.3 months", ci: "13.8–14.8", pValue: "—" },
  ],
  tableTitle: "Key Analysis Metrics",
  downloadLink: "#download-analysis-results",
  generatedTables: [
    {
      name: "Master Cohort Dataset",
      description: "The final merged patient-level dataset used for the analysis.",
      link: "#download-master-cohort",
    },
    {
      name: "Summary Statistics",
      description: "Aggregated statistical measures across all key variables.",
      link: "#download-summary-stats",
    },
  ],
};
