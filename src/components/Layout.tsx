import { EditModeButton } from "@/components/EditModeButton";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PaceSlider } from "@/components/PaceSlider";
import { Card } from "@/components/ui/card";
import { editModeTransition, useEditMode } from "@/hooks/useEditMode";
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
    <div className="flex min-h-svh justify-between p-2">
      <main className="w-full">
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
            transition={editModeTransition}
            className="fixed top-2 right-2"
          >
            <LanguageSelector />
          </motion.div>
        )}
        {!isEditMode && <PaceSlider />}
      </AnimatePresence>
      <EditModeButton />
    </div>
  );
}
