"use client";

import { useRef, useState } from "react";
import { chatMessages } from "./chatbox/chat";
import { MessageBubble } from "./chatbox/MessageBubble";
import ChatInput from "./chatbox/ChatInput";

export default function ChatPanel() {
  const [message, setMessage] = useState(chatMessages);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim() || loading) return;
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full w-full flex-col bg-slate-50">
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-60 py-4 space-y-4"
      >
        {message.map((msg, i) => (
          <MessageBubble key={i} message={msg} loading={loading} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="border-slate-200 bg-white">
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
          pdfId=""
        />
      </div>
    </div>
  );
}
