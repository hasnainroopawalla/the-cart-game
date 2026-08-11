import * as React from "react";
import cn from "classnames";
import { Card, PanelHeader } from "./card";
import { Check, ClipboardList } from "lucide-react";

export type ShoppingListEntry = {
  label: string;
  isSatisfied: boolean;
  current?: string;
  target?: string;
};

const StatusBox = ({ isSatisfied }: { isSatisfied: boolean }) => (
  // Keyed so the pop replays whenever the verdict flips.
  <span
    key={String(isSatisfied)}
    className={cn(
      "animate-status-pop grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors",
      isSatisfied
        ? "border-satisfied-500 bg-satisfied-500 text-white"
        : "border-failed-500 bg-failed-50 border-dashed",
    )}
  >
    {isSatisfied && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
  </span>
);

const getStatusTextClass = (isSatisfied: boolean) =>
  isSatisfied ? "text-satisfied-600" : "text-failed-500";

export const ShoppingListPanel = ({
  entries,
  className = "",
}: {
  entries: ShoppingListEntry[];
  className?: string;
}) => {
  const [satisfiedCount, totalCount] = [
    entries.filter((entry) => entry.isSatisfied).length,
    entries.length,
  ];

  return (
    <Card
      className={cn(
        "flex max-h-full min-h-0 flex-col self-start overflow-hidden",
        className,
      )}
    >
      <PanelHeader
        tone="accent"
        icon={<ClipboardList className="h-5 w-5" />}
        title="Shopping List"
        subtitle="Rules for your cart."
        right={
          <div className="flex items-center gap-2">
            <span className="inline-flex shrink-0 items-center rounded-full bg-white px-2.5 py-1 text-[13px] font-bold whitespace-nowrap tabular-nums shadow-xs">
              <span className="text-satisfied-600">{satisfiedCount}</span>
              <span className="font-medium text-neutral-400">
                &nbsp;/ {totalCount}
              </span>
            </span>
          </div>
        }
      />

      <ul className="min-h-0 flex-auto overflow-y-auto">
        {entries.map((entry, index) => (
          <ShoppingListRow key={entry.label} entry={entry} index={index} />
        ))}
      </ul>
    </Card>
  );
};

const ROW_STAGGER_MS = 300;

const ShoppingListRow = ({
  entry,
  index,
}: {
  entry: ShoppingListEntry;
  index: number;
}) => (
  <li
    className="animate-rule-in flex items-center gap-3 border-b border-dashed border-neutral-200 px-5 py-3 last:border-b-0"
    style={{ animationDelay: `${index * ROW_STAGGER_MS}ms` }}
  >
    <StatusBox isSatisfied={entry.isSatisfied} />
    <p
      className={cn(
        "min-w-0 flex-1 text-[14px] first-letter:uppercase transition-colors duration-300",
        entry.isSatisfied
          ? "decoration-satisfied-400 text-neutral-400 line-through decoration-1"
          : "text-failed-500",
      )}
    >
      {entry.label}
    </p>
    <EntryProgress entry={entry} />
  </li>
);

const EntryProgress = ({ entry }: { entry: ShoppingListEntry }) => {
  const hasCurrent = entry.current !== undefined;
  const hasTarget = entry.target !== undefined;

  if (!hasCurrent && !hasTarget) {
    return null;
  }

  return (
    <p className="shrink-0 text-[13px] font-semibold tabular-nums">
      {hasCurrent && (
        <span className={getStatusTextClass(entry.isSatisfied)}>
          {entry.current}
        </span>
      )}
      {hasCurrent && hasTarget && (
        <span className="font-normal text-neutral-400"> / </span>
      )}
      {hasTarget && (
        <span className="font-normal text-neutral-400">{entry.target}</span>
      )}
    </p>
  );
};
