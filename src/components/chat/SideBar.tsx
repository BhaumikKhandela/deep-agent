"use client";

import { createThread } from "@/lib/api/threads";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchThreads } from "@/store/threadSlice";
import {
  FileTextIcon,
  MessageSquareIcon,
  PlusIcon,
  PanelLeftIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SideBar() {
  const [menuOpen, setMenuOpen] = useState(true);
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { threads } = useSelector((state: RootState) => state.thread);

  const userId = session?.user?.id;

  const createNewThread = async () => {
    await createThread(userId);
    if (userId) {
      dispatch(fetchThreads(userId));
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchThreads(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="relative flex h-full overflow-hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="absolute left-3 top-3 z-50 rounded-md p-2 bg-white shadow hover:bg-slate-100"
      >
        <PanelLeftIcon size={18} />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r bg-slate-50 transition-all duration-300",
          menuOpen ? "w-64 translate-x-0" : "w-16",
        )}
      >
        <div className="flex h-full flex-col">
          {/* New Chat */}
          <div className="mb-4 mt-14 flex justify-center">
            <button
              onClick={createNewThread}
              className={cn(
                "flex items-center gap-3 rounded-full bg-slate-200 px-4 py-3 mx-2 my-2 cursor-pointer transition-all",
                !menuOpen && "justify-center px-2",
              )}
            >
              <PlusIcon size={18} />
              {menuOpen && <span className="truncate">New Chat</span>}
            </button>
          </div>

          {/* Recent */}
          {menuOpen && (
            <div className="mb-2 px-3 text-sm font-semibold text-slate-700">
              Recent
            </div>
          )}

          {/* Threads */}
          <nav className="space-y-1 px-2 py-3 text-sm">
            {Array.isArray(threads) && threads.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-10 text-slate-600">
                <MessageSquareIcon size={40} className="mb-2 opacity-20" />
                {menuOpen && <span className="text-sm">No threads yet</span>}
              </div>
            ) : (
              threads?.map((thread) => (
                <MenuItem
                  key={thread.userId}
                  icon={<FileTextIcon size={16} />}
                  label={thread.title}
                  collapsed={!menuOpen}
                  onClick={() => {}}
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
  collapsed,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-all",
        active ? "bg-slate-200 font-medium" : "hover:bg-slate-200",
        collapsed && "justify-center",
      )}
    >
      {icon}
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}
