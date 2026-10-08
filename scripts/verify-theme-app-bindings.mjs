import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const json=async file=>JSON.parse(await readFile(join(root,file),'utf8'));
const manifest=await json('docs/theme-app-bindings.json');
let checked=0;
for(const [file,bindings] of Object.entries(manifest.product_blocks)){
 const template=await json('theme/'+file);
 for(const [section,key] of [['main','badge'],['reviews','reviews']]){
  const expected=bindings[key];
  assert.deepEqual(template.sections[section].blocks[expected.id],expected.block);
  assert.equal(template.sections[section].block_order.filter(id=>id===expected.id).length,1);
  assert.match(expected.block.type,/^shopify:\/\/apps\/judge-me-reviews\/blocks\//);
  const source=await readFile(join(root,'theme/sections',template.sections[section].type+'.liquid'),'utf8');
  const schema=JSON.parse(source.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/)[1]);
  assert.ok(schema.blocks.some(block=>block.type==='@app'));
  if(key==='reviews'){assert.equal(expected.block.settings.review_data,'real_data');assert.equal(expected.block.settings.show_shop_reviews,false);}
  checked++;
 }
}
const settings=await json('theme/config/settings_data.json');
for(const [id,record] of Object.entries(manifest.embeds)){
 assert.deepEqual(settings.current.blocks[id],record.candidate);
 if(record.original.type.includes('/judgeme_core/')) assert.deepEqual(record.candidate,record.original);
 else {assert.ok(record.original.type.includes('/cart_drawer_widget/'));assert.equal(record.candidate.disabled,true);}
 checked++;
}
const cart=await json('theme/templates/cart.json');
assert.deepEqual(cart.sections.reviews.blocks[manifest.cart_block.id],manifest.cart_block.block);
assert.ok(cart.order.indexOf('reviews')>cart.order.indexOf('main'));
checked++;
const renderer=await readFile(join(root,'theme/snippets/bpm-app-blocks.liquid'),'utf8');
assert.match(renderer,/block.type == '@app'/);
assert.match(renderer,/{% render block %}/);
console.log(`${checked} Judge.me configuration bindings match protected-source records and declared cart migration. Native app rendering, consent and backend remain unverified.`);
