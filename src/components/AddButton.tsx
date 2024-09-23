import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function AddButton() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("add.distance")}</DialogTitle>
            <DialogDescription>{t("add.description")}</DialogDescription>
          </DialogHeader>
          <AddForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" className="mt-2 size-12 rounded-full">
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{t("add.distance")}</DrawerTitle>
          <DrawerDescription>{t("add.description")}</DrawerDescription>
        </DrawerHeader>
        <AddForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t("add.close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddForm({ className }: React.ComponentProps<"form">) {
  const { t } = useTranslation();

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="distance">{t("add.distanceLabel")}</Label>
        <Input type="text" id="distance" defaultValue="2000" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="label">{t("add.labelLabel")}</Label>
        <Input id="label" defaultValue="2k" />
      </div>
      <Button type="submit">{t("add.save")}</Button>
    </form>
  );
}
