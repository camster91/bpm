window.BPM_REVIEW_PATHS={"bergamot": "/product-media/preview.html?product=bergamot", "unscented": "/product-media/preview.html?product=unscented", "duo": "/product-media/preview.html?product=duo", "citrus-repeat": "/product-media/preview.html?product=citrus-repeat", "silent-repeat": "/product-media/preview.html?product=silent-repeat", "3-4-time": "/product-media/preview.html?product=3-4-time", "silent-on-repeat-family-pack-4-tube-unscented-deodorant-bundle": "/product-media/preview.html?product=silent-on-repeat-family-pack-4-tube-unscented-deodorant-bundle", "citrus-on-repeat-family-pack-4-tube-bergamot-lime-deodorant-bundle": "/product-media/preview.html?product=citrus-on-repeat-family-pack-4-tube-bergamot-lime-deodorant-bundle", "four-on-the-floor-mixed-scent-4-tube-deodorant-bundle": "/product-media/preview.html?product=four-on-the-floor-mixed-scent-4-tube-deodorant-bundle", "home": "/", "shop": "/shop.html", "about": "/about.html", "indigenous": "/indigenous-owned.html", "breakdown": "/breakdown.html", "contact": "/contact.html", "policies": "/policies.html", "bag": "/bag.html", "review": "/review.html", "article-0": "/articles/underarm-skin-care-ingredients.html", "article-1": "/articles/the-name-behind-bpm-indigenous-ownership-and-finding-my-way-back.html", "article-2": "/articles/the-math-behind-fair-pricing-bpm-vs-native-vs-schmidts.html", "article-3": "/articles/deodorant-is-changing-shape-heres-why-we-chose-cream.html", "article-4": "/articles/whats-changing-in-deodorant-packaging-right-now-and-why-we-went-with-metal.html", "article-5": "/articles/how-to-switch-to-natural-deodorant-without-the-awkward-transition-period.html", "article-6": "/articles/best-natural-deodorant-for-sensitive-skin-what-to-look-for-and-what-to-avoid.html", "article-7": "/articles/is-baking-soda-bad-for-sensitive-skin-what-you-need-to-know.html", "policy-refund": "/policies/refund.html", "policy-shipping": "/policies/shipping.html", "policy-privacy": "/policies/privacy.html", "policy-terms": "/policies/terms.html", "policy-subscription": "/policies/subscription.html", "policy-legal": "/policies/legal.html", "policy-contact-information": "/policies/contact-information.html"};
// Preview-only shopping state, shared across pages. No checkout or external submission.
window.BPMBag={read(){try{const a=JSON.parse(localStorage.getItem('bpm-review-bag')||'[]');return Array.isArray(a)?a.filter(x=>x&&typeof x.key==='string'&&Number.isInteger(x.qty)&&x.qty>0&&Number.isFinite(x.price)&&x.price>=0).slice(0,40):[]}catch{return []}},write(a){try{localStorage.setItem('bpm-review-bag',JSON.stringify(a))}catch{}this.update()},add(key,name,price,qty,plan){const a=this.read();const match=a.find(x=>x.key===key&&x.plan===plan);if(match)match.qty+=qty;else a.push({key,name,price,qty,plan});this.write(a)},update(){const el=document.getElementById('site-bag-count');if(el)el.textContent=this.read().reduce((n,x)=>n+x.qty,0)}};
BPMBag.update();
const menu=document.querySelector('.menu-toggle'),mobile=document.getElementById('mobile-menu');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mobile.hidden=!open});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile&&!mobile.hidden){mobile.hidden=true;menu.setAttribute('aria-expanded','false');menu.focus()}});
document.querySelectorAll('.desktop-nav a').forEach(a=>{if(a.pathname===location.pathname)a.setAttribute('aria-current','page')});
document.querySelectorAll('.preview-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();form.querySelector('[role=status]').textContent='Preview complete. Nothing was sent or subscribed. Please leave design feedback using Review & comment.'}));
const search=document.getElementById('catalogue-search');if(search){let filter=new URLSearchParams(location.search).get('pack')||'all';if(!['all','1','2','4'].includes(filter))filter='all';function refresh(){let count=0;document.querySelectorAll('.track-card').forEach(card=>{const show=(filter==='all'||card.dataset.pack===filter)&&card.dataset.search.includes(search.value.trim().toLowerCase());card.hidden=!show;if(show)count++});document.getElementById('catalogue-count').textContent=count+' '+(count===1?'track':'tracks');document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)))}document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;refresh()}));search.addEventListener('input',refresh);refresh()}
const lines=document.getElementById('cart-lines');if(lines){fetch('/catalogue.json').then(r=>r.json()).then(catalogue=>{function render(){lines.replaceChildren();let total=0;const bag=BPMBag.read();if(!bag.length){const p=document.createElement('p');p.textContent='Your rotation is empty. Find your first track in the shop.';lines.append(p)}bag.forEach((x,i)=>{total+=x.qty*x.price;const item=catalogue.find(p=>p.key===x.key);if(!item)return;const article=document.createElement('article');article.className='cart-line';const pack=document.createElement('div');pack.className='pack-line count-'+item.count;for(let n=0;n<item.count;n++){const img=document.createElement('img');img.src='/product-media/framed/'+(n<item.citrus?'gallery-pack':'unscented-pack')+'.svg';img.alt='';pack.append(img)}const info=document.createElement('div'),link=document.createElement('a'),h3=document.createElement('h3');link.href='/product-media/preview.html?product='+encodeURIComponent(x.key);link.textContent=x.name;h3.append(link);const p=document.createElement('p');p.textContent='$'+x.price.toFixed(2)+' CAD / '+(x.plan==='subscribe'?'Subscription preview':'One-time purchase');const controls=document.createElement('div');controls.className='cart-controls';for(const [label,delta] of [['−',-1],['+',1],['Remove',null]]){const b=document.createElement('button');b.textContent=label;b.setAttribute('aria-label',label==='Remove'?'Remove '+x.name:(delta===1?'Increase ':'Decrease ')+x.name+' quantity');b.addEventListener('click',()=>{const a=BPMBag.read();if(delta===null||a[i].qty+delta<=0)a.splice(i,1);else a[i].qty+=delta;BPMBag.write(a);render()});controls.append(b);if(delta===-1){const q=document.createElement('span');q.textContent=x.qty;controls.append(q)}}info.append(h3,p,controls);article.append(pack,info);lines.append(article)});document.getElementById('cart-total').textContent='$'+total.toFixed(2)+' CAD'}render()}).catch(()=>{lines.textContent='Bag preview is unavailable. Please reload.'});document.getElementById('preview-checkout').addEventListener('click',()=>document.getElementById('checkout-status').textContent='Checkout connects in Shopify after approval. This review does not collect payment or place orders.')}

// A shared motion rhythm: readable content first, one entrance per section.
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const sections=[...document.querySelectorAll('main > section')];
 let observer;
 function setup(){
  observer?.disconnect();
  sections.forEach(section=>section.classList.remove('motion-scene','motion-entered','motion-active'));
  if(preference.matches||!('IntersectionObserver' in window))return;
  sections.forEach((section,index)=>{
   section.classList.add('motion-scene');
   section.style.setProperty('--motion-turn',index%2?'2deg':'-2deg');
   section.querySelectorAll('.track-card,.creator-slot,.customer-quote,.benefit-grid > article,.bundle-spotlight,.editorial-card,.principle-grid > article,.ingredient-list > p,.value-list > article,.pricing-notes > div').forEach((card,i)=>{card.classList.add('motion-item');card.style.setProperty('--motion-delay',`${Math.min(i,5)*85}ms`)});
  });
  observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
   target.classList.toggle('motion-active',isIntersecting);
   if(isIntersecting)target.classList.add('motion-entered');
  }),{threshold:0,rootMargin:'0px 0px -8% 0px'});
  sections.forEach(section=>observer.observe(section));
 }
 setup();preference.addEventListener('change',setup);
 document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{
  if(!detail.open||preference.matches)return;
  [...detail.children].filter(child=>child.tagName!=='SUMMARY').forEach(child=>child.animate([{opacity:.4,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'}));
 }));
})();

// Email-offer design preview. Email stays in the form; nothing is sent or stored.
(() => {
 const launch=document.createElement('button');
 launch.type='button';launch.className='signup-launch';launch.setAttribute('aria-haspopup','dialog');launch.setAttribute('aria-controls','signup-offer');
 launch.innerHTML='<span aria-hidden="true">✦</span> Get 10% off';
 const panel=document.createElement('dialog');panel.id='signup-offer';panel.setAttribute('aria-labelledby','signup-title');
 panel.innerHTML='<button type="button" class="signup-close" aria-label="Close email offer">×</button><div class="signup-art" aria-hidden="true"><span>10%</span><b>✦</b></div><div class="signup-content"><p class="eyebrow">A LITTLE SOMETHING FOR YOUR FIRST TRACK</p><h2 id="signup-title">Good things.<br>On beat.</h2><p>Join the BPM email list for 10% off, scent drops and the occasional good thing.</p><form id="signup-offer-form"><label for="signup-email">Your email, on beat</label><input id="signup-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required><label class="signup-consent"><input name="consent" type="checkbox" required><span>Email me BPM updates and offers. I can unsubscribe anytime.</span></label><button class="button dark" type="submit">Put me in the mix <span aria-hidden="true">→</span></button><p class="signup-fine">Design preview — no subscription or real discount is created. <a href="/policies/privacy.html">Privacy</a></p></form><div id="signup-success" hidden tabindex="-1" role="status"><h3>You’re in the mix.</h3><p>Your 10% welcome offer will arrive by email on the final store.</p><div class="signup-sample"><span>PREVIEW CODE</span><strong>BPM10-DEMO</strong></div><p class="signup-fine">Demo only. Nothing was sent, saved or subscribed.</p><a class="button dark" href="/shop.html">Find your first track <span aria-hidden="true">→</span></a></div></div>';
 document.body.append(launch,panel);
 launch.addEventListener('click',()=>panel.showModal());
 panel.querySelector('.signup-close').addEventListener('click',()=>panel.close());
 panel.addEventListener('close',()=>launch.focus());
 panel.querySelector('form').addEventListener('submit',event=>{
  event.preventDefault();panel.querySelector('form').hidden=true;
  panel.querySelector('#signup-email').value='';
  const success=panel.querySelector('#signup-success');success.hidden=false;success.focus();
  launch.innerHTML='<span aria-hidden="true">✦</span> In the mix';
 });
})();

// Scroll-linked carton turns: update only visible products, one frame at a time.
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const products=[...document.querySelectorAll('.track-image .pack-line.count-1,.tube-detail img')];
 const visible=new Set();let observer,frame;
 function update(){frame=null;if(preference.matches)return;
  const turns=[...visible].map(el=>{const rect=el.parentElement.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));return[el,(progress-.5)*24]});
  turns.forEach(([el,angle])=>el.style.setProperty('--scroll-turn',angle.toFixed(2)+'deg'));
 }
 function schedule(){if(!frame&&!preference.matches)frame=requestAnimationFrame(update)}
 function setup(){observer?.disconnect();visible.clear();cancelAnimationFrame(frame);frame=null;
  products.forEach(el=>{el.classList.remove('scroll-product');el.style.removeProperty('--scroll-turn')});
  if(preference.matches||!('IntersectionObserver' in window))return;
  products.forEach(el=>el.classList.add('scroll-product'));
  observer=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(isIntersecting)visible.add(target);else visible.delete(target)});schedule()},{rootMargin:'80px 0px'});
  products.forEach(el=>observer.observe(el));
 }
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);preference.addEventListener('change',setup);setup();
})();

// Grouped cartons orbit individually in perspective; the card and copy stay still.
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const groups=[...document.querySelectorAll('.track-image .pack-line.count-2,.track-image .pack-line.count-4,.bundle-spotlight .pack-line')];
 const visible=new Set();let observer,frame;
 function update(){
  frame=null;if(preference.matches)return;
  const positions=[...visible].map(group=>{
   const rect=group.getBoundingClientRect(),card=group.closest('.track-image,.bundle-spotlight').getBoundingClientRect();
   const progress=Math.max(0,Math.min(1,(innerHeight-card.top)/(innerHeight+card.height)));
   const phase=(progress-.5)*Math.PI*2;
   return{group,width:rect.width,height:rect.height,phase};
  });
  positions.forEach(({group,width,height,phase})=>{
   [...group.children].forEach((img,i,items)=>{
    const angle=phase+i*Math.PI*2/items.length;
    const depth=Math.sin(angle);
    const x=Math.cos(angle)*width*.32,y=depth*height*.10,z=depth*Math.min(width*.15,70);
    img.style.transform=`translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateY(${(-depth*12).toFixed(2)}deg)`;
   });
  });
 }
 function schedule(){if(!frame&&!preference.matches)frame=requestAnimationFrame(update)}
 function setup(){
  observer?.disconnect();visible.clear();cancelAnimationFrame(frame);frame=null;
  groups.forEach(group=>{group.classList.remove('orbital-pack');[...group.children].forEach(img=>img.style.removeProperty('transform'))});
  if(preference.matches||!('IntersectionObserver' in window))return;
  groups.forEach(group=>group.classList.add('orbital-pack'));
  observer=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(isIntersecting)visible.add(target);else visible.delete(target)});schedule()},{rootMargin:'100px 0px'});
  groups.forEach(group=>observer.observe(group));
 }
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);preference.addEventListener('change',setup);setup();
})();
