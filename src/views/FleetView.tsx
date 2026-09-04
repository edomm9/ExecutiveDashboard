import { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { ChartTooltip } from '@/components/ChartTooltip';
import { fleetMetrics, fleetVehicles, vehicleTypeBreakdown, fleetAlerts, formatETB } from '@/data/mockData';
import { Search, Truck, Wrench, ShieldAlert, Gauge } from 'lucide-react';

const deploymentData = [
  { status: 'Active', count: 412, color: '#10b981' },
  { status: 'Maintenance', count: 22, color: '#f59e0b' },
  { status: 'Idle', count: 12, color: '#64748b' },
];

const severityStyle: Record<string, string> = {
  urgent: 'border-l-rose-500 bg-rose-50 dark:bg-rose-950/30',
  warning: 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30',
  info: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30',
};

const severityIcon: Record<string, string> = {
  urgent: 'text-rose-600 dark:text-rose-400',
  warning: 'text-amber-600 dark:text-amber-400',
  info: 'text-blue-600 dark:text-blue-400',
};

export function FleetView() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return fleetVehicles.filter(
      (v) =>
        !q ||
        v.plate.toLowerCase().includes(q) ||
        v.assignedTo.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">e-Fleet Management</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Vehicle fleet tracking, deployment status, fuel, and maintenance alerts
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {fleetMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Vehicle type breakdown */}
        <div className="card p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
            Fleet Composition by Vehicle Type
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={vehicleTypeBreakdown}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {vehicleTypeBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {vehicleTypeBreakdown.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                <span className="text-xs text-slate-600 dark:text-slate-400">{v.type}</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">{v.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment status */}
        <div className="card p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
            Deployment Status
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deploymentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="status" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(148,163,184,0.1)' }} />
              <Bar dataKey="count" name="Vehicles" radius={[6, 6, 0, 0]}>
                {deploymentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-around">
            {deploymentData.map((d, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{d.count}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{d.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts + Vehicle table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Alerts */}
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Maintenance Alerts</h2>
          </div>
          <div className="space-y-2.5">
            {fleetAlerts.map((a) => (
              <div key={a.id} className={`rounded-lg border-l-4 p-3 ${severityStyle[a.severity]}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">{a.plate}</span>
                  <span className={`text-[10px] font-bold uppercase ${severityIcon[a.severity]}`}>{a.severity}</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{a.message}</p>
                <p className="mt-0.5 text-[10px] text-slate-400">{a.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle table */}
        <div className="card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Fleet Roster</h2>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vehicles..."
                className="input py-1.5 pl-9 text-xs"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Plate</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Assigned To</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">Fuel (Mo.)</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">Odometer</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <Truck className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">{v.plate}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{v.type}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{v.assignedTo}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">{formatETB(v.fuelCost, true)}</td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">
                      <span className="flex items-center justify-end gap-1">
                        <Gauge className="h-3 w-3 text-slate-400" />
                        {v.odometer.toLocaleString()} km
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
