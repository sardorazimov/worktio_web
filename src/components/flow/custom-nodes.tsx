"use client";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Zap, Brain, Globe, GitBranch, Code2, Mail } from "lucide-react";

type NodeConfig = {
  icon: React.ReactNode;
  label: string;
  color: string;
  bg: string;
  border: string;
  iconBg: string;
};

const NODE_CONFIGS: Record<string, NodeConfig> = {
  trigger:   { icon: <Zap size={16} />,       label: "Trigger",      color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   iconBg: "bg-amber-500/20" },
  ai:        { icon: <Brain size={16} />,      label: "AI / Gemini",  color: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/30",  iconBg: "bg-purple-500/20" },
  http:      { icon: <Globe size={16} />,      label: "HTTP İstek",   color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/30",    iconBg: "bg-blue-500/20" },
  condition: { icon: <GitBranch size={16} />,  label: "Koşul",        color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", iconBg: "bg-emerald-500/20" },
  code:      { icon: <Code2 size={16} />,      label: "Kod Çalıştır", color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/30",    iconBg: "bg-rose-500/20" },
  gmail:     { icon: <Mail size={16} />,       label: "Gmail",        color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/30",     iconBg: "bg-red-500/20" },
};

function BaseNode({ data, type, selected }: NodeProps & { type: string }) {
  const cfg = NODE_CONFIGS[type] ?? NODE_CONFIGS.trigger;
  const label = (data?.label as string) ?? cfg.label;
  const subtitle = (data?.url as string) || (data?.prompt as string) || (data?.to as string) || null;

  return (
    <div className={`
      min-w-[200px] rounded-xl border transition-all duration-150
      bg-zinc-900 border-zinc-700
      ${selected ? "ring-2 ring-purple-500 ring-offset-1 ring-offset-zinc-950 border-purple-500/50" : "hover:border-zinc-500"}
    `}>
      {/* Header */}
      <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-t-xl border-b ${cfg.bg} ${cfg.border}`}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cfg.iconBg} ${cfg.color} shrink-0`}>
          {cfg.icon}
        </div>
        <div>
          <div className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</div>
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        <div className="text-sm font-medium text-zinc-200 truncate max-w-[180px]">{label}</div>
        {subtitle && (
          <div className="text-xs text-zinc-500 truncate max-w-[180px] mt-0.5">{subtitle}</div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-zinc-600 !border-2 !border-zinc-400 hover:!bg-purple-500 hover:!border-purple-400 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-zinc-600 !border-2 !border-zinc-400 hover:!bg-purple-500 hover:!border-purple-400 transition-colors"
      />
    </div>
  );
}

export const TriggerNode   = (p: NodeProps) => <BaseNode {...p} type="trigger" />;
export const AINode        = (p: NodeProps) => <BaseNode {...p} type="ai" />;
export const HTTPNode      = (p: NodeProps) => <BaseNode {...p} type="http" />;
export const ConditionNode = (p: NodeProps) => <BaseNode {...p} type="condition" />;
export const CodeNode      = (p: NodeProps) => <BaseNode {...p} type="code" />;
export const GmailNode     = (p: NodeProps) => <BaseNode {...p} type="gmail" />;

export const nodeTypes = {
  trigger: TriggerNode,
  ai: AINode,
  http: HTTPNode,
  condition: ConditionNode,
  code: CodeNode,
  gmail: GmailNode,
};