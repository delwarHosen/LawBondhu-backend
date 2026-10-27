# Law Helper UI primitives

Reusable components in this directory use semantic Tailwind theme tokens from `src/app/globals.css`.

Available primitives: Button, Card, Badge, Input, Label, Textarea, Select, Dialog, Table, Tabs, DropdownMenu, FeedbackState, Skeleton.

Use `<Label htmlFor="field-id">` with `<Input id="field-id" />` for form fields; use `<DialogTitle>` and `<DialogDescription>` inside dialogs. Supply all end-user copy to feedback states from `src/i18n` translations. Set `<html lang>` to the active locale when language switching is introduced; font selection follows `:lang(en)` for English.

Colors are semantic (`bg-card`, `text-muted-foreground`, `border-input`) and should not be replaced with hardcoded hex values in consumers.
