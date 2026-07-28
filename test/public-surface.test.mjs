import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const inquiryUrl =
  'https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench&inquiry=incident-operations-exercise#private-inquiry';
const description =
  'NW Service Assurance Workbench is a deterministic React demo for 5G access, transport, core, and IDC incident triage, service paths, runbooks, and operator handoff.';

function read(path) {
  return readFileSync(resolve(process.cwd(), path), 'utf8');
}

function extractJsonLd(html) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(match).not.toBeNull();
  return JSON.parse(match[1]);
}

describe('public product surface', () => {
  it('publishes complete metadata and capability-bounded structured data', () => {
    const html = read('index.html');
    const structuredData = extractJsonLd(html);

    expect(html).toContain(`content="${description}"`);
    expect(html).not.toContain('Paid path: paid workspace for.');
    expect(structuredData.description).toBe(description);
    expect(structuredData.operatingSystem).toBe('Web browser');
    expect(structuredData.featureList).toEqual(
      expect.arrayContaining([
        'Synthetic carrier incident scenarios',
        'End-to-end service path and SLA impact',
        'Owner-based runbooks and handoff notes',
      ]),
    );
    expect(structuredData.offers[1]).toMatchObject({
      name: 'Incident Operations Exercise',
      url: inquiryUrl,
    });
  });

  it('keeps the machine-readable offer and llms guide on the incident exercise lane', () => {
    const offer = JSON.parse(read('public/service-offer.json'));
    const docsOffer = JSON.parse(read('docs/service-offer.json'));
    const llms = read('public/llms.txt');

    expect(offer).toEqual(docsOffer);
    expect(offer.commerce.lane_id).toBe('incident-operations-exercise');
    expect(offer.lead_capture_url).toBe(inquiryUrl);
    expect(offer.productized_offer).toContain('deterministic React and Vite service assurance workbench');
    expect(offer.first_paid_sku).toContain('Incident Operations Exercise');
    expect(llms).toContain('Runtime boundary:');
    expect(llms).toContain(inquiryUrl);
  });

  it('keeps revenue docs on the central incident inquiry route', () => {
    const revenue = read('docs/revenue-architecture.md');
    const searchGrowth = read('docs/search-growth-implementation.md');
    const docs = `${revenue}\n${searchGrowth}`;

    expect(docs).toContain('Incident Operations Exercise');
    expect(docs).toContain('central private inquiry');
    expect(docs).toContain(inquiryUrl);
    expect(docs).not.toContain('GitHub issue form');
    expect(docs).not.toContain('GitHub Issue Form');
    expect(docs).not.toContain('issues/new');
    expect(docs).not.toContain('request private workspace');
  });

  it('keeps employment-style framing out of the public scenario data', () => {
    const scenarios = read('src/data/scenarios.ts');

    expect(scenarios).not.toContain('roleMappings');
    expect(scenarios).not.toContain('applicationAssets');
    expect(scenarios).not.toContain('I wanted to show');
    expect(scenarios).not.toContain('strongest proof that I');
    expect(scenarios).not.toContain('military-style');
  });
});
