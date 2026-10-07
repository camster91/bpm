import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../reference-site');
const provenance = JSON.parse(fs.readFileSync(path.join(root, 'source-provenance.json'), 'utf8'));
for (const entry of provenance.files) {
  const bytes = fs.readFileSync(path.join(root, entry.path));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256,
    `Recovered source changed: ${entry.path}. Preserve the original or document a deliberate update.`);
}
let scripts = 0;
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'dist' && entry.name !== 'evidence') walk(file);
    } else if (/\.(mjs|js)$/.test(entry.name)) {
      execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
      scripts++;
    }
  }
}
walk(root);
console.log(JSON.stringify({ sourceFilesVerified: provenance.files.length, scriptsParsed: scripts }));
