import { BusinessRule } from "@/types";

export const generalBusinessRules: BusinessRule[] = [
  {
    id: "gen-1",
    parameter: "Data quality threshold",
    description: "Minimum data completeness score for patient inclusion",
    value: "≥ 80% field completeness",
    enabled: true,
  },
  {
    id: "gen-2",
    parameter: "Geographic scope",
    description: "Default geographic coverage for analysis",
    value: "United States (50 states + DC)",
    enabled: true,
  },
  {
    id: "gen-3",
    parameter: "Patient de-identification",
    description: "HIPAA Safe Harbor compliance requirement",
    value: "All outputs aggregated to ≥11 patients",
    enabled: true,
  },
  {
    id: "gen-4",
    parameter: "Age range (default)",
    description: "Standard patient age filter across analyses",
    value: "18–89 years (mask 90+)",
    enabled: true,
  },
  {
    id: "gen-5",
    parameter: "Payer mix",
    description: "Default insurance type inclusion",
    value: "Commercial, Medicare, Medicaid, all payers",
    enabled: true,
  },
  {
    id: "gen-6",
    parameter: "Claims data lag",
    description: "Minimum data maturity before reporting",
    value: "3-month claims run-out period",
    enabled: true,
  },
  {
    id: "gen-7",
    parameter: "Duplicate claim handling",
    description: "Method for resolving duplicate claims",
    value: "Keep latest adjudicated claim per service date",
    enabled: true,
  },
  {
    id: "gen-8",
    parameter: "Gender coding",
    description: "Standardized gender classification",
    value: "Male, Female, Unknown",
    enabled: true,
  },
  {
    id: "gen-9",
    parameter: "Projection methodology",
    description: "Method for projecting sample to national estimates",
    value: "Apply plan-level projection factors where available",
    enabled: false,
  },
  {
    id: "gen-10",
    parameter: "Output rounding",
    description: "Rounding rules for reported metrics",
    value: "Round to nearest whole number; percentages to 1 decimal",
    enabled: true,
  },
];

export const generalBusinessRulesText = `GENERAL BUSINESS RULES — APLD ANALYTICS PIPELINE
================================================

1. DATA QUALITY & COMPLETENESS
   - All patient records must have ≥80% field completeness
   - Claims with missing critical fields are excluded
   - Duplicate claims resolved by keeping latest adjudicated claim

2. PATIENT IDENTIFICATION & PRIVACY
   - HIPAA Safe Harbor de-identification standards
   - Outputs aggregated to minimum 11 patients per cell
   - Patient ages 90+ masked and grouped as "90+"

3. GEOGRAPHIC & DEMOGRAPHIC DEFAULTS
   - Default scope: United States (50 states + DC)
   - Default age range: 18–89 years
   - Default payer mix: Commercial, Medicare, Medicaid

4. TEMPORAL RULES
   - Standard claims data lag: 3-month run-out period
   - Calendar year alignment preferred for annual metrics

5. OUTPUT & REPORTING
   - Counts rounded to nearest whole number
   - Percentages reported to 1 decimal place
   - Statistical significance tested at alpha = 0.05`;
