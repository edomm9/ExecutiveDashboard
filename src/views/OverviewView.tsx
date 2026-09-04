import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { KpiCard } from '@/components/KpiCard';
import { HealthWidget } from '@/components/HealthWidget';
import { ChartTooltip } from '@/components/ChartTooltip';
import { overviewKpis, procurementTrend, systemHealth } from '@/data/mockData';
import { AlertCircle, ArrowRight } from 'lucide-react';
import type { ViewKey } from '@/types';

export function OverviewView({ onNavigate }: { onNavigate: (v: ViewKey) => void }) {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Command Center</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Real-time executive overview of all FPPA sub-systems — Fiscal Year 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {overviewKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Trend chart + Pending approvals */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trend chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Procurement Volume vs. Asset Allocation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly procurement value (ETB Billions) vs. cumulative asset valuation
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={procurementTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="procGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3366ff" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3366ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Area
                type="monotone"
                dataKey="procurement"
                name="Procurement (ETB B)"
                stroke="#3366ff"
                strokeWidth={2}
                fill="url(#procGrad)"
              />
              <Line
                type="monotone"
                dataKey="assets"
                name="Asset Valuation (ETB B)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Pending approvals */}
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <AlertCircle className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Pending Executive Approvals
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Tender Award — EGP-2026-0479', sub: 'ETB 1.24B · Ethiopian Electric Power', view: 'egp' as ViewKey, priority: 'High' },
              { label: 'Asset Disposal — Isuzu FVR Truck', sub: 'ETB 4.9M · Mekanisa Depot', view: 'pms' as ViewKey, priority: 'High' },
              { label: 'Procurement Directive Amendment', sub: 'Policy Directorate · FY2026', view: 'dms' as ViewKey, priority: 'High' },
              { label: 'Framework Contract — Fuel Supply', sub: 'ETB 280M · Logistics Directorate', view: 'dms' as ViewKey, priority: 'Normal' },
              { label: 'Vehicle Inspection — V-004 Bus', sub: 'Overdue 2 days · Lideta Depot', view: 'fleet' as ViewKey, priority: 'High' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => onNavigate(item.view)}
                className="group flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition-colors hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.label}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{item.sub}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => onNavigate('dms')}
            className="btn btn-ghost mt-4 w-full justify-center text-xs"
          >
            View all pending items
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* System health widgets */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">
          Sub-System Health Status
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {systemHealth.map((s) => (
            <button key={s.key} onClick={() => onNavigate(s.key)} className="text-left">
              <HealthWidget system={s} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
