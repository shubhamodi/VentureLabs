import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "An unexpected error occurred while generating the investment brief.",
  onRetry,
}) => {
  return (
    <div className="bg-rose-50/70 border border-rose-200/90 rounded-xl p-6 sm:p-8 text-center transition-all">
      <div className="max-w-md mx-auto">
        <div className="inline-flex p-3 rounded-2xl bg-rose-100 text-rose-600 mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-rose-900">
          Research Assessment Interrupted
        </h3>

        <p className="text-xs text-rose-700/90 mt-2 leading-relaxed">
          {message}
        </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
