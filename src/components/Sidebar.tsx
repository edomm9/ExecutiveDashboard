import {
  LayoutDashboard,
  FileText,
  Truck,
  FolderOpen,
  Building2,
  Activity,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import type { ViewKey } from '@/types';

interface SidebarProps {
  current: ViewKey;
  onNavigate: (view: ViewKey) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: { key: ViewKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Command Center', icon: LayoutDashboard },
  { key: 'egp', label: 'E-GP Procurement', icon: FileText },
  { key: 'fleet', label: 'e-Fleet Management', icon: Truck },
  { key: 'dms', label: 'Document Management', icon: FolderOpen },
  { key: 'pms', label: 'Property Management', icon: Building2 },
  { key: 'health', label: 'System Health & Logs', icon: Activity },
];

export function Sidebar({ current, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
          <ShieldCheck className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">FPPA</p>
            <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">Command Center</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`sidebar-item w-full ${active ? 'sidebar-item-active' : ''} ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <button
          onClick={onToggleCollapse}
          className={`btn btn-ghost w-full ${collapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!collapsed && <span className="text-xs">Collapse</span>}
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </aside>
  );
}
