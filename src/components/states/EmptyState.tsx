import React from 'react';
import { 
  Building2, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  FileQuestion, 
  HelpCircle, 
  Database,
  ArrowUpRight
} from 'lucide-react';

interface EmptyStateProps {
  onQuickStart?: (domain: string) => void;
}

const CAPABILITIES = [
  {
    icon: Building2,
    title: 'Company Overview',
    desc: 'Automated synthesis of sector, headcount velocity, core offering, and entity records.',
  },
  {
    icon: Target,
    title: 'Thesis Assessment',
    desc: 'Quantitative alignment scoring against your fund stage, sector mandate, and geo rules.',
  },
  {
    icon: TrendingUp,
    title: 'Positive Signals',
    desc: 'Early breakout indicators across technical founding DNA, organic traction, and moat.',
  },
  {
    icon: AlertTriangle,
    title: 'Risks & Concerns',
    desc: 'Categorized vulnerabilities: customer concentration, defensibility, and procurement cycles.',
  },
  {
    icon: FileQuestion,
    title: 'Missing Evidence',
    desc: 'Highlights critical blind spots (cohort retention, gross margin floors) before partner meetings.',
  },
  {
    icon: HelpCircle,
    title: 'Founder Questions',
    desc: 'Tailored, probing partner questions with target signals to observe during the initial pitch.',
  },
  {
    icon: Database,
    title: 'Sources & Provenance',
    desc: 'Evidence citations, digital footprints, and preview readiness for live Crustdata APIs.',
  },
];

export const EmptyState: React.FC<EmptyStateProps> = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center transition-all">
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 mb-4 shadow-sm">
          <Target className="w-8 h-8 stroke-[1.8]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Ready to Screen Your Next Candidate
        </h3>

        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Enter a startup website and investment thesis above. VentureLens evaluates public footprints, team signals, and market dynamics to produce an evidence-backed preliminary investment assessment before you take an initial meeting.
        </p>

        {/* Feature Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs mb-1">
                  <Icon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{cap.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {cap.desc}
                </p>
              </div>
            );
          })}

          {/* Crustdata Next Step Callout card */}
          <div className="p-3.5 rounded-lg border border-dashed border-indigo-200 bg-indigo-50/40 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-indigo-900 font-semibold text-xs mb-1">
                <Database className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next Step: Crustdata</span>
              </div>
              <p className="text-[11px] text-indigo-700/80 leading-normal">
                Modular service architecture is prepped to plug in live Crustdata company & person APIs seamlessly.
              </p>
            </div>
            <div className="mt-2 text-[10px] font-medium text-indigo-600 flex items-center">
              Architecture Ready <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
