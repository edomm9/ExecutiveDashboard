type StatusType = 'Open' | 'Evaluation' | 'Awarded' | 'Closed' | 'Active' | 'Maintenance' | 'Idle' | 'In Use' | 'In Storage' | 'Surplus' | 'Pending Disposal' | 'Pending Sign-off' | 'In Review' | 'Signed' | 'Archived' | 'Pending' | 'Approved' | 'Rejected' | 'Operational' | 'Degraded' | 'Down';

const statusStyles: Record<string, string> = {
  Open: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  Evaluation: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Awarded: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Closed: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Maintenance: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Idle: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  'In Use': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  'In Storage': 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  Surplus: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  'Pending Disposal': 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
  'Pending Sign-off': 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
  'In Review': 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Signed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Archived: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
  Operational: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Degraded: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Down: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
};

export function StatusBadge({ status }: { status: StatusType | string }) {
  const style = statusStyles[status] ?? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
