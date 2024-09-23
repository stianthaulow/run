import { AddDistance } from "@/components/AddDistance";
import { Button } from "@/components/ui/button";
import { useDistances } from "@/hooks/useDistances";
import { useEditMode } from "@/hooks/useEditMode";
import { Trash2 } from "lucide-react";

export function DistanceList() {
  const { visibleDistances, deleteDistance } = useDistances();
  const { isEditMode } = useEditMode();
  return (
    <>
      <ul className="flex flex-col gap-2">
        {visibleDistances.map((distance) => (
          <li
            key={distance.length}
            className="flex items-center gap-2 text-2xl"
          >
            {isEditMode && (
              <Button
                size="icon"
                variant="outline"
                className="size-8 rounded-full p-1"
                onClick={() => {
                  deleteDistance(distance.length);
                }}
              >
                <Trash2 className="text-red-500" />
              </Button>
            )}
            {distance.label}
          </li>
        ))}
      </ul>
      {isEditMode && <AddDistance />}
    </>
  );
}
