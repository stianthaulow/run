type InputButtonProps = {
  handleInputMode: () => void;
  value: string;
};

export function InputButton({ handleInputMode, value }: InputButtonProps) {
  return (
    <button
      type="button"
      className="rounded text-left text-2xl focus:outline-dotted focus:outline-2 focus:outline-zinc-500 focus:outline-offset-2"
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
