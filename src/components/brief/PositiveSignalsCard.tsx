import React from 'react';
import { PositiveSignal } from '@/types/research';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface PositiveSignalsCardProps {
  signals: PositiveSignal[];
}

export const PositiveSignalsCard: React.FC<PositiveSignalsCardProps> = ({ signals }) => {
  const getImpactBadge = (impact: PositiveSignal['impact']) => {
    switch (impact) {
      case 'High':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Positive Signals
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Sample Data
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Observable team, moat, traction & market vectors
            </p>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
          {signals.length} positive signals detected
        </span>
      </div>

      {/* Signals List */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="p-3.5 rounded-lg border border-slate-150 bg-white hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {signal.category}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${getImpactBadge(
                      signal.impact
                    )}`}
                  >
                    {signal.impact} Impact
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mb-1">
                  {signal.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {signal.description}
                </p>
              </div>

              {signal.evidenceSourceId && (
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">Ref: {signal.evidenceSourceId}</span>
                  <span className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                    Cross-referenced <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
