'use client';

import { Zap, TrendingUp, Timer, BellOff, BrainCircuit, Flame, CheckCircle, AlertTriangle } from 'lucide-react';

export default function FocusTracker() {
  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-10 py-8 flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#2b3245]/50">
        <div>
          <p className="text-sm font-medium text-blue-600 mb-1 uppercase tracking-wider">Productivity Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-white">
            Daily Pulse <span className="text-slate-400 font-light">// {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#1a1f2b] px-4 py-2 rounded-lg border border-slate-200 dark:border-[#2b3245]">
          <Zap className="w-4 h-4" />
          Insight: You are 20% more focused than yesterday.
        </div>
      </header>

      {/* Visualization & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Viz Card (Left) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] p-6 shadow-sm relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="flex justify-between items-start mb-6 z-10">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Focus Ratio</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Time spent in deep work vs. distractions</p>
            </div>
            <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-bold">+12% vs avg</span>
          </div>

          {/* Circular Chart Representation */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
            <div className="relative w-56 h-56 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(rgb(25, 93, 230) 0% 72%, rgb(30, 41, 59) 72% 100%)' }}>
              <div className="absolute inset-0 rounded-full blur-sm opacity-30 bg-blue-600 animate-pulse-slow"></div>
              {/* Inner Circle */}
              <div className="w-48 h-48 bg-white dark:bg-[#1a1f2b] rounded-full flex flex-col items-center justify-center z-10">
                <span className="text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">72%</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Focus</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(25,93,230,0.5)]"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Focus (5h 12m)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Distraction (2h 05m)</span>
            </div>
          </div>
        </div>

        {/* Stats Grid (Right) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stat Card 1 */}
          <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] p-6 rounded-2xl flex flex-col justify-between hover:border-blue-600/50 transition-colors cursor-default shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
                <Timer className="w-5 h-5" />
              </div>
              <span className="text-green-500 flex items-center text-sm font-bold bg-green-500/10 px-2 py-0.5 rounded">
                <TrendingUp className="w-4 h-4 mr-1" /> +30m
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Focus Time</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">5h 12m</p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] p-6 rounded-2xl flex flex-col justify-between hover:border-red-500/50 transition-colors cursor-default shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                <BellOff className="w-5 h-5" />
              </div>
              <span className="text-green-500 flex items-center text-sm font-bold bg-green-500/10 px-2 py-0.5 rounded">
                -2
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Distractions</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">8</p>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] p-6 rounded-2xl flex flex-col justify-between hover:border-blue-600/50 transition-colors cursor-default shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-green-500 flex items-center text-sm font-bold bg-green-500/10 px-2 py-0.5 rounded">
                <TrendingUp className="w-4 h-4 mr-1" /> +5%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Flow Efficiency</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">85%</p>
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] p-6 rounded-2xl flex flex-col justify-between hover:border-blue-600/50 transition-colors cursor-default shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-slate-500 text-sm font-medium">Goal: 6h</span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Current Streak</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">4 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Timeline View</h3>
          <div className="flex gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Deep Work</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-600"></span> Shallow Work</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Distraction</span>
          </div>
        </div>

        {/* The Bar */}
        <div className="relative w-full h-12 flex rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800/50">
          <div className="h-full bg-blue-600 relative group flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors" style={{ width: '25%' }}>
            <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">API Refactor</span>
          </div>
          <div className="h-full bg-slate-600 relative group flex items-center justify-center cursor-pointer hover:bg-slate-500 transition-colors border-l border-slate-900/10 dark:border-slate-900/50" style={{ width: '6.25%' }}>
            <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
          </div>
          <div className="h-full bg-blue-600 relative group flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors border-l border-slate-900/10 dark:border-slate-900/50" style={{ width: '25%' }}>
            <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">Frontend Architecture</span>
          </div>
          <div className="h-full bg-red-500 relative group flex items-center justify-center cursor-pointer hover:bg-red-400 transition-colors border-l border-slate-900/10 dark:border-slate-900/50" style={{ width: '6.25%' }}>
            <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">Slack</span>
          </div>
          <div className="h-full bg-slate-600 relative group flex items-center justify-center cursor-pointer hover:bg-slate-500 transition-colors border-l border-slate-900/10 dark:border-slate-900/50" style={{ width: '12.5%' }}>
            <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">Standup</span>
          </div>
          <div className="h-full bg-blue-600/50 border-2 border-dashed border-blue-600/50 relative group flex items-center justify-center cursor-pointer" style={{ width: '25%' }}>
            <span className="text-[10px] font-bold text-slate-800 dark:text-white/70">Current Session</span>
          </div>
        </div>

        {/* Time Labels */}
        <div className="flex justify-between w-full mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>08:00</span>
          <span>10:00</span>
          <span>12:00</span>
          <span>14:00</span>
          <span>16:00</span>
        </div>
      </section>

      {/* Details Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {/* Focus Wins */}
        <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Focus Wins</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Backend API Integration</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded">2h 15m</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">UI Refactor - Dashboard</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded">1h 45m</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Database Schema Design</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded">45m</span>
            </div>
          </div>
        </div>

        {/* Distractions */}
        <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Distractions</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Slack Notifications</span>
              <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">45m</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Context Switching</span>
              <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">30m</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Unscheduled Meetings</span>
              <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">25m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}