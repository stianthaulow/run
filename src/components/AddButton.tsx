import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddButton() {
  return (
    <Button size="icon" className="size-12 mt-2 rounded-full">
      <Plus />
    </Button>
  );
}
