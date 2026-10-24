import React from 'react';
import { InvestmentCandidate } from '@/types/research';
import { 
  Building2, 
  ExternalLink, 
  DollarSign, 
  Users, 
  PhoneCall, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface CandidateCardProps {
  candidate: InvestmentCandidate;
  isSelected: boolean;
  onSelectFounderCall: (candidate: InvestmentCandidate) => void;
  onSelectFullBrief: (candidate: InvestmentCandidate) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected,
  onSelectFounderCall,
  onSelectFullBrief,
}) => {
  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 shadow-xs flex flex-col justify-between ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-600/10 shadow-sm'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="p-5 space-y-4">
        {/* Top Header: Company, Domain, Match Score */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {candidate.companyName}
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {candidate.stage}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {candidate.geography}
                </span>
              </div>
              <a
                href={`https://${candidate.domain}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 mt-0.5 transition-colors font-mono"
              >
                <span>{candidate.domain}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="text-right shrink-0">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{candidate.matchScore}% Match</span>
            </div>
          </div>
        </div>

        {/* Check Size & Capital Allocation Highlight */}
        <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-indigo-950 font-semibold">
            <DollarSign className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Recommended Check:</span>
            <span className="text-indigo-700 font-bold bg-white px-2 py-0.5 rounded border border-indigo-200">
              {candidate.recommendedCheckSize}
            </span>
          </div>
          {candidate.projectedOwnership && (
            <div className="text-[11px] text-indigo-800">
              Target Ownership: <span className="font-semibold">{candidate.projectedOwnership}</span>
            </div>
          )}
        </div>

        {/* One-Line Investment Take */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {candidate.oneLineTake}
        </p>

        {/* Founders & Leadership Profiles */}
        <div className="border-t border-slate-100 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
            <Users className="w-3 h-3 text-slate-400" /> Founders & Key Leadership:
          </span>
          <div className="space-y-2">
            {candidate.founders.map((founder, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span>{founder.name}</span>
                    <span className="text-slate-400 font-normal">•</span>
                    <span className="text-slate-500 font-medium text-[11px]">{founder.role}</span>
                  </div>
                  {founder.linkedinUrl && (
                    <a
                      href={founder.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-indigo-600 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63Z" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 leading-snug mb-1.5">
                  {founder.background}
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {founder.pedigreeTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Signal & Primary Risk Highlights */}
        <div className="space-y-2 pt-1 text-xs">
          <div className="flex items-start gap-1.5 text-slate-700">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <span className="text-[11px] leading-snug">
              <strong className="text-slate-900">Key Traction Signal: </strong>
              {candidate.keyPositiveSignal}
            </span>
          </div>

          <div className="flex items-start gap-1.5 text-slate-700">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
            <span className="text-[11px] leading-snug">
              <strong className="text-slate-900">Primary Diligence Risk: </strong>
              {candidate.primaryRisk}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar: Setup Call vs View Brief */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={() => onSelectFounderCall(candidate)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Setup Founder Call ({candidate.brief.founderQuestions.length} Qs)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFullBrief(candidate)}
          className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Full Brief</span>
        </button>
      </div>
    </div>
  );
};
