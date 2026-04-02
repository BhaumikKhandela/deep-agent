"use client";

import { cn } from "@/lib/utils";
import { FileTextIcon } from "lucide-react";
import { useState } from "react";

export default function SideBar() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [chatList, setChatList] = useState([
    { pdfId: "ddd", title: "Casual conversation" },
    { pdfId: "ddd", title: "Motivation Letter" },
  ]);

  const handlePdfClick = (pdfId: string) => {
    console.log("..");
  };

  return (
    <div className="relative flex h-full overflow-hidden">
      <aside
        className={cn(
          "flex flex-col border-r bg-slate-50 transition-all",
          menuOpen ? "w-65" : "w-0",
        )}
      >
        <div className={cn("flex h-full flex-col", !menuOpen && "hidden")}>
          <div className="ml-6 mt-5 font-bold">Chats</div>
          <nav className="space-y-1 px-2 py-3 text-sm">
            {chatList.length === 0 ? (
              <MenuItem icon={<FileTextIcon size={16} />} label="No PDFs" />
            ) : (
              chatList.map((chat) => (
                <MenuItem
                  key={chat.pdfId}
                  icon={<FileTextIcon size={16} />}
                  label={chat.title}
                  onClick={() => handlePdfClick(chat.pdfId)}
                />
              ))
            )}
          </nav>
        </div>
      </aside>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 cursor-pointer",
        active ? "bg-slate-200 font-medium" : "hover:bg-slate-200",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
