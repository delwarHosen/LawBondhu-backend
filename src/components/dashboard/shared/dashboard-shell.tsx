"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Scale,
  CalendarDays,
  FileText,
  Settings,
  Wallet,
  Search,
  Bookmark,
  Bell,
  Menu,
  X,
  ChevronRight,
  UserRound,
  LogOut,
  ShieldCheck,
  BarChart3,
  BriefcaseBusiness,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ThemeSwitcher, LanguageSwitcher } from "@/components/shared-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TranslationKey } from "@/i18n";
export type Role = "admin" | "lawyer" | "user";
const menus: Record<
  Role,
  { key: TranslationKey; icon: React.ElementType; href: string }[]
> = {
  admin: [
    { key: "nav.overview", icon: LayoutDashboard, href: "" },
    { key: "nav.users", icon: Users, href: "#users" },
    { key: "nav.verification", icon: ShieldCheck, href: "#verification" },
    { key: "nav.posts", icon: FileText, href: "#posts" },
    { key: "nav.payments", icon: Wallet, href: "#payments" },
    { key: "nav.reports", icon: BarChart3, href: "#reports" },
  ],
  lawyer: [
    { key: "nav.overview", icon: LayoutDashboard, href: "" },
    { key: "nav.clients", icon: Users, href: "#clients" },
    { key: "nav.cases", icon: BriefcaseBusiness, href: "#cases" },
    { key: "nav.hearings", icon: CalendarDays, href: "#hearings" },
    { key: "nav.consultations", icon: MessageSquare, href: "#consultations" },
    { key: "nav.finance", icon: Wallet, href: "#finance" },
  ],
  user: [
    { key: "nav.overview", icon: LayoutDashboard, href: "" },
    { key: "nav.directory", icon: Search, href: "/#lawyers" },
    { key: "nav.myCases", icon: BriefcaseBusiness, href: "#cases" },
    { key: "nav.consultations", icon: MessageSquare, href: "#consultations" },
    { key: "nav.saved", icon: Bookmark, href: "#saved" },
  ],
};
export function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
export function StatisticCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold">{value}</p>
        </div>
        <Icon className="size-9 text-chart-1" aria-hidden="true" />
      </CardContent>
    </Card>
  );
}
export function PageHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const { t } = useLanguage();
  return (
    <header className="mb-7">
      <nav
        aria-label="Breadcrumb"
        className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Link href="/">{t("common.home")}</Link>
        <ChevronRight className="size-4" />
        <span>{title}</span>
      </nav>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
export function NotificationMenu() {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <Button
        size="icon"
        variant="outline"
        aria-expanded={open}
        aria-label={t("common.notifications")}
        onClick={() => setOpen(!open)}
      >
        <Bell />
      </Button>
      {open && (
        <div
          className="absolute right-0 z-40 mt-2 w-64 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg"
          role="region"
        >
          <strong>{t("common.notifications")}</strong>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("dashboard.noActivity")}
          </p>
        </div>
      )}
    </div>
  );
}
export function ProfileDropdown() {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <Button
        variant="outline"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <UserRound />
        <span className="hidden md:inline">Demo User</span>
      </Button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-52 rounded-xl border bg-popover p-2 shadow-lg">
          <p className="p-2 text-xs text-muted-foreground">
            {t("dashboard.account")}
          </p>
          <button
            className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <Settings className="size-4" />
            {t("common.settings")}
          </button>
          <button
            className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <LogOut className="size-4" />
            {t("common.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
export function Sidebar({
  role,
  onNavigate,
}: {
  role: Role;
  onNavigate?: () => void;
}) {
  const { t } = useLanguage();
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="flex items-center gap-3 border-b px-5 py-6 text-xl font-extrabold"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-chart-1 text-white">
          <Scale />
        </span>
        {t("common.app")}
      </Link>
      <nav
        aria-label={t("dashboard.navigation")}
        className="flex-1 space-y-1 p-3"
      >
        {menus[role].map(({ key, icon: Icon, href }) => (
          <Link
            key={key}
            href={href.startsWith("/") ? href : `/dashboard/${role}${href}`}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted ${href === "" && pathname === `/dashboard/${role}` ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <Icon className="size-5" />
            {t(key)}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4 text-xs text-muted-foreground">
        {t("dashboard.demoNotice")}
      </div>
    </div>
  );
}
export function Topbar({ role, onMenu }: { role: Role; onMenu: () => void }) {
  const { t } = useLanguage();
  return (
    <header className="flex h-18 items-center justify-between gap-3 border-b bg-card px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={t("common.menu")}
          onClick={onMenu}
        >
          <Menu />
        </Button>
        <span className="font-semibold">
          {t(`dashboard.${role}` as TranslationKey)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <NotificationMenu />
        <ProfileDropdown />
      </div>
    </header>
  );
}
export function MobileNavigation({
  role,
  open,
  onClose,
}: {
  role: Role;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label={t("common.close")}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <aside className="relative h-full w-72 max-w-[85vw] bg-card">
        <button
          className="absolute right-2 top-2 z-10 rounded-md p-2"
          aria-label={t("common.close")}
          onClick={onClose}
        >
          <X />
        </button>
        <Sidebar role={role} onNavigate={onClose} />
      </aside>
    </div>
  );
}
export function DashboardShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[255px_1fr]">
      <aside className="hidden border-r bg-card lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar role={role} />
        </div>
      </aside>
      <div className="min-w-0">
        <Topbar role={role} onMenu={() => setOpen(true)} />
        <main>
          <ContentContainer>{children}</ContentContainer>
        </main>
      </div>
      <MobileNavigation
        role={role}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
