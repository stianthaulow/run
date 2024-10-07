import { AddDistance } from "@/components/AddDistance";
import { SplitTimes } from "@/components/SplitTimes";
import { TimeControl } from "@/components/TimeControl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Distance } from "@/distances";
import { useDistances } from "@/hooks/useDistances";
import { useEditMode } from "@/hooks/useEditMode";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function DistanceList() {
  const { visibleDistances } = useDistances();
  const { isEditMode } = useEditMode();
  const { settings } = useSettings();

  return (
    <div
      className={cn([
        "grid gap-y-1",
        isEditMode
          ? "grid-cols-[max-content_max-content_auto_max-content]"
          : settings.showSplits
            ? "grid-cols-[max-content_auto_max-content]"
            : "grid-cols-[max-content_auto]",
      ])}
    >
      {visibleDistances.map((distance, index) => (
        <DistanceRow
          key={distance.length}
          distance={distance}
          className={cn(index % 2 === 0 && "bg-zinc-900")}
        />
      ))}

      {isEditMode && <AddDistance />}
    </div>
  );
}

type DistanceRowProps = {
  distance: Distance;
  className?: string;
};

function DistanceRow({ distance, className }: DistanceRowProps) {
  const { isEditMode } = useEditMode();
  const { settings } = useSettings();
  const { deleteDistance, toggleMilliseconds } = useDistances();

  return (
    <>
      {isEditMode && (
        <DeleteButton
          handleDelete={() => deleteDistance(distance.length)}
          distanceLength={distance.length}
          className={className}
        />
      )}

      <TimeControl distance={distance} className={className} />
      <Label className={cn("pt-2 pl-2 text-lg text-zinc-300", className)}>
        {distance.label}
      </Label>

      {!isEditMode && settings.showSplits && (
        <SplitTimes distance={distance.length} className={className} />
      )}

      {isEditMode && (
        <ShowMsCheckbox
          checked={distance.showMilliseconds}
          handleCheckedChange={() => toggleMilliseconds(distance.length)}
          distanceLength={distance.length.toString()}
          className={className}
        />
      )}
    </>
  );
}

type DeleteButtonProps = {
  handleDelete: () => void;
  distanceLength: number;
  className?: string;
};

function DeleteButton({
  handleDelete,
  distanceLength,
  className,
}: DeleteButtonProps) {
  return (
    <div className={className}>
      <Button
        size="icon"
        variant="outline"
        className="rounded-full p-1"
        onClick={handleDelete}
        aria-label={`Delete distance ${distanceLength}`}
      >
        <Trash2 className="text-red-500" />
      </Button>
    </div>
  );
}

type ShowMsCheckboxProps = {
  checked: boolean;
  handleCheckedChange: () => void;
  distanceLength: string;
  className?: string;
};

function ShowMsCheckbox({
  checked,
  handleCheckedChange,
  distanceLength,
  className,
}: ShowMsCheckboxProps) {
  const { t } = useTranslation();
  return (
    <div className={cn(["flex min-w-max items-center gap-1", className])}>
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
