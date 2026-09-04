interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}
interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  unit?: string;
}

export function ChartTooltip({ active, payload, label, unit = '' }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1 text-xs font-semibold text-slate-900 dark:text-white">{label}</p>
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-slate-600 dark:text-slate-400 capitalize">{item.name}:</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {item.value.toLocaleString()}{unit}
          </span>
        </div>
      ))}
    </div>
  );
}
