import { Button } from "@/components/ui/button";
import useHoldButton from "@/hooks/useHoldButton";
import { usePace } from "@/hooks/usePace";
import { Minus, MoveVertical, Plus } from "lucide-react";
import { useEffect, useRef } from "react";

export function PaceSlider() {
  const startYRef = useRef(0);
  const { stepPaceUp, stepPaceDown } = usePace();

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.target instanceof Element && e.target.id === "pace-slider") {
        e.preventDefault();
      }
    };

    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

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
