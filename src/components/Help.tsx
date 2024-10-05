import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleHelp } from "lucide-react";
import { useTranslation } from "react-i18next";

import githubIcon from "@/assets/github.svg";

export function Help() {
  const { t } = useTranslation();
  return (
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
  );
}
