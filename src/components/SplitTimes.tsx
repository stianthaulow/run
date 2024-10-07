import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePace } from "@/hooks/usePace";
import { calculateSplits, formatDistance } from "@/lib/splits";
import { atom, useSetAtom } from "jotai";
import { Timer } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type SplitTimesProps = {
  distance: number;
  className?: string;
};

export const splitTimesIsOpenAtom = atom(false);

export function SplitTimes({ distance, className }: SplitTimesProps) {
  const setIsOpen = useSetAtom(splitTimesIsOpenAtom);
  const { t } = useTranslation();
  const { pace, getTimeForDistance, kph } = usePace();
  const splits = useMemo(
    () => calculateSplits(distance, pace),
    [distance, pace],
  );
  return (
    <Sheet onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className={className}>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Timer />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="max-h-screen overflow-auto">
        <SheetHeader>
          <SheetTitle>{t("splits.title")}</SheetTitle>
          <SheetDescription>
            {t("splits.totalDistance")}: {t(formatDistance(distance))} <br />
            {t("splits.avgPace")}: {getTimeForDistance(1000)} -{" "}
            {t("splits.avgSpeed")}: {kph} {t("kph")}
          </SheetDescription>
          <table className="text-left">
            <thead>
              <tr>
                <th className="pr-2">{t("splits.distance")}</th>
                <th>{t("splits.time")}</th>
              </tr>
            </thead>
            <tbody>
              {splits.map((split) => (
                <tr key={split.distance} className="odd:bg-zinc-900">
                  <td className="w-1 whitespace-nowrap pr-2">
                    {t(split.distance)}
                  </td>
                  <td>{split.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
