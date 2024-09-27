import { AddDistance } from "@/components/AddDistance";
import { TimeControl } from "@/components/TimeControl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDistances } from "@/hooks/useDistances";
import { editModeTransition, useEditMode } from "@/hooks/useEditMode";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const fadeInFromLeftVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const fadeInFromRightVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export function DistanceList() {
  const { visibleDistances, deleteDistance, toggleMilliseconds } =
    useDistances();
  const { isEditMode } = useEditMode();
  const { t } = useTranslation();

  return (
    <LayoutGroup>
      <motion.ul className="flex flex-col gap-2" layout>
        {visibleDistances.map((distance) => (
          <motion.li
            key={distance.length}
            layout
            transition={editModeTransition}
            className="flex w-full items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <AnimatePresence mode="popLayout">
                {isEditMode && (
                  <motion.div
                    variants={fadeInFromLeftVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={editModeTransition}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full p-1"
                      onClick={() => deleteDistance(distance.length)}
                      aria-label={`Delete distance ${distance.length}`}
                    >
                      <Trash2 className="text-red-500" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout>
                <TimeControl distance={distance} />
              </motion.div>
            </div>

            <AnimatePresence mode="popLayout">
              {isEditMode && (
                <motion.div
                  variants={fadeInFromRightVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={editModeTransition}
                  className="flex min-w-max items-center gap-1"
                >
                  <Checkbox
                    checked={distance.showMilliseconds}
                    onCheckedChange={() => toggleMilliseconds(distance.length)}
                    id={`msCheck-${distance.length}`}
                  />
                  <Label
                    className="text-xs"
                    htmlFor={`msCheck-${distance.length}`}
                  >
                    {t("edit.showMs")}
                  </Label>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence mode="popLayout">
        {isEditMode && (
          <motion.div
            variants={fadeInFromLeftVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            transition={editModeTransition}
          >
            <AddDistance />
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
