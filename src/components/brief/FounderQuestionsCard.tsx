import React from 'react';
import { FounderQuestion } from '@/types/research';
import { HelpCircle, MessageSquare, CheckCircle } from 'lucide-react';

interface FounderQuestionsCardProps {
  questions: FounderQuestion[];
}

export const FounderQuestionsCard: React.FC<FounderQuestionsCardProps> = ({ questions }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Questions for the Founder
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Sample Data
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              High-signal interview probes for the initial partner pitch meeting
            </p>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
          {questions.length} prioritized questions
        </span>
      </div>

      {/* Questions list */}
      <div className="p-5 space-y-3.5">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="p-4 rounded-lg border border-slate-200 bg-slate-50/30 hover:bg-white hover:border-slate-300 transition-colors"
          >
            {/* Category & Index */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                {q.category}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Question {idx + 1} of {questions.length}
              </span>
            </div>

            {/* Question Text */}
            <h4 className="text-xs font-bold text-slate-900 leading-snug mb-3 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
              <span>&ldquo;{q.question}&rdquo;</span>
            </h4>

            {/* Rationale and Target Signal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded bg-white border border-slate-150">
                <span className="font-semibold text-slate-700 block text-[11px] mb-0.5">
                  Strategic Diligence Rationale:
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {q.rationale}
                </p>
              </div>

              <div className="p-2.5 rounded bg-emerald-50/40 border border-emerald-100">
                <span className="font-semibold text-emerald-900 block text-[11px] mb-0.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Target Signal to Listen For:
                </span>
                <p className="text-emerald-950 text-[11px] leading-relaxed">
                  {q.expectedSignal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
