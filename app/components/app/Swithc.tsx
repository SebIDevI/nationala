"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import { Switch } from "@/app/components/ui/switch";
import { toast } from "@/app/components/ui/use-toast";

const FormSchema = z.object({
  checkpoint: z.boolean().default(false).optional(),
});

export function SwitchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      checkpoint: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-medium">Checkpoint estimari</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="checkpoint"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Salveaza datele reale</FormLabel>
                <FormDescription className="sm:pe-4">
                  Aceste date sunt cele reale, independent fata de estimare.
                  Daca alegeti sa initiati checkpoint acestea vor fi afisate pe
                  dashboard definitiv.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
