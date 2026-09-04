import { useState } from 'react';
import {
  Search,
  Calendar,
  Bell,
  Sun,
  Moon,
  CheckCircle2,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  onMobileMenu: () => void;
}

export function Header({ darkMode, onToggleDark, onMobileMenu }: HeaderProps) {
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:px-6">
      {/* Mobile menu */}
      <button onClick={onMobileMenu} className="btn btn-ghost lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tenders, assets, documents..."
          className="input w-full pl-9"
        />
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* System status */}
        <div className="hidden items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 dark:border-emerald-800 dark:bg-emerald-950/40 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            All Systems Operational
          </span>
        </div>

        {/* Date range */}
        <button className="btn btn-ghost hidden sm:flex">
          <Calendar className="h-4 w-4" />
          <span className="text-xs font-medium">FY 2026</span>
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            7
          </span>
        </button>

        {/* Dark mode */}
        <button onClick={onToggleDark} className="btn btn-ghost">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 py-1 pl-1 pr-3 dark:border-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            DG
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Dr. A. Bekele</p>
            <p className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
              Director General
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
