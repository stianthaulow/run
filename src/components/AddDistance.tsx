import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDistances } from "@/hooks/useDistances";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { z } from "@/i18n";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function AddDistance() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { distances } = useDistances();

  const description = distances.some((d) => d.isDefault && !d.isVisible)
    ? t("addDistance.descriptionWithDefaults")
    : t("addDistance.descriptionWithoutDefaults");

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
            <DialogTitle>{t("addDistance.title")}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
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
          <DrawerTitle>{t("addDistance.title")}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DefaultDistances />
        <AddForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t("addDistance.close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DefaultDistances() {
  const { distances, toggleVisibility } = useDistances();

  return (
    <div className="m-5 mt-0 flex flex-wrap gap-4">
      {distances.map((distance) =>
        distance.isDefault && !distance.isVisible ? (
          <Button
            key={distance.length}
            onClick={() => toggleVisibility(distance.length)}
          >
            {distance.label}
          </Button>
        ) : null,
      )}
    </div>
  );
}

const addFormSchema = z.object({
  distance: z.coerce.number().int().positive().min(1),
  label: z.string().min(1),
  showMilliseconds: z.boolean(),
});

function AddForm({ className }: React.ComponentProps<"form">) {
  const { t } = useTranslation();
  const { addDistance } = useDistances();
  const form = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      distance: 0,
      label: "",
      showMilliseconds: false,
    },
  });

  function onSubmit(data: z.infer<typeof addFormSchema>) {
    addDistance({
      length: data.distance,
      label: data.label,
      isVisible: true,
      showMilliseconds: false,
      isDefault: false,
    });
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("addDistance.distanceFormLabel")}</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("addDistance.labelFormLabel")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showMilliseconds"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t("addDistance.showMillisecondsLabel")}</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit">{t("addDistance.save")}</Button>
      </form>
    </Form>
  );
}
