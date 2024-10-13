import {
  defineConfig,
  minimal2023Preset as preset,
} from "@vite-pwa/assets-generator/config";
import { ZINC_950 } from "./vite.config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: {
    ...preset,
    apple: {
      ...preset.apple,
      resizeOptions: {
        background: ZINC_950,
      },
    },
    maskable: {
      ...preset.maskable,
      resizeOptions: {
        background: ZINC_950,
      },
    },
  },
  images: ["public/favicon.svg"],
});
