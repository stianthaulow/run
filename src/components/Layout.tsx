import { LanguageSelector } from "@/components/LanguageSelector";
import { ToggleEditMode } from "@/components/ToggleEditMode";
import { Card } from "@/components/ui/card";
import { useEditMode } from "@/hooks/useEditMode";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const isTabletOrLarger = useMediaQuery("(min-width: 640px)");
  const { isEditMode } = useEditMode();

  const fadeInFromRightVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  };

  return (
    <div className="flex min-h-screen justify-between p-2">
      <main>
        {isTabletOrLarger ? (
          <Card className="w-full max-w-md p-6">{children}</Card>
        ) : (
          <div className="w-full">{children}</div>
        )}
      </main>
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            variants={fadeInFromRightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <LanguageSelector />
          </motion.div>
        )}
      </AnimatePresence>
      <ToggleEditMode />
    </div>
  );
}
