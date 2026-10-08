import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const readJSON=async file=>JSON.parse(await readFile(join(root,file),'utf8'));
const map=await readJSON('docs/theme-resource-bindings.json');
const products=await readJSON('reference-site/src/content/products.json');
const articles=await readJSON('reference-site/src/content/articles.json');
for(const p of map.products) assert.equal(products.find(s=>s.id===p.id)?.handle,p.handle,`Product source mismatch: ${p.id}`);
for(const handle of map.articles) assert.ok(articles.some(a=>a.url.endsWith('/blogs/'+handle)),`Article source mismatch: ${handle}`);
const resources={product:map.products.map(p=>p.handle),article:map.articles,collection:map.collections,page:map.pages,blog:['news']};
let checked=0;
for(const file of await readdir(join(root,'theme/templates'))) {
 if(!file.endsWith('.json')) continue;
 const template=await readJSON('theme/templates/'+file);
 for(const section of Object.values(template.sections)) {
  const liquid=await readFile(join(root,'theme/sections',section.type+'.liquid'),'utf8');
  const schema=JSON.parse(liquid.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/)[1]);
  const validate=(fields,settings)=>{for(const field of fields||[]) {const value=settings?.[field.id];if(value && resources[field.type]) {assert.ok(resources[field.type].includes(value),`${file}: unmapped ${field.type} ${value}`);checked++;}}};
  validate(schema.settings,section.settings);
  for(const block of Object.values(section.blocks||{})) validate(schema.blocks.find(b=>b.type===block.type)?.settings,block.settings);
 }
}
for(const file of ['collection.json','collection.rotation.json']) {
 const main=(await readJSON('theme/templates/'+file)).sections.main;
 assert.equal(main.block_order.length,9);
 for(const p of map.products) assert.equal(main.blocks[String(p.id)].settings.pack_label,`${p.pack_count} × 76 g`);
}
assert.equal((await readJSON('theme/sections/header-group.json')).sections.header.settings.show_account,true);
console.log(`${checked} resource-picker references match recovered/audited mappings; all nine collection product packs and native account entry preserved. Current Shopify resolution remains unverified.`);
