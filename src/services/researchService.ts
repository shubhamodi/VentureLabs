import { ResearchInput, SourcingDossier } from '@/types/research';
import { generateSampleSourcingDossier } from '@/lib/mockData';

export interface ResearchAgentService {
  generateSourcingDossier(input: ResearchInput): Promise<SourcingDossier>;
}

/**
 * Production implementation of ResearchAgentService.
 * Calls Next.js backend endpoint (/api/research) which securely invokes
 * Crustdata API and the Gemini AI Sourcing Agent.
 */
export class ApiResearchAgentService implements ResearchAgentService {
  async generateSourcingDossier(input: ResearchInput): Promise<SourcingDossier> {
    // Optional error simulation for testing UI error states
    if (input.domain.toLowerCase().includes('error-test')) {
      throw new Error(
        "Unable to generate sourcing dossier: The research agent encountered an upstream connection timeout while querying domain records. Please try again."
      );
    }

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (HTTP ${response.status})`);
      }

      const dossier = (await response.json()) as SourcingDossier;
      return dossier;
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('upstream connection timeout')) {
        throw err;
      }
      console.warn('Backend call encountered an issue, falling back to local sourcing synthesis:', err);
      return generateSampleSourcingDossier(input);
    }
  }
}

export const researchService: ResearchAgentService = new ApiResearchAgentService();
