import { EditModeButton } from "@/components/EditModeButton";
import { EditSettings } from "@/components/EditSettings";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PaceSlider } from "@/components/PaceSlider";
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
    <div className="flex min-h-svh justify-between p-2">
      <main className="w-full">
        {isTabletOrLarger ? (
          <Card className="w-full max-w-md p-6">{children}</Card>
        ) : (
          <div className="w-full">{children}</div>
        )}
      </main>
      {isEditMode && (
        <div className="fixed top-2 right-2">
          <LanguageSelector />
        </div>
      )}
      {!isEditMode && <PaceSlider />}

      <div className="fixed right-2 bottom-2 flex gap-2">
        {isEditMode && <EditSettings />}
        <EditModeButton />
      </div>
    </div>
  );
}
