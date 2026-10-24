import React, { useState } from 'react';
import { InvestmentCandidate, SourcingDossier } from '@/types/research';
import { EmptyState } from '@/components/states/EmptyState';
import { LoadingState } from '@/components/states/LoadingState';
import { ErrorState } from '@/components/states/ErrorState';
import { CandidateCard } from '@/components/sourcing/CandidateCard';
import { FounderCallSection } from '@/components/sourcing/FounderCallSection';
import { CompanyOverviewCard } from '@/components/brief/CompanyOverviewCard';
import { ThesisAssessmentCard } from '@/components/brief/ThesisAssessmentCard';
import { PositiveSignalsCard } from '@/components/brief/PositiveSignalsCard';
import { RisksConcernsCard } from '@/components/brief/RisksConcernsCard';
import { MissingEvidenceCard } from '@/components/brief/MissingEvidenceCard';
import { FounderQuestionsCard } from '@/components/brief/FounderQuestionsCard';
import { SourcesEvidenceCard } from '@/components/brief/SourcesEvidenceCard';
import { 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  FileText, 
  Calendar,
  Building2
} from 'lucide-react';

interface ResearchResultsProps {
  dossier: SourcingDossier | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const ResearchResults: React.FC<ResearchResultsProps> = ({
  dossier,
  isLoading,
  error,
  onRetry,
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'founderCall' | 'fullBrief'>('founderCall');

  // 1. Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  // 2. Error State
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  // 3. Empty State (before user runs search)
  if (!dossier) {
    return <EmptyState />;
  }

  // Determine active candidate
  const currentCandidate: InvestmentCandidate =
    dossier.candidates.find((c) => c.id === selectedCandidateId) ||
    dossier.candidates[0];

  const handleSelectFounderCall = (c: InvestmentCandidate) => {
    setSelectedCandidateId(c.id);
    setActiveTab('founderCall');
    const el = document.getElementById('candidate-detail-view');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectFullBrief = (c: InvestmentCandidate) => {
    setSelectedCandidateId(c.id);
    setActiveTab('fullBrief');
    const el = document.getElementById('candidate-detail-view');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Capital Deployment Strategy Overview Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Sourcing & Capital Allocation Radar
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1" suppressHydrationWarning>
                <Calendar className="w-3 h-3 text-slate-400" />
                {dossier.metadata.generatedAt}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {dossier.metadata.stage} in {dossier.metadata.geography}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Founders & Startups Sourced for &ldquo;{dossier.metadata.targetSectorOrDomain}&rdquo;
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              {dossier.capitalDeploymentStrategy.recommendedDeploymentSummary}
            </p>
          </div>

          {/* Allocation Metric Chips */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-center">
              <span className="text-[10px] font-semibold uppercase text-indigo-600 block tracking-wider">
                Allocated Fund
              </span>
              <span className="text-base font-bold text-indigo-950 flex items-center justify-center gap-0.5">
                <DollarSign className="w-4 h-4 text-indigo-600 inline" />
                {dossier.capitalDeploymentStrategy.totalAllocation}
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block tracking-wider">
                Check / Deal
              </span>
              <span className="text-xs font-bold text-slate-800">
                {dossier.capitalDeploymentStrategy.targetCheckPerDeal}
              </span>
            </div>
          </div>
        </div>

        {/* Crustdata Live Source Notice */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium self-start">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{dossier.metadata.sampleNotice}</span>
          </div>

          <span className="text-slate-400">
            Found {dossier.candidates.length} vetted startup contenders
          </span>
        </div>
      </div>

      {/* SECTION 1: List of Startups & Founders to Invest In */}
      <section aria-labelledby="candidates-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 id="candidates-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              Target Companies & Founders to Invest In
            </h3>
            <p className="text-xs text-slate-500">
              Ranked by mandate match score, founder pedigree & check size allocation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dossier.candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={currentCandidate.id === candidate.id}
              onSelectFounderCall={handleSelectFounderCall}
              onSelectFullBrief={handleSelectFullBrief}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: Active Candidate Deep-Dive & Founder Call Section */}
      <section id="candidate-detail-view" className="space-y-4 pt-4 border-t border-slate-200">
        {/* Candidate Selector & Mode Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              Active Focus:
            </span>
            {dossier.candidates.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCandidateId(c.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentCandidate.id === c.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{c.companyName}</span>
                <span className="text-[10px] opacity-80">({c.matchScore}%)</span>
              </button>
            ))}
          </div>

          {/* Toggle between Founder Call Guide vs Full 7-Part Brief */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('founderCall')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'founderCall'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Founder Call & Questions</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('fullBrief')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'fullBrief'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Diligence Brief</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Setup Call & Founder Questions */}
        {activeTab === 'founderCall' && (
          <FounderCallSection candidate={currentCandidate} />
        )}

        {/* Tab 2: Full 7-Part Diligence Dossier */}
        {activeTab === 'fullBrief' && (
          <div className="space-y-6">
            <CompanyOverviewCard overview={currentCandidate.brief.companyOverview} />
            <ThesisAssessmentCard assessment={currentCandidate.brief.thesisAssessment} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <PositiveSignalsCard signals={currentCandidate.brief.positiveSignals} />
              <RisksConcernsCard risks={currentCandidate.brief.risksAndConcerns} />
            </div>

            <MissingEvidenceCard missingEvidence={currentCandidate.brief.missingEvidence} />
            <FounderQuestionsCard questions={currentCandidate.brief.founderQuestions} />
            <SourcesEvidenceCard sources={currentCandidate.brief.sourcesAndEvidence} />
          </div>
        )}
      </section>

      {/* Footer Info */}
      <div className="text-center py-4 text-xs text-slate-400 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        <span>VentureLens • AI Sourcing & Investment Research for VC Junior Analysts</span>
      </div>
    </div>
  );
};
