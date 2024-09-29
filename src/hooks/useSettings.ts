import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const settingsAtom = atomWithStorage("settings", {
  showSpeedFirst: false,
  showMiles: true,
});

export function useSettings() {
  const [settings, setSettings] = useAtom(settingsAtom);

  return {
    settings,
    setSettings,
  };
}
