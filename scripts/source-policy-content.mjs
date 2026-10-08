import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const sha = value => createHash('sha256').update(value).digest('hex');
function text(html) {
  const entities = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return html.replace(/<[^>]*>/g, ' ').replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (_, entity) =>
    entity[0] === '#' ? String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === 'x' ? 2 : 1), entity[1].toLowerCase() === 'x' ? 16 : 10)) : entities[entity.toLowerCase()]
  ).replace(/\s+/g, ' ').trim();
}
const targets = (html, attribute) => [...html.matchAll(new RegExp(`\\b${attribute}="([^"]*)"`, 'g'))].map(match => match[1]).sort();
export async function sourcePolicyContent() {
  const captured = JSON.parse(await readFile(resolve(root, 'reference-site/src/content/policies.json'), 'utf8'));
  const pages = (await readdir(resolve(root, 'reference-site/public/policies'))).filter(path => path.endsWith('.html')).sort();
  assert.deepEqual(pages, Object.keys(captured).map(key => key + '.html').sort(), 'Every source policy detail page requires a captured record');
  const entries = [];
  for (const [key, policy] of Object.entries(captured)) {
    assert.match(key, /^[a-z0-9-]+$/);
    assert.equal(policy.status, 'captured', `${key}: policy capture must exist`);
    const sourcePath = `reference-site/public/policies/${key}.html`;
    const page = await readFile(resolve(root, sourcePath), 'utf8');
    const bodies = [...page.matchAll(/<section id="policies" class="section wrap article-body prose">([\s\S]*?)<\/section>/g)];
    assert.equal(bodies.length, 1, `${key}: one authoritative policy body required`);
    const titles = [...bodies[0][1].matchAll(/<h1>([\s\S]*?)<\/h1>/g)];
    assert.ok(titles.length >= 1, `${key}: source title required`);
    assert.equal(text(bodies[0][1]), text(policy.html), `${key}: full policy section words must be preserved`);
    const content = bodies[0][1].replace(titles[0][0], '').trim();
    assert.equal(text(content), text(policy.html.replace(/<h1>[\s\S]*?<\/h1>/, '')), `${key}: body words must be preserved after separating the page title`);
    for (const attribute of ['href', 'src']) assert.deepEqual(targets(content, attribute), targets(policy.html, attribute), `${key}: ${attribute} destinations must be preserved`);
    const capturedUrl = new URL(policy.url);
    assert.equal(capturedUrl.origin, 'https://bpmdeodorant.com');
    assert.ok(capturedUrl.pathname.startsWith('/policies/'));
    entries.push({ key, title: text(titles[0][1]), capturedUrl: policy.url, capturedPath: capturedUrl.pathname,
      sourcePath, sourceUrl: `https://bpm-product-design-review.cameron91.chatgpt.site/policies/${key}.html`,
      sourcePageSha256: sha(page), sourceSectionSha256: sha(bodies[0][1]), capturedSectionSha256: sha(policy.html), contentSha256: sha(content),
      titleSeparatedFromCapturedSection: true, bodyContainsH1: /<h1[\s>]/i.test(content), nativeDestinationVerified: false, currentBodyBackedUp: false, content });
  }
  return { status: 'prepared-local-only', authority: 'Recovered Sites policy HTML',
    clientPolicyAndOperationalApproval: false, legalReviewCompleted: false, appliedToShopify: false,
    boundary: 'Source-preserving review package only. Verify current policy/page destination, preserve the current native body, reconcile operational and legal differences, and obtain exact write approval before any shared-store policy mutation.', entries };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = await sourcePolicyContent();
  const destination = resolve(root, 'docs/source-policy-content-candidate.json');
  if (process.argv.includes('--write')) await writeFile(destination, JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
  else assert.deepEqual(JSON.parse(await readFile(destination, 'utf8')), manifest, 'Prepared policy package must match recovered source');
  console.log(`${manifest.entries.length} policy bodies preserve words, links, and image URLs; source hashes verified. Shopify policies remain unchanged.`);
}
