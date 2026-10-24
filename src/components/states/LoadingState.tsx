import React, { useEffect, useState } from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

const RESEARCH_STEPS = [
  'Resolving target domain footprint and entity indicators...',
  'Evaluating stage fit, geography backdrop, and mandate thesis...',
  'Analyzing team technical density, product gravity & traction signals...',
  'Synthesizing risk watchpoints & identifying missing evidence...',
  'Formulating targeted partner questions and evidence citations...',
];

export const LoadingState: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev < RESEARCH_STEPS.length - 1 ? prev + 1 : prev));
    }, 380);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center transition-all animate-pulse-none">
      <div className="max-w-md mx-auto">
        {/* Animated Compass Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
            <Compass className="w-8 h-8 animate-spin text-indigo-600" style={{ animationDuration: '4s' }} />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-600"></span>
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Synthesizing Investment Brief...
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Running evidence-backed preliminary investment assessment
        </p>

        {/* Step Progression List */}
        <div className="mt-6 space-y-2.5 text-left border-t border-slate-100 pt-6">
          {RESEARCH_STEPS.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;

            return (
              <div
                key={step}
                className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'text-slate-700'
                    : isCurrent
                    ? 'text-indigo-600 font-semibold'
                    : 'text-slate-300'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-200 shrink-0" />
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
