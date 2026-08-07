import * as React from "react";

export const Card = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    className={`rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}
  >
    {children}
  </section>
);

export const PanelHeader = ({
  icon,
  title,
  subtitle,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) => (
  <header className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-200/70 px-5 py-4">
    <div className="flex items-center gap-3">
      <span className="text-neutral-700">{icon}</span>
      <div>
        <h2 className="text-[17px] leading-tight font-semibold text-neutral-900">
          {title}
        </h2>
        {subtitle && <p className="text-[13px] text-neutral-500">{subtitle}</p>}
      </div>
    </div>
    {right}
  </header>
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
    className={`inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-800 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const formatPrice = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;
