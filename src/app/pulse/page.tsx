'use client';

import { useState } from 'react';
import { Zap, TrendingUp, TrendingDown, CheckSquare, CheckCircle, Battery } from 'lucide-react';

export default function Pulse() {
  const [energy, setEnergy] = useState(7);
  const [momentum, setMomentum] = useState(9);

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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[100px] animate-pulse-slow"></div>
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
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter mb-2">High Velocity</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md font-light leading-relaxed">
                Your momentum is consistently high, though energy reserves are showing slight signs of dip. Consider a shorter sprint today.
              </p>
            </div>

            {/* Radial Progress Indicator */}
            <div className="hidden md:flex relative w-32 h-32 items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" className="text-slate-200 dark:text-[#2d3748]" strokeWidth="8"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#195de6" strokeDasharray="251.2" strokeDashoffset="37" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">85</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Score</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex gap-8 mt-8 border-t border-slate-200 dark:border-white/5 pt-6">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Current State</p>
              <p className="text-slate-900 dark:text-white text-xl font-medium">Flow State</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Focus Block</p>
              <p className="text-slate-900 dark:text-white text-xl font-medium">3h 45m</p>
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

            <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
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
            <p className="text-slate-900 dark:text-white text-3xl font-bold">85<span className="text-lg text-slate-400 dark:text-slate-500 font-normal">/100</span></p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="text-green-500 w-4 h-4" />
            <p className="text-green-500 text-xs font-medium">+5% this week</p>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group shadow-sm">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Battery className="w-10 h-10 text-orange-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Energy Reserves</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold">72<span className="text-lg text-slate-400 dark:text-slate-500 font-normal">%</span></p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="text-red-500 w-4 h-4" />
            <p className="text-red-500 text-xs font-medium">-8% vs yesterday</p>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group shadow-sm">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckSquare className="w-10 h-10 text-indigo-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tasks Completed</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold">12</p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Daily Goal: 15</p>
          </div>
        </div>

        {/* Metric Card 4: Mini Sparkline */}
        <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Focus Quality</p>
          <div className="h-12 w-full mt-2 flex items-end gap-1">
            <div className="bg-slate-300 dark:bg-slate-700 h-[40%] rounded-sm flex-1"></div>
            <div className="bg-slate-300 dark:bg-slate-700 h-[60%] rounded-sm flex-1"></div>
            <div className="bg-slate-300 dark:bg-slate-700 h-[50%] rounded-sm flex-1"></div>
            <div className="bg-slate-400 dark:bg-slate-600 h-[70%] rounded-sm flex-1"></div>
            <div className="bg-blue-600/40 h-[80%] rounded-sm flex-1"></div>
            <div className="bg-blue-600/70 h-[90%] rounded-sm flex-1"></div>
            <div className="bg-blue-600 h-[85%] rounded-sm flex-1"></div>
          </div>
          <p className="text-right text-xs text-slate-400 mt-1">Last 7 days</p>
        </div>
      </div>

      {/* Detailed Chart Section */}
      <div className="bg-white dark:bg-[#161b26] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold">7-Day Momentum Trend</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Visualizing output consistency over time.</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#111621] p-1 rounded-lg border border-slate-200 dark:border-white/5">
            <button className="px-3 py-1.5 rounded-md bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm dark:shadow-none text-xs font-medium">7 Days</button>
            <button className="px-3 py-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors">30 Days</button>
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
            <path d="M0,250 C100,240 150,200 250,180 C350,160 400,210 500,150 C600,90 650,120 750,100 C850,80 900,40 1000,60 V300 H0 Z" fill="url(#chartGradient)"></path>
            {/* Line */}
            <path d="M0,250 C100,240 150,200 250,180 C350,160 400,210 500,150 C600,90 650,120 750,100 C850,80 900,40 1000,60" fill="none" stroke="#195de6" strokeLinecap="round" strokeWidth="3"></path>
            {/* Data Points (Circles) */}
            <circle cx="250" cy="180" r="4" fill="currentColor" className="text-white dark:text-[#111621]" stroke="#195de6" strokeWidth="2"></circle>
            <circle cx="500" cy="150" r="4" fill="currentColor" className="text-white dark:text-[#111621]" stroke="#195de6" strokeWidth="2"></circle>
            <circle cx="750" cy="100" r="4" fill="currentColor" className="text-white dark:text-[#111621]" stroke="#195de6" strokeWidth="2"></circle>
            <circle cx="1000" cy="60" r="6" fill="#fff" stroke="#195de6" strokeWidth="3"></circle>
          </svg>

          {/* Tooltip Mockup */}
          <div className="absolute top-[30px] right-[20px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold transform -translate-x-1/2">
            Peak Output
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-white"></div>
          </div>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 text-xs font-medium text-slate-500 uppercase tracking-widest px-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span className="text-slate-900 dark:text-white">Today</span>
        </div>
      </div>
    </div>
  );
}