import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const root = resolve(import.meta.dirname, '..');
const readJSON = async path => JSON.parse(await readFile(join(root, path), 'utf8'));
async function files(directory, prefix = '') {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = prefix + entry.name;
    if (entry.isDirectory()) result.push(...await files(join(directory, entry.name), path + '/'));
    else result.push(path);
  }
  return result.sort();
}
const sourcePages = (await files(join(root, 'reference-site/public'))).filter(path => path.endsWith('.html') && !path.startsWith('shared-'));
const templateFiles = (await files(join(root, 'theme/templates'))).filter(path => /\.(json|liquid)$/.test(path));
const fixed = {
  'index.html': 'index.json', 'shop.html': 'collection.json', 'bag.html': 'cart.json',
  'about.html': 'page.about.json', 'indigenous-owned.html': 'page.indigenous-owned.json',
  'contact.html': 'page.contact.json', 'breakdown.html': 'blog.json', 'policies.html': 'page.policies.json'
};
const articles = await readJSON('docs/source-article-content-candidate.json');
const policies = await readJSON('docs/source-policy-content-candidate.json');
const sources = sourcePages.map(path => {
  if (fixed[path]) return { source: path, templates: [fixed[path]], state: 'local-template-present-native-assignment-unverified' };
  if (path.startsWith('articles/')) {
    const entry = articles.entries.find(article => article.sourcePath === 'reference-site/public/' + path);
    assert.ok(entry, `Missing prepared article content: ${path}`);
    return { source: path, templates: ['article.json'], nativeHandle: 'news/' + entry.handle, state: 'prepared-content-not-applied-native-id-unverified' };
  }
  if (path.startsWith('policies/')) {
    const entry = policies.entries.find(policy => policy.sourcePath === 'reference-site/public/' + path);
    assert.ok(entry, `Missing prepared policy content: ${path}`);
    return { source: path, templates: [], capturedPath: entry.capturedPath, state: 'prepared-policy-content-not-applied-native-destination-and-layout-unverified', boundary: 'Current approved policy body, route and native policy layout must be verified; theme upload does not migrate policy data.' };
  }
  if (path === 'review.html') return { source: path, templates: [], state: 'intentional-internal-tool-exclusion', boundary: 'Design review/comments tooling is not a customer storefront feature.' };
  if (path === 'product-media/preview.html') return { source: path, templates: ['product.json', 'product.bergamot-lime.json', 'product.unscented.json'], state: 'nine-local-compositions-native-commerce-unverified' };
  throw new Error(`Unclassified authoritative source page: ${path}`);
});
for (const mapping of sources) for (const template of mapping.templates) assert.ok(templateFiles.includes(template), `Missing mapped template: ${template}`);
let orderedSections = 0;
for (const file of templateFiles.filter(path => path.endsWith('.json'))) {
  const template = await readJSON('theme/templates/' + file);
  assert.equal(new Set(template.order).size, template.order.length, `Duplicate section order: ${file}`);
  for (const id of template.order) {
    assert.ok(template.sections[id], `Undefined section ${file}:${id}`);
    await readFile(join(root, 'theme/sections', template.sections[id].type + '.liquid'));
    orderedSections++;
  }
}
const catalogue = await readJSON('reference-site/public/catalogue.json');
const products = catalogue.map(product => ({ handle: product.handle, sourceKey: product.key, template: product.key === 'bergamot' ? 'product.bergamot-lime.json' : product.key === 'unscented' ? 'product.unscented.json' : 'product.json', nativeVerified: false }));
const legacyCustomerTemplates = ['login', 'register', 'account', 'order', 'addresses', 'activate_account', 'reset_password'].map(name => ({ template: 'customers/' + name + '.json', present: templateFiles.includes('customers/' + name + '.json') || templateFiles.includes('customers/' + name + '.liquid') }));
const report = {
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  themeTree: execFileSync('git', ['rev-parse', 'HEAD:theme'], { cwd: root, encoding: 'utf8' }).trim(),
  scope: 'Local source classification, template presence and ordered-section file resolution only',
  counts: { sourcePages: sources.length, templates: templateFiles.length, orderedSections, catalogueProducts: products.length },
  sources, products, templates: templateFiles, legacyCustomerTemplates,
  accountDocumentation: 'https://shopify.dev/docs/storefronts/themes/architecture/templates#legacy-customer-account-templates',
  accountDecision: 'Current customer-account mode is unverified. Shopify documents legacy account templates as deprecated and publishing a theme without them as automatically upgrading customer accounts. Before publication, verify the active account mode, existing customizations and apps, obtain explicit migration acceptance if applicable, and verify native account journeys. Do not switch account mode or add deprecated templates without resolving this boundary.',
  provesVisualFidelity: false, provesNativeAssignment: false, provesReleaseReadiness: false
};
console.log(JSON.stringify(process.argv.includes('--summary') ? { counts: report.counts, missingLegacyCustomerTemplates: legacyCustomerTemplates.filter(entry => !entry.present).map(entry => entry.template), nativeAccountModeVerified: false, provesReleaseReadiness: false } : report, null, 2));
