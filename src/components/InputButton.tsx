import { cn } from "@/lib/utils";

type InputButtonProps = {
  handleInputMode: () => void;
  value: string;
  className?: string;
};

export function InputButton({
  handleInputMode,
  value,
  className,
}: InputButtonProps) {
  return (
    <button
      type="button"
      className={cn([
        "rounded pr-2 text-left text-2xl focus:outline-dotted focus:outline-2 focus:outline-zinc-500 focus:outline-offset-2",
        className,
      ])}
      onClick={handleInputMode}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleInputMode();
        }
      }}
    >
      {value}
    </button>
  );
}
