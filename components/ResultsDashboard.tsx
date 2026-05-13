"use client";

import { AnalysisResult } from "@/types";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Download,
  Table2,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
  FileText,
} from "lucide-react";

interface Props {
  result: AnalysisResult;
  analysisName: string;
}

export default function ResultsDashboard({ result, analysisName }: Props) {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-8 text-white shadow-elevated">
        <div className="flex items-start gap-4">
          <TrendingUp className="h-7 w-7 mt-0.5 shrink-0" />
          <div>
            <h2 className="text-xl font-bold tracking-tight">Analysis Complete — {analysisName}</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-white/90 max-w-3xl">
              {result.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-subtle">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Key Insights
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {result.insights.map((insight, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl bg-surface/50 p-4 transition-colors hover:bg-surface"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {idx + 1}
              </span>
              <p className="text-sm leading-relaxed text-text-secondary">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-subtle">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            {result.barChartTitle}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={result.barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#4A5568" }}
                axisLine={{ stroke: "#E2E8F0" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#4A5568" }}
                axisLine={{ stroke: "#E2E8F0" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {result.barChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill || "#0F6D8E"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-subtle">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <PieChartIcon className="h-4 w-4 text-primary" />
            {result.pieChartTitle}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={result.pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {result.pieChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill || "#0F6D8E"} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      {/* Area Chart */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-subtle">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <LineChartIcon className="h-4 w-4 text-primary" />
          {result.lineChartTitle}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={result.lineChartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGroupA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F6D8E" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0F6D8E" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorGroupB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E8913A" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#E8913A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#4A5568" }}
              axisLine={{ stroke: "#E2E8F0" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#4A5568" }}
              axisLine={{ stroke: "#E2E8F0" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 10px 30px -10px rgba(15, 109, 142, 0.15)",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              name="Group A"
              stroke="#0F6D8E"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGroupA)"
              dot={{ r: 4, fill: "#0F6D8E" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="value2"
              name="Group B"
              stroke="#E8913A"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGroupB)"
              dot={{ r: 4, fill: "#E8913A" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-subtle">
        <div className="px-6 py-5 border-b border-border bg-surface/30">
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Table2 className="h-4 w-4 text-primary" />
            {result.tableTitle}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface/60 border-b border-border">
                {result.tableColumns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.tableRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border-light hover:bg-primary/5 transition-colors"
                >
                  {result.tableColumns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-3.5 text-text-secondary"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Data Artifacts */}
      {result.generatedTables && result.generatedTables.length > 0 && (
        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-subtle mt-6">
          <div className="px-6 py-5 border-b border-border bg-surface/30">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Generated Data Artifacts
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Download the final and intermediate datasets created during this analysis pipeline.
            </p>
          </div>
          <div className="divide-y divide-border-light">
            {result.generatedTables.map((table, idx) => (
              <div key={idx} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-primary/5 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{table.name}</h4>
                  <p className="text-xs text-text-secondary mt-0.5">{table.description}</p>
                </div>
                <a
                  href={table.link}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text-primary shadow-sm hover:bg-surface hover:text-primary transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download CSV
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download Link */}
      <div className="flex justify-center pt-4">
        <a
          href={result.downloadLink}
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-elevated hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95"
        >
          <Download className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          Download Full Analysis Report
        </a>
      </div>
    </div>
  );
}
