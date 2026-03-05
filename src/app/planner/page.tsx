'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Plus, CheckCircle, Lightbulb, BrainCircuit, ArrowDown, ArrowRight, Loader2, Wand2 } from 'lucide-react';

interface OutcomeInput {
  title: string;
  impact: string;
  tag: string;
}

export default function Planner() {
  const router = useRouter();
  const [intention, setIntention] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outcomes, setOutcomes] = useState<OutcomeInput[]>([
    { title: '', impact: '', tag: 'Deep Work' }
  ]);

  const handleGenerateOutcomes = async () => {
    if (!intention.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/generate-outcomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intention }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.outcomes && data.outcomes.length > 0) {
          setOutcomes(data.outcomes);
        }
      }
    } catch (error) {
      console.error('Failed to generate outcomes:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOutcomeChange = (index: number, field: keyof OutcomeInput, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = { ...newOutcomes[index], [field]: value };
    setOutcomes(newOutcomes);
  };

  const addEmptyOutcome = () => {
    setOutcomes([...outcomes, { title: '', impact: '', tag: 'Deep Work' }]);
  };

  const handleCommitOutcomes = async () => {
    const validOutcomes = outcomes.filter(o => o.title.trim() !== '');
    if (validOutcomes.length === 0) return;

    setIsSubmitting(true);
    try {
      // Submit each outcome
      await Promise.all(
        validOutcomes.map(outcome =>
          fetch('/api/outcomes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: outcome.title,
              impact: outcome.impact,
              tag: outcome.tag,
              priority: 'normal',
              status: 'active'
            })
          })
        )
      );

      router.push('/');
    } catch (error) {
      console.error('Failed to commit outcomes:', error);
      setIsSubmitting(false);
    }
  };

  const draftedCount = outcomes.filter(o => o.title.trim() !== '').length;

  return (
    <div className="flex-grow w-full max-w-[960px] mx-auto px-4 py-8 sm:px-6 relative pb-32">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-600/20 text-blue-600 border border-blue-600/20">
              Planning Cycle
            </span>
            <span className="text-slate-500 text-sm">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Define Your Impact
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg">
            Transform vague intentions into binary, measurable outcomes. Clarity is velocity.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#111318] border border-slate-200 dark:border-slate-800">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">System Online</span>
          </div>
        </div>
      </div>

      {/* Section 1: The Vague Goal */}
      <section className="mb-4 relative group">
        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-400 dark:from-slate-700 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" />
            01. Initial Intention
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-600 uppercase tracking-wider border border-slate-200 dark:border-slate-800 px-2 py-1 rounded">
              Brain Dump
            </span>
            <button
              onClick={handleGenerateOutcomes}
              disabled={!intention.trim() || isGenerating}
              className="flex items-center gap-1.5 text-[10px] text-white uppercase tracking-wider bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded transition-colors shadow-sm"
            >
              {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
              Generate with AI
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            className="w-full bg-white dark:bg-[#111318] border border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-xl p-6 text-lg sm:text-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 min-h-[140px] resize-none transition-all shadow-sm"
            placeholder="What are you trying to achieve broadly today? (e.g., Fix backend latency issues...)"
          ></textarea>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white transition-colors"
              title="Use Microphone"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Visual Flow Connector */}
      <div className="flex justify-center items-center py-6 relative">
        <div className="h-16 w-px bg-gradient-to-b from-slate-200 dark:from-slate-800 to-blue-600"></div>
        <div className="absolute bg-[#f6f6f8] dark:bg-[#111621] p-2 rounded-full border border-blue-600/30 text-blue-600 shadow-[0_0_15px_rgba(25,93,230,0.2)]">
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>

      {/* Section 2: Outcomes Engine */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            02. Measurable Outcomes & Strategy
          </label>
          <button
            onClick={addEmptyOutcome}
            className="text-xs text-blue-600 hover:text-blue-700 dark:hover:text-white transition-colors font-medium flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Outcome
          </button>
        </div>

        {outcomes.map((outcome, index) => (
          <div key={index} className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-6 transition-all hover:border-blue-600/40 group relative shadow-sm">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-50 group-hover:opacity-100"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              {/* Left: Binary Outcome */}
              <div className="md:col-span-7 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {outcome.title ? <CheckCircle className="text-green-500 w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-400 dark:border-slate-500"></div>}
                    <span className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">The Binary Proof</span>
                  </div>
                  <select
                    value={outcome.tag}
                    onChange={(e) => handleOutcomeChange(index, 'tag', e.target.value)}
                    className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none rounded-md py-1 px-2 focus:ring-0"
                  >
                    <option value="Deep Work">Deep Work</option>
                    <option value="Shipping">Shipping</option>
                    <option value="High Impact">High Impact</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={outcome.title}
                  onChange={(e) => handleOutcomeChange(index, 'title', e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-slate-900 dark:text-white text-lg font-medium placeholder-slate-400 dark:placeholder-slate-600 focus:ring-0"
                  placeholder="What does 'Done' look like? (e.g. Latency < 200ms)"
                />
                <p className="text-xs text-slate-500 mt-2">Must be verifiable by a third party.</p>
              </div>
              {/* Right: The Why */}
              <div className="md:col-span-5 p-6 bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className={outcome.impact ? "text-amber-500 w-4 h-4" : "text-slate-400 dark:text-slate-600 w-4 h-4"} />
                  <span className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">Strategic Value</span>
                </div>
                <textarea
                  value={outcome.impact}
                  onChange={(e) => handleOutcomeChange(index, 'impact', e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-slate-600 dark:text-slate-300 text-sm font-normal placeholder-slate-400 dark:placeholder-slate-600 focus:ring-0 resize-none"
                  placeholder="Why does this matter right now? (e.g. Unblocks the mobile team)"
                  rows={2}
                ></textarea>
              </div>
            </div>
          </div>
        ))}

      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f6f6f8] dark:from-[#111621] via-[#f6f6f8]/90 dark:via-[#111621]/90 to-transparent z-40 pointer-events-none md:pl-[280px]">
        <div className="max-w-[960px] mx-auto pointer-events-auto">
          <div className="flex items-center justify-between gap-4 bg-white dark:bg-[#1a1e29] border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
            <div className="hidden sm:flex items-center gap-4 px-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Progress</span>
                <div className="flex gap-1 mt-1">
                  <div className={`w-8 h-1 rounded-full ${draftedCount > 0 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                  <div className={`w-8 h-1 rounded-full ${draftedCount > 1 ? 'bg-blue-600/60' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                  <div className={`w-8 h-1 rounded-full ${draftedCount > 2 ? 'bg-blue-600/30' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{draftedCount} Outcomes drafted</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                Save Draft
              </button>
              <button
                onClick={handleCommitOutcomes}
                disabled={draftedCount === 0 || isSubmitting}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-[0_0_20px_rgba(25,93,230,0.4)] hover:shadow-[0_0_25px_rgba(25,93,230,0.6)] transition-all flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <span>Commit Outcomes</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}