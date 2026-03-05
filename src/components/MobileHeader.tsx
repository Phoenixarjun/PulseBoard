'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function MobileHeader() {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case '/': return 'Daily Pulse';
      case '/planner': return 'Outcome Planner';
      case '/pulse': return 'Pulse Check';
      case '/focus': return 'Focus Tracker';
      default: return 'Daily Pulse';
    }
  };

  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#111318] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
      <div className="font-bold text-lg">{getPageTitle()}</div>
      <button className="text-slate-500 hover:text-blue-600">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}