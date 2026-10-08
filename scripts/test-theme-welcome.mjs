import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
const code = await readFile(new URL('../theme/assets/bpm-welcome.js',import.meta.url),'utf8');
const target = () => {
  const listeners = new Map();
  return {
    addEventListener(name,fn){const list=listeners.get(name)||[];list.push(fn);listeners.set(name,list);},
    emit(name,event={}){for(const fn of listeners.get(name)||[])fn(event);},
    count(name){return (listeners.get(name)||[]).length;}
  };
};
function fixture(supported=true){
  const launch=Object.assign(target(),{hidden:true,isConnected:true,focusCount:0,focus(){this.focusCount++;}});
  const close=target();
  const panel=Object.assign(target(),{open:false,shows:0,closes:0,
    showModal:supported?function(){this.open=true;this.shows++;}:undefined,
    close(){this.open=false;this.closes++;this.emit('close');},
    getBoundingClientRect:()=>({left:20,right:390,top:80,bottom:600})});
  const wrapper={dataset:{},querySelector:s=>s==='dialog'?panel:s==='.bpm-welcome-launch'?launch:close};
  const root={querySelectorAll:s=>s==='[data-bpm-welcome]'?[wrapper]:panel.open?[panel]:[]};
  const document=Object.assign(target(),root);
  runInNewContext(code,{document});
  return {document,root,launch,close,panel};
}
const f=fixture();
assert.equal(f.launch.hidden,false);
f.launch.emit('click');f.launch.emit('click');
assert.equal(f.panel.shows,1,'Repeated launch does not reopen an active modal');
f.document.emit('shopify:section:load',{target:f.root});
assert.equal(f.launch.count('click'),1,'Editor reload does not duplicate launch binding');
f.panel.emit('click',{target:f.panel,clientX:100,clientY:100});
assert.equal(f.panel.open,true,'Dialog interior click does not close');
f.panel.emit('click',{target:{},clientX:0,clientY:0});
assert.equal(f.panel.open,true,'Provider content click does not close');
f.panel.emit('click',{target:f.panel,clientX:10,clientY:100});
assert.equal(f.panel.open,false,'Backdrop click closes');
assert.equal(f.launch.focusCount,1,'Close restores launcher focus');
f.launch.emit('click');f.close.emit('click');
assert.equal(f.panel.open,false);
f.launch.emit('click');f.document.emit('shopify:section:unload',{target:f.root});
assert.equal(f.panel.open,false,'Section unload closes active modal');
f.launch.isConnected=false;const focusBefore=f.launch.focusCount;f.panel.emit('close');
assert.equal(f.launch.focusCount,focusBefore,'Removed launcher is not focused');
const unsupported=fixture(false);
assert.equal(unsupported.launch.hidden,true);
assert.equal(unsupported.launch.count('click'),0);
console.log('Welcome lifecycle checks passed: editor binding, supported-dialog fallback, active-modal guard, backdrop/interior/provider clicks, unload and focus cleanup. Native provider behavior remains unverified.');
