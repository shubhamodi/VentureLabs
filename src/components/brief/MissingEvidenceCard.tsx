import React from 'react';
import { MissingEvidence } from '@/types/research';
import { FileQuestion, AlertCircle } from 'lucide-react';

interface MissingEvidenceCardProps {
  missingEvidence: MissingEvidence[];
}

export const MissingEvidenceCard: React.FC<MissingEvidenceCardProps> = ({ missingEvidence }) => {
  const getImportanceBadge = (importance: MissingEvidence['importance']) => {
    switch (importance) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Recommended':
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
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
            <FileQuestion className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Missing Evidence
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Sample Data
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Information gaps to resolve before making an investment commitment
            </p>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
          {missingEvidence.length} pending items
        </span>
      </div>

      {/* List */}
      <div className="p-5 space-y-3">
        {missingEvidence.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                {item.item}
              </h4>
              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${getImportanceBadge(
                  item.importance
                )}`}
              >
                {item.importance}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              <span className="font-medium text-slate-700">Dilution / Blindspot Risk: </span>
              {item.reason}
            </p>

            <div className="p-2 rounded bg-amber-50/60 border border-amber-100 text-[11px] text-amber-900 flex items-start gap-1.5">
              <span className="font-semibold shrink-0">Pre-Meeting Action:</span>
              <span className="leading-snug">{item.suggestedAction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
