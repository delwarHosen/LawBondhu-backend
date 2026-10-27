import {
  AlertCircle,
  CheckCircle2,
  Inbox,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
type Status = "loading" | "empty" | "error" | "success";
const icons: Record<Status, LucideIcon> = {
  loading: LoaderCircle,
  empty: Inbox,
  error: AlertCircle,
  success: CheckCircle2,
};
export function FeedbackState({
  status,
  title,
  description,
  action,
  className,
}: {
  status: Status;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  const Icon = icons[status];
  return (
    <div
      role={status === "error" ? "alert" : "status"}
      aria-live={status === "error" ? "assertive" : "polite"}
      aria-busy={status === "loading"}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border bg-card px-6 py-10 text-center",
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-9 text-muted-foreground",
          status === "loading" && "animate-spin",
          status === "error" && "text-destructive",
          status === "success" && "text-success",
        )}
      />
      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      )}
      {action}
    </div>
  );
}
