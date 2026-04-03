import ChatPanel from "@/components/chat/ChatPanel";
import SideBar from "@/components/chat/SideBar";

export default async function Page({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      <SideBar />
      <main className="flex flex-1 overflow-hidden">
        <ChatPanel />
      </main>
    </div>
  );
}
