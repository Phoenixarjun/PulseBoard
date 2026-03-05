'use client';

import { useEffect, useState } from 'react';
import { Pencil, Calendar, Lightbulb, Rocket, BrainCircuit, Zap } from 'lucide-react';

interface Outcome {
  id: string;
  title: string;
  status: string;
  priority: string | null;
  impact: string | null;
  tag: string | null;
}

export function TopOutcomes() {
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOutcomes() {
      try {
        const res = await fetch('/api/outcomes');
        if (res.ok) {
          const data = await res.json();
          setOutcomes(data.slice(0, 3)); // Only take top 3
        }
      } catch (error) {
        console.error('Failed to fetch outcomes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOutcomes();
  }, []);

  const completedCount = outcomes.filter((o) => o.status === 'completed').length;

  // Use mock data if database is empty for display purposes
  const displayOutcomes = outcomes.length > 0 ? outcomes : [
    {
      id: '1',
      title: 'Ship the new authentication API endpoints',
      status: 'completed',
      impact: 'Unblocks the mobile team from frontend integration',
      tag: 'Shipping',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Refactor the billing logic module',
      status: 'active',
      impact: 'Prevents technical debt accumulation before Q4 scale',
      tag: 'Deep Work',
      priority: 'normal'
    },
    {
      id: '3',
      title: 'Draft system architecture for Project X',
      status: 'active',
      impact: 'Required for stakeholder sign-off on Friday',
      tag: 'High Impact',
      priority: 'high'
    }
  ];

  const getTagIcon = (tag: string | null) => {
    switch (tag) {
      case 'Shipping': return <Rocket className="w-4 h-4" />;
      case 'Deep Work': return <BrainCircuit className="w-4 h-4" />;
      case 'High Impact': return <Zap className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <section className="flex flex-col rounded-xl bg-white dark:bg-[#1a202c] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase text-slate-900 dark:text-white">
              Today's Top 3 Outcomes
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600/10 text-blue-600 border border-blue-600/20">
              {completedCount}/3 Completed
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9da6b8] text-sm font-normal flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <button className="group flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#292e38] dark:hover:bg-[#343a46] transition-all text-slate-900 dark:text-white text-sm font-medium">
          <Pencil className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
          <span>Edit Goals</span>
        </button>
      </div>

      <div className="flex flex-col p-4 gap-3">
        {loading ? (
          <div className="p-4 text-center text-slate-500">Loading outcomes...</div>
        ) : (
          displayOutcomes.map((outcome) => (
            <label
              key={outcome.id}
              className={`group relative flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-[#252a36] hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer ${
                outcome.status === 'completed'
                  ? 'bg-blue-600/5 dark:bg-blue-600/5 border-blue-600/20 dark:border-blue-600/20'
                  : ''
              }`}
            >
              <div className="flex items-center h-full pt-1 md:pt-0">
                <input
                  type="checkbox"
                  defaultChecked={outcome.status === 'completed'}
                  className="peer h-6 w-6 rounded border-2 border-slate-300 dark:border-slate-600 bg-transparent text-blue-600 checked:bg-blue-600 checked:border-blue-600 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer transition-colors"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <h3
                  className={`text-base md:text-lg font-medium leading-snug text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors ${
                    outcome.status === 'completed' ? 'line-through opacity-60' : ''
                  }`}
                >
                  {outcome.title}
                </h3>
                {outcome.impact && (
                  <p className={`text-sm text-slate-500 dark:text-[#9da6b8] flex items-center gap-1.5 ${outcome.status === 'completed' ? 'opacity-60' : ''}`}>
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    {outcome.impact}
                  </p>
                )}
              </div>

              {outcome.tag && (
                <div className={`flex items-center mt-2 md:mt-0 ${outcome.status === 'completed' ? 'opacity-60' : ''}`}>
                  <div className="flex h-7 items-center gap-1.5 rounded-md bg-slate-100 dark:bg-[#292e38] px-3 border border-slate-200 dark:border-transparent">
                    {getTagIcon(outcome.tag)}
                    <span className="text-xs font-medium text-slate-700 dark:text-white">{outcome.tag}</span>
                  </div>
                </div>
              )}
            </label>
          ))
        )}
      </div>

      <div className="px-6 py-4 bg-slate-50 dark:bg-[#161920] border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-500 dark:text-[#9da6b8] tracking-wide uppercase">System Status: All Systems Operational</span>
        </div>
        <div className="hidden sm:flex text-xs text-slate-400 dark:text-slate-600">
          Last synced: Just now
        </div>
      </div>
    </section>
  );
}