import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../theme/assets/bpm-motion.js', import.meta.url), 'utf8');
function fixture({ reduced = false, supported = true, merchant = true, editing = false } = {}) {
  const events = target => Object.assign(target, { listeners: new Map(), addEventListener(type, fn) { const list = this.listeners.get(type) || []; list.push(fn); this.listeners.set(type, list); }, emit(type) { this.listeners.get(type)?.forEach(fn => fn()); } });
  const node = () => events({ isConnected:true, dataset:{}, children:[], classList:{ values:new Set(), add(...names){names.forEach(name=>this.values.add(name));}, remove(...names){names.forEach(name=>this.values.delete(name));}, toggle(name,on){if(on)this.add(name);else this.remove(name);}, contains(name){return this.values.has(name);} }, style:{values:new Map(),setProperty(name,value){this.values.set(name,value);},removeProperty(name){this.values.delete(name);delete this[name];}}, getBoundingClientRect(){return {top:100,height:300,width:400};} });
  const item=node(),scene=node(),product=node(),group=node(),button=node(),detail=node(),child=node();
  scene.querySelectorAll=()=>[item];product.parentElement=node();group.children=[node(),node()];group.closest=()=>node();
  button.dataset.pauseLabel='Pause motion';button.dataset.resumeLabel='Resume motion';
  const animations=[];child.tagName='DIV';child.animate=()=>{const a={cancelled:false,cancel(){this.cancelled=true;this.oncancel?.();}};animations.push(a);return a;};detail.children=[{tagName:'SUMMARY'},child];detail.open=false;
  const preference=events({matches:reduced}),window=events({}),document=events({documentElement:node(),querySelectorAll(selector){if(selector==='[data-bpm-motion-toggle]')return [button];if(selector==='main details')return [detail];if(selector.startsWith('main >'))return [scene];if(selector.includes('count-1'))return [product];return [group];}});
  document.documentElement.dataset.bpmMotionEnabled=String(merchant);if(editing)window.Shopify={designMode:true};
  const observers=[];class Observer{constructor(callback){this.callback=callback;this.disconnected=false;this.targets=[];observers.push(this);}observe(target){this.targets.push(target);}disconnect(){this.disconnected=true;}entries(target,isIntersecting=true){this.callback([{target,isIntersecting}]);}}
  if(supported)window.IntersectionObserver=Observer;
  let next=0;const frames=new Map();const context={document,window,innerHeight:900,matchMedia:()=>preference,IntersectionObserver:Observer,requestAnimationFrame:fn=>{const id=++next;frames.set(id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id)};
  vm.runInNewContext(source,context);
  return {window,document,preference,observers,frames,scene,item,product,group,button,detail,animations,flush(){const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn());}};
}
const normal=fixture();
assert.equal(normal.observers.length,3);
normal.observers[0].entries(normal.scene);assert.equal(normal.scene.classList.contains('motion-entered'),true);
normal.observers[1].entries(normal.product);normal.observers[2].entries(normal.group);
for(let i=0;i<10;i++)normal.window.emit('scroll');normal.window.emit('resize');assert.equal(normal.frames.size,1);
normal.flush();assert.match(normal.product.style.values.get('--scroll-turn'),/deg$/);assert.match(normal.group.children[0].style.transform,/translate3d/);
normal.detail.open=true;normal.detail.emit('toggle');assert.equal(normal.animations.length,1);
normal.window.emit('scroll');normal.preference.matches=true;normal.preference.emit('change');
assert.equal(normal.frames.size,0);assert.equal(normal.animations[0].cancelled,true);assert.ok(normal.observers.every(observer=>observer.disconnected));
assert.equal(normal.scene.classList.contains('motion-entered'),false);assert.equal(normal.product.style.values.has('--scroll-turn'),false);assert.equal(('transform' in normal.group.children[0].style),false);assert.equal(normal.button.hidden,true);
normal.preference.matches=false;normal.preference.emit('change');assert.equal(normal.button.hidden,false);
normal.button.emit('click');assert.equal(normal.button.textContent,'Resume motion');assert.equal(normal.document.documentElement.classList.contains('bpm-motion-paused'),true);assert.equal(normal.group.classList.contains('orbital-pack'),false);
normal.button.emit('click');assert.equal(normal.button.textContent,'Pause motion');assert.equal(normal.group.classList.contains('orbital-pack'),true);
for(let i=0;i<3;i++)normal.document.emit('shopify:section:load');assert.equal(normal.button.listeners.get('click').length,1);assert.equal(normal.detail.listeners.get('toggle').length,1);assert.equal(normal.observers.filter(observer=>!observer.disconnected).length,3);
normal.document.emit('shopify:section:unload');normal.flush();assert.equal(normal.observers.filter(observer=>!observer.disconnected).length,3);
normal.observers.at(-2).entries(normal.product,false);normal.observers.at(-1).entries(normal.group,false);normal.flush();normal.window.emit('scroll');assert.equal(normal.frames.size,0);
for(const mode of [{reduced:true},{supported:false},{merchant:false},{editing:true}]){const f=fixture(mode);assert.equal(f.observers.length,0);assert.equal(f.button.hidden,true);assert.equal(f.product.classList.contains('scroll-product'),false);assert.equal(f.group.classList.contains('orbital-pack'),false);f.detail.open=true;f.detail.emit('toggle');assert.equal(f.animations.length,0);}
console.log('Motion lifecycle checks passed: resource dispatch, single-frame scheduling, reduced-motion cleanup, pause/resume, editor rebinding and unsupported-browser fallback. Native editor/runtime remain unverified.');
