import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [themePath, enginePath] = process.argv.slice(2);
if (!themePath || !enginePath) throw new Error('Usage: node scripts/test-theme-baseline-fixes.mjs <theme-path> <liquidjs-entry-path>');
const { Liquid } = await import(pathToFileURL(enginePath).href);
const liquid = new Liquid();
liquid.registerFilter('money', value => `$${(Number(value) / 100).toFixed(2)}`);
liquid.registerFilter('metafield_tag', value => value?.value ?? value);
const source = await readFile(join(themePath, 'snippets/custom-product-block.liquid'), 'utf8');
function branch(name, next) {
  const start = source.indexOf(`{%- when '${name}' -%}`);
  const end = source.indexOf(`{%- when '${next}' -%}`, start);
  assert.ok(start >= 0 && end > start);
  return source.slice(start + `{%- when '${name}' -%}`.length, end);
}
const purchase = branch('purchase_options', 'quantity_selector');
const tabs = branch('dynamic_description_tabs', 'description');
const product = { tags: [], selected_or_first_available_variant: { price: 2399, selling_plan_allocations: [] }, selling_plan_groups: [], metafields: { custom: {} } };
const block = { settings: { one_time_label: 'One time', subscribe_label: 'Subscribe', subscribe_badge_text: 'Save [percent]%', subscribe_benefits: '', first_tab_open: true } };
let passed = 0;
async function test(name, code, data, verify) {
  const html = await liquid.parseAndRender(code, data);
  verify(html);
  passed++;
  console.log(`PASS ${name}`);
}
await test('no plan offers only one-time purchase', purchase, { product, block }, html => {
  assert.match(html, /data-purchase-type="one-time"/);
  assert.doesNotMatch(html, /data-purchase-type="subscription"/);
  assert.match(html, /\$23\.99/);
});
const plan = { id: 123, price_adjustments: [{ value: 10 }] };
const planned = { ...product, selling_plan_groups: [{ selling_plans: [plan] }], selected_or_first_available_variant: { price: 2399, selling_plan_allocations: [{ selling_plan: plan, price: 2160, compare_at_price: 2399 }] } };
await test('existing plan uses actual allocated price and ID', purchase, { product: planned, block }, html => {
  assert.match(html, /data-selling-plan="123"/);
  assert.match(html, /\$21\.60/);
  assert.match(html, /Save 10%/);
});
await test('fixed-price plan uses allocation rather than percentage intent', purchase, { product: { ...planned, selected_or_first_available_variant: { price: 2399, selling_plan_allocations: [{ selling_plan: { id: 124, price_adjustments: [{ value: 1900, value_type: 'fixed_amount' }] }, price: 1900, compare_at_price: 2399 }] } }, block }, html => assert.match(html, /\$19\.00/));
await test('product plan unavailable to selected variant is omitted', purchase, { product: { ...planned, selected_or_first_available_variant: product.selected_or_first_available_variant }, block }, html => assert.doesNotMatch(html, /data-purchase-type="subscription"/));
await test('zero-price allocation emits no savings badge', purchase, { product: { ...planned, selected_or_first_available_variant: { price: 0, selling_plan_allocations: [{ selling_plan: plan, price: 0, compare_at_price: 0 }] } }, block }, html => {
  assert.match(html, /\$0\.00/);
  assert.doesNotMatch(html, /custom-product__purchase-badge/);
});
await test('bundle excludes subscription controls', purchase, { product: { ...planned, tags: ['bundle'] }, block }, html => assert.doesNotMatch(html, /data-purchase-type/));
await test('explanatory-only product retains its tab', tabs, { product: { ...product, metafields: { custom: { whats_inside_description: { value: 'EXPLANATORY_FIXTURE' } } } }, block }, html => assert.match(html, /EXPLANATORY_FIXTURE/));
await test('no content renders no tabs', tabs, { product, block }, html => assert.doesNotMatch(html, /custom-product__tab-header/));
const grid = await readFile(join(themePath, 'sections/main-collection-product-grid.liquid'), 'utf8');
const start = grid.indexOf("{%- assign card_color_token =");
const end = grid.indexOf('{%- endif -%}', start);
assert.ok(start >= 0 && end > start);
const colour = grid.slice(start, end + '{%- endif -%}'.length) + '{{ card_color_class }}';
for (const token of ['1', '2', '3', '4', '', 'unknown', '1 injected-class']) {
  await test(`palette token ${JSON.stringify(token)}`, colour, { product: { metafields: { custom: { card_color: { value: token } } } } }, html => {
    const expected = ['1', '2', '3', '4'].includes(token) ? token : 'default';
    assert.equal(html.trim(), `custom-product-card--color-${expected}`);
  });
}
console.log(`${passed} rendering checks passed. Shopify runtime and commerce transport still require preview QA.`);
