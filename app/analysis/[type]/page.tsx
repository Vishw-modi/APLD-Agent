"use client";

import { useState, useCallback, useRef, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { analysisTypes } from "@/data/analysisTypes";
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
import { ArrowLeft, MessageSquare, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";

const API_BASE = "http://localhost:4000";

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function AnalysisWorkspace({ params }: PageProps) {
  const { type } = use(params);
  const searchParams = useSearchParams();
  const datasetName = searchParams.get("datasetName") || "Unknown Dataset";

  const analysisType = analysisTypes.find((a) => a.id === type);
  const analysisName = analysisType?.name || "Analysis";

  // Stable session ID — generated once per mount
  const sessionIdRef = useRef<string>("");
  if (!sessionIdRef.current) {
    sessionIdRef.current = crypto.randomUUID();
  }
  const sessionId = sessionIdRef.current;

  // State machine
  const [phase, setPhase] = useState<AnalysisPhase>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");

  // Business rules
  const [rules, setRules] = useState<BusinessRule[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false);

  // Results
  const result = dummyResultsByType[type] || defaultDummyResult;

  // ── Helpers ─────────────────────────────────────────────────────────────

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

  // ── AI Communication ───────────────────────────────────────────────────

  /**
   * Send a message to the backend /api/chat endpoint.
   * If Gemini returns rules, they are set in state and the phase transitions to "rules".
   */
  const sendToChat = useCallback(
    async (message: string) => {
      setIsTyping(true);
      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message,
            analysisType: type,
            analysisName,
            datasetName,
          }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        addMessage("bot", data.reply);

        if (data.rules && data.rules.length > 0) {
          setRules(data.rules);
          // Small delay so the user reads the bot message before rules appear
          setTimeout(() => setPhase("rules"), 800);
        }
      } catch (err) {
        console.error("Chat API error:", err);
        addMessage(
          "bot",
          "I'm sorry, I encountered an error connecting to the AI service. Please check that the backend server is running on port 4000 and try again."
        );
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId, type, analysisName, datasetName, addMessage]
  );

  /**
   * Send a message to the backend /api/refine endpoint.
   * If Gemini returns updated rules, they replace the current rules in state.
   */
  const sendToRefine = useCallback(
    async (message: string) => {
      setIsTyping(true);
      try {
        const res = await fetch(`${API_BASE}/api/refine`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message,
            currentRules: rules,
          }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        addMessage("bot", data.reply);

        if (data.rules && data.rules.length > 0) {
          setRules(data.rules);
        }
      } catch (err) {
        console.error("Refine API error:", err);
        addMessage(
          "bot",
          "I'm sorry, I encountered an error. Please try again."
        );
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId, rules, addMessage]
  );

  // ── Initialization — fetch greeting from AI ────────────────────────────

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Send the __INIT__ message to get the AI greeting
    (async () => {
      setIsTyping(true);
      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message: "__INIT__",
            analysisType: type,
            analysisName,
            datasetName,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          addMessage("bot", data.reply);
        } else {
          addMessage(
            "bot",
            `Hello! I'm your APLD Analysis Assistant. You've selected **${analysisName}**.\n\nPlease describe the analysis you'd like to perform. _(Note: The AI backend may not be running — please start it on port 4000.)_`
          );
        }
      } catch {
        addMessage(
          "bot",
          `Hello! I'm your APLD Analysis Assistant. You've selected **${analysisName}**.\n\nPlease describe the analysis you'd like to perform. _(Note: Could not connect to the AI backend. Make sure it's running on port 4000.)_`
        );
      } finally {
        setIsTyping(false);
      }
    })();
  }, [sessionId, type, analysisName, datasetName, addMessage]);

  // ── Event Handlers ─────────────────────────────────────────────────────

  const handleChatSend = (content: string) => {
    addMessage("user", content);

    if (phase === "chat") {
      setUserPrompt(content);
      sendToChat(content);
    } else if (phase === "refine") {
      sendToRefine(content);
    }
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
    <div className="flex flex-col max-w-[1440px] mx-auto px-6 py-4" style={{ height: 'calc(100vh - 3.5rem)' }}>
      {/* Top bar — fixed height */}
      <div className="flex items-center gap-4 pb-4 shrink-0 animate-fade-in">
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

      {/* Phase: Results — allow scrolling for results dashboard */}
      {phase === "results" && (
        <div className="flex-1 overflow-y-auto min-h-0">
          <ResultsDashboard result={result} analysisName={analysisName} />
        </div>
      )}

      {/* Phase: Running */}
      {phase === "running" && (
        <div className="flex-1 flex items-center justify-center min-h-0">
          <PipelineProgress onComplete={handlePipelineComplete} />
        </div>
      )}

      {/* Phase: Chat / Rules / Refine — fills remaining viewport */}
      {(phase === "chat" || phase === "rules" || phase === "refine") && (
        <div className="flex-1 min-h-0 grid gap-6 lg:grid-cols-7">
          {/* Left Column: Chat */}
          <div className={`flex flex-col gap-4 min-h-0 ${phase === "chat" ? "lg:col-span-4" : "lg:col-span-3"}`}>
            
            {/* Initial Context only visible during rules/refine phases */}
            {(phase === "rules" || phase === "refine") && (
              <div className="shrink-0">
                <BusinessRulesViewer />
              </div>
            )}

            <div
              className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden flex flex-col flex-1 min-h-0 transition-all duration-300"
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-surface/50 shrink-0">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Analysis Assistant
                </span>
                {isTyping && (
                  <span className="ml-auto text-xs text-text-muted animate-pulse">
                    AI is thinking...
                  </span>
                )}
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
              />
            </div>
          </div>

          {/* Right Column: Setup Context (Phase 1) OR Business Rules (Phase 2+) */}
          <div className={`${phase === "chat" ? "lg:col-span-3" : "lg:col-span-4"} overflow-y-auto min-h-0 space-y-4`}>
            
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
                            &quot;{prompt}&quot;
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
                    Here are the business rules generated for your{" "}
                    <span className="font-medium">{analysisName}</span>.
                    Review and edit them below, then confirm to proceed.
                  </p>
                </div>

                {/* Editable rules table */}
                <BusinessRulesTable
                  rules={rules}
                  onRulesChange={setRules}
                  additionalInfo={additionalInfo}
                  onAdditionalInfoChange={setAdditionalInfo}
                  onConfirm={handleConfirmRules}
                  onContinueChat={handleContinueChat}
                />
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
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        rules={rules}
        additionalInfo={additionalInfo}
        analysisName={analysisName}
        datasetName={datasetName}
        onConfirm={handleRunAnalysis}
        onGoBack={() => setShowConfirmModal(false)}
      />
    </div>
  );
}
