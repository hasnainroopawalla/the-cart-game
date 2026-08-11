import * as React from "react";
import cn from "classnames";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Card = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    className={cn(
      "rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
      className,
    )}
  >
    {children}
  </section>
);

export const PanelHeader = ({
  icon,
  title,
  subtitle,
  right,
  tone = "default",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  tone?: "default" | "accent";
}) => {
  const isAccent = tone === "accent";

  return (
    <header
      className={cn(
        "flex shrink-0 items-center justify-between gap-3 border-b px-5 py-4",
        isAccent ? "bg-primary-200/60 border-primary-200" : "border-neutral-200/70",
      )}
    >
      <div className="flex items-center gap-3">
        <span className={isAccent ? "text-primary-700" : "text-neutral-700"}>
          {icon}
        </span>
        <div>
          <h2
            className={cn(
              "text-[17px] leading-tight font-semibold",
              isAccent ? "text-primary-800" : "text-neutral-900",
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "text-[13px]",
                isAccent ? "text-primary-700/80" : "text-neutral-500",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {right}
    </header>
  );
};

export const CollapseToggle = ({
  isOpen,
  onToggle,
  label,
}: {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
}) => (
  <button
    type="button"
    onClick={onToggle}
    aria-expanded={isOpen}
    aria-label={`${isOpen ? "Collapse" : "Expand"} ${label}`}
    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
  >
    {isOpen ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )}
  </button>
);

export const IconButton = ({
  label,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={cn(
      "inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-800",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export const formatPrice = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;
