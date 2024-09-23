import { LanguageSelector } from "@/components/LanguageSelector";
import { ToggleEditMode } from "@/components/ToggleEditMode";
import { Card } from "@/components/ui/card";
import { useEditMode } from "@/hooks/useEditMode";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const isTabletOrLarger = useMediaQuery("(min-width: 640px)");
  const { isEditMode } = useEditMode();

  return (
    <div className="flex min-h-screen justify-between p-2">
      <main>
        {isTabletOrLarger ? (
          <Card className="w-full max-w-md p-6">{children}</Card>
        ) : (
          <div className="w-full">{children}</div>
        )}
      </main>
      {isEditMode && <LanguageSelector />}
      <ToggleEditMode />
    </div>
  );
}
