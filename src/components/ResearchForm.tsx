import React, { useState } from 'react';
import { InvestmentStage, ResearchInput } from '@/types/research';
import { Globe, MapPin, Layers, Send, Sparkles, BookOpen, RotateCcw, DollarSign } from 'lucide-react';

interface ResearchFormProps {
  onSubmit: (input: ResearchInput) => void;
  isLoading: boolean;
  onReset?: () => void;
  hasActiveBrief: boolean;
}

const PRESET_EXAMPLES: { label: string; data: ResearchInput }[] = [
  {
    label: 'GovTech & Tender AI ($1M Seed)',
    data: {
      domain: 'contravault.com',
      allocatedFunds: '$1.0M Seed Check',
      stage: 'Seed',
      geography: 'India',
      thesis: 'Seeking vertical AI platforms automating complex government procurement, tender bid risk analysis, and contradiction detection with high workflow lock-in.',
    },
  },
  {
    label: 'Developer Infra ($2M Series A)',
    data: {
      domain: 'devmesh-sample.io',
      allocatedFunds: '$2.0M Series A',
      stage: 'Series A',
      geography: 'India',
      thesis: 'Evaluating developer tools and API orchestration layers built out of India with organic global developer adoption and strong bottom-up net expansion.',
    },
  },
  {
    label: 'Supply Chain AI ($500K Seed)',
    data: {
      domain: 'cargoai-sample.in',
      allocatedFunds: '$500K Seed Check',
      stage: 'Seed',
      geography: 'India',
      thesis: 'Vertical AI SaaS standardizing freight workflow automation in India with high workflow lock-in and >65% software gross margins.',
    },
  },
];

export const ResearchForm: React.FC<ResearchFormProps> = ({
  onSubmit,
  isLoading,
  onReset,
  hasActiveBrief,
}) => {
  const [domain, setDomain] = useState('contravault.com');
  const [allocatedFunds, setAllocatedFunds] = useState('$1.0M Seed Check');
  const [stage, setStage] = useState<InvestmentStage>('Seed');
  const [geography, setGeography] = useState('India');
  const [thesis, setThesis] = useState(
    'Seeking vertical AI platforms automating complex government procurement, tender bid risk analysis, and contradiction detection with high workflow lock-in.'
  );
  const [domainError, setDomainError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedDomain = domain.trim();
    if (!trimmedDomain) {
      setDomainError('Please enter a target sector, domain, or reference company.');
      return;
    }

    setDomainError(null);
    onSubmit({
      domain: trimmedDomain,
      allocatedFunds: allocatedFunds.trim() || '$1.0M',
      stage,
      geography: geography.trim() || 'India',
      thesis: thesis.trim(),
    });
  };

  const handleApplyPreset = (preset: (typeof PRESET_EXAMPLES)[0]) => {
    setDomain(preset.data.domain);
    setAllocatedFunds(preset.data.allocatedFunds);
    setStage(preset.data.stage);
    setGeography(preset.data.geography);
    setThesis(preset.data.thesis);
    setDomainError(null);
  };

  return (
    <div id="research-form" className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            VC Analyst Sourcing & Capital Deployment Radar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure target domain/sector, check size, and fund thesis to discover top companies & founders to invest in.
          </p>
        </div>

        {/* Quick Demo Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center">
            <BookOpen className="w-3 h-3 mr-1 inline" /> Presets:
          </span>
          {PRESET_EXAMPLES.map((preset) => (
            <button
              key={preset.label}
              type="button"
              disabled={isLoading}
              onClick={() => handleApplyPreset(preset)}
              className="text-[11px] font-medium px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* Row 1: Domain/Sector, Allocated Funds, Stage, Geography */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Target Domain or Sector */}
          <div className="md:col-span-4">
            <label htmlFor="company-domain" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Sector / Domain / Reference Startup <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Globe className="h-4 w-4" />
              </div>
              <input
                id="company-domain"
                type="text"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  if (domainError) setDomainError(null);
                }}
                disabled={isLoading}
                placeholder="e.g. contravault.com or GovTech AI"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                  domainError
                    ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                } bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors`}
              />
            </div>
            {domainError && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{domainError}</p>
            )}
          </div>

          {/* Allocated Funds / Target Check Size */}
          <div className="md:col-span-3">
            <label htmlFor="allocated-funds" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Allocated Funds / Check Size
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <DollarSign className="h-4 w-4" />
              </div>
              <input
                id="allocated-funds"
                type="text"
                value={allocatedFunds}
                onChange={(e) => setAllocatedFunds(e.target.value)}
                disabled={isLoading}
                placeholder="e.g. $1.0M Seed Check"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Investment Stage Dropdown */}
          <div className="md:col-span-2">
            <label htmlFor="investment-stage" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Stage <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Layers className="h-4 w-4" />
              </div>
              <select
                id="investment-stage"
                value={stage}
                onChange={(e) => setStage(e.target.value as InvestmentStage)}
                disabled={isLoading}
                className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="Pre-seed">Pre-seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Geography Input (Defaults to India) */}
          <div className="md:col-span-3">
            <label htmlFor="geography-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Geography
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="h-4 w-4" />
              </div>
              <input
                id="geography-input"
                type="text"
                value={geography}
                onChange={(e) => setGeography(e.target.value)}
                disabled={isLoading}
                placeholder="India"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Investment Thesis Text Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="investment-thesis" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Investment Mandate / Fund Thesis
            </label>
            <span className="text-[11px] text-slate-400">
              Agent filters candidates & crafts founder screening questions against this thesis
            </span>
          </div>
          <textarea
            id="investment-thesis"
            rows={2}
            value={thesis}
            onChange={(e) => setThesis(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. Seeking high-margin vertical software automating government procurement workflows in India with defensible OCR engines and strong net retention."
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y min-h-[64px]"
          />
        </div>

        {/* Row 3: Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Crustdata v2025-11-01 & Gemini 3.5 Active
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {hasActiveBrief && onReset && (
              <button
                type="button"
                onClick={onReset}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sourcing Companies & Founders...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Source Startups & Founders</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
