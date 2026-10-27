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

import en from "@/i18n/en.json";
import bn from "@/i18n/bn.json";

import {
  lawyerDirectory,
  practiceAreas,
  lawyerCities,
  type Lawyer,
} from "./mock-data";

export type Lang = "bn" | "en";

const translations = {
  en: en.lawyerDirectory,
  bn: bn.lawyerDirectory,
};

export type DirectoryCopy = typeof translations.en;

export function useLawyerTranslations() {
  const { locale } = useLanguage();
  const lang: Lang = locale === "en" ? "en" : "bn";

  return {
    lang,
    t: translations[lang],
    number: (value: number) =>
      new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-BD").format(value),
  };
}

const PAGE_SIZE = 6;

type LawyerCardProps = {
  lawyer: Lawyer;
  lang: Lang;
  t: DirectoryCopy;
  onConsult: () => void;
};

export function LawyerCard({ lawyer, lang, t, onConsult }: LawyerCardProps) {
  const number = (value: number) =>
    new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-BD").format(value);

  const name = lang === "bn" ? lawyer.bnName : lawyer.name;

  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start gap-4">
          <div
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"
          >
            <UserRound className="size-8" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold leading-relaxed">{name}</h2>

            <p className="text-sm text-muted-foreground">
              {t.practiceAreas[lawyer.practice]}
            </p>

            <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {t.cities[lawyer.city]}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1 font-semibold">
            <Star
              aria-hidden="true"
              className="size-4 fill-amber-400 text-amber-500"
            />
            {number(lawyer.rating)}
            <span className="font-normal text-muted-foreground">
              ({number(lawyer.reviews)} {t.reviews})
            </span>
          </span>

          <span>
            {number(lawyer.experience)} {t.years}
          </span>
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">{t.fee}</p>

          <p className="text-xl font-bold">
            ৳{number(lawyer.fee)}
            <span className="text-xs font-normal text-muted-foreground">
              {" / "}
              {t.perSession}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="min-w-0 flex-1">
            <Link href={`/lawyers/${lawyer.id}`}>
              {t.profile}
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button className="min-w-0 flex-1" onClick={onConsult}>
            {t.consult}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LawyerDirectory() {
  const { lang, t, number } = useLawyerTranslations();

  const [query, setQuery] = React.useState("");
  const [practice, setPractice] = React.useState("all");
  const [city, setCity] = React.useState("all");
  const [minRating, setMinRating] = React.useState("0");
  const [sort, setSort] = React.useState("rating");
  const [limit, setLimit] = React.useState(PAGE_SIZE);
  const [notice, setNotice] = React.useState(false);

  const resetPage = () => setLimit(PAGE_SIZE);

  const reset = () => {
    setQuery("");
    setPractice("all");
    setCity("all");
    setMinRating("0");
    setSort("rating");
    resetPage();
  };

  const filtered = React.useMemo(() => {
    const search = query.trim().toLocaleLowerCase();

    return lawyerDirectory
      .filter((lawyer) => {
        const matchesName =
          lawyer.name.toLocaleLowerCase().includes(search) ||
          lawyer.bnName.includes(search);

        const matchesPractice =
          practice === "all" || lawyer.practice === practice;

        const matchesCity = city === "all" || lawyer.city === city;

        const matchesRating = lawyer.rating >= Number(minRating);

        return matchesName && matchesPractice && matchesCity && matchesRating;
      })
      .sort((a, b) => {
        switch (sort) {
          case "experience":
            return b.experience - a.experience;

          case "feeLow":
            return a.fee - b.fee;

          case "feeHigh":
            return b.fee - a.fee;

          case "name":
            return lang === "bn"
              ? a.bnName.localeCompare(b.bnName, "bn")
              : a.name.localeCompare(b.name, "en");

          default:
            return b.rating - a.rating || b.reviews - a.reviews;
        }
      });
  }, [query, practice, city, minRating, sort, lang]);

  const visibleLawyers = filtered.slice(0, limit);

  const fieldClass =
    "h-11 w-full rounded-lg border border-input " +
    "bg-background px-3 text-sm text-foreground " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-ring";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-bold"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Scale aria-hidden="true" />
            </span>
            Law Helper
          </Link>

          <nav
            className="flex flex-wrap items-center gap-2"
            aria-label={t.navigation}
          >
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              {t.home}
            </Link>

            <LanguageSwitcher />
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="max-w-3xl">
          <h1 className="font-bengali-display text-3xl font-bold leading-relaxed sm:text-4xl">
            {t.directory}
          </h1>

          <p className="mt-2 text-muted-foreground">{t.description}</p>
        </div>

        <div className="mt-8 grid items-start gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 font-bold">
              <SlidersHorizontal className="size-5" />
              {t.filters}
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="directory-search"
                  className="mb-2 block text-sm font-medium"
                >
                  {t.search}
                </label>

                <div className="relative">
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground"
                  />

                  <Input
                    id="directory-search"
                    className="h-11 pl-10"
                    value={query}
                    placeholder={t.searchPlaceholder}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      resetPage();
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="directory-practice"
                  className="mb-2 block text-sm font-medium"
                >
                  {t.practice}
                </label>

                <select
                  id="directory-practice"
                  className={fieldClass}
                  value={practice}
                  onChange={(event) => {
                    setPractice(event.target.value);
                    resetPage();
                  }}
                >
                  <option value="all">{t.all}</option>

                  {practiceAreas.map((area) => (
                    <option key={area} value={area}>
                      {t.practiceAreas[area]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="directory-location"
                  className="mb-2 block text-sm font-medium"
                >
                  {t.location}
                </label>

                <select
                  id="directory-location"
                  className={fieldClass}
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    resetPage();
                  }}
                >
                  <option value="all">{t.all}</option>

                  {lawyerCities.map((item) => (
                    <option key={item} value={item}>
                      {t.cities[item]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="directory-rating"
                  className="mb-2 block text-sm font-medium"
                >
                  {t.rating}
                </label>

                <select
                  id="directory-rating"
                  className={fieldClass}
                  value={minRating}
                  onChange={(event) => {
                    setMinRating(event.target.value);
                    resetPage();
                  }}
                >
                  <option value="0">{t.allRatings}</option>

                  {[4, 4.5, 4.8].map((rating) => (
                    <option key={rating} value={rating}>
                      {number(rating)}+
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="outline" className="w-full" onClick={reset}>
                <X className="size-4" />
                {t.reset}
              </Button>
            </div>
          </aside>

          <section aria-label={t.results}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p aria-live="polite" className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  {number(filtered.length)}
                </strong>{" "}
                {t.lawyers}
              </p>

              <div className="flex items-center gap-2">
                <label htmlFor="directory-sort" className="text-sm font-medium">
                  {t.sort}
                </label>

                <select
                  id="directory-sort"
                  className={`${fieldClass} w-auto max-w-[190px]`}
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                    resetPage();
                  }}
                >
                  <option value="rating">{t.ratingSort}</option>
                  <option value="experience">{t.experienceSort}</option>
                  <option value="feeLow">{t.feeLow}</option>
                  <option value="feeHigh">{t.feeHigh}</option>
                  <option value="name">{t.nameSort}</option>
                </select>
              </div>
            </div>

            {filtered.length > 0 ? (
              <>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleLawyers.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      lang={lang}
                      t={t}
                      onConsult={() => setNotice(true)}
                    />
                  ))}
                </div>

                {limit < filtered.length && (
                  <div className="mt-8 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setLimit((current) => current + PAGE_SIZE)}
                    >
                      {t.more}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-border bg-card px-5 py-20 text-center">
                <Search className="mx-auto size-10 text-muted-foreground" />

                <h2 className="mt-4 text-xl font-bold">{t.empty}</h2>

                <p className="mt-2 text-muted-foreground">{t.emptyDetail}</p>

                <Button className="mt-5" onClick={reset}>
                  {t.reset}
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>

      {notice && (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl"
        >
          <span>{t.demo}</span>

          <button
            type="button"
            aria-label={t.close}
            onClick={() => setNotice(false)}
            className="rounded-lg p-1 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
