"use client";

import { BusinessRule } from "@/types";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  rules: BusinessRule[];
  onRulesChange: (rules: BusinessRule[]) => void;
  additionalInfo: string;
  onAdditionalInfoChange: (info: string) => void;
  onConfirm: () => void;
  onContinueChat: () => void;
}

export default function BusinessRulesTable({
  rules,
  onRulesChange,
  additionalInfo,
  onAdditionalInfoChange,
  onConfirm,
  onContinueChat,
}: Props) {
  const updateRule = (id: string, field: keyof BusinessRule, value: string | boolean) => {
    onRulesChange(
      rules.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addRow = () => {
    const newRule: BusinessRule = {
      id: `custom-${Date.now()}`,
      parameter: "",
      description: "",
      value: "",
      enabled: true,
    };
    onRulesChange([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    onRulesChange(rules.filter((r) => r.id !== id));
  };

  return (
    <div className="animate-slide-up">
      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-surface/60 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary w-[200px]">Parameter</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary w-[240px]">Value (editable)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary w-[80px]">Active</th>
              <th className="px-4 py-3 text-center font-semibold w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, idx) => (
              <tr
                key={rule.id}
                className={`border-b border-border-light transition-all duration-200 hover:bg-primary/5 ${
                  idx % 2 === 0 ? "bg-white" : "bg-surface/30"
                }`}
              >
                <td className="px-4 py-2.5">
                  <input
                    type="text"
                    value={rule.parameter}
                    onChange={(e) =>
                      updateRule(rule.id, "parameter", e.target.value)
                    }
                    className="w-full bg-transparent font-medium text-text-primary outline-none focus:bg-white focus:ring-1 focus:ring-primary/30 rounded px-1 py-0.5 -ml-1"
                    placeholder="Parameter name"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    type="text"
                    value={rule.description}
                    onChange={(e) =>
                      updateRule(rule.id, "description", e.target.value)
                    }
                    className="w-full bg-transparent text-text-secondary outline-none focus:bg-white focus:ring-1 focus:ring-primary/30 rounded px-1 py-0.5 -ml-1"
                    placeholder="Description"
                  />
                </td>
                <td className="px-4 py-2.5 relative">
                  <input
                    type="text"
                    value={rule.value}
                    onChange={(e) =>
                      updateRule(rule.id, "value", e.target.value)
                    }
                    className={`w-full bg-white border rounded-lg px-3 py-1.5 text-text-primary outline-none transition-colors ${
                      rule.enabled && rule.value.trim() === ""
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                        : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                    placeholder="Enter value"
                  />
                  {rule.enabled && rule.value.trim() === "" && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-red-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Required
                    </div>
                  )}
                </td>
                <td className="px-4 py-2.5 text-center">
                  <label className="relative inline-flex cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={(e) =>
                        updateRule(rule.id, "enabled", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="h-5 w-9 rounded-full bg-border peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-4" />
                  </label>
                </td>
                <td className="px-2 py-2.5 text-center">
                  <button
                    onClick={() => removeRule(rule.id)}
                    className="p-1 rounded text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                    title="Remove rule"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row */}
        <div className="border-t border-border p-3">
          <button
            onClick={addRow}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Row
          </button>
        </div>
      </div>



      {/* Action Buttons */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onConfirm}
          disabled={rules.some((rule) => rule.enabled && rule.value.trim() === "")}
          className="flex-1 rounded-xl bg-success py-3 px-6 text-sm font-semibold text-white transition-all hover:bg-success-light hover:shadow-md hover:shadow-success/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
        >
          Confirm Business Rules
        </button>
        <button
          onClick={onContinueChat}
          className="rounded-xl border border-border bg-white py-3 px-6 text-sm font-semibold text-primary transition-colors hover:bg-surface active:scale-[0.98]"
        >
          Refine with AI
        </button>
      </div>
    </div>
  );
}
