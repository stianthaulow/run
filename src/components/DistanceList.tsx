import { AddDistance } from "@/components/AddDistance";
import { TimeControl } from "@/components/TimeControl";
import { Button } from "@/components/ui/button";
import { useDistances } from "@/hooks/useDistances";
import { editModeTransition, useEditMode } from "@/hooks/useEditMode";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const fadeInFromLeftVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export function DistanceList() {
  const { visibleDistances, deleteDistance } = useDistances();
  const { isEditMode } = useEditMode();

  return (
    <LayoutGroup>
      <motion.ul className="flex w-80 flex-col gap-2" layout>
        {visibleDistances.map((distance) => (
          <motion.li
            key={distance.length}
            layout
            transition={editModeTransition}
            className="flex items-center gap-2"
          >
            <AnimatePresence mode="popLayout">
              {isEditMode && (
                <motion.div
                  variants={fadeInFromLeftVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={editModeTransition}
                  className="flex-shrink-0"
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
