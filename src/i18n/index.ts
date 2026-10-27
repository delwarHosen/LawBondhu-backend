import { bn } from "./bn";
import { en } from "./en";
export const dictionaries = { bn, en };
export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;
export type TranslationKey = {
  [K in keyof Dictionary]: `${K & string}.${keyof Dictionary[K] & string}`;
}[keyof Dictionary];
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
export function translate(locale: Locale, key: TranslationKey): string {
  const [section, item] = key.split(".");
  const dict = dictionaries[locale] as unknown as Record<
    string,
    Record<string, string>
  >;
  return dict[section]?.[item] ?? key;
}
export function formatDate(
  value: Date | string | number,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(
    locale === "bn" ? "bn-BD" : "en-BD",
    options ?? { dateStyle: "medium" },
  ).format(new Date(value));
}
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(
    locale === "bn" ? "bn-BD" : "en-BD",
    options,
  ).format(value);
}
