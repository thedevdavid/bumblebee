import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bumblebee/ui";

type FormStepProps = {
  label: string;
  placeholder: string;
  description?: string;
  name: string;
  options?: { label: string; value: string }[];
  type?: "text" | "email" | "password" | "select";
};

export function FormStep({
  label,
  placeholder,
  description,
  name,
  options,
  type = "text",
}: FormStepProps) {
  if (type === "select") {
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} />
      {description ? (
        <p className="text-muted-foreground text-sm">{description}</p>
      ) : null}
    </div>
  );
}
