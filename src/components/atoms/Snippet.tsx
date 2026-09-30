import { Button, Tooltip, cn } from "@heroui/react";
import { useState, type ReactNode } from "react";
import { Icons } from "@/components/atoms/Icons";

interface SnippetProps {
  children: string | string[] | ReactNode;
  symbol?: string | ReactNode;
  variant?: "flat" | "solid" | "bordered" | "shadow";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  hideContent?: boolean;
  hideSymbol?: boolean;
  hideCopyButton?: boolean;
  disableCopy?: boolean;
  disableTooltip?: boolean;
  className?: string;
  codeString?: string;
  onCopy?: (value: string) => void;
}

const variantClasses = {
  flat: "bg-default-100",
  solid: "bg-default-200",
  bordered: "border border-default-200 bg-transparent",
  shadow: "bg-default-100 shadow-sm",
};

const colorClasses = {
  default: "text-default-foreground",
  primary: "text-accent",
  secondary: "text-default-600",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const sizeClasses = {
  sm: "p-0 text-xs",
  md: "p-0 text-sm",
  lg: "p-0 text-base",
};

const radiusClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export default function Snippet({
  children,
  symbol = "$",
  variant = "flat",
  color = "default",
  size = "md",
  radius = "md",
  hideContent = false,
  hideSymbol = false,
  hideCopyButton = false,
  disableCopy = false,
  disableTooltip = false,
  className,
  codeString,
  onCopy,
}: SnippetProps) {
  const [copied, setCopied] = useState(false);
  const isMultiLine = Array.isArray(children);
  const lines = isMultiLine ? children : [children];
  const textToCopy =
    codeString || (isMultiLine ? lines.join("\n") : String(children));

  const handleCopy = async () => {
    if (disableCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.(textToCopy);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const symbolElement = hideSymbol ? null : (
    <span className={cn("flex flex-row gap-1", colorClasses[color])}>
      {symbol}
      {typeof symbol === "string" ? " " : ""}
    </span>
  );

  return (
    <div
      className={cn(
        "flex items-center-safe p-0",
        variantClasses[variant],
        sizeClasses[size],
        radiusClasses[radius],
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        {isMultiLine ? (
          <div className="space-y-1">
            {lines.map((line, index) => (
              <pre key={index} className={cn("m-0 flex", colorClasses[color])}>
                {symbolElement}
                {line}
              </pre>
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "m-0 flex items-center-safe gap-1 text-nowrap",
              colorClasses[color],
            )}
          >
            {symbolElement}
            {hideContent ? null : children}
          </div>
        )}
      </div>
      {hideCopyButton ||
      !textToCopy ||
      textToCopy === "" ||
      textToCopy == "undefined" ? null : (
        <Tooltip isDisabled={disableTooltip || disableCopy}>
          <Button
            isIconOnly
            aria-label="Copy"
            size="sm"
            variant="ghost"
            onPress={handleCopy}
            isDisabled={disableCopy}
            className="shrink-0"
          >
            {copied ? <Icons.Check /> : <Icons.Copy />}
          </Button>
          <Tooltip.Content>
            {copied ? "Copied!" : "Copy to clipboard"}
          </Tooltip.Content>
        </Tooltip>
      )}
    </div>
  );
}

// Usage
<Snippet symbol="$" variant="bordered" color="primary" size="md">
  npm install @heroui/react
</Snippet>;
