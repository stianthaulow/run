import { AddDistance } from "@/components/AddDistance";
import { Button } from "@/components/ui/button";
import { useDistances } from "@/hooks/useDistances";
import { useEditMode } from "@/hooks/useEditMode";
import { cn } from "@/lib/utils";
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
            <div
              className={cn(
                "flex items-center justify-center transition-all duration-300 ease-in-out",
                isEditMode
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full pointer-events-none opacity-0",
              )}
            >
              <Button
                size="icon"
                variant="outline"
                className="size-8 rounded-full p-1"
                onClick={() => {
                  deleteDistance(distance.length);
                }}
                aria-hidden={!isEditMode}
              >
                <Trash2 className="text-red-500" />
              </Button>
            </div>

            <span
              className={cn(
                "flex-1 transition-all duration-300 ease-in-out",
                isEditMode ? "pl-2" : "pl-0",
              )}
            >
              {distance.label}
            </span>
          </li>
        ))}
      </ul>
      <div
        className={cn(
          "flex items-center justify-center transition-all duration-300 ease-in-out",
          isEditMode
            ? "translate-x-0 opacity-100"
            : "-translate-x-full pointer-events-none opacity-0",
        )}
      >
        <AddDistance />
      </div>
    </>
  );
}
