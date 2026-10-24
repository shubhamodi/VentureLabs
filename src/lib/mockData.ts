import { InvestmentBrief, InvestmentCandidate, ResearchInput, SourcingDossier } from '@/types/research';

export const SAMPLE_DISCLAIMER = 
  "SAMPLE EVALUATION DATA — FOR DEMONSTRATION ONLY. Live company telemetry and verified founder footprints will be populated via Crustdata API.";

export function generateSampleBrief(input: ResearchInput, customName?: string, customDomain?: string): InvestmentBrief {
  const cleanDomain = customDomain || input.domain.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();
  const companyNameFromDomain = cleanDomain
    .split('.')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  
  const displayCompanyName = customName || (companyNameFromDomain ? `${companyNameFromDomain} Technologies` : "ApexFlow Systems");
  const geo = input.geography.trim() || "India";

  return {
    id: `vl-brief-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    metadata: {
      generatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      targetDomain: cleanDomain || 'apexflow.sample.io',
      stage: input.stage,
      geography: geo,
      isSampleData: true,
      sampleNotice: SAMPLE_DISCLAIMER,
    },
    recommendation: {
      meetingMerit: 'Strong Merit',
      score: 88,
      verdictTitle: 'Merits Immediate Partner Meeting',
      oneLineTake: `Candidate exhibits strong mandate alignment with the fund's ${input.stage} thesis in ${geo}, with favorable capital deployment efficiency for your ${input.allocatedFunds || '$1M'} allocation.`,
      keyCondition: 'Requires founder validation on true net retention, contract duration, and gross margin floors before proceeding to Term Sheet diligence.',
    },
    companyOverview: {
      companyName: displayCompanyName,
      legalEntity: `${displayCompanyName} Private Limited [Simulated Record]`,
      domain: cleanDomain || 'apexflow.sample.io',
      foundedYear: input.stage === 'Pre-seed' ? 2024 : input.stage === 'Seed' ? 2023 : 2022,
      headquarters: `${geo === 'India' ? 'Bengaluru, Karnataka' : geo}`,
      stage: input.stage,
      primarySector: 'B2B Software & Vertical AI',
      subSectors: ['Workflow Automation', 'Enterprise Productivity', 'Compliance AI'],
      headcountEstimate: input.stage === 'Pre-seed' ? '5 - 10 members' : input.stage === 'Seed' ? '12 - 30 members' : '45 - 80 members',
      estimatedRunRate: input.stage === 'Pre-seed' ? '$80k - $200k ARR' : input.stage === 'Seed' ? '$450k - $1.2M ARR' : '$2.5M - $6.0M ARR',
      knownInvestors: ['Sample Angel Syndicate', 'Venture Catalyst Lab', 'Nexus Seed Explorers'],
      summary: `Developing an AI-native orchestration engine designed to streamline high-friction operational workflows across ${geo}.`,
      coreOffering: 'Unified API & automated execution engine replacing manual spreadsheet handoffs and document reviews.',
      targetMarket: `Mid-market mid-tier enterprises and fast-growing B2B commerce players operating in ${geo}.`,
    },
    thesisAssessment: {
      alignmentScore: 92,
      verdict: 'Strong Alignment',
      analysis: input.thesis.trim()
        ? `The target company addresses key criteria emphasized in your thesis ("${input.thesis.length > 90 ? input.thesis.slice(0, 90) + '...' : input.thesis}"). The sector focus, ${input.stage} profile, and ${geo} market backdrop match fund investment mandates.`
        : `Strong thematic alignment with venture theses focusing on workflow consolidation, mission-critical data gravity, and defensible execution engines in ${geo}.`,
      strengths: [
        `High workflow lock-in potential: Embeds directly into daily operator operations, creating sticky switching costs.`,
        `Favorable expansion tailwinds: Target market in ${geo} is undergoing rapid digital modernization.`,
        `Capital-efficient team: Engineering headcount metrics indicate lean execution aligned with ${input.stage} milestones.`,
      ],
      divergences: [
        `Market sizing verification needed: Need to confirm domestic TAM vs requirement for cross-border expansion.`,
        `Gross margin structure: Verify underlying inference and hosting cost margins.`,
      ],
    },
    positiveSignals: [
      {
        id: 'ps-1',
        title: 'High-Density Technical Founding DNA',
        category: 'Team',
        description: 'Key technical leads have prior engineering background at high-scale tech firms and relevant domain expertise.',
        impact: 'High',
        evidenceSourceId: 'src-crustdata',
      },
      {
        id: 'ps-2',
        title: 'Accelerating Organic Footprint & Client Pull',
        category: 'Traction',
        description: 'Estimated web domain traffic and active pilot documentation activity show steady month-over-month compounding.',
        impact: 'High',
        evidenceSourceId: 'src-crustdata',
      },
      {
        id: 'ps-3',
        title: 'Clear Workflow Moat & System of Record Gravity',
        category: 'Moat',
        description: 'Positioned as an active orchestration hub rather than a passive dashboard, facilitating higher ongoing customer retention.',
        impact: 'Medium',
        evidenceSourceId: 'src-crustdata',
      },
    ],
    risksAndConcerns: [
      {
        id: 'rc-1',
        title: 'Customer Concentration in Initial Pilot Cohort',
        severity: 'Critical',
        description: 'Early ARR appears concentrated across top 2-3 anchor marquee clients, creating susceptibility to contract renegotiation.',
        mitigationOrWatchpoint: 'Probe pipeline distribution during founder call and assess non-anchor pipeline conversion velocity.',
      },
      {
        id: 'rc-2',
        title: 'Competitive Pressure from Incumbent Add-ons',
        severity: 'Moderate',
        description: 'Established legacy enterprise systems may bundle adjacent workflow automation modules at discounted pricing.',
        mitigationOrWatchpoint: 'Probe founder on technical wedge and why incumbents cannot easily replicate their specialized integration layer.',
      },
    ],
    missingEvidence: [
      {
        id: 'me-1',
        item: 'Audited Cohort Retention & Net Revenue Retention (NRR)',
        importance: 'Critical',
        reason: 'Public and registry signals cannot verify multi-year expansion behavior or logo churn rates.',
        suggestedAction: 'Request standard 12-month cohort retention bridge prior to IC review.',
      },
      {
        id: 'me-2',
        item: 'Breakdown of Gross Margins (Hosting / Third-Party Compute Costs)',
        importance: 'Recommended',
        reason: 'Need visibility into underlying LLM API costs vs. proprietary compute infrastructure to evaluate long-term margin leverage.',
        suggestedAction: 'Clarify gross margin profile and third-party API expense ratio during initial partner screen.',
      },
    ],
    founderQuestions: [
      {
        id: 'fq-1',
        category: 'Unit Economics',
        question: `What is your current Customer Acquisition Cost (CAC) and realized payback period across your initial paying accounts?`,
        rationale: 'Identifies whether growth is driven by repeatable customer pulling or expensive customized services.',
        expectedSignal: 'Sub-12 month payback period with evidence of organic inbound referrals or account expansion.',
      },
      {
        id: 'fq-2',
        category: 'GTM & Moat',
        question: 'When pitching against traditional manual processes or legacy incumbent systems, what is the single trigger that unlocks budget sign-off?',
        rationale: 'Tests clarity of value proposition and urgency of customer problem.',
        expectedSignal: 'Measurable hard ROI (e.g. 70% reduction in cycle time or direct labor savings) rather than abstract efficiency gains.',
      },
      {
        id: 'fq-3',
        category: 'Product Architecture',
        question: 'How do you guarantee model precision and defensibility against generic foundational AI wrappers?',
        rationale: 'Evaluates technological defensibility against commoditization.',
        expectedSignal: 'Proprietary domain data loops, custom fine-tuned pipelines, or tight proprietary integration connectors.',
      },
      {
        id: 'fq-4',
        category: 'Team & Governance',
        question: `How will this round's capital allocation (${input.allocatedFunds || '$1M'}) be deployed across R&D vs Enterprise Sales over the next 18 months?`,
        rationale: 'Assesses capital deployment discipline and hiring roadmap.',
        expectedSignal: 'Pragmatic 60/40 allocation between core engineering depth and proven enterprise sales quota-carriers.',
      },
    ],
    sourcesAndEvidence: [
      {
        id: 'src-crustdata',
        name: 'Crustdata Company Intelligence API',
        type: 'Crustdata Firmographic',
        urlSnippet: `api.crustdata.com/company/enrich?domains=${cleanDomain || 'sample.io'}`,
        confidenceScore: 95,
        lastVerified: 'Live Verified via Crustdata',
      },
    ],
  };
}

export function generateSampleSourcingDossier(input: ResearchInput): SourcingDossier {
  const geo = input.geography.trim() || 'India';
  const allocated = input.allocatedFunds.trim() || '$1.5M';
  const stage = input.stage;

  const candidateA: InvestmentCandidate = {
    id: 'cand-1',
    companyName: 'ContraVault AI',
    domain: 'contravault.com',
    stage,
    geography: geo,
    matchScore: 94,
    recommendedCheckSize: stage === 'Pre-seed' ? '$350K - $500K' : stage === 'Seed' ? '$750K - $1.2M' : '$2.5M - $4M',
    projectedOwnership: '12% - 16%',
    oneLineTake: 'AI orchestration for government tenders and complex RFP risk analysis with proven early enterprise pilot traction.',
    founders: [
      {
        name: 'Arjun Mehta',
        role: 'Co-founder & CEO',
        background: 'Ex-McKinsey Public Sector Practice, IIT Bombay B.Tech. Led $50M+ procurement digital transformation.',
        pedigreeTags: ['IIT Bombay', 'Ex-McKinsey', 'GovTech Operator'],
        linkedinUrl: 'https://linkedin.com/in/sample-arjun-mehta',
      },
      {
        name: 'Dr. Priya Sharma',
        role: 'Co-founder & CTO',
        background: 'PhD in NLP & Document Extraction (IISc). Ex-Principal AI Scientist at Microsoft Research.',
        pedigreeTags: ['IISc PhD', 'Ex-Microsoft AI', 'Top 1% NLP'],
        linkedinUrl: 'https://linkedin.com/in/sample-priya-sharma',
      },
    ],
    primaryMoat: 'Proprietary PDF & OCR clause contradiction detector fine-tuned on 10,000+ public procurement tender guidelines.',
    keyPositiveSignal: 'High-density technical team with 11-50 members scaled within 1 year; active inbound demand from infrastructure primes.',
    primaryRisk: 'Zero-tolerance hallucination requirement in compliance-heavy government contracts.',
    brief: generateSampleBrief(input, 'ContraVault AI', 'contravault.com'),
  };

  const candidateB: InvestmentCandidate = {
    id: 'cand-2',
    companyName: 'TenderFlow Systems',
    domain: 'tenderflow.io',
    stage,
    geography: geo,
    matchScore: 89,
    recommendedCheckSize: stage === 'Pre-seed' ? '$250K - $400K' : stage === 'Seed' ? '$500K - $850K' : '$2M - $3M',
    projectedOwnership: '9% - 12%',
    oneLineTake: 'Automated compliance matrix builder for B2B engineering and defense contractors responding to federal bids.',
    founders: [
      {
        name: 'Rohan Deshmukh',
        role: 'Founder & CEO',
        background: '2x Founder. Previously exited logistics SaaS ($14M ARR). Ex-Senior Product Manager at Flipkart.',
        pedigreeTags: ['2x Founder', 'Ex-Flipkart', 'BITS Pilani'],
        linkedinUrl: 'https://linkedin.com/in/sample-rohan-deshmukh',
      },
      {
        name: 'Vikram Joshi',
        role: 'Founding Engineer',
        background: 'Ex-Lead Systems Architect at Zerodha. Specialized in deterministic parser engines.',
        pedigreeTags: ['Ex-Zerodha', 'High-Scale Infra'],
        linkedinUrl: 'https://linkedin.com/in/sample-vikram-joshi',
      },
    ],
    primaryMoat: 'Deep integrations into enterprise ERPs and legacy bid management databases.',
    keyPositiveSignal: '320% YoY organic inbound growth among Tier-1 defense subcontractors.',
    primaryRisk: 'Long enterprise sales cycle (6-9 months) requiring careful burn multiple discipline.',
    brief: generateSampleBrief(input, 'TenderFlow Systems', 'tenderflow.io'),
  };

  const candidateC: InvestmentCandidate = {
    id: 'cand-3',
    companyName: 'DocuMatrix AI',
    domain: 'documatrix.ai',
    stage,
    geography: geo,
    matchScore: 85,
    recommendedCheckSize: stage === 'Pre-seed' ? '$300K - $450K' : stage === 'Seed' ? '$600K - $900K' : '$1.8M - $2.8M',
    projectedOwnership: '10% - 14%',
    oneLineTake: 'AI-assisted contract redlining and bid clause verification platform for mid-market commercial teams.',
    founders: [
      {
        name: 'Sneha Kapoor',
        role: 'Co-founder & CEO',
        background: 'Ex-Legal Counsel at Tata Projects, National Law School (NLSIU). Recognized GovTech domain authority.',
        pedigreeTags: ['NLSIU Gold Medalist', 'Ex-Tata Projects', 'Legal Authority'],
        linkedinUrl: 'https://linkedin.com/in/sample-sneha-kapoor',
      },
      {
        name: 'Karthik Raman',
        role: 'Co-founder & CTO',
        background: 'Ex-Amazon Senior SDE. Built high-throughput AWS text extraction pipelines.',
        pedigreeTags: ['Ex-Amazon AWS', 'IIT Madras'],
        linkedinUrl: 'https://linkedin.com/in/sample-karthik-raman',
      },
    ],
    primaryMoat: 'Proprietary legal clause taxonomy with clause-by-clause risk scoring verified by retired PSU directors.',
    keyPositiveSignal: 'Net revenue retention of 135% across initial pilot group of 14 mid-market construction primes.',
    primaryRisk: 'Potential commoditization from generic LLM contract review add-ons if integration moat is not solidified.',
    brief: generateSampleBrief(input, 'DocuMatrix AI', 'documatrix.ai'),
  };

  return {
    id: `vl-dossier-${Date.now()}`,
    metadata: {
      generatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      targetSectorOrDomain: input.domain,
      allocatedFunds: allocated,
      stage: input.stage,
      geography: geo,
      isSampleData: true,
      sampleNotice: SAMPLE_DISCLAIMER,
    },
    capitalDeploymentStrategy: {
      totalAllocation: allocated,
      targetCheckPerDeal: stage === 'Pre-seed' ? '$300K - $500K' : stage === 'Seed' ? '$750K - $1.2M' : '$2.5M - $4M',
      candidateCount: 3,
      recommendedDeploymentSummary: `With ${allocated} allocated for ${stage} investments in ${geo}, we recommend deploying into a lead check ($${stage === 'Seed' ? '1M' : '400K'}) for top candidate ContraVault AI, with reserve follow-on allocations for peer contenders TenderFlow and DocuMatrix.`,
    },
    candidates: [candidateA, candidateB, candidateC],
  };
}
