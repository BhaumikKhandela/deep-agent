"use client"; // This is the key!

import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
