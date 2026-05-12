"use client";

import { AnalysisResult } from "@/types";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
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
} from "lucide-react";

interface Props {
  result: AnalysisResult;
  analysisName: string;
}

export default function ResultsDashboard({ result, analysisName }: Props) {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-primary to-primary-light p-6 text-white shadow-md">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-6 w-6 mt-0.5 shrink-0" />
          <div>
            <h2 className="text-lg font-bold">Analysis Complete — {analysisName}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/85">
              {result.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Key Insights
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {result.insights.map((insight, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 rounded-lg bg-surface p-3"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {idx + 1}
              </span>
              <p className="text-sm text-text-secondary">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
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
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
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
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <LineChartIcon className="h-4 w-4 text-primary" />
          {result.lineChartTitle}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={result.lineChartData}>
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
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Group A"
              stroke="#0F6D8E"
              strokeWidth={2}
              dot={{ r: 4, fill: "#0F6D8E" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="value2"
              name="Group B"
              stroke="#E8913A"
              strokeWidth={2}
              dot={{ r: 4, fill: "#E8913A" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Table2 className="h-4 w-4 text-primary" />
            {result.tableTitle}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface">
                {result.tableColumns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left font-semibold text-text-primary"
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
                  className="border-b border-border-light hover:bg-surface/50 transition-colors"
                >
                  {result.tableColumns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-text-secondary"
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

      {/* Download Link */}
      <div className="flex justify-center">
        <a
          href={result.downloadLink}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-md hover:shadow-primary/20"
        >
          <Download className="h-4 w-4" />
          Download Full Analysis Report
        </a>
      </div>
    </div>
  );
}
