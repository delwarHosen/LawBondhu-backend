/** Shared design-system constants. The actual palette is defined in globals.css. */
export const designSystem = {
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
  },
  semanticColors: [
    "background",
    "foreground",
    "card",
    "primary",
    "secondary",
    "muted",
    "accent",
    "border",
    "ring",
    "destructive",
    "success",
    "warning",
  ] as const,
} as const;
