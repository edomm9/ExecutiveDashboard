import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { ChartTooltip } from '@/components/ChartTooltip';
import { dmsMetrics, dmsCategoryBreakdown, dmsDocuments } from '@/data/mockData';
import { Search, FolderOpen, FileCheck, Clock, PenLine } from 'lucide-react';

const priorityStyle: Record<string, string> = {
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
  Normal: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  Low: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500',
};

const categoryFilters = ['All', 'Procurement Directive', 'Framework Contract', 'Audit Report', 'Legal Memo'] as const;

export function DmsView() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<(typeof categoryFilters)[number]>('All');

  const filtered = useMemo(() => {
    return dmsDocuments.filter((d) => {
      const matchCat = catFilter === 'All' || d.category === catFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.uploadedBy.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, catFilter]);

  const signOffQueue = dmsDocuments.filter((d) => d.status === 'Pending Sign-off');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Document Management System (DMS)
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Digitized document repository, review queues, and executive digital sign-off
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dmsMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Category chart + Sign-off queue */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category breakdown */}
        <div className="card p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
            Document Category Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={dmsCategoryBreakdown}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                width={130}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(148,163,184,0.1)' }} />
              <Bar dataKey="count" name="Documents" radius={[0, 6, 6, 0]}>
                {dmsCategoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sign-off queue */}
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <PenLine className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Executive Sign-off Queue
            </h2>
          </div>
          <div className="space-y-2.5">
            {signOffQueue.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-3 transition-colors hover:border-brand-300 dark:border-slate-800 dark:hover:border-brand-700"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{d.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {d.uploadedBy} · {d.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${priorityStyle[d.priority]}`}>
                    {d.priority}
                  </span>
                  <button className="btn btn-primary py-1 text-xs">
                    <FileCheck className="h-3.5 w-3.5" />
                    Sign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document table */}
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Document Repository</h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="input py-1.5 pl-9 text-xs"
            />
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 px-4 py-2 dark:border-slate-800">
          {categoryFilters.map((c) => {
            const active = catFilter === c;
            return (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Document ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Title</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Category</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Uploaded By</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Priority</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <FolderOpen className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{d.id}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{d.title}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{d.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{d.uploadedBy}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{d.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${priorityStyle[d.priority]}`}>
                      {d.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            No documents match your search.
          </div>
        )}
      </div>
    </div>
  );
}
