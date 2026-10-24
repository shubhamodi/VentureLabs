export type InvestmentStage = 'Pre-seed' | 'Seed' | 'Series A' | 'Series B';

export interface ResearchInput {
  domain: string; // Target sector, domain, or reference company (e.g. contravault.com or "GovTech AI")
  allocatedFunds: string; // e.g. "$1M - $2M" or "$500k check"
  stage: InvestmentStage;
  geography: string;
  thesis: string;
}

export type MeetingMerit = 'Strong Merit' | 'Selective Merit' | 'Pass';

export interface RecommendationSummary {
  meetingMerit: MeetingMerit;
  score: number; // 0 - 100
  verdictTitle: string;
  oneLineTake: string;
  keyCondition: string;
}

export interface FounderProfile {
  name: string;
  role: string;
  background: string;
  pedigreeTags: string[]; // e.g. ['Ex-Google', 'IIT Delhi', '2x Founder']
  linkedinUrl?: string;
}

export interface CompanyOverview {
  companyName: string;
  legalEntity?: string;
  domain: string;
  foundedYear: number;
  headquarters: string;
  stage: InvestmentStage;
  primarySector: string;
  subSectors: string[];
  headcountEstimate: string;
  estimatedRunRate?: string;
  knownInvestors: string[];
  summary: string;
  coreOffering: string;
  targetMarket: string;
}

export interface ThesisAssessment {
  alignmentScore: number; // 0 - 100
  verdict: 'Strong Alignment' | 'Moderate Alignment' | 'Low Alignment';
  analysis: string;
  strengths: string[];
  divergences: string[];
}

export interface PositiveSignal {
  id: string;
  title: string;
  category: 'Market' | 'Team' | 'Traction' | 'Moat' | 'Economics';
  description: string;
  impact: 'High' | 'Medium' | 'Emerging';
  evidenceSourceId?: string;
}

export interface RiskConcern {
  id: string;
  title: string;
  severity: 'Critical' | 'Moderate' | 'Low';
  description: string;
  mitigationOrWatchpoint: string;
}

export interface MissingEvidence {
  id: string;
  item: string;
  importance: 'Critical' | 'Recommended' | 'Desirable';
  reason: string;
  suggestedAction: string;
}

export interface FounderQuestion {
  id: string;
  category: 'Unit Economics' | 'GTM & Moat' | 'Product Architecture' | 'Defensibility' | 'Team & Governance';
  question: string;
  rationale: string;
  expectedSignal: string;
}

export interface EvidenceSource {
  id: string;
  name: string;
  type: 'Crustdata Firmographic' | 'Public Filing' | 'Founder / Team Footprint' | 'Product Web Footprint' | 'Industry Benchmark';
  urlSnippet: string;
  confidenceScore: number; // 0 - 100
  lastVerified: string;
}

export interface InvestmentBrief {
  id: string;
  metadata: {
    generatedAt: string;
    targetDomain: string;
    stage: InvestmentStage;
    geography: string;
    isSampleData: boolean;
    sampleNotice: string;
  };
  recommendation: RecommendationSummary;
  companyOverview: CompanyOverview;
  thesisAssessment: ThesisAssessment;
  positiveSignals: PositiveSignal[];
  risksAndConcerns: RiskConcern[];
  missingEvidence: MissingEvidence[];
  founderQuestions: FounderQuestion[];
  sourcesAndEvidence: EvidenceSource[];
}

export interface InvestmentCandidate {
  id: string;
  companyName: string;
  domain: string;
  stage: InvestmentStage;
  geography: string;
  matchScore: number; // 0 - 100
  recommendedCheckSize: string; // e.g. "$750K - $1M"
  projectedOwnership?: string; // e.g. "10% - 14%"
  oneLineTake: string;
  founders: FounderProfile[];
  primaryMoat: string;
  keyPositiveSignal: string;
  primaryRisk: string;
  brief: InvestmentBrief;
}

export interface SourcingDossier {
  id: string;
  metadata: {
    generatedAt: string;
    targetSectorOrDomain: string;
    allocatedFunds: string;
    stage: InvestmentStage;
    geography: string;
    isSampleData: boolean;
    sampleNotice: string;
  };
  capitalDeploymentStrategy: {
    totalAllocation: string;
    targetCheckPerDeal: string;
    candidateCount: number;
    recommendedDeploymentSummary: string;
  };
  candidates: InvestmentCandidate[];
}
