import { LanguageSelector } from "@/components/LanguageSelector";
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const isTabletOrLarger = useMediaQuery("(min-width: 640px)");

  return (
    <>
      <LanguageSelector />
      <main className="flex min-h-screen items-center justify-center p-4">
        {isTabletOrLarger ? (
          <Card className="w-full max-w-md p-6">{children}</Card>
        ) : (
          <div className="w-full">{children}</div>
        )}
      </main>
    </>
  );
}
