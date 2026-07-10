export interface Dataset {
  id: string;
  name: string;
  description: string;
  recordCount: string;
}

export interface AnalysisType {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  isHighlighted?: boolean; // for Exploratory Bot / Cohort Builder
}

export interface BusinessRule {
  id: string;
  parameter: string;
  description: string;
  value: string;
  enabled: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  customAction?: string;
  actionPayload?: any;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  fill?: string;
}

export interface SankeyNode {
  name: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface GeneratedTable {
  name: string;
  description: string;
  link: string;
}

export interface AnalysisResult {
  summary: string;
  insights: string[];
  barChartData: ChartDataPoint[];
  pieChartData: ChartDataPoint[];
  lineChartData: ChartDataPoint[];
  tableColumns: TableColumn[];
  tableRows: TableRow[];
  downloadLink: string;
  barChartTitle: string;
  pieChartTitle: string;
  lineChartTitle: string;
  tableTitle: string;
  generatedTables?: GeneratedTable[];
  funnelChartData?: ChartDataPoint[];
  sankeyChartData?: SankeyData;
}

export type AnalysisPhase =
  | "chat"
  | "rules"
  | "refine"
  | "confirm"
  | "running"
  | "results";
