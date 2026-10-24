import React from 'react';
import { EvidenceSource } from '@/types/research';
import { Database, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

interface SourcesEvidenceCardProps {
  sources: EvidenceSource[];
}

export const SourcesEvidenceCard: React.FC<SourcesEvidenceCardProps> = ({ sources }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Sources & Evidence Provenance
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Sample Data
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Audit trail, confidence weighting & Crustdata connector endpoints
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Crustdata Adapter Ready</span>
        </div>
      </div>

      {/* Sources Table / List */}
      <div className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-2.5 font-medium">Source & Pipeline Provider</th>
                <th className="pb-2.5 font-medium">Telemetry Type</th>
                <th className="pb-2.5 font-medium">Confidence</th>
                <th className="pb-2.5 font-medium text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sources.map((source) => (
                <tr key={source.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <span>{source.name}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                      <span className="truncate max-w-[260px]">{source.urlSnippet}</span>
                      <ExternalLink className="w-3 h-3 text-slate-300 inline shrink-0" />
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {source.type}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full"
                          style={{ width: `${source.confidenceScore}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700">
                        {source.confidenceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-[11px] text-slate-500 font-medium">
                    {source.lastVerified}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Crustdata Next Phase Callout Banner */}
        <div className="mt-4 p-3.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <Database className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold block">Crustdata Pipeline Integration Point</span>
              <p className="text-indigo-700/80 text-[11px] mt-0.5">
                The <code className="font-mono bg-indigo-100/60 px-1 py-0.5 rounded text-indigo-900">researchService</code> layer is structured to invoke Crustdata enrichment endpoints (headcount velocity, web visitors, tech stack, founder graph) without modifying UI cards.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center text-[11px] font-semibold text-indigo-700">
            Next step ready <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
