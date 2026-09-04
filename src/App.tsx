import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { OverviewView } from '@/views/OverviewView';
import { EgpView } from '@/views/EgpView';
import { FleetView } from '@/views/FleetView';
import { DmsView } from '@/views/DmsView';
import { PmsView } from '@/views/PmsView';
import { HealthView } from '@/views/HealthView';
import type { ViewKey } from '@/types';

function App() {
  const [view, setView] = useState<ViewKey>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (v: ViewKey) => {
    setView(v);
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          current={view}
          onNavigate={handleNavigate}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full animate-fade-in">
            <Sidebar
              current={view}
              onNavigate={handleNavigate}
              collapsed={false}
              onToggleCollapse={() => {}}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
          onMobileMenu={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">
            {view === 'overview' && <OverviewView onNavigate={handleNavigate} />}
            {view === 'egp' && <EgpView />}
            {view === 'fleet' && <FleetView />}
            {view === 'dms' && <DmsView />}
            {view === 'pms' && <PmsView />}
            {view === 'health' && <HealthView />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
