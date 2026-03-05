'use client';

import { useState, useEffect } from 'react';
import { Zap, TrendingUp, TrendingDown, CheckSquare, CheckCircle, Battery, Loader2 } from 'lucide-react';

interface PulseLog {
  id: string;
  energy: number;
  momentum: number;
  createdAt: string;
}

export default function Pulse() {
  const [energy, setEnergy] = useState(7);
  const [momentum, setMomentum] = useState(9);
  const [isLogging, setIsLogging] = useState(false);
  const [logs, setLogs] = useState<PulseLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/pulse');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
        if (data.length > 0) {
          setEnergy(data[0].energy);
          setMomentum(data[0].momentum);
        }
      }
    } catch (error) {
      console.error('Failed to fetch pulse logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogState = async () => {
    setIsLogging(true);
    try {
      const res = await fetch('/api/pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ energy, momentum }),
      });
      if (res.ok) {
        fetchLogs();
      }
    } catch (error) {
      console.error('Failed to log pulse:', error);
    } finally {
      setIsLogging(false);
    }
  };

  // Mock data for display if database is empty
  const displayLogs = logs.length > 0 ? logs : Array.from({ length: 7 }).map((_, i) => ({
    id: i.toString(),
    energy: Math.floor(Math.random() * 4) + 6,
    momentum: Math.floor(Math.random() * 4) + 6,
    createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
  })).reverse();

  // Calculate trends
  const currentMomentum = displayLogs[0]?.momentum || 0;
  const avgMomentum = displayLogs.reduce((acc, log) => acc + log.momentum, 0) / (displayLogs.length || 1);
  const momentumTrend = ((currentMomentum - avgMomentum) / avgMomentum) * 100;

  const currentEnergy = displayLogs[0]?.energy || 0;
  const avgEnergy = displayLogs.reduce((acc, log) => acc + log.energy, 0) / (displayLogs.length || 1);
  const energyTrend = ((currentEnergy - avgEnergy) / avgEnergy) * 100;

  // For SVG Chart (Map momentum values 1-10 to SVG coordinates 300-60)
  const chartPoints = displayLogs.slice(0, 7).reverse().map((log, index) => {
    const x = (index / 6) * 1000;
    const y = 250 - (log.momentum / 10) * 190; // y goes from 250 (bottom) to 60 (top)
    return { x, y };
  });

  const pathD = chartPoints.reduce((acc, point, index) => {
    if (index === 0) return `M${point.x},${point.y}`;
    const prev = chartPoints[index - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
  }, "");

  return (
    <div className="w-full max-w-[1080px] mx-auto px-6 py-8 md:px-12 md:py-12 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-slate-500 text-sm font-bold tracking-widest uppercase">Dashboard</h2>
        <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold tracking-tight">Pulse Check</h1>
      </div>

      {/* Hero: Status & Momentum Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Status Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 p-8 flex flex-col justify-between min-h-[320px] group shadow-sm">
          {/* Abstract Background Visual */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse-slow ${currentMomentum > 7 ? 'bg-blue-600/30' : currentMomentum > 4 ? 'bg-yellow-500/30' : 'bg-red-500/30'}`}></div>
          </div>
          <svg className="absolute bottom-0 left-0 w-full h-48 text-blue-600/10" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="currentColor" fillOpacity="1"></path>
          </svg>

          {/* Content */}
          <div className="relative z-10 flex justify-between items-start w-full">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Live Indicator</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter mb-2">
                {currentMomentum > 7 ? 'High Velocity' : currentMomentum > 4 ? 'Steady Pace' : 'Low Momentum'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md font-light leading-relaxed">
                {currentMomentum > 7
                  ? "Your momentum is consistently high. Leverage this flow state to tackle your most complex tasks."
                  : "Momentum is lower than usual. Focus on smaller wins to rebuild your velocity."}
              </p>
            </div>

            {/* Radial Progress Indicator */}
            <div className="hidden md:flex relative w-32 h-32 items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" className="text-slate-200 dark:text-[#2d3748]" strokeWidth="8"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#195de6" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (currentMomentum * 10)) / 100} strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{currentMomentum * 10}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Score</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex gap-8 mt-8 border-t border-slate-200 dark:border-white/5 pt-6">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Current State</p>
              <p className="text-slate-900 dark:text-white text-xl font-medium">{currentMomentum > 7 ? 'Flow State' : 'Recovering'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Last Logged</p>
              <p className="text-slate-900 dark:text-white text-xl font-medium">
                {displayLogs[0] ? new Date(displayLogs[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Never'}
              </p>
            </div>
          </div>
        </div>

        {/* Input / Log State */}
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-2xl p-6 flex flex-col gap-6 h-full shadow-sm">
            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-1">Log Daily State</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">How are you feeling right now?</p>
            </div>

            {/* Energy Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">Energy Level</label>
                <span className="text-blue-600 font-mono text-sm">{energy}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-600 uppercase font-bold tracking-wider">
                <span>Drained</span>
                <span>Charged</span>
              </div>
            </div>

            {/* Momentum Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">Perceived Momentum</label>
                <span className="text-blue-600 font-mono text-sm">{momentum}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={momentum}
                onChange={(e) => setMomentum(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-600 uppercase font-bold tracking-wider">
                <span>Stuck</span>
                <span>Unstoppable</span>
              </div>
            </div>

            <button
              onClick={handleLogState}
              disabled={isLogging}
              className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLogging ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
              Log State
            </button>
          </div>
        </div>
      </div>

      {/* Stats & Trend Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card 1 */}
        <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group shadow-sm">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Momentum Index</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold">{Math.round(currentMomentum * 10)}<span className="text-lg text-slate-400 dark:text-slate-500 font-normal">/100</span></p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {momentumTrend >= 0 ? <TrendingUp className="text-green-500 w-4 h-4" /> : <TrendingDown className="text-red-500 w-4 h-4" />}
            <p className={momentumTrend >= 0 ? "text-green-500 text-xs font-medium" : "text-red-500 text-xs font-medium"}>
              {momentumTrend >= 0 ? '+' : ''}{momentumTrend.toFixed(0)}% vs avg
            </p>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group shadow-sm">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Battery className="w-10 h-10 text-orange-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Energy Reserves</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold">{Math.round(currentEnergy * 10)}<span className="text-lg text-slate-400 dark:text-slate-500 font-normal">%</span></p>
          </div>
          <div className="flex items-center gap-1 mt-1">
             {energyTrend >= 0 ? <TrendingUp className="text-green-500 w-4 h-4" /> : <TrendingDown className="text-red-500 w-4 h-4" />}
            <p className={energyTrend >= 0 ? "text-green-500 text-xs font-medium" : "text-red-500 text-xs font-medium"}>
              {energyTrend >= 0 ? '+' : ''}{energyTrend.toFixed(0)}% vs avg
            </p>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group shadow-sm">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckSquare className="w-10 h-10 text-indigo-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Logs Recorded</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold">{logs.length}</p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Total Lifetime Logs</p>
          </div>
        </div>

        {/* Metric Card 4: Mini Sparkline */}
        <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Recent Energy</p>
          <div className="h-12 w-full mt-2 flex items-end gap-1">
            {displayLogs.slice(0, 7).reverse().map((log, i) => (
              <div key={i} className={`${log.energy > 7 ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'} rounded-sm flex-1`} style={{ height: `${(log.energy / 10) * 100}%` }}></div>
            ))}
          </div>
          <p className="text-right text-xs text-slate-400 mt-1">Last {Math.min(displayLogs.length, 7)} entries</p>
        </div>
      </div>

      {/* Detailed Chart Section */}
      <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold">Recent Momentum Trend</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Visualizing output consistency over time.</p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative w-full h-[240px] md:h-[300px]">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
            <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
            <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
            <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
            <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
          </div>

          {/* SVG Chart */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#195de6" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#195de6" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            {/* Area */}
            <path d={`${pathD} L1000,300 L0,300 Z`} fill="url(#chartGradient)"></path>
            {/* Line */}
            <path d={pathD} fill="none" stroke="#195de6" strokeLinecap="round" strokeWidth="3"></path>

            {/* Data Points (Circles) */}
            {chartPoints.map((point, i) => (
              <circle key={i} cx={point.x} cy={point.y} r={i === chartPoints.length - 1 ? "6" : "4"} fill="currentColor" className={i === chartPoints.length - 1 ? "text-white" : "text-white dark:text-[#111621]"} stroke="#195de6" strokeWidth={i === chartPoints.length - 1 ? "3" : "2"}></circle>
            ))}
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 text-xs font-medium text-slate-500 uppercase tracking-widest px-2">
          {chartPoints.map((_, i) => (
             <span key={i} className={i === chartPoints.length - 1 ? "text-slate-900 dark:text-white" : ""}>
               {i === chartPoints.length - 1 ? 'Latest' : `-${chartPoints.length - 1 - i}`}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
}