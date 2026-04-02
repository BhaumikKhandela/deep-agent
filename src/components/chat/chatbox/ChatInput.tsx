"use client";

import { cn } from "@/lib/utils";
import { Loader2Icon, SendHorizonalIcon } from "lucide-react";
import { memo } from "react";
import UploadFileButton from "./UploadFileButton";

type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  loading: boolean;
  pdfId: string;
};

const ChatInput = memo(
  ({ input, setInput, sendMessage, loading, pdfId }: ChatInputProps) => {
    return (
      <div className="bg-slate-50 px-60 py-4">
        <div className="rounded-2xl border border-indigo-400 p-3 shadow-sm">
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask the assistant… use @ to reference PDFs or / for saved prompts"
            className="w-full resize-none border-none bg-transparent text-sm outline-none placeholder:text-gray-400 disabled:opacity-50"
          />
          <div className="mt-3 flex items-center justify-between">
            <UploadFileButton pdfId={pdfId} />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition",
                input.trim()
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-indigo-300 cursor-not-allowed",
              )}
            >
              {loading ? (
                <Loader2Icon className="h-4 w-4 animate-spin text-white" />
              ) : (
                <SendHorizonalIcon className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  },
);
export default ChatInput;
