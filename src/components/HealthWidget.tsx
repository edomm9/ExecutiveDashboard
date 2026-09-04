import {
  FileText,
  Truck,
  FolderOpen,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import type { SubSystemHealth } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Truck,
  FolderOpen,
  Building2,
};

const statusColor: Record<string, string> = {
  Operational: 'bg-emerald-500',
  Degraded: 'bg-amber-500',
  Down: 'bg-rose-500',
};

export function HealthWidget({ system }: { system: SubSystemHealth }) {
  const Icon = iconMap[system.icon] ?? FileText;

  return (
    <div className="card card-hover p-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{system.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{system.status}</p>
          </div>
        </div>
        <span className={`h-2.5 w-2.5 rounded-full ${statusColor[system.status]} animate-pulse-soft`} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-slate-50 py-2 dark:bg-slate-800/50">
          <p className="text-sm font-bold text-slate-900 dark:text-white">{system.uptime}%</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Uptime</p>
        </div>
        <div className="rounded-lg bg-slate-50 py-2 dark:bg-slate-800/50">
          <p className="text-sm font-bold text-slate-900 dark:text-white">{system.latency}ms</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Latency</p>
        </div>
        <div className="rounded-lg bg-slate-50 py-2 dark:bg-slate-800/50">
          <p className="text-sm font-bold text-slate-900 dark:text-white">{system.incidents}</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Incidents</p>
        </div>
      </div>
    </div>
  );
}
