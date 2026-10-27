"use client";

import * as React from "react";
import Link from "next/link";

import { ArrowLeft, MapPin, Star, UserRound } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/shared-controls";
import { Button } from "@/components/ui/button";

import en from "@/i18n/en.json";
import bn from "@/i18n/bn.json";

import { findLawyer } from "./mock-data";

export default function LawyerProfile({ id }: { id: string }) {
  const { locale } = useLanguage();
  const lang = locale === "en" ? "en" : "bn";
  const t = lang === "bn" ? bn.lawyerDirectory : en.lawyerDirectory;

  const lawyer = findLawyer(id);
  const [notice, setNotice] = React.useState(false);

  const number = (value: number) =>
    new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-BD").format(value);

  if (!lawyer) {
    return (
      <main className="min-h-screen bg-background px-4 py-20 text-center text-foreground">
        <h1 className="text-2xl font-bold">{t.notFound}</h1>

        <p className="mt-3 text-muted-foreground">{t.notFoundDetail}</p>

        <Button asChild className="mt-6">
          <Link href="/lawyers">
            <ArrowLeft className="size-4" />
            {t.backToDirectory}
          </Link>
        </Button>
      </main>
    );
  }

  const name = lang === "bn" ? lawyer.bnName : lawyer.name;

  const biography = lang === "bn" ? lawyer.bnBio : lawyer.bio;

  const education = lang === "bn" ? lawyer.bnEducation : lawyer.education;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/lawyers"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" />
            {t.backToDirectory}
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-start gap-5">
            <div
              aria-hidden="true"
              className="grid size-24 place-items-center rounded-2xl bg-accent text-accent-foreground"
            >
              <UserRound className="size-12" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="font-bengali-display text-3xl font-bold leading-relaxed">
                {name}
              </h1>

              <p className="mt-2 text-muted-foreground">
                {t.practiceAreas[lawyer.practice]}
              </p>

              <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {t.cities[lawyer.city]}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-6 border-y border-border py-5 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star
                aria-hidden="true"
                className="size-4 fill-amber-400 text-amber-500"
              />
              {number(lawyer.rating)}
              {" ("}
              {number(lawyer.reviews)} {t.reviews}
              {")"}
            </span>

            <span>
              {number(lawyer.experience)} {t.years}
            </span>

            <span>
              {t.fee}: ৳{number(lawyer.fee)}
              {" / "}
              {t.perSession}
            </span>
          </div>

          <section className="mt-7">
            <h2 className="text-xl font-bold">{t.aboutLawyer}</h2>

            <p className="mt-3 leading-8 text-muted-foreground">{biography}</p>
          </section>

          <section className="mt-7">
            <h2 className="text-xl font-bold">{t.education}</h2>

            <p className="mt-3 text-muted-foreground">{education}</p>
          </section>

          <section className="mt-7">
            <h2 className="text-xl font-bold">{t.specialization}</h2>

            <p className="mt-3 text-muted-foreground">
              {t.practiceAreas[lawyer.practice]}
            </p>
          </section>

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-4 text-sm text-muted-foreground">
              {t.fee}: ৳{number(lawyer.fee)}
              {" / "}
              {t.perSession}
            </p>

            <Button onClick={() => setNotice(true)}>{t.consult}</Button>

            {notice && (
              <div
                role="status"
                className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-border bg-accent p-4 text-accent-foreground"
              >
                <p>{t.demo}</p>

                <button
                  type="button"
                  aria-label={t.close}
                  onClick={() => setNotice(false)}
                  className="rounded-md p-1 hover:bg-background/50 focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {t.close}
                </button>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
