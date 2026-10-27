import { DashboardShell } from "@/components/dashboard/shared/dashboard-shell";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="user">{children}</DashboardShell>;
}
