import { useState, useMemo } from 'react';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { egpMetrics, egpTenders, formatETB } from '@/data/mockData';
import { Search, Download, FileText } from 'lucide-react';
import type { Tender } from '@/types';

const statusFilters = ['All', 'Open', 'Evaluation', 'Awarded', 'Closed'] as const;

export function EgpView() {
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return egpTenders.filter((t) => {
      const matchStatus = filter === 'All' || t.status === filter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.procuringEntity.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [filter, search]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of egpTenders) map[t.status] = (map[t.status] ?? 0) + 1;
    return map;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          E-GP — Electronic Government Procurement
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tender lifecycle management, bidder activity, and contract awards
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {egpMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Tender table */}
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Recent High-Value Tenders
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tenders..."
                className="input py-1.5 pl-9 text-xs"
              />
            </div>
            <button className="btn btn-ghost">
              <Download className="h-4 w-4" />
              <span className="hidden text-xs sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 px-4 py-2 dark:border-slate-800">
          {statusFilters.map((s) => {
            const count = s === 'All' ? egpTenders.length : counts[s] ?? 0;
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {s}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Tender ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Procuring Entity</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Category</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">Budget (ETB)</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Bidders</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Closing Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t: Tender) => (
                <tr
                  key={t.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">
                      <FileText className="h-3.5 w-3.5" />
                      {t.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{t.procuringEntity}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.region}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{t.category}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">
                    {formatETB(t.budget, true)}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">{t.bidders}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{t.closingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            No tenders match your search.
          </div>
        )}

        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Showing {filtered.length} of {egpTenders.length} tenders
        </div>
      </div>
    </div>
  );
}
