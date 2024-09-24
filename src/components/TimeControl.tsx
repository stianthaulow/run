import type { Distance } from "@/distances";
import { usePace } from "@/hooks/usePace";

type TimeControlProps = {
  distance: Omit<Distance, "isDefault" | "isVisible">;
};
export function TimeControl({ distance }: TimeControlProps) {
  const { getTimeForDistance } = usePace();
  const time = getTimeForDistance(distance.length, distance.showMilliseconds);
  return (
    <div className="flex items-baseline gap-1">
      <span className="pb-1 text-3xl">{time}</span>
      <span className="text-lg text-zinc-300">{distance.label}</span>
    </div>
  );
}
