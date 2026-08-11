import { Card, PanelHeader } from "./card";
import { CircleCheck, CircleX, NotepadText } from "lucide-react";

export type RulePanelEntry = {
  label: string;
  isSatisfied: boolean;
  current?: string;
  target?: string;
};

const getStatusIcon = (isSatisfied: boolean) => (
  // Keyed so the pop replays whenever the verdict flips.
  <span key={String(isSatisfied)} className="animate-status-pop shrink-0">
    {isSatisfied ? (
      <CircleCheck className="text-satisfied-500 h-5 w-5" />
    ) : (
      <CircleX className="text-failed-500 h-5 w-5" />
    )}
  </span>
);

const getStatusTextClass = (isSatisfied: boolean) =>
  isSatisfied ? "text-satisfied-600" : "text-failed-500";

const getStatusRowClass = (isSatisfied: boolean) =>
  isSatisfied ? "bg-satisfied-50/60" : "bg-failed-50/50";

export const RulesPanel = ({ rules }: { rules: RulePanelEntry[] }) => {
  const [satisfiedCount, totalCount] = [
    rules.filter((rule) => rule.isSatisfied).length,
    rules.length,
  ];
  return (
    <Card className="flex max-h-full min-h-0 flex-col self-start overflow-hidden">
      <PanelHeader
        icon={<NotepadText className="h-5 w-5" />}
        title="Rules"
        subtitle="Tweak your cart to satisfy all rules."
        right={
          <span className="text-satisfied-600 text-[15px] font-bold tabular-nums">
            {satisfiedCount}
            <span className="text-neutral-400"> / {totalCount}</span>
          </span>
        }
      />

      <ul className="min-h-0 flex-auto overflow-y-auto">
        {rules.map((rule) => (
          <RuleRow key={rule.label} rule={rule} />
        ))}
      </ul>
    </Card>
  );
};

const RuleRow = ({ rule }: { rule: RulePanelEntry }) => (
  <li
    className={`animate-rule-in flex items-center gap-3 border-b border-neutral-100 px-5 py-3 transition-colors duration-300 last:border-b-0 ${getStatusRowClass(rule.isSatisfied)}`}
  >
    {getStatusIcon(rule.isSatisfied)}
    <p
      className={`min-w-0 flex-1 text-[14px] first-letter:uppercase transition-colors duration-300 ${
        rule.isSatisfied ? "text-satisfied-600" : "text-failed-500"
      }`}
    >
      {rule.label}
    </p>
    <RuleProgress rule={rule} />
  </li>
);

const RuleProgress = ({ rule }: { rule: RulePanelEntry }) => {
  const hasCurrent = rule.current !== undefined;
  const hasTarget = rule.target !== undefined;

  if (!hasCurrent && !hasTarget) {
    return null;
  }

  return (
    <p className="shrink-0 text-[13px] font-semibold tabular-nums">
      {hasCurrent && (
        <span className={getStatusTextClass(rule.isSatisfied)}>
          {rule.current}
        </span>
      )}
      {hasCurrent && hasTarget && (
        <span className="font-normal text-neutral-400"> / </span>
      )}
      {hasTarget && (
        <span className="font-normal text-neutral-400">{rule.target}</span>
      )}
    </p>
  );
};
