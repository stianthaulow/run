import norwegianFlag from "@/assets/no.svg";
import englishFlag from "@/assets/us.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const flag = i18n.language === "no" ? norwegianFlag : englishFlag;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <img src={flag} alt={t("language.change")} className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>{t("language.change")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={i18n.language}
          onValueChange={i18n.changeLanguage}
        >
          <DropdownMenuRadioItem value="no" className="flex gap-2">
            <img
              src={norwegianFlag}
              alt={t("language.norwegianFlag")}
              className="size-4"
            />
            {t("language.norwegian")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en" className="felx gap-2">
            <img
              src={englishFlag}
              alt={t("language.englishFlag")}
              className="size-4"
            />
            {t("language.english")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
