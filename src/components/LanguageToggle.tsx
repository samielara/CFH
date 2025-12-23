import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const next = language === "en" ? "fr" : "en";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => setLanguage(next)}
      className={cn(
        "h-9 rounded-full px-4 text-sm font-semibold",
        "transition-all duration-200",
        "bg-background/10 backdrop-blur-md",
        "text-[hsl(var(--cfh-red))]",
        "border border-[hsl(var(--cfh-red))]/60",
        "shadow-sm",
        "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent",
        "hover:-translate-y-[1px] hover:shadow-md hover:shadow-[hsl(var(--cfh-red))]/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--cfh-red))]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      aria-label={`Switch language to ${next.toUpperCase()}`}
      title={`Switch to ${next.toUpperCase()}`}
    >
      {next.toUpperCase()}
    </Button>
  );
}
