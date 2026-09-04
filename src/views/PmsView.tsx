import { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { ChartTooltip } from '@/components/ChartTooltip';
import { pmsMetrics, pmsAssetDistribution, pmsAssets, pmsTransfers, formatETB } from '@/data/mockData';
import { Search, Building2, ArrowRightLeft } from 'lucide-react';

export function PmsView() {
  const [search, setSearch] = useState('');

  const filteredAssets = useMemo(() => {
    const q = search.toLowerCase();
    return pmsAssets.filter(
      (a) =>
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Property Management System (PMS)
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Fixed asset registry, warehouse tracking, transfers, and disposal management
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pmsMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Asset distribution + Transfer table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Distribution chart */}
        <div className="card p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
            Asset Distribution by Category
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pmsAssetDistribution}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {pmsAssetDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip unit="B" />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {pmsAssetDistribution.map((a, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                  <span className="text-xs text-slate-600 dark:text-slate-400">{a.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">ETB {a.value}B</span>
                  <span className="ml-2 text-[10px] text-slate-400">{a.count.toLocaleString()} items</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer / disposal table */}
        <div className="card overflow-hidden lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-slate-200 p-4 dark:border-slate-800">
            <ArrowRightLeft className="h-4 w-4 text-slate-400" />
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Recent Transfers & Disposals
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Ref</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Asset</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">From → To</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Type</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">Value</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {pmsTransfers.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{t.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{t.assetName}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                      <span>{t.from}</span>
                      <span className="mx-1 text-slate-400">→</span>
                      <span>{t.to}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{t.type}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">{formatETB(t.value, true)}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Asset registry table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-400" />
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Fixed Asset Registry</h2>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
              className="input py-1.5 pl-9 text-xs"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Asset ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Category</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Location</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">Value (ETB)</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Custodian</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{a.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{a.name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{a.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{a.location}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">{formatETB(a.value, true)}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{a.custodian}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAssets.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            No assets match your search.
          </div>
        )}
      </div>
    </div>
  );
}
