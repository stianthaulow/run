import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleHelp, FileQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";

import githubIcon from "@/assets/github.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { t } from "i18next";
import { useState } from "react";

export function Help() {
  const { t } = useTranslation();
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" variant="ghost" size="icon">
            <CircleHelp />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>{t("help.title")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => setIsHowToUseOpen(true)}
              className="m-0 w-full px-0 text-left"
            >
              <FileQuestion />
              <span className="pl-1 font-normal">{t("help.howToUse")}</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href="https://github.com/stianthaulow/run"
              className="flex gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <img src={githubIcon} alt="Github" className="size-5 invert" />
              Github
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <HowToUse isOpen={isHowToUseOpen} setIsOpen={setIsHowToUseOpen} />
    </>
  );
}

type HowToUseProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function HowToUse({ isOpen, setIsOpen }: HowToUseProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>{t("help.title")}</SheetTitle>
          <SheetDescription>{t("help.howToUse")}</SheetDescription>
        </SheetHeader>
        <p>{t("help.instructionsMobile")}</p>
        <p className="pt-4">{t("help.howToEdit")}</p>
        <p className="pt-4">{t("help.splits")}</p>
      </SheetContent>
    </Sheet>
  );
}
