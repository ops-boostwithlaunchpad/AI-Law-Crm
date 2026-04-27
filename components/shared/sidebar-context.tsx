"use client";

import * as React from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

const STORAGE_KEY = "legalai:sidebar-collapsed";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "1") setCollapsedState(true);
  }, []);

  const setCollapsed = React.useCallback((v: boolean) => {
    setCollapsedState(v);
    localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
  }, []);

  const toggle = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <SidebarContext.Provider value={{ collapsed, toggle, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be inside SidebarProvider");
  return ctx;
}
