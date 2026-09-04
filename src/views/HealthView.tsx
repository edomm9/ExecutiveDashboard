import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HealthWidget } from '@/components/HealthWidget';
import { ChartTooltip } from '@/components/ChartTooltip';
import { systemHealth, systemLogs } from '@/data/mockData';
import { Search, Server, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

const levelStyle: Record<string, string> = {
  INFO: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  WARN: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  ERROR: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
  CRITICAL: 'bg-red-600 text-white',
};

const systemFilters = ['All', 'E-GP', 'e-Fleet', 'DMS', 'PMS', 'Auth', 'Core'] as const;
const levelFilters = ['All', 'INFO', 'WARN', 'ERROR', 'CRITICAL'] as const;

const uptimeHistory = [
  { time: '00:00', egp: 100, fleet: 100, dms: 100, pms: 99.8 },
  { time: '03:00', egp: 100, fleet: 99.9, dms: 100, pms: 99.7 },
  { time: '06:00', egp: 100, fleet: 99.9, dms: 100, pms: 99.5 },
  { time: '09:00', egp: 99.97, fleet: 99.89, dms: 99.95, pms: 99.82 },
  { time: '12:00', egp: 99.97, fleet: 99.89, dms: 99.95, pms: 99.82 },
];

export function HealthView() {
  const [search, setSearch] = useState('');
  const [sysFilter, setSysFilter] = useState<(typeof systemFilters)[number]>('All');
  const [lvlFilter, setLvlFilter] = useState<(typeof levelFilters)[number]>('All');

  const filteredLogs = useMemo(() => {
    return systemLogs.filter((l) => {
      const matchSys = sysFilter === 'All' || l.system === sysFilter;
      const matchLvl = lvlFilter === 'All' || l.level === lvlFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || l.message.toLowerCase().includes(q) || l.user.toLowerCase().includes(q);
      return matchSys && matchLvl && matchSearch;
    });
  }, [search, sysFilter, lvlFilter]);

  const stats = useMemo(() => {
    const errors = systemLogs.filter((l) => l.level === 'ERROR' || l.level === 'CRITICAL').length;
    const warnings = systemLogs.filter((l) => l.level === 'WARN').length;
    const info = systemLogs.filter((l) => l.level === 'INFO').length;
    return { errors, warnings, info };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Health & Logs</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Real-time monitoring of all FPPA sub-systems, uptime metrics, and audit logs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.info}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Info Events (Today)</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.warnings}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Warnings (Today)</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.errors}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Errors & Critical (Today)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health widgets */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">Sub-System Status</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {systemHealth.map((s) => (
            <HealthWidget key={s.key} system={s} />
          ))}
        </div>
      </div>

      {/* Uptime chart */}
      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-brand-500" />
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Uptime History (24h)</h2>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={uptimeHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3366ff" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3366ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis domain={[99, 100.1]} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip content={<ChartTooltip unit="%" />} />
            <Area type="monotone" dataKey="pms" name="PMS" stroke="#f59e0b" strokeWidth={2} fill="none" />
            <Area type="monotone" dataKey="egp" name="E-GP" stroke="#3366ff" strokeWidth={2} fill="url(#uptimeGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Logs table */}
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">System Audit Logs</h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs..."
              className="input py-1.5 pl-9 text-xs"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-4 py-2 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1">
            {systemFilters.map((s) => (
              <button
                key={s}
                onClick={() => setSysFilter(s)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  sysFilter === s
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-wrap items-center gap-1">
            {levelFilters.map((l) => (
              <button
                key={l}
                onClick={() => setLvlFilter(l)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  lvlFilter === l
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Timestamp</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">System</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Level</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Message</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">User</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((l) => (
                <tr
                  key={l.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{l.timestamp}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{l.system}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${levelStyle[l.level]}`}>
                      {l.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{l.message}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{l.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            No logs match your filters.
          </div>
        )}
        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Showing {filteredLogs.length} of {systemLogs.length} log entries
        </div>
      </div>
    </div>
  );
}
