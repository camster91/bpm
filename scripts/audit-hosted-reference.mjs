// Public source-byte audit only: no browser execution, authentication or writes to Sites.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = new URL('../reference-site/', import.meta.url);
const provenance = JSON.parse(await readFile(new URL('source-provenance.json', root), 'utf8'));
const base = 'https://bpm-product-design-review.cameron91.chatgpt.site';
const entries = provenance.files.filter(entry => entry.path.startsWith('public/') && (/\.html$/.test(entry.path) || ['public/site.css','public/site.js','public/catalogue.json'].includes(entry.path)));
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const results = [];
let next = 0;
async function worker() {
  while (next < entries.length) {
    const entry = entries[next++];
    const pathname = '/' + entry.path.slice('public/'.length);
    const local = await readFile(new URL(entry.path, root));
    const record = {path: pathname, localSha256: digest(local), recordedSourceSha256: entry.sha256};
    if (record.localSha256 !== entry.sha256) throw new Error(`Recovered source changed: ${entry.path}`);
    try {
      const response = await fetch(base + pathname, {redirect:'manual',signal:AbortSignal.timeout(25000)});
      record.status = response.status;
      record.contentType = response.headers.get('content-type');
      record.robots = response.headers.get('x-robots-tag');
      const remote = Buffer.from(await response.arrayBuffer());
      record.hostedBytes = remote.length;
      record.hostedSha256 = digest(remote);
      record.rawMatch = remote.equals(local);
      record.normalizedMatch = record.rawMatch;
      record.deploymentScriptsRemoved = 0;
      if (response.ok && pathname.endsWith('.html') && !record.rawMatch) {
        // Ignore only an identified deployment wrapper immediately before </body>.
        // Do not execute it or treat HTML normalization as visual/runtime proof.
        const html = remote.toString('utf8');
        const match = html.match(/<script>\(function\(\)\{function c\(\)\{[\s\S]*?<\/script>(?=<\/body>)/g);
        if (match?.length === 1 && match[0].includes('window.__CF$cv$params=') && match[0].includes('/cdn-cgi/challenge-platform/scripts/jsd/main.js')) {
          const normalized = Buffer.from(html.replace(match[0], ''));
          record.deploymentScriptsRemoved = 1;
          record.normalizedSha256 = digest(normalized);
          record.normalizedMatch = normalized.equals(local);
        }
      }
      record.outcome = response.ok && record.normalizedMatch ? 'source-bytes-match' : response.ok ? 'source-difference' : 'http-failure';
    } catch (error) { record.outcome = 'retrieval-failure'; record.error = error.name; }
    results.push(record);
  }
}
await Promise.all(Array.from({length:4},worker));
results.sort((a,b)=>a.path.localeCompare(b.path));
const summary = {checkedAt:new Date().toISOString(),sourceCommit:provenance.source_commit,base,scope:'Recovered public HTML plus site.css, site.js and catalogue.json; public GET only',limits:'Byte comparison only. Cloudflare footer wrapper may be removed for comparison; no visual/runtime, remote media, Shopify, acceptance or deployment verification.',total:results.length,matched:results.filter(r=>r.outcome==='source-bytes-match').length,differences:results.filter(r=>r.outcome==='source-difference').length,failed:results.filter(r=>r.outcome.endsWith('failure')).length,results};
const destination = process.argv[2];
if (destination) await writeFile(destination, JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({total:summary.total,matched:summary.matched,differences:summary.differences,failed:summary.failed,destination}));
if (summary.differences || summary.failed) process.exitCode=1;
