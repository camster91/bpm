import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { Liquid } from 'liquidjs';

const theme = resolve(import.meta.dirname, '../theme');
const scratch = await mkdtemp(join(tmpdir(), 'bpm-chrome-fixtures-'));
const locale = JSON.parse(await readFile(join(theme, 'locales/en.default.json'), 'utf8'));
const clean = source => source.replace(/{%\s*(schema|doc)\s*%}[\s\S]*?{%\s*end\1\s*%}/g, '');
const navigation = clean(await readFile(join(theme, 'snippets/bpm-navigation.liquid'), 'utf8'));
await writeFile(join(scratch, 'bpm-navigation.liquid'), navigation);
const engine = new Liquid({ root: scratch, extname: '.liquid' });
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
  console.log(`${passed} chrome rendering checks passed; Shopify runtime and visual geometry remain unverified.`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
