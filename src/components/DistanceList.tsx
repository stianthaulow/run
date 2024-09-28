import { AddDistance } from "@/components/AddDistance";
import { TimeControl } from "@/components/TimeControl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDistances } from "@/hooks/useDistances";
import { useEditMode } from "@/hooks/useEditMode";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function DistanceList() {
  const { visibleDistances, deleteDistance, toggleMilliseconds } =
    useDistances();
  const { isEditMode } = useEditMode();

  return (
    <>
      <ul className="flex flex-col gap-2">
        {visibleDistances.map((distance) => (
          <li
            key={distance.length}
            className="flex w-full items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              {isEditMode && (
                <DeleteButton
                  handleDelete={() => deleteDistance(distance.length)}
                  distanceLength={distance.length}
                />
              )}

              <TimeControl distance={distance} />
            </div>

            {isEditMode && (
              <ShowMsCheckbox
                checked={distance.showMilliseconds}
                handleCheckedChange={() => toggleMilliseconds(distance.length)}
                distanceLength={distance.length.toString()}
              />
            )}
          </li>
        ))}
      </ul>

      {isEditMode && <AddDistance />}
    </>
  );
}

type DeleteButtonProps = {
  handleDelete: () => void;
  distanceLength: number;
};

function DeleteButton({ handleDelete, distanceLength }: DeleteButtonProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      className="rounded-full p-1"
      onClick={handleDelete}
      aria-label={`Delete distance ${distanceLength}`}
    >
      <Trash2 className="text-red-500" />
    </Button>
  );
}

type ShowMsCheckboxProps = {
  checked: boolean;
  handleCheckedChange: () => void;
  distanceLength: string;
};

function ShowMsCheckbox({
  checked,
  handleCheckedChange,
  distanceLength,
}: ShowMsCheckboxProps) {
  const { t } = useTranslation();
  return (
    <div className="flex min-w-max items-center gap-1">
      <Checkbox
        checked={checked}
        onCheckedChange={handleCheckedChange}
        id={`msCheck-${distanceLength}`}
      />
      <Label className="text-xs" htmlFor={`msCheck-${distanceLength}`}>
        {t("edit.showMs")}
      </Label>
    </div>
  );
}
