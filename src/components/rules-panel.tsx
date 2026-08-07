import { GAME_STATE, RULES, type Rule, type RuleStatus } from "../data";
import { Card, PanelHeader } from "./card";
import {
  CheckCircleIcon,
  ClipboardIcon,
  ClockIcon,
  CrossCircleIcon,
} from "./icons";

const STATUS_ICON: Record<RuleStatus, React.ReactNode> = {
  satisfied: <CheckCircleIcon className="h-5 w-5 text-emerald-500" />,
  failed: <CrossCircleIcon className="h-5 w-5 text-red-500" />,
  pending: <ClockIcon className="h-5 w-5 text-neutral-400" />,
};

const STATUS_TEXT: Record<RuleStatus, string> = {
  satisfied: "text-emerald-600",
  failed: "text-red-500",
  pending: "text-neutral-400",
};

const STATUS_ROW: Record<RuleStatus, string> = {
  satisfied: "bg-emerald-50/60",
  failed: "bg-red-50/50",
  pending: "",
};

const RuleRow = ({ rule }: { rule: Rule }) => (
  <li
    className={`flex items-center gap-3 border-b border-neutral-100 px-5 py-3 last:border-b-0 ${STATUS_ROW[rule.status]}`}
  >
    {STATUS_ICON[rule.status]}
    <p
      className={`min-w-0 flex-1 text-[14px] ${
        rule.status === "pending" ? "text-neutral-500" : "text-neutral-800"
      }`}
    >
      {rule.label}
    </p>
    {rule.current ? (
      <p className="shrink-0 text-[13px] font-semibold tabular-nums">
        <span className={STATUS_TEXT[rule.status]}>{rule.current}</span>
        {rule.target && (
          <span className="font-normal text-neutral-400"> / {rule.target}</span>
        )}
      </p>
    ) : (
      rule.status === "pending" && (
        <span className="shrink-0 text-[13px] text-neutral-300">—</span>
      )
    )}
  </li>
);

export const RulesPanel = () => (
  <Card className="flex min-h-0 flex-col">
    <PanelHeader
      icon={<ClipboardIcon className="h-5 w-5" />}
      title="Rules"
      subtitle="All rules must be satisfied."
      right={
        <span className="text-[15px] font-bold text-emerald-600 tabular-nums">
          {GAME_STATE.rulesSatisfied}
          <span className="text-neutral-400"> / {GAME_STATE.rulesTotal}</span>
        </span>
      }
    />

    <ul className="min-h-0 flex-1 overflow-y-auto">
      {RULES.map((rule) => (
        <RuleRow key={rule.id} rule={rule} />
      ))}
    </ul>
  </Card>
);
