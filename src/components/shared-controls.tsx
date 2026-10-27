"use client";
import { Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={t("common.theme")}
      title={t("common.theme")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span aria-hidden="true">
        {mounted &&
        (theme === "dark" ||
          (theme === "system" && resolvedTheme === "dark")) ? (
          <Sun />
        ) : (
          <Moon />
        )}
      </span>
      <span className="hidden sm:inline">
        {mounted && resolvedTheme === "dark"
          ? t("common.light")
          : t("common.dark")}
      </span>
    </Button>
  );
}
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={t("common.language")}
      title={t("common.language")}
      onClick={() => setLocale(locale === "bn" ? "en" : "bn")}
    >
      <Languages aria-hidden="true" />
      <span>{locale === "bn" ? "English" : "বাংলা"}</span>
    </Button>
  );
}
import * as React from "react";
