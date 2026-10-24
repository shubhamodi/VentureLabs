import { NextRequest, NextResponse } from 'next/server';
import { ResearchInput } from '@/types/research';
import { fetchCrustdataEnrichment } from '@/services/crustdataService';
import { synthesizeSourcingDossierWithGemini } from '@/services/geminiResearchAgent';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ResearchInput>;

    if (!body.domain || !body.domain.trim()) {
      return NextResponse.json(
        { error: 'Target sector, domain, or company name is required.' },
        { status: 400 }
      );
    }

    const input: ResearchInput = {
      domain: body.domain.trim(),
      allocatedFunds: body.allocatedFunds?.trim() || '$1.5M',
      stage: body.stage || 'Seed',
      geography: body.geography?.trim() || 'India',
      thesis: body.thesis?.trim() || '',
    };

    // 1. Fetch factual company telemetry from Crustdata if domain or company is queryable
    const crustdataResult = await fetchCrustdataEnrichment(input.domain);

    // 2. Synthesize sourcing dossier, recommended check sizes & founder questions via Gemini AI
    const dossier = await synthesizeSourcingDossierWithGemini(input, crustdataResult);

    return NextResponse.json(dossier, { status: 200 });
  } catch (error: unknown) {
    console.error('API Error in /api/research:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
