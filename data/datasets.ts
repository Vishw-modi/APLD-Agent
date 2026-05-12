import { Dataset } from "@/types";

export const datasets: Dataset[] = [
  {
    id: "iqvia-laad",
    name: "IQVIA LAAD Claims",
    description:
      "Longitudinal access and adjudication data with medical and pharmacy claims across multiple payers.",
    recordCount: "280M+ patient records",
  },
  {
    id: "symphony",
    name: "Symphony Health",
    description:
      "Integrated dataverse combining claims, prescriptions, and EHR data for comprehensive patient insights.",
    recordCount: "300M+ lives covered",
  },
  {
    id: "mckesson",
    name: "McKesson Compile",
    description:
      "Prescription and medical claims data sourced from retail and specialty pharmacies nationwide.",
    recordCount: "220M+ patient records",
  },
  {
    id: "veeva",
    name: "Veeva Compass",
    description:
      "Patient-level prescription data with prescriber linkage, covering retail and specialty channels.",
    recordCount: "200M+ patients",
  },
  {
    id: "dhc",
    name: "DHC (Decision Health Collaborative)",
    description:
      "De-identified health claims with deep diagnostic and procedural coding across therapeutic areas.",
    recordCount: "150M+ patient records",
  },
  {
    id: "optum",
    name: "Optum Claims",
    description:
      "Commercial and Medicare Advantage claims data with rich clinical and demographic attributes.",
    recordCount: "100M+ lives",
  },
  {
    id: "komodo",
    name: "Komodo Health",
    description:
      "Healthcare map linking open and closed claims for near-complete US patient coverage.",
    recordCount: "330M+ patient journeys",
  },
  {
    id: "apld-rx",
    name: "APLD Rx Claims",
    description:
      "Anonymized patient-level prescription data with therapy-level detail and refill tracking.",
    recordCount: "250M+ prescription records",
  },
];
