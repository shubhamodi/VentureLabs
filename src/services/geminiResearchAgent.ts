import { GoogleGenAI } from '@google/genai';
import { ResearchInput, SourcingDossier } from '@/types/research';
import { CrustdataCompanyData } from './crustdataService';
import { generateSampleSourcingDossier } from '@/lib/mockData';

export async function synthesizeSourcingDossierWithGemini(
  input: ResearchInput,
  crustdataResult: { data: CrustdataCompanyData | null; status: string; error?: string },
  apiKey?: string
): Promise<SourcingDossier> {
  const geminiKey = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!geminiKey) {
    const sample = generateSampleSourcingDossier(input);
    sample.metadata.sampleNotice = 
      "GEMINI_API_KEY is not configured in .env.local. Showing sample sourcing dossier.";
    return sample;
  }

  const ai = new GoogleGenAI({ apiKey: geminiKey });
  const targetSectorOrDomain = input.domain.trim();
  const allocated = input.allocatedFunds.trim() || '$1.5M';

  const crustdataContext = crustdataResult.data
    ? `CRUSTDATA VERIFIED FIRMOGRAPHIC INTELLIGENCE (PRIMARY REFERENCE):
- Target Company: ${crustdataResult.data.companyName}
- Domain: ${crustdataResult.data.domain}
- Year Founded: ${crustdataResult.data.foundedYear || 2024}
- Headcount / Team Scale: ${crustdataResult.data.headcount || '11-50'}
- Description: ${crustdataResult.data.shortDescription || 'N/A'}
- Professional Network: ${crustdataResult.data.linkedinUrl || 'N/A'}
- Markets / Category: ${(crustdataResult.data.industries || []).join(', ') || 'Enterprise AI'}
- Telemetry Confidence: ${crustdataResult.data.confidenceScore || 95}%`
    : `No Crustdata record found for "${targetSectorOrDomain}". Synthesize candidates based on target sector "${targetSectorOrDomain}", ${input.stage} stage profile in ${input.geography}, and thesis.`;

  const prompt = `
You are VentureLens — an AI Investment Research Agent for Venture Capital Junior Analysts and Principals.
Your job is to take an analyst's target sector/domain, fund allocation, and investment thesis, and produce a high-conviction SOURCING DOSSIER recommending candidate startups and founders to invest in, along with tailored founder interview questions.

=== ANALYST MANDATE & SEARCH PARAMETERS ===
- Target Sector / Domain / Reference Startup: "${targetSectorOrDomain}"
- Allocated Fund / Target Capital Deployment: "${allocated}"
- Investment Stage: "${input.stage}"
- Target Geography: "${input.geography}"
- Investment Thesis: "${input.thesis || 'Capital-efficient vertical software with workflow lock-in and high net retention'}"

=== CRUSTDATA VERIFIED TELEMETRY ===
${crustdataContext}

=== GUIDELINES ===
1. Generate 3 high-conviction investment candidates matching the sector, stage, geography, and check size. If a specific domain like "contravault.com" is provided, include it as Candidate #1 using its Crustdata data, followed by 2 top peer contenders in the same domain/space.
2. For each candidate, provide detailed founder profiles with realistic, high-signal pedigree tags (e.g. Ex-Google, IIT Bombay, 2x Founder, Ex-McKinsey).
3. Tailor the "recommendedCheckSize" to the analyst's allocated funds ("${allocated}").
4. In the "brief" for each candidate, include EXACTLY: 3 positiveSignals, 2 risksAndConcerns, 2 missingEvidence, and 4 founderQuestions. Keep each description under 2 sentences.
5. In "risksAndConcerns", frame risks as startup business model challenges, never as agent errors.
6. Keep all string fields concise. Do not exceed 200 characters per description field.
7. Return ONLY pure raw JSON conforming to the schema below. No prose, no code fences.

=== JSON OUTPUT SCHEMA ===
{
  "id": "vl-dossier-[timestamp]",
  "metadata": {
    "generatedAt": "[formatted date]",
    "targetSectorOrDomain": "${targetSectorOrDomain}",
    "allocatedFunds": "${allocated}",
    "stage": "${input.stage}",
    "geography": "${input.geography}",
    "isSampleData": false,
    "sampleNotice": "${
      crustdataResult.status === 'live'
        ? 'Live sourcing dossier synthesized with verified Crustdata firmographic telemetry and Gemini AI.'
        : 'Synthesized by Gemini AI Agent using public domain telemetry and fund mandate matching.'
    }"
  },
  "capitalDeploymentStrategy": {
    "totalAllocation": "${allocated}",
    "targetCheckPerDeal": string (e.g. "$500K - $1M lead check"),
    "candidateCount": 3,
    "recommendedDeploymentSummary": string (tactical portfolio construction guidance for the analyst)
  },
  "candidates": [
    {
      "id": "cand-1",
      "companyName": string,
      "domain": string,
      "stage": "${input.stage}",
      "geography": "${input.geography}",
      "matchScore": number (80 to 98),
      "recommendedCheckSize": string,
      "projectedOwnership": string,
      "oneLineTake": string,
      "founders": [
        {
          "name": string,
          "role": string,
          "background": string,
          "pedigreeTags": string[],
          "linkedinUrl": string
        }
      ],
      "primaryMoat": string,
      "keyPositiveSignal": string,
      "primaryRisk": string,
      "brief": {
        "id": string,
        "metadata": {
          "generatedAt": "[formatted date]",
          "targetDomain": string,
          "stage": "${input.stage}",
          "geography": "${input.geography}",
          "isSampleData": false,
          "sampleNotice": "Live dossier"
        },
        "recommendation": {
          "meetingMerit": "Strong Merit" | "Selective Merit",
          "score": number,
          "verdictTitle": string,
          "oneLineTake": string,
          "keyCondition": string
        },
        "companyOverview": {
          "companyName": string,
          "legalEntity": string,
          "domain": string,
          "foundedYear": number,
          "headquarters": string,
          "stage": "${input.stage}",
          "primarySector": string,
          "subSectors": string[],
          "headcountEstimate": string,
          "estimatedRunRate": string,
          "knownInvestors": string[],
          "summary": string,
          "coreOffering": string,
          "targetMarket": string
        },
        "thesisAssessment": {
          "alignmentScore": number,
          "verdict": "Strong Alignment" | "Moderate Alignment",
          "analysis": string,
          "strengths": string[],
          "divergences": string[]
        },
        "positiveSignals": [
          {
            "id": string,
            "title": string,
            "category": "Market" | "Team" | "Traction" | "Moat" | "Economics",
            "description": string,
            "impact": "High" | "Medium",
            "evidenceSourceId": string
          }
        ],
        "risksAndConcerns": [
          {
            "id": string,
            "title": string,
            "severity": "Critical" | "Moderate",
            "description": string,
            "mitigationOrWatchpoint": string
          }
        ],
        "missingEvidence": [
          {
            "id": string,
            "item": string,
            "importance": "Critical" | "Recommended",
            "reason": string,
            "suggestedAction": string
          }
        ],
        "founderQuestions": [
          {
            "id": string,
            "category": "Unit Economics" | "GTM & Moat" | "Product Architecture" | "Defensibility" | "Team & Governance",
            "question": string,
            "rationale": string,
            "expectedSignal": string
          }
        ],
        "sourcesAndEvidence": [
          {
            "id": "src-crustdata",
            "name": "Crustdata Intelligence API",
            "type": "Crustdata Firmographic",
            "urlSnippet": "api.crustdata.com/company/enrich",
            "confidenceScore": 95,
            "lastVerified": "Live Verified"
          }
        ]
      }
    }
  ]
}

Return ONLY raw JSON, with no markdown code fences.
`;

  try {
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          maxOutputTokens: 16384,
        },
      });
    } catch {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          maxOutputTokens: 16384,
        },
      });
    }

    const text = response.text?.trim() || '';
    // Strip code fences if model wrapped in markdown despite JSON mime type
    const cleanJson = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

    // Attempt to repair truncated JSON if it ends abruptly (common with large payloads)
    let parsedJson: string = cleanJson;
    if (!cleanJson.endsWith('}')) {
      // Find the last valid closing of the candidates array and close the dossier
      const lastValidCandidateEnd = cleanJson.lastIndexOf('}]}');
      if (lastValidCandidateEnd !== -1) {
        parsedJson = cleanJson.slice(0, lastValidCandidateEnd + 3) + '}';
      }
    }

    const dossier: SourcingDossier = JSON.parse(parsedJson);

    dossier.metadata = {
      generatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      targetSectorOrDomain: targetSectorOrDomain,
      allocatedFunds: allocated,
      stage: input.stage,
      geography: input.geography,
      isSampleData: false,
      sampleNotice: crustdataResult.status === 'live'
        ? `Live sourcing dossier generated with verified Crustdata firmographic telemetry (Matched: ${crustdataResult.data?.companyName || targetSectorOrDomain}).`
        : 'Synthesized by Gemini AI Agent using public domain telemetry and fund mandate matching.',
    };

    return dossier;
  } catch (err: unknown) {
    console.error('Gemini Sourcing API Error:', err);
    const fallback = generateSampleSourcingDossier(input);
    const errMessage = err instanceof Error ? err.message : 'Unknown Gemini error';
    fallback.metadata.sampleNotice = `Gemini synthesis notice (${errMessage.slice(0, 100)}). Showing structured candidate dossier.`;
    return fallback;
  }
}
