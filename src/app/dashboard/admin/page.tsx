"use client";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import {
  PageHeading,
  StatisticCard,
} from "@/components/dashboard/shared/dashboard-shell";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
export default function Page() {
  const { t, number } = useLanguage();
  return (
    <>
      <PageHeading
        title={t("dashboard.welcome")}
        description={t("dashboard.summary")}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatisticCard
          title={t("dashboard.activeCases")}
          value={number(28)}
          icon={BriefcaseBusiness}
        />
        <StatisticCard
          title={t("dashboard.upcoming")}
          value={number(7)}
          icon={CalendarDays}
        />
        <StatisticCard
          title={t("dashboard.newRequests")}
          value={number(13)}
          icon={LayoutDashboard}
        />
        <StatisticCard
          title={t("dashboard.totalLawyers")}
          value={number(125)}
          icon={Users}
        />
      </div>
      <Card className="mt-7">
        <CardContent className="p-7">
          <h2 className="text-lg font-semibold">{t("dashboard.recent")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("dashboard.noActivity")}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
