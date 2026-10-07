import { readFile, writeFile, mkdir, symlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { Liquid } from 'liquidjs';

const theme = resolve(import.meta.dirname, '../theme');
const output = resolve(process.argv[2] || '/tmp/bpm-chrome-preview');
await mkdir(output, { recursive: true });
await symlink(join(theme, 'assets'), join(output, 'assets')).catch(error => { if (error.code !== 'EEXIST') throw error; });
const styles = [];
const clean = text => text.replace(/{%\s*(schema|doc)\s*%}[\s\S]*?{%\s*end\1\s*%}/g, '').replace(/{%\s*stylesheet\s*%}([\s\S]*?){%\s*endstylesheet\s*%}/g, (_, css) => { styles.push(css); return ''; });
for (const name of ['bpm-navigation', 'bpm-product-card']) await writeFile(join(output, `${name}.liquid`), clean(await readFile(join(theme, 'snippets', `${name}.liquid`), 'utf8')));
const engine = new Liquid({ root: output, extname: '.liquid' });
const locale = JSON.parse(await readFile(join(theme, 'locales/en.default.json'), 'utf8'));
engine.registerFilter('asset_url', value => `/assets/${value}`);
engine.registerFilter('stylesheet_tag', value => `<link rel="stylesheet" href="${value}">`);
engine.registerFilter('money', value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value / 100));
engine.registerFilter('image_url', value => value.src);
engine.registerFilter('image_tag', (src, ...pairs) => { const props = Object.fromEntries(pairs.filter(Array.isArray)); const alt = String(props.alt || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); return `<img src="${src}" alt="${alt}" width="4096" height="4096" loading="${props.loading || 'lazy'}">`; });
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
const common = { settings, shop: { name: 'BPM Deodorant', customer_accounts_enabled: true }, routes: { root_url: '/', account_url: '/account', cart_url: '/cart', all_products_collection_url: '/collections/all' }, cart: { item_count: 0 }, request: { page_type: 'index', locale: { iso_code: 'en' } }, page_title: 'BPM chrome preview', current_page: 1, canonical_url: 'http://127.0.0.1:8892/', content_for_header: '', content_for_layout: '' };
async function section(name, overrides = {}, blocks = []) {
  const source = await readFile(join(theme, 'sections', `${name}.liquid`), 'utf8');
  const schema = JSON.parse(source.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/)[1]);
  const values = Object.fromEntries(schema.settings.filter(field => field.id).map(field => [field.id, field.default]));
  return engine.parseAndRender(clean(source), { ...common, section: { settings: { ...values, ...overrides }, blocks } });
}
const header = await section('bpm-announcement', { text: 'Now Shipping Canada Wide | Hand Made' }) + await section('bpm-header', { menu });
const footer = await section('bpm-footer', { menu });
const hero = await section('bpm-hero', { heading: 'Elevated', accent_heading: 'Protection', final_heading: 'for Every Day.', body: '<p>Clean, dependable protection designed for daily wear, combining skin-safe ingredients with long-lasting freshness you can trust.</p>', button_label: 'Shop Deodorants' });
const lineup = await section('bpm-product-lineup', {}, [{ settings: { product: { title: 'Bergamot + Lime — fixture', url: '/products/fixture-bergamot', price: 1800, available: true, featured_image: {src: '/assets/bpm-footer-bergamot.png'} }, image_treatment: 'figma', background: '#acb228' } }, { settings: { product: { title: 'Unscented — fixture', url: '/products/fixture-unscented', price: 2000, available: false, featured_image: {src: '/assets/bpm-footer-unscented.png'} }, image_treatment: 'figma', background: '#228782' } }]);
common.content_for_layout = hero + lineup;
const layout = await readFile(join(theme, 'layout/theme.liquid'), 'utf8');
const code = layout.replace(/{%\s*sections 'header-group'\s*%}/, '{{ preview_header }}').replace(/{%\s*sections 'footer-group'\s*%}/, '{{ preview_footer }}').replace(/{%\s*style\s*%}/g, '<style>').replace(/{%\s*endstyle\s*%}/g, '</style>');
await writeFile(join(output, 'index.html'), (await engine.parseAndRender(code, { ...common, preview_header: header, preview_footer: footer })).replace('</head>', `<style>${styles.join('\n')}</style></head>`));
console.log(`Local fabricated-data chrome preview: ${output}/index.html. This does not emulate Shopify commerce or editor APIs.`);
