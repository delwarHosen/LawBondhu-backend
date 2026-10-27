"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, UserRound } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/shared-controls";
import { Button } from "@/components/ui/button";
import { findLawyer, practiceLabels, cityLabels } from "./mock-data";
import { copy } from "./directory";
export default function LawyerProfile({ id }: { id: string }) {
  const { locale } = useLanguage();
  const lang = locale === "en" ? "en" : "bn";
  const c = copy[lang];
  const lawyer = findLawyer(id);
  const [notice, setNotice] = React.useState(false);
  const number = (v: number) =>
    new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-BD").format(v);
  if (!lawyer)
    return (
      <main className="mx-auto max-w-3xl p-8">
        <p>{lang === "bn" ? "আইনজীবী পাওয়া যায়নি" : "Lawyer not found"}</p>
        <Link className="underline" href="/lawyers">
          {c.directory}
        </Link>
      </main>
    );
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
          <Link
            href="/lawyers"
            className="inline-flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="size-4" />
            {c.directory}
          </Link>
          <div className="flex gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <article className="rounded-2xl border bg-card p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-start gap-5">
            <div className="grid size-24 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <UserRound className="size-12" />
            </div>
            <div className="flex-1">
              <h1 className="font-bengali-display text-3xl font-bold">
                {lang === "bn" ? lawyer.bnName : lawyer.name}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {practiceLabels[lawyer.practice][lang]}
              </p>
              <p className="mt-2 flex items-center gap-1 text-sm">
                <MapPin className="size-4" />
                {cityLabels[lawyer.city][lang]}
              </p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-6 border-y py-5 text-sm">
            <span>
              <Star className="mr-1 inline size-4 fill-amber-400 text-amber-500" />
              {number(lawyer.rating)} ({number(lawyer.reviews)} {c.reviews})
            </span>
            <span>
              {number(lawyer.experience)} {c.years}
            </span>
            <span>
              {c.fee}: ৳{number(lawyer.fee)} / {c.perSession}
            </span>
          </div>
          <h2 className="mt-7 text-lg font-bold">
            {lang === "bn" ? "প্রোফাইল" : "Profile"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {lang === "bn" ? lawyer.bnBio : lawyer.bio}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {lang === "bn" ? lawyer.bnEducation : lawyer.education}
          </p>
          <Button className="mt-8" onClick={() => setNotice(true)}>
            {c.consult}
          </Button>
          {notice && (
            <p
              role="status"
              className="mt-4 rounded-lg bg-accent p-3 text-accent-foreground"
            >
              {c.demo}
            </p>
          )}
        </article>
      </main>
    </div>
  );
}
