import { readFile, writeFile, mkdir, symlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { Liquid } from 'liquidjs';

const theme = resolve(import.meta.dirname, '../theme');
const output = resolve(process.argv[2] || '/tmp/bpm-chrome-preview');
await mkdir(output, { recursive: true });
await symlink(join(theme, 'assets'), join(output, 'assets')).catch(error => { if (error.code !== 'EEXIST') throw error; });
const clean = text => text.replace(/{%\s*(schema|doc)\s*%}[\s\S]*?{%\s*end\1\s*%}/g, '');
await writeFile(join(output, 'bpm-navigation.liquid'), clean(await readFile(join(theme, 'snippets/bpm-navigation.liquid'), 'utf8')));
const engine = new Liquid({ root: output, extname: '.liquid' });
const locale = JSON.parse(await readFile(join(theme, 'locales/en.default.json'), 'utf8'));
engine.registerFilter('asset_url', value => `/assets/${value}`);
engine.registerFilter('stylesheet_tag', value => `<link rel="stylesheet" href="${value}">`);
engine.registerFilter('handle', value => String(value).toLowerCase().replace(/[^a-z0-9-]/g, '-'));
engine.registerFilter('t', (key, ...pairs) => {
  const value = key.split('.').reduce((obj, part) => obj?.[part], locale);
  if (typeof value !== 'string') throw new Error(`Missing translation: ${key}`);
  const params = Object.fromEntries(pairs.filter(Array.isArray));
  return value.replace(/{{\s*(\w+)\s*}}/g, (_, key) => params[key] ?? '');
});
const settings = {};
for (const group of JSON.parse(await readFile(join(theme, 'config/settings_schema.json'), 'utf8'))) {
  for (const field of group.settings || []) if (field.id) settings[field.id] = field.default;
}
const menu = { links: [{ title: 'Home', url: '/' }, { title: 'Shop', url: '/collections/all' }, { title: 'About Us', url: '/pages/about-us' }, { title: 'Contact Us', url: '/pages/contact' }] };
const common = { settings, shop: { name: 'BPM Deodorant', customer_accounts_enabled: true }, routes: { root_url: '/', account_url: '/account', cart_url: '/cart', all_products_collection_url: '/collections/all' }, cart: { item_count: 0 }, request: { page_type: 'collection', locale: { iso_code: 'en' } }, page_title: 'BPM chrome preview', current_page: 1, canonical_url: 'http://127.0.0.1:8892/', content_for_header: '', content_for_layout: '' };
async function section(name, overrides = {}) {
  const source = await readFile(join(theme, 'sections', `${name}.liquid`), 'utf8');
  const schema = JSON.parse(source.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/)[1]);
  const values = Object.fromEntries(schema.settings.filter(field => field.id).map(field => [field.id, field.default]));
  return engine.parseAndRender(clean(source), { ...common, section: { settings: { ...values, ...overrides }, blocks: [] } });
}
const header = await section('bpm-announcement', { text: 'Now Shipping Canada Wide | Hand Made' }) + await section('bpm-header', { menu });
const footer = await section('bpm-footer', { menu });
const layout = await readFile(join(theme, 'layout/theme.liquid'), 'utf8');
const code = layout.replace(/{%\s*sections 'header-group'\s*%}/, '{{ preview_header }}').replace(/{%\s*sections 'footer-group'\s*%}/, '{{ preview_footer }}').replace(/{%\s*style\s*%}/g, '<style>').replace(/{%\s*endstyle\s*%}/g, '</style>');
await writeFile(join(output, 'index.html'), await engine.parseAndRender(code, { ...common, preview_header: header, preview_footer: footer }));
console.log(`Local fabricated-data chrome preview: ${output}/index.html. This does not emulate Shopify commerce or editor APIs.`);
