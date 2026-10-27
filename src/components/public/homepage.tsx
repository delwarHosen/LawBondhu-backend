"use client";
import * as React from "react";
import Link from "next/link";
import {
  Scale,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  Users,
  MapPin,
  Star,
  ChevronDown,
  CalendarCheck,
  Menu,
  X,
  Gavel,
  Landmark,
  BriefcaseBusiness,
  HeartHandshake,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { ThemeSwitcher, LanguageSwitcher } from "@/components/shared-controls";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { categories, cities, lawyers } from "@/data/public";
import type { TranslationKey } from "@/i18n";
const categoryIcons = [
  HeartHandshake,
  Gavel,
  Landmark,
  BriefcaseBusiness,
  Users,
  FileCheck2,
];
function Brand() {
  const { t } = useLanguage();
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-[#166d73] text-white">
        <Scale className="size-6" />
      </span>
      <span>{t("common.app")}</span>
    </Link>
  );
}
function PublicHeader() {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav
          aria-label={t("common.menu")}
          className="hidden items-center gap-8 text-sm font-semibold lg:flex"
        >
          <a href="#services" className="hover:text-chart-1">
            {t("nav.services")}
          </a>
          <a href="#lawyers" className="hover:text-chart-1">
            {t("nav.lawyers")}
          </a>
          <a href="#advice" className="hover:text-chart-1">
            {t("nav.advice")}
          </a>
          <a href="#how" className="hover:text-chart-1">
            {t("nav.how")}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <Link
            href="/dashboard/user"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted md:inline-flex"
          >
            {t("nav.login")}
          </Link>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/dashboard/user">
              {t("nav.register")}
              <ArrowUpRight />
            </Link>
          </Button>
          <Button
            className="lg:hidden"
            variant="outline"
            size="icon"
            aria-label={t("common.menu")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="space-y-2 border-t bg-card p-4 lg:hidden">
          <div className="flex gap-2 pb-3 sm:hidden">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          {[
            ["nav.services", "#services"],
            ["nav.lawyers", "#lawyers"],
            ["nav.advice", "#advice"],
            ["nav.how", "#how"],
            ["nav.login", "/dashboard/user"],
            ["nav.register", "/dashboard/user"],
          ].map(([label, href]) => (
            <Link
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 font-medium hover:bg-muted"
              key={label}
              href={href}
            >
              {t(label as TranslationKey)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-9 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-chart-1">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold leading-[1.4] tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
export default function Homepage() {
  const { t, locale, number } = useLanguage();
  const [practice, setPractice] = React.useState("all");
  const [city, setCity] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [applied, setApplied] = React.useState<{
    practice: string;
    city: string;
    query: string;
  } | null>(null);
  const [toast, setToast] = React.useState(false);
  const filtered = lawyers.filter(
    (l) =>
      !applied ||
      ((applied.practice === "all" || l.practice === applied.practice) &&
        (applied.city === "all" || l.city === applied.city) &&
        (!applied.query ||
          `${l.name} ${l.bnName} ${l.practice}`
            .toLowerCase()
            .includes(applied.query.toLowerCase()))),
  );
  const search = () => {
    setApplied({ practice, city, query });
    document.getElementById("lawyers")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <section className="relative overflow-hidden border-b bg-card">
          <div className="pointer-events-none absolute -right-24 top-5 size-[520px] rounded-full bg-chart-1/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-chart-2/8 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-18 pt-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:py-24 lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-chart-1/25 bg-accent/60 px-4 py-2 text-xs font-bold text-accent-foreground">
                <ShieldCheck className="size-4" />
                {t("home.eyebrow")}
              </span>
              <h1 className="font-bengali-display mt-7 max-w-3xl text-4xl font-bold leading-[1.45] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                {t("home.headline")}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                {t("home.subheadline")}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#search">
                    <Search />
                    {t("home.findLawyer")}
                    <ArrowRight />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#services">{t("home.explore")}</a>
                </Button>
              </div>
              <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-5 text-chart-1" />
                {t("home.trusted")}
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-[2rem] border border-chart-1/20 bg-gradient-to-br from-[#16354c] to-[#0b535b] p-8 text-white shadow-2xl sm:p-11">
                <div className="mb-10 flex items-center justify-between">
                  <Scale className="size-14 opacity-90" />
                  <span className="rounded-full border border-white/25 px-3 py-1 text-xs">
                    LAW HELPER / BD
                  </span>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15">
                      <Search />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t("home.step1")}</p>
                      <p className="mt-1 text-xs text-white/75">
                        {t("home.step1Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15">
                      <ShieldCheck />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t("home.step2")}</p>
                      <p className="mt-1 text-xs text-white/75">
                        {t("home.step2Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15">
                      <CalendarCheck />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t("home.step3")}</p>
                      <p className="mt-1 text-xs text-white/75">
                        {t("home.step3Desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 rounded-2xl border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-lg">
                ⚖️ {t("common.demo")}
              </div>
            </div>
          </div>
        </section>
        <section
          id="search"
          className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
            className="rounded-2xl border bg-card p-5 shadow-lg sm:p-7"
          >
            <h2 className="mb-5 text-xl font-bold">{t("home.searchTitle")}</h2>
            <div className="grid gap-3 md:grid-cols-[1.3fr_1fr_1fr_auto]">
              <Input
                aria-label={t("home.searchPlaceholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("home.searchPlaceholder")}
              />
              <select
                aria-label={t("home.practice")}
                value={practice}
                onChange={(e) => setPractice(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-card-foreground"
              >
                <option value="all">{t("home.allPractices")}</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {t(`data.${c}` as TranslationKey)}
                  </option>
                ))}
              </select>
              <select
                aria-label={t("home.location")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-card-foreground"
              >
                <option value="all">{t("home.allLocations")}</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {t(`data.${c}` as TranslationKey)}
                  </option>
                ))}
              </select>
              <Button type="submit">
                <Search />
                {t("common.search")}
              </Button>
            </div>
          </form>
        </section>
        <section
          id="services"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <SectionHeading
            title={t("home.categories")}
            subtitle={t("home.categoriesSub")}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((c, i) => {
              const Icon = categoryIcons[i];
              return (
                <button
                  key={c}
                  onClick={() => {
                    setPractice(c);
                    setApplied({ practice: c, city: "all", query: "" });
                    document
                      .getElementById("lawyers")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group rounded-2xl border bg-card p-5 text-left transition hover:-translate-y-1 hover:border-chart-1 hover:shadow-md"
                >
                  <span className="mb-6 grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Icon />
                  </span>
                  <span className="block font-semibold">
                    {t(`data.${c}` as TranslationKey)}
                  </span>
                  <ArrowUpRight className="mt-4 size-4 text-muted-foreground group-hover:text-chart-1" />
                </button>
              );
            })}
          </div>
        </section>
        <section id="lawyers" className="bg-muted/60 py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t("home.featured")}
              subtitle={t("home.featuredSub")}
            />
            {applied && (
              <p
                aria-live="polite"
                className="mb-4 text-sm text-muted-foreground"
              >
                {number(filtered.length)} {t("home.results")} ·{" "}
                <button
                  className="underline"
                  onClick={() => {
                    setApplied(null);
                    setPractice("all");
                    setCity("all");
                    setQuery("");
                  }}
                >
                  {t("forms.clear")}
                </button>
              </p>
            )}
            {filtered.length ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((l, i) => (
                  <Card key={l.id} className="overflow-hidden">
                    <div
                      className={`flex h-44 items-center justify-center ${i % 2 ? "bg-gradient-to-br from-[#28586a] to-[#173248]" : "bg-gradient-to-br from-[#0c666b] to-[#17344b]"}`}
                    >
                      <div className="grid size-24 place-items-center rounded-full border-4 border-white/25 bg-white/15 text-3xl font-bold text-white">
                        {l.initials}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                          {t(`data.${l.practice}` as TranslationKey)}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-semibold">
                          <Star className="size-4 fill-amber-500 text-amber-500" />
                          {l.rating}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold">
                        {locale === "bn" ? l.bnName : l.name}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-4" />
                        {t(`data.${l.city}` as TranslationKey)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {number(l.experience)} {t("home.experience")}
                      </p>
                      <Button
                        onClick={() => {
                          setToast(true);
                          window.setTimeout(() => setToast(false), 4000);
                        }}
                        className="mt-5 w-full"
                        variant="outline"
                      >
                        {t("home.consult")}
                        <ArrowRight />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p
                role="status"
                className="rounded-xl border bg-card p-8 text-center"
              >
                {t("home.noResults")}
              </p>
            )}
          </div>
        </section>
        <section
          id="how"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <SectionHeading title={t("home.howTitle")} />
          <div className="grid gap-6 md:grid-cols-3">
            {[Search, BookOpen, CalendarCheck].map((Icon, i) => (
              <div key={i} className="rounded-2xl border bg-card p-7">
                <div className="mb-7 flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon className="size-7" />
                  </span>
                  <span className="text-4xl font-black text-muted-foreground/35">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold">
                  {t(`home.step${i + 1}` as TranslationKey)}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {t(`home.step${i + 1}Desc` as TranslationKey)}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="border-y bg-card py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t("home.benefits")} />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border bg-background p-8">
                <Users className="mb-5 size-10 text-chart-1" />
                <h3 className="text-xl font-bold">{t("home.forUsers")}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t("home.forUsersDesc")}
                </p>
                <Link
                  href="/dashboard/user"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-chart-1"
                >
                  {t("common.learnMore")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="rounded-2xl border bg-background p-8">
                <BriefcaseBusiness className="mb-5 size-10 text-chart-1" />
                <h3 className="text-xl font-bold">{t("home.forLawyers")}</h3>
                <p className="mt-3 text-muted-foreground">
                  {t("home.forLawyersDesc")}
                </p>
                <Link
                  href="/dashboard/lawyer"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-chart-1"
                >
                  {t("common.learnMore")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="advice"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <SectionHeading
            title={t("home.articles")}
            subtitle={t("home.articlesSub")}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {["article1", "article2", "article3"].map((a, i) => (
              <article
                key={a}
                className="overflow-hidden rounded-2xl border bg-card"
              >
                <div className="grid h-40 place-items-center bg-gradient-to-br from-chart-2/20 to-chart-1/15">
                  {i === 0 ? (
                    <FileCheck2 className="size-14 text-chart-1" />
                  ) : i === 1 ? (
                    <Landmark className="size-14 text-chart-1" />
                  ) : (
                    <HeartHandshake className="size-14 text-chart-1" />
                  )}
                </div>
                <div className="p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-chart-1">
                    {t("nav.advice")}
                  </p>
                  <h3 className="min-h-16 text-lg font-bold">
                    {t(`data.${a}` as TranslationKey)}
                  </h3>
                  <a
                    href="#faq"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-chart-1"
                  >
                    {t("home.read")}
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="faq" className="border-y bg-muted/60 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t("home.faq")} />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <details
                  key={i}
                  className="group rounded-xl border bg-card p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {t(`data.faq${i}` as TranslationKey)}
                    <ChevronDown className="size-5 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    {t(`data.answer${i}` as TranslationKey)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[#143c51] px-6 py-14 text-center text-white sm:px-14">
            <Scale className="mx-auto mb-5 size-11 text-[#8ce0d8]" />
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.4]">
              {t("home.ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              {t("home.ctaDesc")}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 bg-white text-[#143c51] hover:bg-white/90"
            >
              <a href="#search">
                {t("home.findLawyer")}
                <ArrowRight />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <Brand />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t("home.footer")}
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-bold">{t("nav.services")}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a className="block hover:underline" href="#lawyers">
                {t("nav.lawyers")}
              </a>
              <a className="block hover:underline" href="#advice">
                {t("nav.advice")}
              </a>
              <a className="block hover:underline" href="#how">
                {t("nav.how")}
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold">{t("dashboard.switchRole")}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {["admin", "lawyer", "user"].map((r) => (
                <Link
                  className="block hover:underline"
                  key={r}
                  href={`/dashboard/${r}`}
                >
                  {t(`dashboard.${r}` as TranslationKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t px-4 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Law Helper · {t("home.copyright")} ·{" "}
          {t("common.demo")}
        </div>
      </footer>
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border bg-card p-5 text-card-foreground shadow-xl"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-chart-1" />
            <span>{t("home.requestSent")}</span>
            <button
              aria-label={t("common.close")}
              onClick={() => setToast(false)}
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
