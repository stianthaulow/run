import { Button } from "@/components/ui/button";
import { useEditMode } from "@/hooks/useEditMode";
import useHoldButton from "@/hooks/useHoldButton";
import { useInputMode } from "@/hooks/useInputMode";
import { usePace } from "@/hooks/usePace";
import { Minus, MoveVertical, Plus } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

const preventDefault = (e: TouchEvent) => {
  if (e.target instanceof Element && e.target.id === "pace-slider") {
    e.preventDefault();
  }
};

export function PaceSlider() {
  const startYRef = useRef(0);
  const { stepPaceUp, stepPaceDown } = usePace();
  const { isEditMode } = useEditMode();
  const { isInputMode } = useInputMode();

  const stepOnScroll = useCallback(
    (e: WheelEvent) => {
      if (isEditMode || isInputMode) return;
      if (e.deltaY < 0) {
        stepPaceUp();
      } else {
        stepPaceDown();
      }
    },
    [isEditMode, isInputMode, stepPaceDown, stepPaceUp],
  );

  useEffect(() => {
    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", stepOnScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", stepOnScroll);
    };
  }, [stepOnScroll]);

  return (
    <div
      id="pace-slider"
      className="flex w-20 flex-col items-center justify-between rounded-full border border-zinc-900 py-2 transition-all duration-200"
      style={{ height: "calc(100dvh - 6rem )" }}
      onTouchStart={(e) => {
        startYRef.current = e.touches[0].clientY;
      }}
      onTouchMove={(e) => {
        const currentY = e.touches[0].clientY;
        if (currentY < startYRef.current) {
          stepPaceUp();
        } else {
          stepPaceDown();
        }
      }}
    >
      <StepPaceButton paceStepHandler={stepPaceUp}>
        <Plus />
      </StepPaceButton>
      <MoveVertical className="text-zinc-700" />
      <StepPaceButton paceStepHandler={stepPaceDown}>
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
      className="rounded-full"
      onClick={paceStepHandler}
      {...events}
    >
      {children}
    </Button>
  );
}
