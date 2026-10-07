const products = {
  bergamot: {name:'Bergamot & Lime',pack:'NATURAL DEODORANT / 1 × 76 g',price:23.99,lead:'Bright bergamot. Fresh lime. A quiet cedarwood finish.',shipping:'Canada shipping: $1.50 for a single tube.',images:['framed/gallery-pack.svg','framed/metal-tube.svg','framed/open-box.svg','cream-texture-retouched-v1.jpg','hand-held.png','turntable-pack.jpg'],open:'framed/open-box.svg',scentTitle:'Bright citrus.\nClean finish.',scentDescription:'Bergamot and lime bring the brightness. Cedarwood adds a quiet woody finish underneath.',notes:['Bergamot','Lime','Cedarwood'],scentFine:'Scented with essential oils. No synthetic fragrance.',weight:'76 g',applications:'≈ 304',cost:'≈ 7.9¢',handle:'bpm-natural-deodorant-bergamot-lime',quote:'“Texture is silky and smooth and absorbed quickly into my skin without leaving a sticky or oily residue.”',author:'Sima Q. / Bergamot & Lime customer review'},
  unscented: {name:'Unscented',pack:'NATURAL DEODORANT / 1 × 76 g',price:23.99,lead:'Clean. Quiet. Nothing extra.',shipping:'Canada shipping: $1.50 for a single tube.',images:['framed/unscented-pack.svg','framed/metal-tube.svg','framed/unscented-open-box.svg','cream-texture-retouched-v1.jpg','hand-held.png','turntable-tube.jpg'],open:'framed/unscented-open-box.svg',scentTitle:'Quiet on\npurpose.',scentDescription:'No added essential oils. No masking fragrance. Base ingredients chosen to keep their natural scent as minimal as possible.',notes:['No added fragrance','Same daily ritual'],scentFine:'For a routine that leaves the fragrance choice to you.',weight:'76 g',applications:'≈ 304',cost:'≈ 7.9¢',handle:'bpm-natural-deodorant-unscented',quote:'“Good deodorant. Works well. Doesn’t clash with my colognes.”',author:'Scottus / Unscented customer review on BPM'},
  duo: {name:'Side A / Side B',pack:'THE TWO-TRACK / 2 × 76 g',price:39.99,lead:'One bright citrus. One unscented. Choose your side.',shipping:'Free shipping across Canada for this duo.',images:['framed/duo-pack.svg','framed/duo-open-box.svg','hand-held.png','cream-texture-retouched-v1.jpg','turntable-pack.jpg','turntable-tube.jpg'],open:'framed/duo-open-box.svg',scentTitle:'Two tracks.\nYour call.',scentDescription:'One Bergamot & Lime. One Unscented. Try both sides of BPM, or switch things up from day to day.',notes:['1 × Bergamot & Lime','1 × Unscented'],scentFine:'The same smooth application and baking-soda-free formula, in two scent options.',weight:'2 × 76 g',applications:'≈ 608',cost:'≈ 6.6¢',handle:'side-a-side-b',quote:'“When I’m out, I’m buying more.”',author:'Scottus / Side A / Side B customer review'}
};
for(const item of window.BPM_CATALOGUE||[]){
 if(products[item.key])continue;
 const template=products[item.citrus&&item.unscented?'duo':item.citrus?'bergamot':'unscented'];
 const count=item.count;
 products[item.key]={...template,name:item.name,pack:(count===2?'THE TWO-TRACK':'THE FOUR COUNT')+' / '+count+' × 76 g',price:item.price,lead:item.mix+'. '+count+' tubes, your way.',shipping:'Free shipping across Canada for this bundle.',images:['framed/'+item.handle+'-0.svg','framed/'+item.handle+'-1.svg',...item.images.slice(2),'cream-texture-retouched-v1.jpg','hand-held.png','turntable-pack.jpg'],open:'framed/'+item.handle+'-1.svg',weight:count+' × 76 g',applications:'≈ '+count*304,cost:'≈ '+(100*item.price/(count*304)).toFixed(1)+'¢',handle:item.handle};
}
const key = Object.hasOwn(products,new URLSearchParams(location.search).get('product')) ? new URLSearchParams(location.search).get('product') : 'bergamot';
const product = products[key];
const byId = id => document.getElementById(id);
const money = n => '$'+n.toFixed(2);
document.title = product.name+' — BPM';
document.querySelectorAll('[data-name]').forEach(el=>el.textContent=product.name);
byId('product-name').textContent=product.name;
byId('pack-label').textContent=product.pack;
byId('scent-lead').textContent=product.lead;
byId('price').textContent=money(product.price);
document.querySelector('[data-once]').textContent=money(product.price);
byId('shipping').textContent=product.shipping;
document.querySelector('[data-card="'+key+'"]')?.setAttribute('data-current','true');
const catalogueItem=window.BPM_CATALOGUE.find(x=>x.key===key);
const packCount=catalogueItem?.count||1;
const scentChoices=document.querySelector('.scent-controls .choices');
scentChoices.replaceChildren();
document.querySelector('.scent-controls .label').textContent=packCount===1?'Choose your scent':'Choose your '+packCount+'-pack mix';
window.BPM_CATALOGUE.filter(item=>item.count===packCount).forEach(item=>{
 const choice=document.createElement('a');
 choice.href='?product='+encodeURIComponent(item.key);choice.dataset.choice=item.key;
 choice.textContent=packCount===1?item.name:item.citrus&&item.unscented?item.citrus+' citrus + '+item.unscented+' unscented':item.citrus?packCount+' × Bergamot & Lime':packCount+' × Unscented';
 choice.setAttribute('aria-label',item.name+', '+packCount+' tubes');
 if(item.key===key)choice.setAttribute('aria-current','page');
 scentChoices.append(choice);
});
if(catalogueItem?.count>1) byId('purchase-plans').hidden=true;
byId('source-product-copy').innerHTML=catalogueItem?.body||'';
byId('open-box').src=product.open;
byId('open-box').alt=product.name+' original packaging shown open';
byId('scent-title').innerText=product.scentTitle;
byId('scent-description').textContent=product.scentDescription;
product.notes.forEach(note=>{const el=document.createElement('span');el.textContent=note;byId('scent-notes').append(el);});
byId('scent-fine').textContent=product.scentFine;
byId('value-weight').textContent=product.weight;
byId('value-apps').textContent=product.applications;
byId('value-cost').textContent=product.cost;
const hasSourceReview=['bergamot','unscented','duo'].includes(key);
byId('review-quote').hidden=!hasSourceReview;byId('review-author').hidden=!hasSourceReview;byId('review-empty').hidden=hasSourceReview;
byId('review-quote').textContent=product.quote;
byId('review-author').textContent=product.author;
byId('live-reviews').href='https://bpmdeodorant.com/products/'+product.handle+'#judgeme_product_reviews';
byId('write-review').href=byId('live-reviews').href;
const base='caprylic/capric triglyceride, tapioca starch, magnesium hydroxide, helianthus annuus (sunflower) seed oil, kaolin, stearic acid, cetearyl olivate, sorbitan olivate, cetearyl alcohol, zinc ricinoleate, tocopherol';
const oils=', citrus aurantium bergamia (bergamot) peel oil, citrus aurantifolia (lime) oil, cedrus atlantica bark oil, limonene*, linalool*, citral*';
function inci(label,value,foot){const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label;p.append(strong,document.createTextNode(' '+value));byId('inci-copy').append(p);if(foot){const note=document.createElement('p');note.textContent='*Naturally occurring in essential oils.';byId('inci-copy').append(note);}}
if(!catalogueItem?.citrus) inci('Unscented:',base,false);
else if(catalogueItem?.unscented){inci('Bergamot & Lime:',base+oils,true);inci('Unscented:',base,false);}
else inci('Bergamot & Lime:',base+oils,true);
const media=[...product.images.map((src,i)=>({src,type:'image',label:i===0?product.name+' packaging':src.includes('-1.svg')?product.name+' open packaging':src.includes('open-box')?product.name+' open packaging':src.includes('pack.svg')?product.name+' packaging':src.includes('metal-tube')?'Metal tube detail':src.includes('cream-texture')?'Cream texture':src.includes('hand-held')?'Product in hand':'BPM lifestyle'})),{src:'application-poster.jpg',type:'video',label:'Play application video'}];
function selectMedia(index){const item=media[index];const video=byId('gallery-video');video.pause();video.hidden=item.type!=='video';byId('gallery-image').hidden=item.type==='video';if(item.type==='image'){byId('gallery-image').src=item.src;byId('gallery-image').alt=item.label;}byId('image-count').textContent=(index+1)+' / '+media.length;document.querySelectorAll('.thumb').forEach((el,i)=>el.setAttribute('aria-pressed',String(i===index)));}
media.forEach((item,i)=>{const button=document.createElement('button');button.className='thumb';button.setAttribute('aria-label',item.label);button.setAttribute('aria-pressed','false');const img=document.createElement('img');img.src=item.src;img.alt='';button.append(img);if(item.type==='video'){const play=document.createElement('span');play.className='play';play.textContent='▶';play.setAttribute('aria-hidden','true');button.append(play);}button.addEventListener('click',()=>selectMedia(i));byId('thumbs').append(button);});selectMedia(0);
let quantity=1;
function updateQuantity(amount){quantity=Math.max(1,Math.min(99,quantity+amount));byId('quantity').textContent=quantity;byId('minus').disabled=quantity===1;}
byId('minus').addEventListener('click',()=>updateQuantity(-1));byId('plus').addEventListener('click',()=>updateQuantity(1));updateQuantity(0);
function selectedPrice(){return catalogueItem?.count===1&&document.querySelector('input[name="plan"]:checked').value==='subscribe'?21.60:product.price;}
document.querySelectorAll('input[name="plan"]').forEach(input=>input.addEventListener('change',()=>{byId('price').textContent=money(selectedPrice());byId('subscription-note').hidden=input.value!=='subscribe';}));
document.querySelectorAll('.add-bag').forEach(button=>button.addEventListener('click',()=>{const plan=catalogueItem?.count===1?document.querySelector('input[name="plan"]:checked').value:'once';BPMBag.add(key,product.name,selectedPrice(),quantity,plan);byId('bag-content').textContent=quantity+' × '+product.name+' added to your preview bag.';byId('status').textContent=quantity+' added to your preview bag.';byId('bag-dialog').showModal();}));
byId('close-bag').addEventListener('click',()=>byId('bag-dialog').close());byId('keep-looking').addEventListener('click',()=>byId('bag-dialog').close());
