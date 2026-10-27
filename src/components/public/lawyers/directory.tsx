"use client";
import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Scale,
  Search,
  SlidersHorizontal,
  Star,
  UserRound,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/shared-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  lawyerDirectory,
  practiceLabels,
  cityLabels,
  type Lawyer,
} from "./mock-data";

type Lang = "bn" | "en";
const copy = {
  bn: {
    directory: "আইনজীবী খুঁজুন",
    description:
      "আপনার প্রয়োজন অনুযায়ী আইনজীবী বেছে নিন। সব প্রোফাইল ও মূল্য কাল্পনিক ডেমো তথ্য।",
    home: "হোম",
    search: "নাম দিয়ে খুঁজুন",
    searchPlaceholder: "আইনজীবীর নাম লিখুন",
    practice: "আইনের ক্ষেত্র",
    location: "অবস্থান",
    rating: "ন্যূনতম রেটিং",
    sort: "সাজান",
    all: "সব",
    ratingSort: "সর্বোচ্চ রেটিং",
    experienceSort: "সর্বাধিক অভিজ্ঞতা",
    feeLow: "কম ফি প্রথমে",
    feeHigh: "বেশি ফি প্রথমে",
    nameSort: "নামের ক্রমানুসারে",
    lawyers: "জন আইনজীবী",
    years: "বছরের অভিজ্ঞতা",
    reviews: "রিভিউ",
    fee: "পরামর্শ ফি",
    profile: "প্রোফাইল দেখুন",
    consult: "পরামর্শ নিন",
    more: "আরও দেখুন",
    reset: "ফিল্টার মুছুন",
    empty: "কোনো আইনজীবী পাওয়া যায়নি",
    emptyDetail: "অন্য নাম বা ফিল্টার দিয়ে আবার চেষ্টা করুন।",
    demo: "ডেমো: কোনো বুকিং পাঠানো হয়নি।",
    close: "বন্ধ করুন",
    results: "অনুসন্ধানের ফলাফল",
    filters: "ফিল্টার",
    perSession: "প্রতি সেশন",
    allRatings: "সব রেটিং",
  },
  en: {
    directory: "Find a lawyer",
    description:
      "Explore lawyers by specialty and location. All profiles and fees are fictional demonstration data.",
    home: "Home",
    search: "Search by name",
    searchPlaceholder: "Enter lawyer name",
    practice: "Practice area",
    location: "Location",
    rating: "Minimum rating",
    sort: "Sort by",
    all: "All",
    ratingSort: "Highest rated",
    experienceSort: "Most experienced",
    feeLow: "Lowest fee first",
    feeHigh: "Highest fee first",
    nameSort: "Name A–Z",
    lawyers: "lawyers",
    years: "years of experience",
    reviews: "reviews",
    fee: "Consultation fee",
    profile: "View profile",
    consult: "Consult",
    more: "Load more",
    reset: "Reset filters",
    empty: "No lawyers found",
    emptyDetail: "Try a different name or clear your filters.",
    demo: "Demo only: no consultation was booked.",
    close: "Close",
    results: "Search results",
    filters: "Filters",
    perSession: "per session",
    allRatings: "All ratings",
  },
} as const;
export { copy };
const PAGE_SIZE = 6;
export function LawyerCard({
  lawyer,
  lang,
  onConsult,
}: {
  lawyer: Lawyer;
  lang: Lang;
  onConsult: () => void;
}) {
  const c = copy[lang];
  const number = (n: number) =>
    new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-BD").format(n);
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start gap-4">
          <div
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"
          >
            <UserRound className="size-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold leading-relaxed">
              {lang === "bn" ? lawyer.bnName : lawyer.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {practiceLabels[lawyer.practice][lang]}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {cityLabels[lawyer.city][lang]}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1 font-semibold">
            <Star className="size-4 fill-amber-400 text-amber-500" />
            {number(lawyer.rating)}{" "}
            <span className="font-normal text-muted-foreground">
              ({number(lawyer.reviews)} {c.reviews})
            </span>
          </span>
          <span>
            {number(lawyer.experience)} {c.years}
          </span>
        </div>
        <div className="mt-auto border-t pt-4">
          <p className="text-xs text-muted-foreground">{c.fee}</p>
          <p className="text-xl font-bold">
            ৳{number(lawyer.fee)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              / {c.perSession}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/lawyers/${lawyer.id}`}>
              {c.profile}
              <ArrowRight />
            </Link>
          </Button>
          <Button className="flex-1" onClick={onConsult}>
            {c.consult}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default function LawyerDirectory() {
  const { locale } = useLanguage();
  const lang: Lang = locale === "en" ? "en" : "bn";
  const c = copy[lang];
  const [query, setQuery] = React.useState("");
  const [practice, setPractice] = React.useState("all");
  const [city, setCity] = React.useState("all");
  const [minRating, setMinRating] = React.useState("0");
  const [sort, setSort] = React.useState("rating");
  const [limit, setLimit] = React.useState(PAGE_SIZE);
  const [notice, setNotice] = React.useState(false);
  const number = (n: number) =>
    new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-BD").format(n);
  const resetPage = () => setLimit(PAGE_SIZE);
  const filtered = React.useMemo(
    () =>
      lawyerDirectory
        .filter(
          (l) =>
            (l.name
              .toLocaleLowerCase()
              .includes(query.trim().toLocaleLowerCase()) ||
              l.bnName.includes(query.trim())) &&
            (practice === "all" || l.practice === practice) &&
            (city === "all" || l.city === city) &&
            l.rating >= Number(minRating),
        )
        .sort((a, b) =>
          sort === "experience"
            ? b.experience - a.experience
            : sort === "feeLow"
              ? a.fee - b.fee
              : sort === "feeHigh"
                ? b.fee - a.fee
                : sort === "name"
                  ? a.name.localeCompare(b.name)
                  : b.rating - a.rating || b.reviews - a.reviews,
        ),
    [query, practice, city, minRating, sort],
  );
  const reset = () => {
    setQuery("");
    setPractice("all");
    setCity("all");
    setMinRating("0");
    setSort("rating");
    resetPage();
  };
  const field =
    "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-bold"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Scale />
            </span>
            Law Helper
          </Link>
          <nav
            className="flex flex-wrap items-center gap-2"
            aria-label={c.home}
          >
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              {c.home}
            </Link>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="max-w-3xl">
          <h1 className="font-bengali-display text-3xl font-bold leading-relaxed sm:text-4xl">
            {c.directory}
          </h1>
          <p className="mt-2 text-muted-foreground">{c.description}</p>
        </div>
        <div className="mt-8 grid items-start gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="rounded-2xl border bg-card p-5 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 font-bold">
              <SlidersHorizontal className="size-5" />
              {c.filters}
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="directory-search"
                  className="mb-2 block text-sm font-medium"
                >
                  {c.search}
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
                  <Input
                    id="directory-search"
                    className="h-11 pl-10"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      resetPage();
                    }}
                    placeholder={c.searchPlaceholder}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="directory-practice"
                  className="mb-2 block text-sm font-medium"
                >
                  {c.practice}
                </label>
                <select
                  id="directory-practice"
                  className={field}
                  value={practice}
                  onChange={(e) => {
                    setPractice(e.target.value);
                    resetPage();
                  }}
                >
                  <option value="all">{c.all}</option>
                  {Object.entries(practiceLabels).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value[lang]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="directory-location"
                  className="mb-2 block text-sm font-medium"
                >
                  {c.location}
                </label>
                <select
                  id="directory-location"
                  className={field}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    resetPage();
                  }}
                >
                  <option value="all">{c.all}</option>
                  {Object.entries(cityLabels).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value[lang]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="directory-rating"
                  className="mb-2 block text-sm font-medium"
                >
                  {c.rating}
                </label>
                <select
                  id="directory-rating"
                  className={field}
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(e.target.value);
                    resetPage();
                  }}
                >
                  <option value="0">{c.allRatings}</option>
                  {[4, 4.5, 4.8].map((r) => (
                    <option key={r} value={r}>
                      {number(r)}+
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="outline" className="w-full" onClick={reset}>
                <X />
                {c.reset}
              </Button>
            </div>
          </aside>
          <section aria-label={c.results}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p aria-live="polite" className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  {number(filtered.length)}
                </strong>{" "}
                {c.lawyers}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="directory-sort" className="text-sm font-medium">
                  {c.sort}
                </label>
                <select
                  id="directory-sort"
                  className={`${field} w-auto max-w-[190px]`}
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    resetPage();
                  }}
                >
                  <option value="rating">{c.ratingSort}</option>
                  <option value="experience">{c.experienceSort}</option>
                  <option value="feeLow">{c.feeLow}</option>
                  <option value="feeHigh">{c.feeHigh}</option>
                  <option value="name">{c.nameSort}</option>
                </select>
              </div>
            </div>
            {filtered.length ? (
              <>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.slice(0, limit).map((l) => (
                    <LawyerCard
                      key={l.id}
                      lawyer={l}
                      lang={lang}
                      onConsult={() => setNotice(true)}
                    />
                  ))}
                </div>
                {limit < filtered.length && (
                  <div className="mt-8 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setLimit((n) => n + PAGE_SIZE)}
                    >
                      {c.more}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border bg-card px-5 py-20 text-center">
                <Search className="mx-auto size-10 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-bold">{c.empty}</h2>
                <p className="mt-2 text-muted-foreground">{c.emptyDetail}</p>
                <Button className="mt-5" onClick={reset}>
                  {c.reset}
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
      {notice && (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-xl"
        >
          <span>{c.demo}</span>
          <button
            aria-label={c.close}
            onClick={() => setNotice(false)}
            className="rounded-lg p-1 hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
