import { Button } from "@/components/ui/button";
import { useEditMode } from "@/hooks/useEditMode";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

const MotionButton = motion.create(Button);

export function EditModeButton() {
  const { toggleEditMode, isEditMode } = useEditMode();

  const wiggleVariants = {
    wiggle: {
      x: [0, 2, -1, 2, 1, 0],
      y: [0, 1, -2, 1, 2, 0],
      rotate: [0, -4, 4, -3, 3, 0],
      transition: {
        duration: 0.4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    static: {
      rotate: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <MotionButton
      size="icon"
      className="size-16 rounded-full"
      variant="outline"
      onClick={toggleEditMode}
      variants={wiggleVariants}
      animate={isEditMode ? "wiggle" : "static"}
    >
      <Pencil />
    </MotionButton>
  );
}
