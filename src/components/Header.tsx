import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Name */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-indigo-700/10">
              <Compass className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-lg tracking-tight text-slate-900">
                  VentureLens
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-indigo-500" />
                  Agentic VC
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                AI Investment Research
              </p>
            </div>
          </div>

          {/* Right utility items */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-600">Pipeline Engine Ready</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Crustdata Adapter Ready</span>
            </div>
            
            <a
              href="#research-form"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              New Brief
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
