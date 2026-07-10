"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types";
import { Send, Bot, User } from "lucide-react";

interface Props {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  placeholder?: string;
  isTyping?: boolean;
  onAcceptAction?: (action: string, payload?: any) => void;
  onRejectAction?: (action: string, payload?: any) => void;
}

const renderFormattedText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-2" />;
    return (
      <span key={i} className="block">
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) => 
          j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
        )}
      </span>
    );
  });
};

export default function ChatInterface({
  messages,
  onSendMessage,
  placeholder = "Type your message...",
  isTyping = false,
  onAcceptAction,
  onRejectAction,
}: Props) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInput("");
  };

  return (
    <div className="flex flex-col flex-1 h-full w-full min-h-0 overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 animate-slide-up ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                msg.role === "bot"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {msg.role === "bot" ? (
                <Bot className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                msg.role === "bot"
                  ? "bg-white border border-border shadow-subtle text-text-primary rounded-tl-sm"
                  : "bg-gradient-to-br from-primary to-primary-light text-white shadow-md shadow-primary/20 rounded-tr-sm"
              }`}
            >
              {renderFormattedText(msg.content)}
              {msg.customAction && (
                <div className="mt-4 flex flex-col gap-2 rounded-xl bg-surface/50 p-3 border border-border/50">
                  <div className="text-sm font-medium text-text-primary">
                    {msg.actionPayload?.description || "Parameter Update"}
                  </div>
                  <div className="text-xs text-text-secondary mb-1">
                    Value: <span className="font-semibold text-text-primary">{msg.actionPayload?.value || ""}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAcceptAction?.(msg.customAction!, msg.actionPayload)}
                      className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-light"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => onRejectAction?.(msg.customAction!, msg.actionPayload)}
                      className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-md bg-surface px-4 py-3">
              <div className="typing-indicator flex gap-1.5">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-border p-4 shrink-0"
      >
        <div className="flex items-center gap-2 rounded-xl bg-surface p-1.5">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-light text-white transition-all duration-200 hover:shadow-md hover:shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
