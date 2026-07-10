"use client";

import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { BusinessRule } from "@/types";

interface Props {
  geoScope: string;
  setGeoScope: (v: string) => void;
  projHorizon: string;
  setProjHorizon: (v: string) => void;
  dataSources: string[];
  setDataSources: (v: string[]) => void;
  prevBase: string;
  setPrevBase: (v: string) => void;
  rules: BusinessRule[];
  onRulesChange: (rules: BusinessRule[]) => void;
  additionalInfo: string;
  onAdditionalInfoChange: (info: string) => void;
  onConfirm: () => void;
  onContinueChat: () => void;
}

export default function MarketSizingParams({
  geoScope,
  setGeoScope,
  projHorizon,
  setProjHorizon,
  dataSources,
  setDataSources,
  prevBase,
  setPrevBase,
  rules,
  onRulesChange,
  additionalInfo,
  onAdditionalInfoChange,
  onConfirm,
  onContinueChat,
}: Props) {
  const addRow = () => {
    const newRule: BusinessRule = {
      id: `custom-${Date.now()}`,
      parameter: "",
      description: "Custom user parameter",
      value: "",
      enabled: true,
    };
    onRulesChange([...rules, newRule]);
  };

  const updateRule = (id: string, field: keyof BusinessRule, value: string | boolean) => {
    onRulesChange(
      rules.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const removeRule = (id: string) => {
    onRulesChange(rules.filter((r) => r.id !== id));
  };
  return (
    <div className="flex flex-col h-full animate-slide-up">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          Market Sizing Parameters
        </h3>
      </div>

      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden mb-4">
        <div className="p-5 grid gap-4 sm:grid-cols-2">
          
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Geographic Scope
            </label>
            <select 
              value={geoScope}
              onChange={(e) => setGeoScope(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
              <option>United States (US)</option>
              <option>Europe (EU5)</option>
              <option>Global (WW)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Projection Horizon
            </label>
            <select 
              value={projHorizon}
              onChange={(e) => setProjHorizon(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
              <option>5 Years (2025-2030)</option>
              <option>10 Years (2025-2035)</option>
              <option>1 Year (Current)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Data Sources
            </label>
            <div className="flex flex-col gap-2">
              {[
                "Linked Claims Data",
                "Electronic Health Records (EHR)",
                "Patient Surveys",
              ].map((source) => (
                <label key={source} className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dataSources.includes(source)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDataSources([...dataSources, source]);
                      } else {
                        setDataSources(dataSources.filter((s) => s !== source));
                      }
                    }}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                  />
                  {source}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Prevalence Base
            </label>
            <div className="flex flex-col gap-2 mt-1">
              {["Adult Population (18+)", "Total US Population"].map((base) => (
                <label key={base} className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="radio"
                    name="prevBase"
                    checked={prevBase === base}
                    onChange={() => setPrevBase(base)}
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  {base}
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden mb-4">
        <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
          <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
            Custom Market Sizing Rules
          </h4>
          <button
            onClick={addRow}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
          >
            <Plus className="h-3 w-3" />
            Add Rule
          </button>
        </div>
        {rules.length > 0 ? (
          <div className="divide-y divide-border max-h-[200px] overflow-y-auto custom-scrollbar">
            {rules.map((rule) => (
              <div key={rule.id} className={`flex items-center gap-3 p-3 transition-colors ${!rule.enabled ? 'opacity-60 bg-surface/50' : 'hover:bg-surface/30'}`}>
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={(e) => updateRule(rule.id, "enabled", e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
                <input
                  type="text"
                  placeholder="Parameter name"
                  value={rule.parameter}
                  onChange={(e) => updateRule(rule.id, "parameter", e.target.value)}
                  disabled={!rule.enabled}
                  className="flex-1 min-w-[120px] rounded border border-border px-2 py-1.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-surface disabled:text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={rule.value}
                  onChange={(e) => updateRule(rule.id, "value", e.target.value)}
                  disabled={!rule.enabled}
                  className="flex-1 min-w-[120px] rounded border border-border px-2 py-1.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-surface disabled:text-text-muted"
                />
                <button
                  onClick={() => removeRule(rule.id)}
                  className="p-1.5 shrink-0 rounded text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                  title="Remove rule"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-text-muted">No custom rules added yet. Click "Add Rule" to define your own.</p>
          </div>
        )}
      </div>



      <div className="mt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-success py-3 px-6 text-sm font-semibold text-white transition-all hover:bg-success-light hover:shadow-md hover:shadow-success/20 active:scale-[0.98]"
        >
          Confirm Parameters
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
