import React from 'react';
import { ThesisAssessment } from '@/types/research';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';

interface ThesisAssessmentCardProps {
  assessment: ThesisAssessment;
}

export const ThesisAssessmentCard: React.FC<ThesisAssessmentCardProps> = ({ assessment }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (score >= 60) return { bg: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const scoreTheme = getScoreColor(assessment.alignmentScore);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Investment Thesis Assessment
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Sample Data
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Mandate alignment score, synthesis & fit breakdown
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${scoreTheme.badge}`}>
            {assessment.verdict}
          </span>
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
            <span className="text-xs text-slate-500 font-medium">Alignment:</span>
            <span className="text-sm font-bold text-slate-900">{assessment.alignmentScore} / 100</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-1">
            <span>Mandate Fit Index</span>
            <span className="font-semibold text-slate-700">{assessment.alignmentScore}% Match</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${scoreTheme.bg}`}
              style={{ width: `${assessment.alignmentScore}%` }}
            />
          </div>
        </div>

        {/* Narrative Analysis */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900 block mb-1">Thesis Alignment Synthesis:</span>
          {assessment.analysis}
        </div>

        {/* Strengths & Divergences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Strengths */}
          <div className="border border-emerald-100 bg-emerald-50/30 rounded-lg p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Core Thesis Strengths</span>
            </div>
            <ul className="space-y-2">
              {assessment.strengths.map((strength, idx) => (
                <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-snug">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divergences / Watchpoints */}
          <div className="border border-amber-100 bg-amber-50/30 rounded-lg p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Mandate Tensions & Gaps</span>
            </div>
            <ul className="space-y-2">
              {assessment.divergences.map((divergence, idx) => (
                <li key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span className="leading-snug">{divergence}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
