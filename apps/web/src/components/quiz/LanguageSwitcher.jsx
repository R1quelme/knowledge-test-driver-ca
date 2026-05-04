import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@driver-quiz/content";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 rounded-lg border bg-card p-1 shadow-sm sm:grid-cols-4",
        className
      )}
      aria-label={LANGUAGES.map((language) => language.label).join(" / ")}
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === i18n.resolvedLanguage;

        return (
          <Button
            key={lang.code}
            type="button"
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className={cn(
              "h-10 px-4 text-sm font-semibold",
              !isActive && "text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={isActive}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            {lang.label}
          </Button>
        );
      })}
    </div>
  );
}
