"use client";

import { ChatMessage } from "@/types";
import { X, MessageSquare, Play } from "lucide-react";
import ChatInterface from "./ChatInterface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
  onConfirm: () => void;
}

export default function RefineChatModal({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isTyping,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-scale-in flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Refine Business Rules
              </h2>
              <p className="text-xs text-text-secondary">
                Chat with the AI Assistant to adjust parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden bg-surface/30">
          <ChatInterface
            messages={messages}
            onSendMessage={onSendMessage}
            placeholder="Ask questions or tell the bot what rules to change..."
            isTyping={isTyping}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4 shrink-0 bg-white rounded-b-2xl">
          <p className="text-xs text-text-muted hidden sm:block">
            Once you're satisfied with the refinements, confirm below.
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-success px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-success-light hover:shadow-md"
            >
              <Play className="h-4 w-4" />
              Confirm Business Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
