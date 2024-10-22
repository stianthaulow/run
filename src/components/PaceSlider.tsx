import { splitTimesIsOpenAtom } from "@/components/SplitTimes";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/hooks/useEditMode";
import { useHoldButton } from "@/hooks/useHoldButton";
import { useInputMode } from "@/hooks/useInputMode";
import { usePace } from "@/hooks/usePace";
import { useAtomValue } from "jotai";
import { Minus, MoveVertical, Plus } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

const preventDefault = (e: TouchEvent) => {
  if (e.target instanceof Element && e.target.id === "pace-slider") {
    e.preventDefault();
  }
};

export function PaceSlider() {
  const startYRef = useRef(0);
  const { stepPace, roundPace } = usePace();
  const { isEditMode } = useEditMode();
  const { isInputMode } = useInputMode();
  const isSplitTimesOpen = useAtomValue(splitTimesIsOpenAtom);

  const stepOnScroll = useCallback(
    (e: WheelEvent) => {
      if (isEditMode || isInputMode) return;
      stepPace(e.deltaY > 0 ? -1 : 1);
    },
    [isEditMode, isInputMode, stepPace],
  );

  useEffect(() => {
    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  useEffect(() => {
    if (!isSplitTimesOpen)
      window.addEventListener("wheel", stepOnScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", stepOnScroll);
    };
  }, [stepOnScroll, isSplitTimesOpen]);

  return (
    <div
      id="pace-slider"
      className="flex w-28 flex-col items-center justify-between rounded-full border border-zinc-900 py-2 transition-all duration-200"
      style={{ height: "calc(100dvh - 6rem )" }}
      onTouchStart={(e) => {
        startYRef.current = e.touches[0].clientY;
      }}
      onTouchMove={(e) => {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startYRef.current;
        stepPace(deltaY * 0.005);
      }}
      onTouchEnd={roundPace}
    >
      <StepPaceButton paceStepHandler={() => stepPace(-1)}>
        <Plus />
      </StepPaceButton>
      <MoveVertical className="pointer-events-none text-zinc-700" />
      <StepPaceButton paceStepHandler={() => stepPace(1)}>
        <Minus />
      </StepPaceButton>
    </div>
  );
}

type StepPaceButtonProps = {
  children: React.ReactNode;
  paceStepHandler: () => void;
};

function StepPaceButton({ children, paceStepHandler }: StepPaceButtonProps) {
  const events = useHoldButton(paceStepHandler);
  return (
    <Button
      size="icon"
      className="size-12 rounded-full"
      onClick={paceStepHandler}
      {...events}
    >
      {children}
    </Button>
  );
}
