import React from 'react';
import { RiskConcern } from '@/types/research';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface RisksConcernsCardProps {
  risks: RiskConcern[];
}

export const RisksConcernsCard: React.FC<RisksConcernsCardProps> = ({ risks }) => {
  const getSeverityBadge = (severity: RiskConcern['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Moderate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Risks & Concerns
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Sample Data
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Downside vulnerabilities, market friction & structural watchpoints
            </p>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
          {risks.length} key risk items
        </span>
      </div>

      {/* Risks List */}
      <div className="p-5 space-y-3">
        {risks.map((risk) => (
          <div
            key={risk.id}
            className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                {risk.title}
              </h4>
              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${getSeverityBadge(
                  risk.severity
                )}`}
              >
                {risk.severity} Severity
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
              {risk.description}
            </p>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-700 flex items-start gap-1.5">
              <span className="font-semibold text-slate-900 shrink-0">Partner Watchpoint:</span>
              <span className="text-slate-600 leading-snug">{risk.mitigationOrWatchpoint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
