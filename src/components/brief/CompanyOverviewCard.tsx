import React from 'react';
import { CompanyOverview } from '@/types/research';
import { Building2, Calendar, MapPin, Users, DollarSign, Layers, Globe } from 'lucide-react';

interface CompanyOverviewCardProps {
  overview: CompanyOverview;
}

export const CompanyOverviewCard: React.FC<CompanyOverviewCardProps> = ({ overview }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Company Overview
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Sample Data
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Identity, stage positioning, team scale & core market
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            <Globe className="w-3 h-3 text-slate-400" />
            {overview.domain}
          </span>
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            {overview.stage}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        {/* Company Name & Executive Summary */}
        <div>
          <div className="flex items-baseline gap-2">
            <h4 className="text-lg font-bold text-slate-900">
              {overview.companyName}
            </h4>
            {overview.legalEntity && (
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ({overview.legalEntity})
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {overview.summary}
          </p>
        </div>

        {/* Compact Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-slate-400" /> Founded
            </span>
            <p className="text-xs font-bold text-slate-900">{overview.foundedYear}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3 text-slate-400" /> Location
            </span>
            <p className="text-xs font-bold text-slate-900 truncate">{overview.headquarters}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mb-1">
              <Users className="w-3 h-3 text-slate-400" /> Headcount
            </span>
            <p className="text-xs font-bold text-slate-900">{overview.headcountEstimate}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mb-1">
              <DollarSign className="w-3 h-3 text-slate-400" /> Est. ARR Scale
            </span>
            <p className="text-xs font-bold text-slate-900 truncate">{overview.estimatedRunRate || 'Confidential'}</p>
          </div>
        </div>

        {/* Sector and Core Offering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-100 bg-white">
            <span className="font-semibold text-slate-700 block mb-1">Core Offering</span>
            <p className="text-slate-600 leading-relaxed">{overview.coreOffering}</p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-100 bg-white">
            <span className="font-semibold text-slate-700 block mb-1">Target Customer Profile</span>
            <p className="text-slate-600 leading-relaxed">{overview.targetMarket}</p>
          </div>
        </div>

        {/* Sector Tags & Known Investors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Sectors:
            </span>
            <span className="font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              {overview.primarySector}
            </span>
            {overview.subSectors.map((sub) => (
              <span key={sub} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {sub}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-slate-400">Sample Backers:</span>
            {overview.knownInvestors.map((inv) => (
              <span key={inv} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono text-[11px]">
                {inv}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
