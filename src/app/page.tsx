'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ResearchForm } from '@/components/ResearchForm';
import { ResearchResults } from '@/components/ResearchResults';
import { ResearchInput, SourcingDossier } from '@/types/research';
import { researchService } from '@/services/researchService';

export default function Home() {
  const [dossier, setDossier] = useState<SourcingDossier | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<ResearchInput | null>(null);

  const handleGenerateSourcing = async (input: ResearchInput) => {
    setLastInput(input);
    setIsLoading(true);
    setError(null);

    try {
      const generatedDossier = await researchService.generateSourcingDossier(input);
      setDossier(generatedDossier);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while generating the sourcing dossier.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastInput) {
      handleGenerateSourcing(lastInput);
    } else {
      setError(null);
    }
  };

  const handleReset = () => {
    setDossier(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Pitch Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Sourcing & Investment Research Agent for VC Junior Analysts
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Source High-Conviction Founders & Deploy Capital With Precision
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
              Search any sector or domain and input your allocated funds. VentureLens discovers top companies & founders to invest in, recommends check sizes, prepares structured 30-minute founder screening call guides, and produces evidence-backed preliminary investment dossiers.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none hidden md:block" />
        </div>

        {/* 2. Sourcing & Fund Allocation Form */}
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">Sourcing Form</h2>
          <ResearchForm
            onSubmit={handleGenerateSourcing}
            isLoading={isLoading}
            onReset={handleReset}
            hasActiveBrief={!!dossier || !!error}
          />
        </section>

        {/* 3. Sourcing Results Area */}
        <section aria-labelledby="results-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="results-heading" className="text-base font-bold text-slate-900">
                Sourcing & Founder Intelligence Radar
              </h2>
              <p className="text-xs text-slate-500">
                Target companies, founder backgrounds, check size fit & pitch call agendas
              </p>
            </div>
          </div>

          <ResearchResults
            dossier={dossier}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </section>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">VentureLens</span>
            <span>—</span>
            <span>AI Investment Research Agent</span>
          </div>
          <div>
            <span>Engineered for B2B VC workflows • Live Crustdata API v2025-11-01 & Gemini 3.5</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
