import { Sidebar } from "@/components/shared/sidebar";
import { SidebarProvider } from "@/components/shared/sidebar-context";
import { PageTransition } from "@/components/shared/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[var(--bg-primary)]">
        <Sidebar role="lawyer" />
        <main className="flex-1 min-w-0 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </SidebarProvider>
  );
}
