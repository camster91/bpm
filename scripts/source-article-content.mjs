import { readFile, writeFile } from 'node:fs/promises';
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

export async function sourceArticleContent() {
  const captured = JSON.parse(await readFile(resolve(root, 'reference-site/src/content/articles.json'), 'utf8'));
  const entries = [];
  const articles = [];
  for (const article of captured) {
    const handle = article.url.split('/').pop();
    assert.match(handle, /^[a-z0-9-]+$/);
    const sourcePath = `reference-site/public/articles/${handle}.html`;
    const page = await readFile(resolve(root, sourcePath), 'utf8');
    const bodies = [...page.matchAll(/<section id="article" class="section wrap article-body prose">([\s\S]*?)<\/section>/g)];
    assert.equal(bodies.length, 1, `${handle}: one authoritative article body required`);
    const content = bodies[0][1];
    assert.equal(text(content), text(article.content), `${handle}: source words must be preserved`);
    for (const attribute of ['href', 'src']) assert.deepEqual(targets(content, attribute), targets(article.content, attribute), `${handle}: ${attribute} destinations must be preserved`);
    entries.push({ handle, title: article.title, capturedUrl: article.url, sourcePath,
      sourceUrl: `https://bpm-product-design-review.cameron91.chatgpt.site/articles/${handle}.html`,
      sourcePageSha256: sha(page), capturedContentSha256: sha(article.content), contentSha256: sha(content),
      formattingChanged: content !== article.content, content });
    articles.push({ ...article, content });
  }
  return { articles, manifest: { status: 'prepared-local-only', authority: 'Recovered Sites article HTML',
    nativeArticleIdsVerified: false, clientContentAndClaimsApproved: false, appliedToShopify: false, entries } };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { manifest } = await sourceArticleContent();
  const destination = resolve(root, 'docs/source-article-content-candidate.json');
  if (process.argv.includes('--write')) await writeFile(destination, JSON.stringify(manifest, null, 2) + '\n');
  else assert.deepEqual(JSON.parse(await readFile(destination, 'utf8')), manifest, 'Prepared article package must match recovered source');
  console.log(`${manifest.entries.length} article bodies preserve words, links, and image URLs; source hashes verified. Shopify content remains unchanged.`);
}
