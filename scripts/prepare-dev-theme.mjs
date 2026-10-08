// Local-only snapshot preparation. This script never authenticates or uploads.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, lstatSync, chmodSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join, isAbsolute } from 'node:path';
const repo = resolve(import.meta.dirname, '..');
const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim();
const destination = process.argv[2];
if (!destination || !isAbsolute(destination)) throw new Error('Pass a new absolute destination directory.');
if (existsSync(destination)) throw new Error('Destination already exists; snapshots must not be overwritten.');
if (git('status', '--porcelain', '--untracked-files=all', '--', 'theme')) throw new Error('Commit theme changes before preparing a snapshot.');
const commit = git('rev-parse', 'HEAD');
const tree = git('rev-parse', 'HEAD:theme');
const dirs = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
const paths = dirs.filter(dir => existsSync(join(repo, 'theme', dir))).map(dir => `theme/${dir}`);
const archive = execFileSync('git', ['archive', '--format=tar', commit, ...paths], { cwd: repo, maxBuffer: 100 * 1024 * 1024 });
mkdirSync(destination, { recursive: true });
execFileSync('tar', ['-xf', '-', '-C', destination], { input: archive });
const theme = join(destination, 'theme');
const settings = JSON.parse(readFileSync(join(theme, 'config/settings_data.json'), 'utf8'));
if (settings.current.development_noindex !== true) throw new Error('Development snapshot must explicitly retain noindex.');
const files = [];
function walk(dir, prefix = '') {
  for (const name of readdirSync(dir).sort()) {
    const absolute = join(dir, name);
    const relative = prefix ? `${prefix}/${name}` : name;
    const stat = lstatSync(absolute);
    if (stat.isDirectory()) { walk(absolute, relative); chmodSync(absolute, 0o555); }
    else if (stat.isFile()) {
      const data = readFileSync(absolute);
      files.push({ path: relative, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
      chmodSync(absolute, 0o444);
    } else throw new Error(`Unexpected non-regular snapshot entry: ${relative}`);
  }
}
walk(theme);
chmodSync(theme, 0o555);
const manifest = { format: 1, commit, themeTree: tree, purpose: 'unpublished development QA only', developmentNoindex: true, files, bytes: files.reduce((sum, file) => sum + file.bytes, 0) };
writeFileSync(join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { mode: 0o444 });
console.log(JSON.stringify({ destination, commit, themeTree: tree, files: files.length, bytes: manifest.bytes, uploaded: false }, null, 2));
