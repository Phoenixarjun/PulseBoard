'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Activity, Calendar, Settings, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Planner', href: '/planner', icon: Calendar },
  { name: 'Pulse', href: '/pulse', icon: Activity },
  { name: 'Focus', href: '/focus', icon: History },
  { name: 'Settings', href: '#', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-[280px] h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] flex-shrink-0 z-20 sticky top-0">
      <div className="flex flex-col h-full p-4 justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 ring-2 ring-primary/20"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdL8atMfi4Mwe7QLuJsgXCO_FdXxesBVbrGoA-3-wRynE6eqcqw_-Z00egWExQHSu_LqRHyyZiWmFgIA-cvC3HLAuETUDjBE6gtc2uM6_r_YSRpIIe1NGhBMILvMin2BWKBtYV6UWA-qCqWKOOr4TMQZKG8nwndqZU8gMTLvol8Q5OcGaJLzvHY-8FuN_GIzU2DkCZO6hOIDMZAlavjOjcFIwZdj7ZglTiuOod_maCcNSjl47icBe4Tq03KPeggKhWH74Iouzr-h_L")',
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-none tracking-tight">Daily Pulse</h1>
              <p className="text-[#9da6b8] text-xs font-medium pt-1">v2.1.0 • Pro</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group',
                    isActive
                      ? 'bg-blue-600/10 text-blue-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className={cn('text-sm', isActive ? 'font-semibold' : 'font-medium')}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button className="w-full flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-bold shadow-lg shadow-blue-900/20">
          <Plus className="w-4 h-4 mr-2" />
          <span>Log Outcome</span>
        </button>
      </div>
    </aside>
  );
}
