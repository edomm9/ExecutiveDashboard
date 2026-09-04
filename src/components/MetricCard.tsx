import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  trend: number;
  direction: 'up' | 'down' | 'flat';
}

export function MetricCard({ label, value, sub, trend, direction }: MetricCardProps) {
  const isUp = direction === 'up';
  const isDown = direction === 'down';
  const isFlat = direction === 'flat';

  return (
    <div className="card p-4 animate-fade-in">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{value}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${
            isFlat
              ? 'text-slate-500'
              : isUp
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {isUp && <TrendingUp className="h-3 w-3" />}
          {isDown && <TrendingDown className="h-3 w-3" />}
          {isFlat && <Minus className="h-3 w-3" />}
          {isFlat ? '0%' : `${trend > 0 ? '+' : ''}${trend}%`}
        </span>
      </div>
    </div>
  );
}
