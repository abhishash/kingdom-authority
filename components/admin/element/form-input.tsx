"use client";

import { Input } from "@/components/ui/input";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { Label } from "@/components/ui/label"; // shadcn label
import { cn } from "@/lib/utils"; // optional helper if you use cn()

type FormInputProps = {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  isReadOnly?: boolean;
  className?: string;
  mainWrapper?: string;
};

export default function FormInput({
  name,
  control,
  label,
  type = "text",
  placeholder = "",
  rules = {},
  isReadOnly = false,
  className = "w-full",
  mainWrapper = "w-full",
}: FormInputProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", mainWrapper)}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div className="">
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              readOnly={isReadOnly}
              className={cn(className, error ? "border-red-500" : "")}
            />
            {error && (
              <p className="text-sm text-red-500 mt-2 italic">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
