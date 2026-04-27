"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  LayoutDashboard,
  Inbox,
  Folder,
  Sparkles,
  FileText,
  Mail,
  Settings,
  Store,
  Users,
  Wallet,
  Scale,
  ChevronsLeft,
  ChevronsRight,
  X,
  type LucideIcon,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";
import type { UserRole } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  inbox: Inbox,
  folder: Folder,
  sparkles: Sparkles,
  file: FileText,
  mail: Mail,
  settings: Settings,
  store: Store,
  users: Users,
  wallet: Wallet,
};

interface NavSection {
  label: string;
  items: { label: string; href: string; icon: string; badge?: string | number }[];
}

const LAWYER_NAV: NavSection[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: "dashboard" }],
  },
  {
    label: "Pipeline",
    items: [
      { label: "Leads", href: "/leads", icon: "inbox", badge: 4 },
      { label: "Cases", href: "/cases", icon: "folder" },
      { label: "AI Workspace", href: "/ai-workspace", icon: "sparkles", badge: 12 },
    ],
  },
  {
    label: "Records",
    items: [
      { label: "Documents", href: "/documents", icon: "file" },
      { label: "Communications", href: "/communications", icon: "mail" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Users", href: "/users", icon: "users" },
      { label: "Settings", href: "/settings", icon: "settings" },
    ],
  },
];

const INVESTOR_NAV: NavSection[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: "dashboard" }],
  },
  {
    label: "Capital",
    items: [
      { label: "Marketplace", href: "/marketplace", icon: "store", badge: 8 },
      { label: "Portfolio", href: "/investments", icon: "wallet" },
    ],
  },
  {
    label: "Workspace",
    items: [{ label: "Settings", href: "/settings", icon: "settings" }],
  },
];

export interface SidebarProps {
  role?: UserRole;
  user?: { name: string; email: string; firmName?: string };
}

export function Sidebar({
  role = "lawyer",
  user = {
    name: "Sarah Chen",
    email: "sarah@hartlaw.com",
    firmName: "Hart & Associates",
  },
}: SidebarProps) {
  const { collapsed, toggle, mobileOpen, closeMobile } = useSidebar();
  const pathname = usePathname();
  const sections = role === "lawyer" ? LAWYER_NAV : INVESTOR_NAV;

  // Width:
  //   mobile: always full content width (252px) when open as drawer
  //   desktop (md+): collapsed ? 68 : 252
  const desktopWidth = collapsed ? "md:w-[68px]" : "md:w-[252px]";

  return (
    <Tooltip.Provider delayDuration={150}>
      {/* Backdrop for mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobile}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "h-screen flex flex-col bg-[var(--bg-elevated)] border-r border-[var(--border)]",
          "transition-[width,transform] duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
          // Mobile: fixed drawer; Desktop: in-flow sticky
          "fixed inset-y-0 left-0 z-50 w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:sticky md:top-0 md:translate-x-0 md:z-auto",
          desktopWidth
        )}
      >
        {/* Brand + collapse toggle */}
        <div
          className={cn(
            "h-16 flex items-center shrink-0 border-b border-[var(--border)]",
            collapsed ? "md:px-3 md:justify-center px-4 justify-between" : "px-4 justify-between"
          )}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group"
            onClick={closeMobile}
          >
            <div className="h-9 w-9 rounded-[10px] bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(37,99,235,0.5),0_1px_0_rgba(255,255,255,0.2)_inset]">
              <Scale size={17} strokeWidth={2.4} className="text-white" />
            </div>
            <AnimatePresence>
              {(!collapsed || mobileOpen) && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                  className={cn(
                    "flex items-baseline gap-1.5 overflow-hidden whitespace-nowrap",
                    collapsed && "md:hidden"
                  )}
                >
                  <span className="text-[16px] font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                    LegalAI
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                    crm
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={closeMobile}
            aria-label="Close menu"
            className="md:hidden h-8 w-8 inline-flex items-center justify-center rounded-[7px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>

          {/* Desktop collapse toggle */}
          {!collapsed && (
            <button
              onClick={toggle}
              aria-label="Collapse sidebar"
              className="hidden md:inline-flex h-7 w-7 items-center justify-center rounded-[7px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <ChevronsLeft size={15} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Expand toggle (desktop, when collapsed) */}
        {collapsed && (
          <div className="hidden md:flex px-3 mt-2.5 mb-1 justify-center">
            <button
              onClick={toggle}
              aria-label="Expand sidebar"
              className="h-7 w-7 inline-flex items-center justify-center rounded-[7px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <ChevronsRight size={15} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-3">
          {sections.map((section, sIdx) => (
            <div key={section.label} className={cn(sIdx > 0 && "mt-5")}>
              {/* Section label — hidden when collapsed on desktop */}
              <div
                className={cn(
                  "text-[10px] font-mono uppercase tracking-[0.1em] text-[var(--text-tertiary)] px-2.5 mb-2 font-medium",
                  collapsed && "md:hidden"
                )}
              >
                {section.label}
              </div>
              {/* Divider for collapsed desktop */}
              {sIdx > 0 && collapsed && (
                <div className="hidden md:block h-px bg-[var(--border)] mx-2 mb-2" />
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = ICONS[item.icon] ?? Folder;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  const linkClasses = cn(
                    "relative flex items-center gap-3 h-9 rounded-[9px]",
                    "text-[13px] transition-all duration-200",
                    "[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
                    // Mobile/expanded: padded with label visible
                    "px-2.5",
                    // Collapsed desktop: center icon only
                    collapsed && "md:px-0 md:justify-center",
                    isActive
                      ? "bg-[var(--accent)] text-white font-medium shadow-[0_4px_12px_-2px_rgba(37,99,235,0.45),0_1px_0_rgba(255,255,255,0.18)_inset]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  );

                  const link = (
                    <Link href={item.href} onClick={closeMobile} className={linkClasses}>
                      <Icon
                        size={16}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className="shrink-0"
                      />
                      <span className={cn("flex-1 truncate", collapsed && "md:hidden")}>
                        {item.label}
                      </span>
                      {item.badge !== undefined && (
                        <>
                          <span
                            className={cn(
                              "font-mono text-[10px] tabular tracking-tight",
                              "px-1.5 h-[18px] inline-flex items-center justify-center rounded-[5px]",
                              collapsed && "md:hidden",
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-[var(--bg-secondary)] text-[var(--text-tertiary)] border border-[var(--border)]"
                            )}
                          >
                            {item.badge}
                          </span>
                          {/* Floating dot for collapsed-desktop */}
                          {collapsed && (
                            <span className="hidden md:inline absolute top-0.5 right-0.5 h-[15px] min-w-[15px] px-[3px] items-center justify-center rounded-full bg-[var(--accent)] text-white font-mono text-[9px] tabular ring-2 ring-[var(--bg-elevated)]">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );

                  return (
                    <li key={item.href}>
                      {/* Tooltip only on collapsed desktop — mobile always shows labels */}
                      {collapsed ? (
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="right"
                              sideOffset={8}
                              className="z-[60] hidden md:block px-2.5 py-1.5 rounded-[6px] bg-slate-900 text-white text-[12px] font-medium shadow-[var(--shadow-lg)] border border-slate-800 data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95"
                            >
                              {item.label}
                              {item.badge !== undefined && (
                                <span className="ml-2 font-mono text-[10px] text-slate-400 tabular">
                                  {item.badge}
                                </span>
                              )}
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      ) : (
                        link
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer — help + profile */}
        <div className="border-t border-[var(--border)] p-3 space-y-1">
          <button
            className={cn(
              "w-full flex items-center gap-2.5 px-2.5 h-9 rounded-[9px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors text-[13px]",
              collapsed && "md:hidden"
            )}
          >
            <HelpCircle size={15} strokeWidth={1.8} />
            <span>Help & support</span>
          </button>

          <button
            className={cn(
              "w-full flex items-center gap-2.5 rounded-[10px] transition-colors text-left group",
              "px-2 py-2 hover:bg-[var(--bg-secondary)]",
              collapsed && "md:h-10 md:w-10 md:mx-auto md:px-0 md:py-0 md:justify-center"
            )}
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center shrink-0 text-white font-medium text-[11px] tracking-wide">
              {user.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
            </div>
            <div className={cn("flex-1 min-w-0", collapsed && "md:hidden")}>
              <div className="text-[12.5px] font-medium text-[var(--text-primary)] truncate">
                {user.name}
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)] truncate">
                {user.firmName}
              </div>
            </div>
            <LogOut
              size={13}
              className={cn(
                "text-[var(--text-tertiary)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                collapsed && "md:hidden"
              )}
            />
          </button>
        </div>
      </aside>
    </Tooltip.Provider>
  );
}
