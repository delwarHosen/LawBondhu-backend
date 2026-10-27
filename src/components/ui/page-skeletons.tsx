import { Skeleton } from "@/components/ui/skeleton";

import type { ReactNode } from "react";

type PageSkeletonProps = {
  className?: string;
  children?: ReactNode;
};

/** Decorative loading placeholders: no personal or legal information is cached. */
function Line({ className = "" }: PageSkeletonProps) {
  return <Skeleton className={`h-4 ${className}`} />;
}
function Block({ className = "", children }: PageSkeletonProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function PublicHeaderSkeleton() {
  return (
    <header aria-hidden="true" className="border-b bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-5 sm:px-6">
        <Skeleton className="h-10 w-36" />
        <div className="hidden gap-4 md:flex">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="size-10" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </header>
  );
}
export function LawyerCardSkeleton() {
  return (
    <Block className="flex min-h-72 flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton className="size-16 shrink-0 rounded-2xl" />
        <div className="flex-1 space-y-3">
          <Line className="w-3/4" />
          <Line className="w-1/2" />
          <Line className="w-2/5" />
        </div>
      </div>
      <Line className="w-4/5" />
      <div className="mt-auto space-y-3 border-t pt-4">
        <Line className="w-1/3" />
        <Skeleton className="h-7 w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </Block>
  );
}
export function HomePageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Page loading"
      className="min-h-screen bg-background"
    >
      <PublicHeaderSkeleton />
      <main aria-hidden="true">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="space-y-6">
            <Line className="w-28" />
            <Skeleton className="h-14 w-5/6" />
            <Skeleton className="h-14 w-3/4" />
            <Line className="w-full" />
            <Line className="w-5/6" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          <Skeleton className="min-h-64 w-full rounded-3xl" />
        </section>
        <section className="mx-auto max-w-7xl space-y-7 px-4 pb-16 sm:px-6">
          <Skeleton className="h-9 w-56" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <LawyerCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>
      <span className="sr-only">Loading the Law Helper homepage</span>
    </div>
  );
}
export function LawyerDirectorySkeleton() {
  return (
    <div
      role="status"
      aria-label="Lawyer directory loading"
      className="min-h-screen bg-background"
    >
      <PublicHeaderSkeleton />
      <main aria-hidden="true" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Skeleton className="mb-4 h-11 w-64" />
        <Line className="mb-9 w-3/5" />
        <div className="grid items-start gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">
          <Block className="space-y-6">
            <Line className="w-1/2" />
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="space-y-2">
                <Line className="w-2/5" />
                <Skeleton className="h-11 w-full" />
              </div>
            ))}
          </Block>
          <div className="space-y-6">
            <Line className="w-44" />
            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({ length: 6 }, (_, i) => (
                <LawyerCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <span className="sr-only">Loading lawyer directory</span>
    </div>
  );
}
export function LawyerProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="Lawyer profile loading"
      className="min-h-screen bg-background"
    >
      <PublicHeaderSkeleton />
      <main aria-hidden="true" className="mx-auto max-w-5xl px-4 py-12">
        <Block className="space-y-7 p-6 sm:p-10">
          <div className="flex gap-5">
            <Skeleton className="size-24 shrink-0 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-9 w-1/2" />
              <Line className="w-2/5" />
              <Line className="w-1/3" />
            </div>
          </div>
          <div className="flex gap-5 border-y py-5">
            <Line className="w-28" />
            <Line className="w-32" />
            <Line className="w-24" />
          </div>
          <Skeleton className="h-7 w-32" />
          <Line className="w-full" />
          <Line className="w-11/12" />
          <Line className="w-2/3" />
          <Skeleton className="h-11 w-40" />
        </Block>
      </main>
      <span className="sr-only">Loading lawyer profile</span>
    </div>
  );
}
export function DashboardPageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Dashboard loading"
      className="min-h-screen bg-background lg:grid lg:grid-cols-[255px_1fr]"
    >
      <aside
        aria-hidden="true"
        className="hidden space-y-7 border-r bg-card p-5 lg:block"
      >
        <Skeleton className="h-12 w-40" />
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-11 w-full" />
        ))}
      </aside>
      <div aria-hidden="true">
        <header className="flex h-18 items-center justify-between border-b bg-card px-5">
          <Skeleton className="h-7 w-40" />
          <div className="flex gap-2">
            <Skeleton className="size-10" />
            <Skeleton className="size-10" />
            <Skeleton className="h-10 w-24" />
          </div>
        </header>
        <main className="mx-auto max-w-7xl space-y-7 p-4 sm:p-7">
          <Skeleton className="h-9 w-60" />
          <Line className="w-72" />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Block key={i} className="space-y-5">
                <Line className="w-2/3" />
                <Skeleton className="h-10 w-1/3" />
              </Block>
            ))}
          </div>
          <Block className="space-y-5">
            <Skeleton className="h-7 w-48" />
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </Block>
        </main>
      </div>
      <span className="sr-only">Loading dashboard</span>
    </div>
  );
}
