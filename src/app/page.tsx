import { TopOutcomes } from '@/components/dashboard/TopOutcomes';
import { TrendingUp, CalendarDays, Zap, ArrowUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 md:p-8 lg:p-10 flex flex-col gap-8">
      {/* Hero Section */}
      <div className="@container">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl md:rounded-2xl min-h-[240px] relative group"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCw2ATjAPlTnD2r1ThCBC8Q_Cg-jcfljTTp_AdOglKNp2dVBYQQyrKbeHutr3Xdg_78Ttej6hzrYIhdaGYjRK-XaVO_ZqM3Mt1ZInjcXO8cuwnFcg3pcSRe3minTUDcuAwqOcQMImdsYOXfWk6hzvi21ius4wp2Edy8HEzFXWoYKCNSXaqfarO2oCv2HLqGE89cTNSh2Y7ObeeMhmSoxhQjhOScDK7DqRcHrmjmARMMuwHWyd6ESHAvWhD_C-dQRneeL8Tn5Flv0q4o")',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111621] via-[#111621]/60 to-transparent"></div>
          <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium text-white mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>System Online</span>
              </div>
              <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Good Morning, Alex
              </h1>
              <p className="text-slate-300 mt-2 text-base md:text-lg max-w-xl">
                Focus blocks initiated. You have 3 key outcomes pending for today's sprint.
              </p>
            </div>
            <div className="flex flex-col items-end text-right">
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">09:42</div>
              <div className="text-blue-600 font-medium tracking-wide text-sm uppercase">Deep Work Session</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

        {/* Left Column: Outcomes */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <TopOutcomes />

          {/* Secondary Info Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Velocity</span>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">12 pts</div>
                <div className="text-xs text-slate-500 mt-1">Above weekly average</div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Next Meeting</span>
                <CalendarDays className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900 dark:text-white truncate">Sync with Product Team</div>
                <div className="text-sm text-blue-600 mt-1">In 45 minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">Productivity Metrics</h2>

          {/* Focus vs Distraction Card */}
          <div className="bg-white dark:bg-[var(--color-surface-dark)] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Focus vs. Distraction</h3>
              <div className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Today</div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between text-sm">
                <span className="text-slate-500">Total Productive Time</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">4h 12m</span>
              </div>

              <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-600" style={{ width: '85%' }}></div>
                <div className="h-full bg-red-400/80" style={{ width: '15%' }}></div>
              </div>

              <div className="flex justify-between items-center text-xs font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-slate-500 dark:text-slate-400">Focus (85%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
                  <span className="text-slate-500 dark:text-slate-400">Distraction (15%)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Deep Work Sessions</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">3</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Context Switches</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">12</div>
              </div>
            </div>
          </div>

          {/* Energy & Momentum Card */}
          <div className="bg-white dark:bg-[var(--color-surface-dark)] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Energy &amp; Momentum</h3>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>

            <div className="relative h-24 w-full flex items-end gap-1">
              <div className="w-full bg-slate-800/30 rounded-t-sm h-[30%]"></div>
              <div className="w-full bg-slate-800/30 rounded-t-sm h-[45%]"></div>
              <div className="w-full bg-slate-800/30 rounded-t-sm h-[40%]"></div>
              <div className="w-full bg-slate-800/30 rounded-t-sm h-[60%]"></div>
              <div className="w-full bg-slate-800/30 rounded-t-sm h-[55%]"></div>
              <div className="w-full bg-blue-600/40 rounded-t-sm h-[75%]"></div>
              <div className="w-full bg-blue-600/60 rounded-t-sm h-[85%]"></div>
              <div className="w-full bg-blue-600/80 rounded-t-sm h-[80%]"></div>
              <div className="w-full bg-blue-600 rounded-t-sm h-[95%] relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Current Level</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-green-500">
                <ArrowUp className="w-5 h-5" />
              </div>
              <div className="flex-col flex">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Peak Performance</span>
                <span className="text-xs text-slate-500">You're in the flow state. Keep pushing.</span>
              </div>
            </div>
          </div>

          <div className="mt-auto py-4 text-center lg:text-left">
            <p className="text-slate-400 italic font-body text-sm">"The way to get started is to quit talking and begin doing."</p>
          </div>
        </div>
      </div>
    </div>
  );
}