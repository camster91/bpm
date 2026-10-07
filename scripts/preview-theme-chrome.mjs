import { readFile, writeFile, mkdir, symlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { Liquid } from 'liquidjs';

const theme = resolve(import.meta.dirname, '../theme');
const output = resolve(process.argv[2] || '/tmp/bpm-chrome-preview');
await mkdir(output, { recursive: true });
await symlink(join(theme, 'assets'), join(output, 'assets')).catch(error => { if (error.code !== 'EEXIST') throw error; });
const styles = [];
const clean = text => text.replace(/{%\s*(schema|doc)\s*%}[\s\S]*?{%\s*end\1\s*%}/g, '').replace(/{%\s*stylesheet\s*%}([\s\S]*?){%\s*endstylesheet\s*%}/g, (_, css) => { styles.push(css); return ''; });
for (const name of ['bpm-navigation', 'bpm-product-card', 'bpm-sites-links', 'bpm-sites-card']) await writeFile(join(output, `${name}.liquid`), clean(await readFile(join(theme, 'snippets', `${name}.liquid`), 'utf8')));
const engine = new Liquid({ root: output, extname: '.liquid' });
const locale = JSON.parse(await readFile(join(theme, 'locales/en.default.json'), 'utf8'));
engine.registerFilter('asset_url', value => `/assets/${value}`);
engine.registerFilter('stylesheet_tag', value => `<link rel="stylesheet" href="${value}">`);
engine.registerFilter('money', value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value / 100));
engine.registerFilter('money_with_currency', value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value / 100) + ' CAD');
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
  return engine.parseAndRender(clean(source), { ...common, section: { id: `preview-${name}`, settings: { ...values, ...overrides }, blocks } });
}
const header = await section('bpm-announcement', { text: 'Now Shipping Canada Wide | Hand Made' }) + await section('bpm-header', { menu });
const footer = await section('bpm-footer', { menu });
const hero = await section('bpm-hero', { heading: 'Elevated', accent_heading: 'Protection', final_heading: 'for Every Day.', body: '<p>Clean, dependable protection designed for daily wear, combining skin-safe ingredients with long-lasting freshness you can trust.</p>', button_label: 'Shop Deodorants' });
const lineup = await section('bpm-product-lineup', {}, [{ settings: { product: { title: 'Bergamot + Lime — fixture', url: '/products/fixture-bergamot', price: 1800, available: true, featured_image: {src: '/assets/bpm-footer-bergamot.png'} }, image_treatment: 'figma', background: '#acb228' } }, { settings: { product: { title: 'Unscented — fixture', url: '/products/fixture-unscented', price: 2000, available: false, featured_image: {src: '/assets/bpm-footer-unscented.png'} }, image_treatment: 'figma', background: '#228782' } }]);
const benefits = await section('bpm-benefits', { body: '<p>BPM is for everyone. Whether you’re heading to work, hitting the gym, chasing deadlines, or juggling family life, BPM fits seamlessly into your day.</p>' }, [{ settings: {heading:'Free From Harmful Chemicals', icon:'flask'} }, {settings:{heading:'Skin-Safe Ingredients',icon:'leaf'}}, {settings:{heading:'Long-Lasting Freshness',icon:'fresh'}}]);
const faq = await section('bpm-faq', {}, [
  { settings: { question: 'Is BPM Deodorant aluminum-free?', answer: '<p>Yes. All BPM formulas are 100% aluminum-free and designed to fight odor without blocking your body’s natural sweat process.</p>' } },
  ...['Is BPM safe for sensitive skin?', 'Is BPM vegan and cruelty-free?', 'Does it actually last all day?'].map(question => ({settings:{question, answer:'<p>Draft answer awaiting merchant approval.</p>'}}))
]);
common.content_for_layout = hero + lineup + benefits + faq;
const layout = await readFile(join(theme, 'layout/theme.liquid'), 'utf8');
const code = layout.replace(/{%\s*sections 'header-group'\s*%}/, '{{ preview_header }}').replace(/{%\s*sections 'footer-group'\s*%}/, '{{ preview_footer }}').replace(/{%\s*style\s*%}/g, '<style>').replace(/{%\s*endstyle\s*%}/g, '</style>');
await writeFile(join(output, 'index.html'), (await engine.parseAndRender(code, { ...common, preview_header: header, preview_footer: footer })).replace('</head>', `<style>${styles.join('\n')}</style></head>`));
const isolated = (await engine.parseAndRender(code, { ...common, content_for_layout: benefits + faq, preview_header: '', preview_footer: '', page_title: 'BPM section comparison — draft fixtures' })).replace('</head>', `<style>${styles.join('\n')}</style></head>`);
await writeFile(join(output, 'sections.html'), isolated);
console.log(`Local fabricated-data chrome preview: ${output}/index.html. This does not emulate Shopify commerce or editor APIs.`);
const sitesMenu = {links:[{title:'Shop',url:'/collections/all',current:true},{title:'Our story',url:'/pages/about'},{title:'Indigenous-owned',url:'/pages/indigenous-owned'},{title:'The Breakdown',url:'/blogs/the-breakdown'},{title:'Contact',url:'/pages/contact'}]};
const sitesHeader = await section('bpm-sites-header', {menu:sitesMenu});
const sitesFooter = await section('bpm-sites-footer', {menu:sitesMenu, legal_name:'Fabricated legal entity — local fixture',show_market:false});
const sitesLayout = await engine.parseAndRender(code, {...common, content_for_layout:'<section class="section wrap"><p class="eyebrow">Local theme fixture</p><h1>Sites chrome migration</h1><p>Shared navigation and footer only. Homepage implementation is pending.</p></section>',preview_header:sitesHeader, preview_footer:sitesFooter,page_title:'Sites chrome — local fixture'});
await writeFile(join(output,'sites-chrome.html'), sitesLayout);

const sitesHero = await section('bpm-sites-hero');
const siteCrops = JSON.parse(await readFile(resolve(theme,'../reference-site/src/crop-settings.json'),'utf8'));
for (const [source, name] of [['gallery-pack.png','bergamot'],['unscented-pack.png','unscented']]) {
  const crop = siteCrops.find(value => value.source === source);
  const [sw,sh] = crop.source_dimensions;
  const [x,y,w,h] = crop.crop_xywh;
  const original = await readFile(resolve(theme,'../design-assets/sites',source));
  await writeFile(join(output,`fixture-${name}.svg`),`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}"><image x="0" y="0" width="${sw}" height="${sh}" href="data:image/png;base64,${original.toString('base64')}"/></svg>`);
}
const sitesRhythm = await section('bpm-sites-rhythm',{},['Performance first.','Nothing extra.','A little goes a long way.'].map(text=>({settings:{text}})));
const sitesTracks = await section('bpm-sites-tracks',{},[
 {settings:{product:{title:'Bergamot & Lime — fixture',url:'/products/fixture-bergamot',price:2399,available:true,featured_image:{src:'/fixture-bergamot.svg'}},pack_label:'1 × 76 g',summary:'Bergamot & Lime.',background:'#acb228'}},
 {settings:{product:{title:'Unscented — fixture',url:'/products/fixture-unscented',price:2399,available:true,featured_image:{src:'/fixture-unscented.svg'}},pack_label:'1 × 76 g',summary:'Unscented.',background:'#228782'}}
]);
const sitesTexture = await section('bpm-sites-image-text');
const sitesHome = await engine.parseAndRender(code,{...common,content_for_layout:sitesHero+sitesRhythm+sitesTracks+sitesTexture,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Sites homepage migration — local fixture'});
await writeFile(join(output,'sites-home.html'), sitesHome);
