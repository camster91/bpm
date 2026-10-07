import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { Liquid } from 'liquidjs';

const theme = resolve(import.meta.dirname, '../theme');
const scratch = await mkdtemp(join(tmpdir(), 'bpm-chrome-fixtures-'));
const locale = JSON.parse(await readFile(join(theme, 'locales/en.default.json'), 'utf8'));
const clean = source => source.replace(/{%\s*(schema|doc|stylesheet)\s*%}[\s\S]*?{%\s*end\1\s*%}/g, '');
const navigation = clean(await readFile(join(theme, 'snippets/bpm-navigation.liquid'), 'utf8'));
await writeFile(join(scratch, 'bpm-navigation.liquid'), navigation);
await writeFile(join(scratch, 'bpm-sites-links.liquid'), clean(await readFile(join(theme, 'snippets/bpm-sites-links.liquid'), 'utf8')));
await writeFile(join(scratch, 'bpm-sites-card.liquid'), clean(await readFile(join(theme, 'snippets/bpm-sites-card.liquid'), 'utf8')));
await writeFile(join(scratch, 'bpm-product-card.liquid'), clean(await readFile(join(theme, 'snippets/bpm-product-card.liquid'), 'utf8')));
const engine = new Liquid({ root: scratch, extname: '.liquid' });
engine.registerFilter('money', value => '$' + (Number(value) / 100).toFixed(2));
engine.registerFilter('money_with_currency', value => '$' + (Number(value) / 100).toFixed(2) + ' CAD');
engine.registerFilter('image_url', value => value.src);
engine.registerFilter('image_tag', src => `<img src="${src}">`);
engine.registerFilter('asset_url', value => `/assets/${value}`);
engine.registerFilter('t', (key, ...pairs) => {
  const value = key.split('.').reduce((o, k) => o?.[k], locale);
  assert.equal(typeof value, 'string', `Missing translation: ${key}`);
  const params = Object.fromEntries(pairs.filter(Array.isArray));
  return value.replace(/{{\s*(\w+)\s*}}/g, (_, name) => params[name] ?? '');
});
const routes = { root_url: '/', cart_url: '/cart', account_url: '/account', all_products_collection_url: '/collections/all' };
const shop = { name: 'BPM <draft>', customer_accounts_enabled: true };
let passed = 0;
async function check(name, relative, context, verify) {
  const html = await engine.parseAndRender(clean(await readFile(join(theme, relative), 'utf8')), context);
  verify(html);
  passed++;
  console.log(`PASS ${name}`);
}
try {
  await check('three menu levels preserve links/current state and escape labels', 'snippets/bpm-navigation.liquid', {
    menu: { links: [{ title: '<script>Shop</script>', url: '/collections/all', links: [{ title: 'Single', url: '/products/single', current: true, links: [{ title: 'Details', url: '/pages/details' }] }] }] }, label: 'Navigation'
  }, html => { assert.doesNotMatch(html, /<script>/); assert.match(html, /&lt;script&gt;/); assert.match(html, /aria-current="page"/); assert.match(html, /href="\/pages\/details"/); });
  await check('empty announcement creates no shipping promise', 'sections/bpm-announcement.liquid', { section: { settings: { text: '' } } }, html => assert.equal(html.trim(), ''));
  const header = { section: { settings: { overlay_home: true, show_account: true, menu: { links: [] } } }, request: { page_type: 'index' }, routes, shop, cart: { item_count: 5 } };
  await check('header uses native account/cart routes and actual cart count', 'sections/bpm-header.liquid', header, html => { assert.match(html, /bpm-header--overlay/); assert.match(html, /href="\/account"/); assert.match(html, /href="\/cart"/); assert.match(html, /Cart, 5 items/); assert.match(html, /BPM &lt;draft&gt;/); });
  await check('disabled customer accounts omit account action', 'sections/bpm-header.liquid', { ...header, shop: { ...shop, customer_accounts_enabled: false } }, html => assert.doesNotMatch(html, /href="\/account"/));
  await check('non-homepage keeps normal header and empty cart has no count badge', 'sections/bpm-header.liquid', { ...header, request: { page_type: 'product' }, cart: { item_count: 0 } }, html => { assert.doesNotMatch(html, /bpm-header--overlay/); assert.doesNotMatch(html, /data-bpm-cart-count/); });
  const footer = { section: { settings: { show_cta: true, heading: 'Upgrade', accent_heading: 'With BPM', button_label: 'Shop', collection: { url: '/collections/selected' }, menu: { links: [] } }, blocks: [{ settings: { url: '', platform: 'instagram' } }] }, routes, shop };
  await check('footer uses selected collection and omits empty social destinations', 'sections/bpm-footer.liquid', footer, html => { assert.match(html, /href="\/collections\/selected"/); assert.doesNotMatch(html, /href=""/); assert.doesNotMatch(html, /bpm-social-instagram\.svg/); assert.doesNotMatch(html, /BPM <draft>/); });
  await check('missing collection uses native all-products route', 'sections/bpm-footer.liquid', { ...footer, section: { ...footer.section, settings: { ...footer.section.settings, collection: null } } }, html => assert.match(html, /href="\/collections\/all"/));
  const hero = {section: {index: 1, settings: { heading: 'BPM <draft>', accent_heading: 'Deodorant', collection: {url:'/collections/selected'}, button_label: 'Shop' }}, routes};
  await check('hero renders original assets with escaped copy and selected collection', 'sections/bpm-hero.liquid', hero, html => {assert.match(html, /bpm-home-photo.png/); assert.match(html, /bpm-hero-highlight.svg/); assert.match(html, /fetchpriority="high"/); assert.match(html, /BPM &lt;draft&gt;/); assert.match(html, /href="\/collections\/selected"/);});
  await check('hero is visible below fold and loads lazily', 'sections/bpm-hero.liquid', {...hero, section: {...hero.section, index: 2}}, html => { assert.match(html, /loading="lazy"/); assert.doesNotMatch(html, /fetchpriority/); });
  await check('merchant hero photo override renders when section.index is absent in editor', 'sections/bpm-hero.liquid', {...hero, section: {settings: {...hero.section.settings, image: {src:'/assets/custom-hero.png'}}}}, html => {assert.match(html, /bpm-hero__photograph--custom/); assert.match(html, /src="\/assets\/custom-hero.png"/); assert.doesNotMatch(html, /bpm-home-photo.png/);});
  await check('unselected product renders no fictitious price or destination', 'snippets/bpm-product-card.liquid', { product: null }, html => assert.equal(html.trim(), ''));
  const card = { product: {title:'Real <product>', url:'/products/real', price:2350, price_varies:true, available:false, featured_image:{src:'/assets/fixture.png'}} };
  await check('product card uses native range pricing, availability and product destination', 'snippets/bpm-product-card.liquid', card, html => { assert.match(html, /From \$23.50/); assert.match(html, /Sold out/); assert.match(html, /href="\/products\/real"/); assert.match(html, /Real &lt;product&gt;/); assert.doesNotMatch(html, /\$0.00/); });
  await check('single price available product has no misleading range or sold-out label', 'snippets/bpm-product-card.liquid', {product: {...card.product, price_varies:false, available:true}}, html => {assert.match(html, /\$23.50/); assert.doesNotMatch(html, /From|Sold out/);});
  const faq = {section:{id:'faq-a', settings:{heading:'Questions <draft>',show_image:true,open_first:true}, blocks:[{settings:{question:'Incomplete',answer:''}}, {settings:{question:'Question <one>',answer:'<p>Approved answer</p>'}}, {settings:{question:'Question two',answer:'<p>Second answer</p>'}}]}};
  await check('FAQ omits incomplete pairs, escapes headings and opens first complete question', 'sections/bpm-faq.liquid', faq, html => {assert.doesNotMatch(html,/Incomplete/); assert.match(html,/Question &lt;one&gt;/); assert.match(html,/name="bpm-faq-faq-a" open/); assert.equal((html.match(/ open/g)||[]).length,1); assert.match(html,/bpm-faq-photo.png/); assert.match(html,/bpm-faq-mask.svg/); assert.equal((html.match(/<summary>/g)||[]).length,2);});
  await check('FAQ photo and initial expansion can be disabled independently', 'sections/bpm-faq.liquid', {...faq,section:{...faq.section,settings:{...faq.section.settings,show_image:false,open_first:false}}}, html => {assert.doesNotMatch(html,/bpm-faq-photo.png| open/); assert.match(html,/Approved answer/);});
  const benefits = {section:{settings:{heading:'For every body'},blocks:[{settings:{heading:'Approved <benefit>',icon:'flask'}},{settings:{heading:'',icon:'leaf'}}]}};
  await check('benefits omit blank claims and use selected original icon with escaped label', 'sections/bpm-benefits.liquid', benefits, html=>{assert.match(html,/Approved &lt;benefit&gt;/);assert.match(html,/bpm-benefit-flask.png/);assert.doesNotMatch(html,/bpm-benefit-leaf.png/);});
  await check('merchant benefit icon override takes precedence over original asset', 'sections/bpm-benefits.liquid', {...benefits,section:{...benefits.section,blocks:[{settings:{heading:'Benefit',icon:'flask',image:{src:'/assets/merchant-icon.png'}}}]}}, html=>{assert.match(html,/merchant-icon.png/);assert.doesNotMatch(html,/bpm-benefit-flask.png/);});
  await check('all blank benefits render no empty icon row', 'sections/bpm-benefits.liquid', {...benefits,section:{...benefits.section,blocks:[{settings:{heading:'',icon:'leaf'}}]}}, html=>assert.doesNotMatch(html,/<ul|bpm-benefit-leaf.png/));
  await check('unconfigured review app region renders no fake reviews or empty heading', 'sections/bpm-app-region.liquid', {section:{blocks:[],settings:{heading:'Customer reviews'}}}, html=>assert.equal(html.trim(),''));
  await check('empty automatic app wrapper creates no dead content region', 'sections/apps.liquid', {section:{blocks:[],settings:{}}}, html=>assert.equal(html.trim(),''));
  await check('Sites header preserves native cart count, escaped store name and account setting', 'sections/bpm-sites-header.liquid', header, html => {assert.match(html, /Shopping bag, 5 items/);assert.match(html, /href="\/account"/);assert.match(html, /BPM &lt;draft&gt;/);assert.doesNotMatch(html,/bag.html|localStorage/);});
  await check('Sites header omits disabled accounts and renders zero bag count', 'sections/bpm-sites-header.liquid', {...header,shop:{...shop,customer_accounts_enabled:false},cart:{item_count:0}}, html => {assert.doesNotMatch(html,/href="\/account"/);assert.match(html,/Shopping bag, 0 items/);});
  await check('Sites nested menu preserves three levels and current state safely', 'snippets/bpm-sites-links.liquid', {menu:{links:[{title:'<unsafe>',url:'/collections/all',links:[{title:'Single',url:'/products/single',current:true,links:[{title:'Details',url:'/pages/details'}]}]}]}}, html => {assert.match(html,/&lt;unsafe&gt;/);assert.doesNotMatch(html,/<unsafe>/);assert.match(html,/aria-current="page"/);assert.match(html,/href="\/pages\/details"/);});
  await check('Sites footer uses current market and omits unconfigured legal entity', 'sections/bpm-sites-footer.liquid', {section:{settings:{menu:{links:[]},show_market:true}},shop,routes,localization:{country:{name:'United States',currency:{iso_code:'USD'}}}}, html => {assert.match(html,/United States \/ USD/);assert.doesNotMatch(html,/Canada \/ CAD|Naturels Bold/);});
  const sitesHero = {section:{settings:{heading:'This is\ndeodorant. <test>',subheading:'Natural.',image_alt:'Model',button_label:'Choose',collection:{url:'/collections/selected'}}},routes};
  await check('Sites hero escapes copy, preserves line breaks and renders eagerly in editor', 'sections/bpm-sites-hero.liquid',sitesHero, html=>{assert.match(html,/deodorant. &lt;test&gt;/);assert.match(html,/<br/);assert.match(html,/loading="eager"/);assert.match(html,/fetchpriority="high"/);assert.match(html,/bpm-sites-hero.jpg/);assert.match(html,/href="\/collections\/selected"/);assert.doesNotMatch(html,/hero-small/);});
  await check('Sites hero below fold renders with lazy source photo', 'sections/bpm-sites-hero.liquid',{...sitesHero,section:{...sitesHero.section,index:3}},html=>{assert.match(html,/loading="lazy"/);assert.doesNotMatch(html,/fetchpriority="high"/);});
  await check('Sites card with no selected product emits no demo price or link', 'snippets/bpm-sites-card.liquid',{},html=>assert.equal(html.trim(),''));
  await check('Sites card uses native currency price and availability rather than preview data', 'snippets/bpm-sites-card.liquid',{...card,button_label:'Meet',summary:'<safe>',pack_label:'2 × 76 g'},html=>{assert.match(html,/From \$23.50 CAD/);assert.match(html,/Sold out/);assert.match(html,/&lt;safe&gt;/);assert.match(html,/href="\/products\/real"/);assert.doesNotMatch(html,/preview.html|23.99/);});
  await check('Sites image-text hides unselected product link and preserves original texture', 'sections/bpm-sites-image-text.liquid',{section:{settings:{heading:'Small squeeze.',button_label:'Get to know'}}},html=>{assert.match(html,/bpm-sites-texture.jpg/);assert.doesNotMatch(html,/<a/);});
  await check('Sites formula omits blank ingredients and unconfigured product link', 'sections/bpm-sites-formula.liquid',{section:{settings:{heading:'Every ingredient',button_label:'Formula'},blocks:[{settings:{heading:'Magnesium <test>',role:'Odour control'}},{settings:{heading:'',role:'Hidden'}}]}},html=>{assert.match(html,/Magnesium &lt;test&gt;/);assert.match(html,/Odour control/);assert.doesNotMatch(html,/Hidden|<a/);});
  const story = {section:{settings:{layout:'ownership',heading:'A personal story.',image_alt:'Original mark',page:{url:'/pages/ownership'},button_label:'Read'}}};
  await check('Sites ownership preserves original mark and selected native page', 'sections/bpm-sites-story.liquid',story,html=>{assert.match(html,/ownership-tile/);assert.match(html,/bpm-sites-ownership.png/);assert.match(html,/href="\/pages\/ownership"/);assert.doesNotMatch(html,/bpm-sites-story.jpg/);});
  await check('Sites story merchant photo override supersedes static source image', 'sections/bpm-sites-story.liquid',{section:{settings:{layout:'story',image:{src:'/merchant-photo.jpg'},image_alt:'Merchant photo'}}},html=>{assert.match(html,/merchant-photo.jpg/);assert.doesNotMatch(html,/bpm-sites-story.jpg|<a/);});
  await check('Sites FAQ omits incomplete pairs and escapes question labels', 'sections/bpm-sites-questions.liquid',{section:{settings:{},blocks:[{settings:{question:'Missing answer'}},{settings:{question:'Question <test>',answer:'<p>Approved answer.</p>'}}]}},html=>{assert.doesNotMatch(html,/Missing answer/);assert.match(html,/Question &lt;test&gt;/);assert.match(html,/<p>Approved answer.<\/p>/);assert.equal((html.match(/<details/g)||[]).length,1);});
  await check('Sites closing uses native collection fallback and escapes heading', 'sections/bpm-sites-closing.liquid',{section:{settings:{heading:'Find <BPM>',button_label:'Shop'}},routes},html=>{assert.match(html,/Find &lt;BPM&gt;/);assert.match(html,/href="\/collections\/all"/);});
  console.log(`${passed} chrome rendering checks passed; Shopify runtime and visual geometry remain unverified.`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
