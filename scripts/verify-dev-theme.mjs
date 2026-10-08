// Verify a frozen candidate against both its manifest and the committed source.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { resolve, join, isAbsolute } from 'node:path';
import assert from 'node:assert/strict';
const repo = resolve(import.meta.dirname, '..');
const snapshot = process.argv[2];
assert.ok(snapshot && isAbsolute(snapshot), 'Pass an absolute snapshot directory.');
const manifest = JSON.parse(readFileSync(join(snapshot, 'manifest.json'), 'utf8'));
assert.equal(manifest.format, 1);
assert.match(manifest.commit, /^[a-f0-9]{40}$/);
assert.match(manifest.themeTree, /^[a-f0-9]{40}$/);
const git = args => execFileSync('git', args, {cwd:repo,maxBuffer:100*1024*1024});
assert.equal(git(['rev-parse', `${manifest.commit}:theme`]).toString().trim(), manifest.themeTree);
const dirs = ['assets','blocks','config','layout','locales','sections','snippets','templates'];
const expected = git(['ls-tree','-r','--name-only',manifest.commit,'--',...dirs.map(d=>`theme/${d}`)]).toString().trim().split('\n').filter(Boolean).map(p=>p.slice(6)).sort();
const actual = [];
function walk(directory, prefix='') {
  for (const name of readdirSync(directory).sort()) {
    const absolute = join(directory,name);
    const relative = prefix ? `${prefix}/${name}` : name;
    const stat = lstatSync(absolute);
    if (stat.isDirectory()) walk(absolute,relative);
    else { assert.ok(stat.isFile(), `Non-regular entry: ${relative}`); actual.push(relative); }
  }
}
walk(join(snapshot,'theme'));
assert.deepEqual(actual.sort(),expected,'Snapshot has missing or extra files');
assert.deepEqual(manifest.files.map(f=>f.path).sort(),expected,'Manifest has missing, extra or duplicate files');
let bytes=0;
for (const file of manifest.files) {
  assert.ok(!file.path.split('/').some(part=>part==='..'||part==='.'||part===''), 'Unsafe manifest path');
  assert.ok(!isAbsolute(file.path) && dirs.includes(file.path.split('/')[0]), 'Unexpected upload path');
  const data = readFileSync(join(snapshot,'theme',file.path));
  assert.equal(data.length,file.bytes,`Size: ${file.path}`);
  assert.equal(createHash('sha256').update(data).digest('hex'),file.sha256,`Hash: ${file.path}`);
  assert.ok(data.equals(git(['show',`${manifest.commit}:theme/${file.path}`])),`Committed bytes: ${file.path}`);
  bytes+=data.length;
}
assert.equal(bytes,manifest.bytes);
assert.equal(manifest.developmentNoindex,true);
assert.equal(JSON.parse(readFileSync(join(snapshot,'theme/config/settings_data.json'),'utf8')).current.development_noindex,true);
console.log(JSON.stringify({verified:true,files:actual.length,bytes,commit:manifest.commit,themeTree:manifest.themeTree,matchesCurrentTheme:git(['rev-parse','HEAD:theme']).toString().trim()===manifest.themeTree,uploaded:false},null,2));
