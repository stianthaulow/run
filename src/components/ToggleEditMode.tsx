import { Button } from "@/components/ui/button";
import { useEditMode } from "@/hooks/useEditMode";
import { Pencil } from "lucide-react";

export function ToggleEditMode() {
  const { toggleEditMode } = useEditMode();
  return (
    <Button
      size="icon"
      className="fixed right-2 bottom-2 size-14 rounded-full"
      variant="outline"
      onClick={toggleEditMode}
    >
      <Pencil />
    </Button>
  );
}
