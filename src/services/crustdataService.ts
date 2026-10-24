/**
 * Crustdata API Service Client
 * Connects to Crustdata Company Enrichment API v2025-11-01.
 */

export interface CrustdataCompanyData {
  companyName?: string;
  domain: string;
  headcount?: number | string;
  headcountGrowth?: string;
  fundingTotal?: string;
  latestStage?: string;
  foundedYear?: number;
  headquarters?: string;
  shortDescription?: string;
  industries?: string[];
  techStack?: string[];
  webTrafficEstimate?: string;
  linkedinUrl?: string;
  companyType?: string;
  logoUrl?: string;
  confidenceScore?: number;
  rawPayload?: unknown;
}

export async function fetchCrustdataEnrichment(
  domain: string,
  apiKey?: string
): Promise<{ data: CrustdataCompanyData | null; status: 'live' | 'mock_fallback' | 'not_found'; error?: string }> {
  const token = apiKey || process.env.CRUSTDATA_API_KEY;

  if (!token) {
    return {
      data: null,
      status: 'mock_fallback',
      error: 'CRUSTDATA_API_KEY is not configured in .env.local',
    };
  }

  const cleanDomain = domain.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();

  try {
    // Call Crustdata's primary Company Enrichment endpoint
    const response = await fetch('https://api.crustdata.com/company/enrich', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-api-version': '2025-11-01',
      },
      body: JSON.stringify({
        domains: [cleanDomain],
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        data: null,
        status: 'mock_fallback',
        error: `Crustdata API returned HTTP ${response.status}: ${errorText.slice(0, 150)}`,
      };
    }

    const payload = await response.json();
    const matchRecord = payload?.[0]?.matches?.[0];
    const company = matchRecord?.company_data;
    const basicInfo = company?.basic_info;

    if (!basicInfo && !company) {
      return {
        data: null,
        status: 'not_found',
        error: `Domain "${cleanDomain}" is not yet indexed in Crustdata. Analysis will synthesize from public domain web telemetry.`,
      };
    }

    return {
      data: {
        companyName: basicInfo?.name || company?.company_name || cleanDomain,
        domain: cleanDomain,
        headcount: basicInfo?.employee_count_range || company?.headcount || 'Early team',
        headcountGrowth: company?.employee_growth_6m ? `+${company.employee_growth_6m}% (6mo)` : undefined,
        fundingTotal: company?.total_funding_usd ? `$${(company.total_funding_usd / 1e6).toFixed(1)}M` : undefined,
        latestStage: company?.last_funding_round_type,
        foundedYear: basicInfo?.year_founded || company?.year_founded,
        headquarters: basicInfo?.city || basicInfo?.hq_location || 'Global / Remote',
        shortDescription: basicInfo?.description || company?.description,
        industries: basicInfo?.markets || company?.industries || [],
        linkedinUrl: basicInfo?.professional_network_url,
        companyType: basicInfo?.company_type,
        logoUrl: basicInfo?.logo_permalink,
        confidenceScore: matchRecord?.confidence_score ? Math.round(matchRecord.confidence_score * 100) : 95,
        rawPayload: company,
      },
      status: 'live',
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error querying Crustdata';
    return {
      data: null,
      status: 'mock_fallback',
      error: message,
    };
  }
}
