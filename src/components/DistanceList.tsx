import { AddDistance } from "@/components/AddDistance";
import { SplitTimes } from "@/components/SplitTimes";
import { TimeControl } from "@/components/TimeControl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDistances } from "@/hooks/useDistances";
import { useEditMode } from "@/hooks/useEditMode";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

export function DistanceList() {
  const { visibleDistances, deleteDistance, toggleMilliseconds } =
    useDistances();
  const { isEditMode } = useEditMode();
  const { settings } = useSettings();

  return (
    <div
      className={cn([
        "grid",
        isEditMode
          ? "grid-cols-[auto_max-content_auto_auto]"
          : settings.showSplits
            ? "grid-cols-[max-content_auto_auto]"
            : "grid-cols-[max-content_auto]",
      ])}
    >
      {visibleDistances.map((distance) => (
        <Fragment key={distance.length}>
          {isEditMode && (
            <DeleteButton
              handleDelete={() => deleteDistance(distance.length)}
              distanceLength={distance.length}
            />
          )}

          <TimeControl distance={distance} />
          <Label className="pt-2 pl-2 text-lg text-zinc-300">
            {distance.label}
          </Label>

          {!isEditMode && settings.showSplits && (
            <SplitTimes distance={distance.length} />
          )}

          {isEditMode && (
            <ShowMsCheckbox
              checked={distance.showMilliseconds}
              handleCheckedChange={() => toggleMilliseconds(distance.length)}
              distanceLength={distance.length.toString()}
            />
          )}
        </Fragment>
      ))}

      {isEditMode && <AddDistance />}
    </div>
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
