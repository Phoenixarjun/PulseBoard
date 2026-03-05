'use client';

import { useState, useEffect } from 'react';
import { Zap, TrendingUp, TrendingDown, Timer, BellOff, BrainCircuit, Flame, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface FocusSession {
  id: string;
  title: string;
  duration: number; // in minutes
  type: string; // 'focus', 'shallow', 'distraction'
  startTime: string;
  endTime: string;
}

export default function FocusTracker() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLogging, setIsLogging] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('60');
  const [type, setType] = useState('focus');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/focus');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Failed to fetch focus sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsLogging(true);
    const durationNum = parseInt(duration, 10);
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - durationNum * 60000);

    try {
      const res = await fetch('/api/focus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          duration: durationNum,
          type,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }),
      });

      if (res.ok) {
        setTitle('');
        setDuration('60');
        fetchSessions();
      }
    } catch (error) {
      console.error('Failed to log session:', error);
    } finally {
      setIsLogging(false);
    }
  };

  // Calculations
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todaysSessions = sessions.filter(s => new Date(s.startTime) >= todayStart);

  const focusTimeMinutes = todaysSessions
    .filter(s => s.type === 'focus')
    .reduce((acc, s) => acc + s.duration, 0);
  const distractionTimeMinutes = todaysSessions
    .filter(s => s.type === 'distraction')
    .reduce((acc, s) => acc + s.duration, 0);
  const shallowTimeMinutes = todaysSessions
    .filter(s => s.type === 'shallow')
    .reduce((acc, s) => acc + s.duration, 0);

  const totalTime = focusTimeMinutes + distractionTimeMinutes + shallowTimeMinutes;
  const focusRatio = totalTime > 0 ? Math.round((focusTimeMinutes / totalTime) * 100) : 0;

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const topFocus = todaysSessions.filter(s => s.type === 'focus').sort((a, b) => b.duration - a.duration).slice(0, 3);
  const topDistractions = todaysSessions.filter(s => s.type === 'distraction').sort((a, b) => b.duration - a.duration).slice(0, 3);

  // Fallbacks if empty
  const displayFocusRatio = sessions.length > 0 ? focusRatio : 72;
  const displayFocusTime = sessions.length > 0 ? formatTime(focusTimeMinutes) : '5h 12m';
  const displayDistractions = sessions.length > 0 ? todaysSessions.filter(s => s.type === 'distraction').length : 8;
  const displayFlowEfficiency = sessions.length > 0 ? (totalTime > 0 ? Math.round((focusTimeMinutes / (focusTimeMinutes + shallowTimeMinutes)) * 100) : 0) : 85;

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

      {/* Manual Logging Form */}
      <section className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Log Session</h3>
        <form onSubmit={handleLogSession} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-slate-500 mb-1">Activity Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm text-slate-900 dark:text-white"
              placeholder="e.g. Backend API Integration"
            />
          </div>
          <div className="w-full md:w-32">
            <label className="block text-xs font-medium text-slate-500 mb-1">Duration (min)</label>
            <input
              type="number"
              required
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="w-full md:w-40">
            <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm text-slate-900 dark:text-white"
            >
              <option value="focus">Deep Work</option>
              <option value="shallow">Shallow Work</option>
              <option value="distraction">Distraction</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLogging || !title}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLogging ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log Time'}
          </button>
        </form>
      </section>

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
          </div>

          {/* Circular Chart Representation */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
            <div className="relative w-56 h-56 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(rgb(25, 93, 230) 0% ${displayFocusRatio}%, rgb(30, 41, 59) ${displayFocusRatio}% 100%)` }}>
              <div className="absolute inset-0 rounded-full blur-sm opacity-30 bg-blue-600 animate-pulse-slow"></div>
              {/* Inner Circle */}
              <div className="w-48 h-48 bg-white dark:bg-[#1a1f2b] rounded-full flex flex-col items-center justify-center z-10">
                <span className="text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">{displayFocusRatio}%</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Focus</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(25,93,230,0.5)]"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Focus ({sessions.length > 0 ? formatTime(focusTimeMinutes) : '5h 12m'})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Distraction ({sessions.length > 0 ? formatTime(distractionTimeMinutes) : '2h 05m'})</span>
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
                Today
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Focus Time</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{displayFocusTime}</p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] p-6 rounded-2xl flex flex-col justify-between hover:border-red-500/50 transition-colors cursor-default shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                <BellOff className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Distractions</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{displayDistractions}</p>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] p-6 rounded-2xl flex flex-col justify-between hover:border-blue-600/50 transition-colors cursor-default shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
                <BrainCircuit className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Flow Efficiency</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{displayFlowEfficiency}%</p>
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

      {/* Details Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {/* Focus Wins */}
        <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Focus Wins</h3>
          </div>
          <div className="flex flex-col gap-3">
            {topFocus.length > 0 ? topFocus.map(session => (
              <div key={session.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{session.title}</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded">{formatTime(session.duration)}</span>
              </div>
            )) : (
              // Mock fallback
              <>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Backend API Integration</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded">2h 15m</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">UI Refactor - Dashboard</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded">1h 45m</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Distractions */}
        <div className="bg-white dark:bg-[#1a1f2b] border border-slate-200 dark:border-[#2b3245] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Distractions</h3>
          </div>
          <div className="flex flex-col gap-3">
            {topDistractions.length > 0 ? topDistractions.map(session => (
              <div key={session.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{session.title}</span>
                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">{formatTime(session.duration)}</span>
              </div>
            )) : (
              // Mock fallback
              <>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Slack Notifications</span>
                  <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">45m</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-[#111621]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Context Switching</span>
                  <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">30m</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}