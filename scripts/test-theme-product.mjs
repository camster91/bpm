import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../theme/assets/bpm-product.js', import.meta.url), 'utf8');
const events = target => Object.assign(target, {
  listeners: new Map(),
  addEventListener(type, fn) { const list = this.listeners.get(type) || []; list.push(fn); this.listeners.set(type, list); },
  emit(type, event = {}) { this.listeners.get(type)?.forEach(fn => fn(event)); }
});
function product() {
  const price = {textContent: '$24.00 CAD'};
  const one = events({checked:false,dataset:{price:'$24.00 CAD'}});
  const plan = events({checked:true,dataset:{price:'$21.60 CAD'}});
  const media = [{id:'image',hidden:false,querySelectorAll:()=>[]},{id:'video',hidden:false,querySelectorAll:()=>[{pause(){ pauses++; }}]}];
  let pauses = 0;
  const thumb = events({hash:'#video',attributes:new Map(),setAttribute(k,v){this.attributes.set(k,v);},removeAttribute(k){this.attributes.delete(k);}});
  const gallery = {dataset:{},querySelector:()=>media[0],querySelectorAll:s=>s==='[data-bpm-media]'?media:[thumb]};
  const select = events({});
  const variants = {submits:0,querySelector:()=>select,requestSubmit(){this.submits++;}};
  const node = {dataset:{},querySelector(s){return {'[name="selling_plan"]:checked':[one,plan].find(r=>r.checked),'[data-bpm-product-price]':price,'[data-bpm-gallery]':gallery,'[data-bpm-variant-form]':variants}[s];},querySelectorAll:()=>[one,plan]};
  return {node,price,one,plan,media,thumb,gallery,select,variants,get pauses(){return pauses;}};
}
const first = product();
const nodes = [first.node];
const document = events({querySelectorAll:()=>nodes});
const window = events({});
vm.runInNewContext(source,{document,window});
assert.equal(first.price.textContent,'$21.60 CAD','Restored checked plan must determine initial price');
assert.equal(first.media[1].hidden,true);
assert.equal(first.pauses,1);
let prevented=false;
first.thumb.emit('click',{preventDefault(){prevented=true;}});
assert.equal(prevented,true);
assert.equal(first.media[1].hidden,false);
assert.equal(first.thumb.attributes.get('aria-current'),'true');
first.plan.checked=false;first.one.checked=true;first.one.emit('change');
assert.equal(first.price.textContent,'$24.00 CAD');
first.plan.emit('change');
assert.equal(first.price.textContent,'$24.00 CAD','Unchecked radio cannot overwrite price');
first.plan.checked=true;first.one.checked=false;
window.emit('pageshow');
assert.equal(first.price.textContent,'$21.60 CAD','pageshow reconciles restored form state');
window.emit('pageshow');
assert.equal(first.one.listeners.get('change').length,1,'Repeated page lifecycle does not duplicate listeners');
assert.equal(first.thumb.listeners.get('click').length,1);
first.select.emit('change');assert.equal(first.variants.submits,1,'Variant change retains native GET submission');
const second=product();
document.emit('shopify:section:load',{target:{querySelectorAll:()=>[second.node]}});
assert.equal(second.price.textContent,'$21.60 CAD');
assert.equal(second.gallery.dataset.bpmEnhanced,'true');
first.one.checked=false;first.plan.checked=false;
window.emit('pageshow');assert.equal(first.price.textContent,'$21.60 CAD','No selection does not invent a price');
console.log('Product lifecycle checks passed: initial/restored plan price, native variant submission, gallery selection/video pause, editor load and listener idempotency. Shopify backend remains unverified.');
