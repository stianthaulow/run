import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/hooks/useEditMode";
import { cn } from "@/lib/utils";

export function EditModeButton() {
  const { toggleEditMode, isEditMode } = useEditMode();

  return (
    <Button
      size="icon"
      className={cn("size-16 rounded-full", isEditMode && "animate-jiggle")}
      variant="outline"
      onClick={toggleEditMode}
    >
      <Pencil />
    </Button>
  );
}
