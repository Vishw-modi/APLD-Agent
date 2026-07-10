"use client";

import { useState, useCallback, use } from "react";
import { useSearchParams } from "next/navigation";
import { analysisTypes } from "@/data/analysisTypes";
import { businessRulesByType } from "@/data/businessRules";
import {
  dummyResultsByType,
  defaultDummyResult,
} from "@/data/dummyResults";
import { ChatMessage, BusinessRule, AnalysisPhase } from "@/types";
import ChatInterface from "@/components/ChatInterface";
import BusinessRulesTable from "@/components/BusinessRulesTable";
import BusinessRulesViewer from "@/components/BusinessRulesViewer";
import PipelineProgress from "@/components/PipelineProgress";
import ResultsDashboard from "@/components/ResultsDashboard";
import ConfirmationModal from "@/components/ConfirmationModal";
import RefineChatModal from "@/components/RefineChatModal";
import MarketSizingParams from "@/components/MarketSizingParams";
import { ArrowLeft, MessageSquare, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";

/** Simulated bot responses for initial chat */
function getBotGreeting(analysisName: string): string {
  return `Hello! I'm your APLD Analysis Assistant. You've selected **${analysisName}**.\n\nPlease describe the analysis you'd like to perform. For example:\n• What therapeutic area or disease are you investigating?\n• Which treatment lines or patient segments are you interested in?\n• Any specific outcomes or metrics you want to measure?\n\nThe more detail you provide, the better I can configure your analysis.`;
}

function getBotRulesResponse(analysisName: string, userPrompt: string): string {
  return `Great! Based on your request, I've prepared initial business rules for your ${analysisName}.\n\nI've pre-loaded parameters based on our general business standards and your analysis description. Please review the rules below:\n\n• You can **edit any value** directly in the table\n• **Toggle** rules on/off using the switch\n• **Add new rules** using the "Add Row" button\n• Use the **text area** below for complex rules\n\nOnce you're satisfied, click "Confirm Business Rules" to proceed, or chat with me further to refine them.`;
}

function getBotRefineResponse(): string {
  const responses = [
    "I see — that's a good refinement. I've noted your changes. Would you like to adjust any other parameters, or are you ready to confirm the business rules?",
    "That makes sense. This additional context will help produce more accurate results. Any other modifications you'd like to make?",
    "Understood. I'd also suggest considering adding a minimum follow-up period if you haven't already. Would you like me to explain why that might be helpful?",
    "Good point. I've factored that into the analysis parameters. Feel free to edit the rules table directly or let me know if you need more suggestions.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function AnalysisWorkspace({ params }: PageProps) {
  const { type } = use(params);
  const searchParams = useSearchParams();
  const datasetName = searchParams.get("datasetName") || "Unknown Dataset";

  const analysisType = analysisTypes.find((a) => a.id === type);
  const analysisName = analysisType?.name || (type === "patient-cohort" ? "Patient Cohort Analysis" : "Analysis");

  // State machine
  const [phase, setPhase] = useState<AnalysisPhase>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "greeting",
      role: "bot",
      content: getBotGreeting(analysisName),
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");

  // Business rules
  const [rules, setRules] = useState<BusinessRule[]>(
    type === "market-sizing" ? [] : (businessRulesByType[type] || businessRulesByType["switch-analysis"]!)
  );
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false);

  // Market Sizing specific state
  const [geoScope, setGeoScope] = useState("United States (US)");
  const [projHorizon, setProjHorizon] = useState("5 Years (2025-2030)");
  const [dataSources, setDataSources] = useState(["Linked Claims Data", "Electronic Health Records (EHR)"]);
  const [prevBase, setPrevBase] = useState("Adult Population (18+)");

  // Results
  const result = dummyResultsByType[type] || defaultDummyResult;

  const addMessage = useCallback(
    (role: "user" | "bot", content: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-${Math.random()}`,
          role,
          content,
          timestamp: new Date(),
        },
      ]);
    },
    []
  );

  const simulateBotResponse = useCallback(
    (response: string) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("bot", response);
      }, 1500);
    },
    [addMessage]
  );

  const handleChatSend = (content: string) => {
    addMessage("user", content);

    if (phase === "chat") {
      setUserPrompt(content);
      simulateBotResponse(getBotRulesResponse(analysisName, content));
      setTimeout(() => {
        setPhase("rules");
      }, 2500);
    } else if (phase === "refine" || phase === "rules") {
      const textLower = content.toLowerCase();
      const hasAskedL409 = messages.some((m) => m.content.includes("I can add the diagnosis code L40.9"));
      
      if (!hasAskedL409 && !textLower.includes("hello") && !textLower.includes("hi") && textLower !== "hey") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}-${Math.random()}`,
              role: "bot",
              content: "I can add the diagnosis code L40.9 (Psoriasis, unspecified) to your business rules. Do you want to proceed?",
              timestamp: new Date(),
              customAction: "add_diag_code",
              actionPayload: {
                description: "Diagnosis Code",
                value: "L40.9"
              }
            },
          ]);
        }, 1500);
      } else if (textLower.includes("hello") || textLower.includes("hi") || textLower === "hey") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}-${Math.random()}`,
              role: "bot",
              content: "Hello! How can I assist you further with this analysis?",
              timestamp: new Date(),
            },
          ]);
        }, 1000);
      } else {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}-${Math.random()}`,
              role: "bot",
              content: "I'm a prototype assistant. For this demo, I can only perform a limited set of actions. Please let me know if you need to add any specific diagnosis codes, or you can go ahead and confirm the rules.",
              timestamp: new Date(),
            },
          ]);
        }, 1500);
      }
    }
  };

  const handleAcceptAction = (action: string, payload?: any) => {
    if (action === "add_diag_code") {
      setRules((prev) => {
        const hasRule = prev.some((r) => r.parameter === "Diagnosis Code");
        if (hasRule) return prev;
        return [
          ...prev,
          {
            id: `rule-${Date.now()}`,
            parameter: "Diagnosis Code",
            description: "Diagnosis code applied to define the cohort",
            value: "L40.9",
            enabled: true,
          },
        ];
      });
      setMessages((prev) => {
        const cleaned = prev.map((m) =>
          m.customAction === "add_diag_code" ? { ...m, customAction: undefined } : m
        );
        return [
          ...cleaned,
          {
            id: `msg-${Date.now()}-user`,
            role: "user",
            content: "Add it.",
            timestamp: new Date(),
          },
          {
            id: `msg-${Date.now()}-bot`,
            role: "bot",
            content: "Done. I've added diagnosis code L40.9 to the business rules.",
            timestamp: new Date(),
          },
        ];
      });
    }
  };

  const handleRejectAction = (action: string) => {
    setMessages((prev) => {
      const cleaned = prev.map((m) =>
        m.customAction === action ? { ...m, customAction: undefined } : m
      );
      return [
        ...cleaned,
        {
          id: `msg-${Date.now()}-user`,
          role: "user",
          content: "Reject.",
          timestamp: new Date(),
        },
        {
          id: `msg-${Date.now()}-bot`,
          role: "bot",
          content: "Understood. I will not add it.",
          timestamp: new Date(),
        },
      ];
    });
  };

  const handleConfirmRules = () => {
    setIsRefineModalOpen(false);
    setShowConfirmModal(true);
  };

  const handleContinueChat = () => {
    setPhase("refine");
    setIsRefineModalOpen(true);
    addMessage(
      "bot",
      "I'm here to help you refine the business rules. What would you like to modify or add? You can tell me the parameter and the new value."
    );
  };

  const handleRunAnalysis = () => {
    setShowConfirmModal(false);
    setIsRefineModalOpen(false);
    setPhase("running");
  };

  const handlePipelineComplete = useCallback(() => {
    setPhase("results");
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-6 animate-fade-in">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="h-4 w-px bg-border" />
        <div>
          <h1 className="text-lg font-semibold text-text-primary">
            {analysisName}
          </h1>
          <p className="text-xs text-text-muted">
            Dataset: {datasetName}
          </p>
        </div>
      </div>

      {/* Phase: Results */}
      {phase === "results" && (
        <ResultsDashboard
          result={result}
          analysisName={analysisName}
          datasetName={datasetName}
          analysisTypeSlug={type}
        />
      )}

      {/* Phase: Running */}
      {phase === "running" && (
        <PipelineProgress onComplete={handlePipelineComplete} />
      )}

      {/* Phase: Chat / Rules / Refine */}
      {(phase === "chat" || phase === "rules" || phase === "refine") && (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left Column: Chat (Phase 1 takes 3 cols, Phase 2+ takes 2 cols) */}
          <div className={`flex flex-col gap-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] min-h-0 ${phase === "chat" ? "lg:col-span-3" : "lg:col-span-2"}`}>
            
            {/* Initial Context only visible during rules/refine phases */}
            {(phase === "rules" || phase === "refine") && (
              <BusinessRulesViewer />
            )}

            <div
              className={`rounded-2xl border border-border bg-white shadow-sm overflow-hidden flex flex-col flex-1 transition-all duration-300 min-h-0`}
              style={{ height: phase === "chat" ? "600px" : "400px" }}
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-surface/50">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Analysis Assistant
                </span>
              </div>
              <ChatInterface
                messages={messages}
                onSendMessage={handleChatSend}
                placeholder={
                  phase === "chat"
                    ? "Describe the analysis you want to perform..."
                    : "Ask questions or provide additional context..."
                }
                isTyping={isTyping}
                onAcceptAction={handleAcceptAction}
                onRejectAction={handleRejectAction}
              />
            </div>
          </div>

          {/* Right Column: Setup Context (Phase 1) OR Business Rules (Phase 2+) */}
          <div className={`${phase === "chat" ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
            
            {/* Context Sidebar during Chat Phase */}
            {phase === "chat" && (
              <div className="rounded-2xl border border-border bg-gradient-to-br from-white to-surface/30 shadow-subtle overflow-hidden animate-slide-up">
                <div className="p-6">
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Analysis Setup Guide
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-text-secondary mb-2">SELECTED DATASETS</h4>
                      <div className="flex flex-wrap gap-2">
                        {datasetName.split(",").map((name, i) => (
                          <span key={i} className="inline-flex items-center rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-text-primary border border-border">
                            {name.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-text-secondary mb-2">SUGGESTED PROMPTS</h4>
                      <div className="space-y-2">
                        {[
                          "Analyze line-of-therapy progression over 24 months",
                          "Compare adherence rates across different demographics",
                          "Identify key drivers for treatment switching"
                        ].map((prompt, i) => (
                          <button 
                            key={i}
                            onClick={() => setUserPrompt(prompt)}
                            className="w-full text-left px-3 py-2 text-sm text-text-secondary bg-white hover:bg-primary/5 hover:text-primary hover:border-primary/30 border border-border rounded-xl transition-all"
                          >
                            "{prompt}"
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-text-muted mt-3">
                        Click a prompt above to populate the chat, or type your own custom requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Rules (visible in rules & refine phases) */}
            {(phase === "rules" || phase === "refine") && (
              <>
                {/* User prompt display */}
                {userPrompt && (
                  <div className="rounded-xl bg-accent/8 border border-accent/20 p-4 animate-slide-up">
                    <p className="text-xs font-medium text-accent-dark mb-1">
                      Your Analysis Request
                    </p>
                    <p className="text-sm text-text-primary">
                      {userPrompt}
                    </p>
                  </div>
                )}

                {/* Bot message about rules */}
                <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 animate-slide-up">
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-primary">
                      AI Assistant:
                    </span>{" "}
                    Here are the initial business rules for your{" "}
                    <span className="font-medium">{analysisName}</span>.
                    Please review and confirm.
                  </p>
                </div>

                {type === "market-sizing" ? (
                  <MarketSizingParams
                    geoScope={geoScope}
                    setGeoScope={setGeoScope}
                    projHorizon={projHorizon}
                    setProjHorizon={setProjHorizon}
                    dataSources={dataSources}
                    setDataSources={setDataSources}
                    prevBase={prevBase}
                    setPrevBase={setPrevBase}
                    rules={rules}
                    onRulesChange={setRules}
                    additionalInfo={additionalInfo}
                    onAdditionalInfoChange={setAdditionalInfo}
                    onConfirm={handleConfirmRules}
                    onContinueChat={handleContinueChat}
                  />
                ) : (
                  <BusinessRulesTable
                    rules={rules}
                    onRulesChange={setRules}
                    additionalInfo={additionalInfo}
                    onAdditionalInfoChange={setAdditionalInfo}
                    onConfirm={handleConfirmRules}
                    onContinueChat={handleContinueChat}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Refine Chat Modal */}
      <RefineChatModal
        isOpen={isRefineModalOpen}
        onClose={() => setIsRefineModalOpen(false)}
        messages={messages}
        onSendMessage={handleChatSend}
        isTyping={isTyping}
        onConfirm={handleConfirmRules}
        onAcceptAction={handleAcceptAction}
        onRejectAction={handleRejectAction}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onGoBack={() => setShowConfirmModal(false)}
        rules={
          type === "market-sizing"
            ? [
                { id: "ms-1", parameter: "Geographic Scope", description: "", value: geoScope, enabled: true },
                { id: "ms-2", parameter: "Projection Horizon", description: "", value: projHorizon, enabled: true },
                { id: "ms-3", parameter: "Data Sources", description: "", value: dataSources.join(", "), enabled: true },
                { id: "ms-4", parameter: "Prevalence Base", description: "", value: prevBase, enabled: true },
                ...rules,
              ]
            : rules
        }
        additionalInfo={additionalInfo}
        analysisName={analysisName}
        datasetName={datasetName}
        onConfirm={handleRunAnalysis}
      />
    </div>
  );
}
