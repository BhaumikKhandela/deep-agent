"use client";
import ChatPanel from "@/components/chat/ChatPanel";
import SideBar from "@/components/chat/SideBar";
import { useSession } from "next-auth/react";

export default function Page() {


  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      <SideBar />
      <main className="flex flex-1 overflow-hidden">
        <ChatPanel />
      </main>
    </div>
  );
}
