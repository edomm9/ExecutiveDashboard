import {
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Truck,
  Building2,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import type { Kpi } from '@/types';

const accentMap: Record<
  Kpi['accent'],
  { bg: string; text: string; iconBg: string }
> = {
  brand: { bg: 'bg-brand-50 dark:bg-brand-950/40', text: 'text-brand-600 dark:text-brand-400', iconBg: 'bg-brand-100 dark:bg-brand-900/50' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-100 dark:bg-emerald-900/50' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-600 dark:text-amber-400', iconBg: 'bg-amber-100 dark:bg-amber-900/50' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-600 dark:text-rose-400', iconBg: 'bg-rose-100 dark:bg-rose-900/50' },
  slate: { bg: 'bg-slate-100 dark:bg-slate-800/40', text: 'text-slate-600 dark:text-slate-400', iconBg: 'bg-slate-200 dark:bg-slate-700/50' },
};

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  TrendingDown,
  FileText,
  Truck,
  Building2,
  AlertCircle,
};

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const accent = accentMap[kpi.accent];
  const Icon = iconMap[kpi.icon] ?? TrendingUp;
  const trendUp = kpi.trendDirection === 'up';
  const trendDown = kpi.trendDirection === 'down';

  return (
    <div className={`card card-hover p-5 animate-fade-in ${accent.bg}`}>
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent.iconBg} ${accent.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            trendUp
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
              : trendDown
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          {trendUp && <TrendingUp className="h-3 w-3" />}
          {trendDown && <TrendingDown className="h-3 w-3" />}
          {kpi.trendDirection === 'flat' && <Minus className="h-3 w-3" />}
          {Math.abs(kpi.trend)}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {kpi.value}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          {kpi.label}
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{kpi.sub}</p>
      </div>
    </div>
  );
}
