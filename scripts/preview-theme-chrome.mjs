import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, symlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { Liquid } from 'liquidjs';

const theme = resolve(import.meta.dirname, '../theme');
const output = resolve(process.argv[2] || '/tmp/bpm-chrome-preview');
await mkdir(output, { recursive: true });
await symlink(join(theme, 'assets'), join(output, 'assets')).catch(error => { if (error.code !== 'EEXIST') throw error; });
const styles = [];
const clean = text => text.replace(/{%\s*layout[^%]*%}/g, '').replace(/{%\s*form\s+'storefront_password'[^%]*%}/g, '<form method="post" action="/local-fixture-password">').replace(/{%\s*form\s+'product'[^%]*%}/g, '<form class="bpm-product-form" method="post" action="/local-fixture-product">').replace(/{%\s*form\s+'localization'[^%]*%}/g, '<form class="bpm-localization" method="post" action="/local-fixture-localization">').replace(/{%\s*form\s+'contact'[^%]*%}/g, '<form class="preview-form bpm-contact-form" method="post" action="/local-fixture-contact">').replace(/{%\s*form[^%]*%}/g, '<form class="preview-form" method="post" action="/local-fixture-newsletter">').replace(/{%\s*endform\s*%}/g, '</form>').replace(/{%\s*paginate[^%]*%}/g, '').replace(/{%\s*endpaginate\s*%}/g, '').replace(/{%\s*(schema|doc)\s*%}[\s\S]*?{%\s*end\1\s*%}/g, '').replace(/{%\s*stylesheet\s*%}([\s\S]*?){%\s*endstylesheet\s*%}/g, (_, css) => { styles.push(css); return ''; });
for (const name of ['bpm-navigation', 'bpm-product-card', 'bpm-sites-links', 'bpm-sites-card', 'bpm-sites-article-card', 'bpm-sites-filters', 'bpm-sites-catalogue-card', 'bpm-sites-media', 'bpm-app-blocks', 'bpm-localization','bpm-sites-collection-card','bpm-sites-pack-art','bpm-sites-gallery-art','bpm-meta-tags','bpm-structured-data','bpm-motion-toggle']) await writeFile(join(output, `${name}.liquid`), clean(await readFile(join(theme, 'snippets', `${name}.liquid`), 'utf8')));
// Explicit local-only substitute for Shopify's native app-block renderer.
const localAppRenderer=join(output,'bpm-app-blocks.liquid');
await writeFile(localAppRenderer,(await readFile(localAppRenderer,'utf8')).replace(/{% render block %}/g,'{{ block.fixture_html }}'));
const engine = new Liquid({ root: output, extname: '.liquid' });
const locale = JSON.parse(await readFile(join(theme, 'locales/en.default.json'), 'utf8'));
// Local fixture HTML stands in for Shopify's native rich-text serializer.
engine.registerFilter('metafield_tag', field => `<div class="metafield-rich_text_field">${field.fixtureHtml}</div>`);
engine.registerFilter('video_tag', () => '<video controls playsinline preload="none" aria-label="Local video binding fixture"></video>');
engine.registerFilter('format_code', value => String(value).replace(/(.{4})/g, '$1 ').trim());
engine.registerFilter('shopify_asset_url', value => `/shopify-native/${value}`);
const assetVersions=Object.fromEntries(await Promise.all(['bpm-base.css','bpm-sites.css','bpm-chrome.js','bpm-product.js','bpm-product.css','bpm-motion.js'].map(async name=>[name,createHash('sha256').update(await readFile(join(theme,'assets',name))).digest('hex').slice(0,12)])));
engine.registerFilter('asset_url', value => `/assets/${value}${assetVersions[value]?'?v='+assetVersions[value]:''}`);
engine.registerFilter('stylesheet_tag', value => `<link rel="stylesheet" href="${value}">`);
engine.registerFilter('money', value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value / 100));
engine.registerFilter('money_with_currency', value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value / 100) + ' CAD');
engine.registerFilter('structured_data', value => JSON.stringify({fixture_only:true, fixture_resource_id:value.id, fixture_kind:value.fixture_kind || 'resource'}));
engine.registerFilter('image_url', (value,...pairs) => {const params=Object.fromEntries(pairs.filter(Array.isArray));if(!value.fixture_resize)return value.src;const [path,query='']=value.src.split('?');const search=new URLSearchParams(query);for(const [key,param] of Object.entries(params))search.set(key,param);return path+'?'+search.toString();});
engine.registerFilter('image_tag', (src, ...pairs) => { const props = Object.fromEntries(pairs.filter(Array.isArray)); const alt = String(props.alt || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); return `<img src="${src}" alt="${alt}" width="4096" height="4096" loading="${props.loading || 'lazy'}"${props.fetchpriority?' fetchpriority="'+props.fetchpriority+'"':''}>`; });
engine.registerFilter('handle', value => String(value).toLowerCase().replace(/[^a-z0-9-]/g, '-'));
engine.registerFilter('t', (key, ...pairs) => {
  const value = key.split('.').reduce((obj, part) => obj?.[part], locale);
  if (typeof value !== 'string') throw new Error(`Missing translation: ${key}`);
  const params = Object.fromEntries(pairs.filter(Array.isArray));
  return value.replace(/{{\s*(\w+)\s*}}/g, (_, key) => params[key] ?? '');
});
const settings = {};
for (const group of JSON.parse(await readFile(join(theme, 'config/settings_schema.json'), 'utf8'))) {
  for (const field of group.settings || []) if (field.id) settings[field.id] = field.default;
}
const menu = { links: [{ title: 'Home', url: '/' }, { title: 'Shop', url: '/collections/all' }, { title: 'About Us', url: '/pages/about-us' }, { title: 'Contact Us', url: '/pages/contact' }] };
const thumbnailFixtures={};
for(const record of JSON.parse(await readFile(resolve(theme,'../docs/source-gallery-art-provenance.json'),'utf8'))){const svg=await readFile(resolve(theme,'..',record.asset),'utf8');const [width,height]=svg.match(/<image[^>]*width="(\d+)"[^>]*height="(\d+)"/).slice(1).map(Number);thumbnailFixtures[decodeURIComponent(new URL(record.source_url).pathname.split('/').at(-1))]={src:record.source_url,width,height,fixture_resize:true};}
const common = { settings, images:thumbnailFixtures, shop: { name: 'BPM Deodorant', customer_accounts_enabled: true }, routes: { root_url: '/', account_url: '/account', cart_url: '/cart', all_products_collection_url: '/collections/all' }, cart: { item_count: 0, currency: {iso_code: 'CAD'} }, request: { page_type: 'index', locale: { iso_code: 'en' } }, page_title: 'BPM chrome preview', current_page: 1, canonical_url: 'http://127.0.0.1:8892/', content_for_header: '', content_for_layout: '' };
// Resource-picker emulation for local snapshots only; Shopify resolution is not verified.
// Collection membership is a fabricated pack-count fixture, not authenticated native membership.
const mappedProducts=JSON.parse(await readFile(resolve(theme,'../reference-site/src/content/products.json'),'utf8'));
const fixtureResourceBindings=JSON.parse(await readFile(resolve(theme,'../docs/theme-resource-bindings.json'),'utf8'));
const mappedArticles=JSON.parse(await readFile(resolve(theme,'../reference-site/src/content/articles.json'),'utf8'));
function pickerFixture(type, handle) {
 if(typeof handle !== 'string' || !handle) return handle;
 if(type==='product') {const p=mappedProducts.find(p=>p.handle===handle); return p ? {id:p.id,title:p.title+' — fixture',url:'/sites-product.html',price:Math.round(Number(p.variants[0].price)*100),price_varies:false,available:p.variants.some(v=>v.available),featured_image:{src:p.images[0].src}} : null;}
 if(type==='article') {const n=mappedArticles.findIndex(a=>a.url.endsWith('/blogs/'+handle));return n<0?null:{title:mappedArticles[n].title+' — fixture',url:`/sites-article-${n}.html`,published_at:mappedArticles[n].date+'T12:00:00-04:00'};}
 if(type==='blog') return {title:'The Breakdown — fixture',url:'/sites-blog.html'};
 if(type==='page' && handle==='about-us') return {id:705670807924,title:'About — fixture',url:'/sites-about.html'};
 if(type==='collection') return {title:handle+' — fixture',url:'/sites-collection.html',products:fixtureResourceBindings.products.filter(p=>p.pack_count===(handle==='the-two-track-collection'?2:4)).map(p=>pickerFixture('product',p.handle))};
 if(type==='video') return {fixture:true};
 return handle;
}
function pickerSettings(fields, values) {return Object.fromEntries(Object.entries(values).map(([key,value])=>[key,pickerFixture(fields.find(f=>f.id===key)?.type,value)]));}
async function section(name, overrides = {}, blocks = [], context = {}) {
  const source = await readFile(join(theme, 'sections', `${name}.liquid`), 'utf8');
  const schema = JSON.parse(source.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/)[1]);
  const values = Object.fromEntries(schema.settings.filter(field => field.id).map(field => [field.id, field.default]));
  return engine.parseAndRender(clean(source), { ...common, ...context, section: { id: context.preview_section_id || `preview-${name}`, settings: pickerSettings(schema.settings,{ ...values, ...overrides }), blocks: blocks.map(block=>({...block,...(block.type?.startsWith('shopify://apps/')?{type:'@app',fixture_html:block.type.includes('/preview_badge/')?'<p class="fine">MOCK JUDGE.ME BADGE — no live rating or review count.</p>':'<div class="local-review-fixture"><h3>MOCK JUDGE.ME WIDGET</h3><p>Fabricated app output for wrapper layout only. No live review data or app runtime.</p></div>'}:{}),settings:pickerSettings(schema.blocks?.find(b=>b.type===block.type)?.settings || [],block.settings)})) } });
}
const header = await section('bpm-announcement', { text: 'Now Shipping Canada Wide | Hand Made' }) + await section('bpm-header', { menu });
const footer = await section('bpm-footer', { menu });
const hero = await section('bpm-hero', { heading: 'Elevated', accent_heading: 'Protection', final_heading: 'for Every Day.', body: '<p>Clean, dependable protection designed for daily wear, combining skin-safe ingredients with long-lasting freshness you can trust.</p>', button_label: 'Shop Deodorants' });
const lineup = await section('bpm-product-lineup', {}, [{ settings: { product: { title: 'Bergamot + Lime — fixture', url: '/products/fixture-bergamot', price: 1800, available: true, featured_image: {src: '/assets/bpm-footer-bergamot.png'} }, image_treatment: 'figma', background: '#acb228' } }, { settings: { product: { title: 'Unscented — fixture', url: '/products/fixture-unscented', price: 2000, available: false, featured_image: {src: '/assets/bpm-footer-unscented.png'} }, image_treatment: 'figma', background: '#228782' } }]);
const benefits = await section('bpm-benefits', { body: '<p>BPM is for everyone. Whether you’re heading to work, hitting the gym, chasing deadlines, or juggling family life, BPM fits seamlessly into your day.</p>' }, [{ settings: {heading:'Free From Harmful Chemicals', icon:'flask'} }, {settings:{heading:'Skin-Safe Ingredients',icon:'leaf'}}, {settings:{heading:'Long-Lasting Freshness',icon:'fresh'}}]);
const faq = await section('bpm-faq', {}, [
  { settings: { question: 'Is BPM Deodorant aluminum-free?', answer: '<p>Yes. All BPM formulas are 100% aluminum-free and designed to fight odor without blocking your body’s natural sweat process.</p>' } },
  ...['Is BPM safe for sensitive skin?', 'Is BPM vegan and cruelty-free?', 'Does it actually last all day?'].map(question => ({settings:{question, answer:'<p>Draft answer awaiting merchant approval.</p>'}}))
]);
common.content_for_layout = hero + lineup + benefits + faq;
const layout = await readFile(join(theme, 'layout/theme.liquid'), 'utf8');
const code = layout.replace(/{%\s*sections 'header-group'\s*%}/, '{{ preview_header }}').replace(/{%\s*sections 'footer-group'\s*%}/, '{{ preview_footer }}').replace(/{%\s*style\s*%}/g, '<style>').replace(/{%\s*endstyle\s*%}/g, '</style>');
await writeFile(join(output, 'index.html'), (await engine.parseAndRender(code, { ...common, preview_header: header, preview_footer: footer })).replace('</head>', `<style>${styles.join('\n')}</style></head>`));
const isolated = (await engine.parseAndRender(code, { ...common, content_for_layout: benefits + faq, preview_header: '', preview_footer: '', page_title: 'BPM section comparison — draft fixtures' })).replace('</head>', `<style>${styles.join('\n')}</style></head>`);
await writeFile(join(output, 'sections.html'), isolated);
console.log(`Local fabricated-data chrome preview: ${output}/index.html. This does not emulate Shopify commerce or editor APIs.`);
const sitesMenu = {links:[{title:'Shop',url:'/collections/all',current:true},{title:'Our story',url:'/pages/about'},{title:'Indigenous-owned',url:'/pages/indigenous-owned'},{title:'The Breakdown',url:'/blogs/the-breakdown'},{title:'Contact',url:'/pages/contact'}]};
const sitesHeader = await section('bpm-sites-header', {menu:sitesMenu});
const sitesFooter = await section('bpm-sites-footer', {menu:sitesMenu, legal_name:'Fabricated legal entity — local fixture',show_market:false});
const sitesLayout = await engine.parseAndRender(code, {...common, content_for_layout:'<section class="section wrap"><p class="eyebrow">Local theme fixture</p><h1>Sites chrome migration</h1><p>Shared navigation and footer only. Homepage implementation is pending.</p></section>',preview_header:sitesHeader, preview_footer:sitesFooter,page_title:'Sites chrome — local fixture'});
await writeFile(join(output,'sites-chrome.html'), sitesLayout);

const sitesHero = await section('bpm-sites-hero');
const siteCrops = JSON.parse(await readFile(resolve(theme,'../reference-site/src/crop-settings.json'),'utf8'));
for (const [source, name] of [['gallery-pack.png','bergamot'],['unscented-pack.png','unscented']]) {
  const crop = siteCrops.find(value => value.source === source);
  const [sw,sh] = crop.source_dimensions;
  const [x,y,w,h] = crop.crop_xywh;
  const original = await readFile(resolve(theme,'../design-assets/sites',source));
  await writeFile(join(output,`fixture-${name}.svg`),`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}"><image x="0" y="0" width="${sw}" height="${sh}" href="data:image/png;base64,${original.toString('base64')}"/></svg>`);
}
const sitesRhythm = await section('bpm-sites-rhythm',{},['Performance first.','Nothing extra.','A little goes a long way.'].map(text=>({settings:{text}})));
const sitesTracks = await section('bpm-sites-tracks',{},[
 {settings:{product:{title:'Bergamot & Lime — fixture',url:'/products/fixture-bergamot',price:2399,available:true,featured_image:{src:'/fixture-bergamot.svg'}},pack_label:'1 × 76 g',summary:'Bergamot & Lime.',background:'#acb228'}},
 {settings:{product:{title:'Unscented — fixture',url:'/products/fixture-unscented',price:2399,available:true,featured_image:{src:'/fixture-unscented.svg'}},pack_label:'1 × 76 g',summary:'Unscented.',background:'#228782'}}
]);
const sitesTexture = await section('bpm-sites-image-text');
const sitesHome = await engine.parseAndRender(code,{...common,content_for_layout:sitesHero+sitesRhythm+sitesTracks+sitesTexture,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Sites homepage migration — local fixture'});
await writeFile(join(output,'sites-home.html'), sitesHome);

const homeTemplate = JSON.parse(await readFile(join(theme,'templates/index.json'),'utf8'));
let sitesContent = sitesHero + sitesRhythm + sitesTracks + sitesTexture;
for (const id of ['bundles','formula','story','ownership','value','journal','faq','newsletter','closing']) {
 const configured = homeTemplate.sections[id];
 const blocks = (configured.block_order || []).map(key=>configured.blocks[key]);
 const previewBlocks = id === 'bundles' ? blocks.map((block,i)=>({...block,settings:{...block.settings,...Object.fromEntries(Array.from({length:i===0?2:4},(_,n)=>["image_"+(n+1),{src:n<(i===0?1:2)?"/fixture-bergamot.svg":"/fixture-unscented.svg",alt: n<(i===0?1:2)?"Bergamot & Lime carton":"Unscented carton"}])),product:{title:`Bundle ${i+1} — fixture`,url:`/products/fixture-bundle-${i}`,price:i===0?3999:7498,available:true,featured_image:{src:'/fixture-bergamot.svg'}}}})) : id === 'journal' ? blocks.map((block,i)=>({...block,settings:{...block.settings,article:{title:`Article ${i+1} — fixture`,url:`/blogs/fixture/article-${i}`,published_at:'2026-09-26T12:00:00-04:00'}}})) : blocks;
 sitesContent += await section(configured.type,id === 'value' ? {...configured.settings,product:{title:'Single tube — fixture',price:2399,price_varies:false}} : configured.settings,previewBlocks);
}
await writeFile(join(output,'sites-home.html'), await engine.parseAndRender(code,{...common,content_for_layout:sitesContent,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Sites homepage migration — local fixture'}));
const newsletterPreview = await section('bpm-sites-newsletter',{mode:'shopify'});
await writeFile(join(output,'sites-newsletter.html'),await engine.parseAndRender(code,{...common,content_for_layout:'<section class="section wrap"><h1>Local newsletter fixture</h1><p>No provider is connected in this local preview. Do not enter real contact details.</p></section>'+newsletterPreview,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Newsletter fixture'}));
const sourceArticles = JSON.parse(await readFile(resolve(theme,'../reference-site/src/content/articles.json'),'utf8'));
const fixtureArticles = sourceArticles.map((value,i)=>({...value,id:i+1,url:`/sites-article-${i}.html`,published_at:`${value.date}T12:00:00-04:00`}));
const fixtureBlog = {title:'The Breakdown',url:'/sites-blog.html',articles:fixtureArticles};
const artBlocks = fixtureArticles.map((article,i)=>({settings:{article,source_art:i===0?'texture':i===1?'ownership':'story'}}));
const blogBody = await section('bpm-sites-blog',{heading:'The\nBreakdown.'},artBlocks,{blog:fixtureBlog,paginate:{pages:1}});
await writeFile(join(output,'sites-blog.html'),await engine.parseAndRender(code,{...common,content_for_layout:blogBody,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Blog fixture'}));
for (const [i,article] of fixtureArticles.entries()) {
 const articleBody = await section('bpm-sites-article',{},[],{blog:fixtureBlog,article});
 await writeFile(join(output,`sites-article-${i}.html`),await engine.parseAndRender(code,{...common,content_for_layout:articleBody,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:article.title,article,request:{...common.request,page_type:'article'},canonical_url:`http://127.0.0.1:8892/sites-article-${i}.html`}));
}
const fixtureCart = {
 item_count:3,items_subtotal_price:6497,total_price:5997,taxes_included:false,requires_shipping:true,
 cart_level_discount_applications:[{title:'Fabricated cart offer',total_allocated_amount:500}],
 items:[
  {product:{title:'Bergamot & Lime — fixture',has_only_default_variant:true},variant:{title:'Default Title',quantity_rule:{min:1,increment:1,max:null}},quantity:2,url:'/sites-cart.html',url_to_remove:'/local-fixture-cart/change?id=42%3Aone-time&quantity=0',image:{src:'/fixture-bergamot.svg'},original_line_price:4798,final_line_price:4498,properties:{'Gift message':'A small daily upgrade.'},line_level_discount_allocations:[{amount:300,discount_application:{title:'Fabricated line offer'}}]},
  {product:{title:'Unscented — fixture',has_only_default_variant:true},variant:{title:'Default Title',quantity_rule:{min:1,increment:1,max:5}},quantity:1,url:'/sites-cart.html',url_to_remove:'/local-fixture-cart/change?id=43%3Aplan&quantity=0',image:{src:'/fixture-unscented.svg'},original_line_price:1999,final_line_price:1999,selling_plan_allocation:{selling_plan:{name:'Every five months — fixture'}},properties:{},line_level_discount_allocations:[]}
 ]
};
for (const empty of [false,true]) {
 let body = await section('bpm-sites-cart',{},[],{cart:empty?{item_count:0,items:[]}:fixtureCart,routes:{...common.routes,cart_url:'/local-fixture-cart',all_products_collection_url:'/sites-home.html'}});
 const banner = '<div class="wrap"><p>Local cart fixture. No Shopify backend is connected; update, removal and checkout submissions are disabled.</p></div>';
 const cartReview=JSON.parse(await readFile(join(theme,'templates/cart.json'),'utf8')).sections.reviews;
 body+=await section(cartReview.type,cartReview.settings,cartReview.block_order.map(id=>cartReview.blocks[id]),{cart:empty?{item_count:0,items:[]}:fixtureCart});
 const safeBody = body.replace(/(<button[^>]*type="submit")/g,'$1 disabled').replace(/href="\/local-fixture-cart\/change[^\"]*"/g,'aria-disabled="true"');
 const cartHeader = await section('bpm-sites-header',{menu:sitesMenu},[],{cart:empty?{item_count:0}:fixtureCart});
 await writeFile(join(output,empty?'sites-cart-empty.html':'sites-cart.html'),await engine.parseAndRender(code,{...common,cart:empty?{item_count:0}:fixtureCart,content_for_layout:banner+safeBody,preview_header:cartHeader,preview_footer:sitesFooter,page_title:'Cart fixture'}));
}
const sourceProducts = JSON.parse(await readFile(resolve(theme,'../reference-site/src/content/products.json'),'utf8'));
const fixtureComponents = [[2,2],[4,0],[0,4],[3,1],[0,2],[2,0],[1,1],[0,1],[1,0]];
const catalogueProducts = sourceProducts.map((value,i)=>({id:value.id,title:value.title+' — fixture',object_type:'product',url:'/sites-cart-empty.html',price:Math.round(Number(value.variants[0].price)*100),price_varies:false,available:true,featured_image:{src:fixtureComponents[i][0]?'/fixture-bergamot.svg':'/fixture-unscented.svg'}})).reverse();
const catalogueArt = sourceProducts.map((value,i)=>{
 const [citrus,silent] = fixtureComponents[i];
 const components = [...Array(citrus).fill('/fixture-bergamot.svg'),...Array(silent).fill('/fixture-unscented.svg')];
 return {settings:{product:{id:value.id},pack_label:`${components.length} × 76 g`,background:citrus&&silent?'#f3e4b7':citrus?'#acb228':'#228782',...Object.fromEntries(components.map((src,n)=>[n===0?'image':`image_${n+1}`,{src}]))}};
});
const sortOptions = [{value:'manual',name:'Featured'},{value:'price-ascending',name:'Price, low to high'},{value:'price-descending',name:'Price, high to low'}];
const fixtureFilters = [{label:'Pack size',type:'list',active_values:[],values:[1,2,4].map((size,i)=>({param_name:'filter.p.m.custom.pack_size',value:String(size),label:['Solo','Two track','Four count'][i],count:[2,3,4][i],active:false}))},{label:'Price',type:'price_range',range_max:7498,min_value:{param_name:'filter.v.price.gte',value:null},max_value:{param_name:'filter.v.price.lte',value:null},url_to_remove:'/sites-collection.html'}];
const fixtureCatalogue = {title:'All tracks',url:'/sites-collection.html',products:catalogueProducts,products_count:9,sort_by:'manual',default_sort_by:'manual',sort_options:sortOptions,filters:fixtureFilters};
const catalogueBanner = '<div class="wrap"><p>Local catalogue fixture using recovered product data. Filter, sort and search submissions are disabled; no Shopify backend is connected.</p></div>';
const previewCatalogueRoutes = {...common.routes,search_url:'/sites-search.html'};
const rotation = JSON.parse(await readFile(join(theme,'templates/collection.rotation.json'),'utf8')).sections.main.settings;
const catalogueBody = await section('bpm-sites-collection',rotation,catalogueArt,{collection:fixtureCatalogue,routes:previewCatalogueRoutes,paginate:{pages:1}});
await writeFile(join(output,'sites-collection.html'),await engine.parseAndRender(code,{...common,content_for_layout:catalogueBanner+catalogueBody.replace(/(<button[^>]*type="submit")/g,'$1 disabled'),preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Catalogue fixture'}));
const searchFixture = {performed:true,terms:'BPM',results_count:3,results:[catalogueProducts[0],{...fixtureArticles[0],object_type:'article',image:{src:'/assets/bpm-sites-texture.jpg'}},{object_type:'page',title:'Our story — fixture',url:'/sites-blog.html',content:'<p>A fabricated page result for local layout review.</p>'}],sort_by:'manual',default_sort_by:'manual',sort_options:sortOptions,filters:[]};
const searchBody = await section('bpm-sites-search',{},catalogueArt,{search:searchFixture,routes:previewCatalogueRoutes,paginate:{pages:1}});
await writeFile(join(output,'sites-search.html'),await engine.parseAndRender(code,{...common,content_for_layout:catalogueBanner+searchBody.replace(/(<button[^>]*type="submit")/g,'$1 disabled'),preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Search fixture'}));
const purchaseVariant = {id:101,title:'76 g — fixture',available:true,price:2399,requires_shipping:true,quantity_rule:{min:1,increment:1,max:8},selling_plan_allocations:[{price:2160,checkout_charge_amount:2160,per_delivery_price:2160,selling_plan:{id:501,name:'Every five months — fixture',description:'Fabricated subscription terms for local interaction review.'}}],featured_media:{id:10}};
const purchaseProduct = {id:100,title:'Bergamot & Lime — fixture',url:'/sites-product.html',has_only_default_variant:false,requires_selling_plan:false,selected_or_first_available_variant:purchaseVariant,variants:[purchaseVariant,{...purchaseVariant,id:102,title:'Alternate — sold-out fixture',available:false}],media:[{id:10,media_type:'image',src:'/assets/bpm-sites-texture.jpg',preview_image:{src:'/assets/bpm-sites-texture.jpg'},alt:'BPM cream texture'},{id:11,media_type:'image',src:'/assets/bpm-sites-story.jpg',preview_image:{src:'/assets/bpm-sites-story.jpg'},alt:'BPM packaging beside turntable'}],featured_media:{id:10},description:'<p>Local product description fixture. Native product HTML will come from Shopify. This does not verify product claims.</p>'};
purchaseProduct.metafields = {custom:{
 ingredients:{type:'rich_text_field',value:{type:'root',children:[{type:'paragraph'}]},fixtureHtml:'<p><strong>Local fixture ingredients:</strong> Illustrative contents only. Not approved product copy.</p>'},
 how_to_use_title:{value:'Directions — local fixture'},how_to_use:{value:'Fabricated directions for layout testing.\nFabricated safety line retained as a separate line.'},
 whats_inside_description:{type:'rich_text_field',value:{type:'root',children:[{type:'paragraph'}]},fixtureHtml:'<p>Local fixture product-specific notes with <strong>rich formatting</strong>.</p>'},
 shipping:{value:'Local fixture shipping note.\nCurrent policy remains the authoritative source.'}
}};
let purchaseBody = await section('bpm-sites-product',{image:{src:'/fixture-bergamot.svg'},pack_label:'1 × 76 g',intro:'Bright citrus + quiet cedarwood.',show_description:false,fact_1:'Fabricated quick fact for local layout review.',jump_menu:{links:[{url:'#ProductFormula-100',title:'Ingredients'},{url:'#creator-stories-preview-bpm-sites-pdp-creators',title:'Creator stories'}]}},[],{product:purchaseProduct,cart:{taxes_included:false},form:{}});
const duoArt = await Promise.all(['bergamot','unscented'].map(name=>readFile(join(output,`fixture-${name}.svg`))));
await writeFile(join(output,'fixture-duo.svg'),`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="700" viewBox="0 0 800 700"><image x="50" y="0" width="330" height="700" href="data:image/svg+xml;base64,${duoArt[0].toString('base64')}"/><image x="420" y="0" width="330" height="700" href="data:image/svg+xml;base64,${duoArt[1].toString('base64')}"/></svg>`);
const pdpTemplate = JSON.parse(await readFile(join(theme,'templates/product.json'),'utf8'));
for (const id of ['essentials','benefits','application','scent','formula','value','lifestyle','compare','reviews','creators','faq','notes','closing']) {
 const configured = pdpTemplate.sections[id];
 const blocks = (configured.block_order||[]).map(key=>configured.blocks[key]);
 const fixtureOverrides = id === 'reviews' ? {heading:'Review integration — local fixture',featured_approved:true,quote:'Fabricated quote used only for layout testing.',author:'Local fixture attribution',source:'/sites-blog.html'} : id === 'creators' ? {heading:'Creator story — local fixture'} : id === 'value' ? {pack:'76 g',applications:304} : id === 'lifestyle' ? {page:{url:'/sites-blog.html'}} : id === 'scent' ? {heading:'Bright citrus.\nClean finish.',intro:'Bergamot and lime bring the brightness. Cedarwood adds a quiet woody finish underneath.',fine:'Scented with essential oils. No synthetic fragrance.',image:{src:'https://cdn.shopify.com/s/files/1/0960/5778/6740/files/Open_box_BL.png?v=1776721242&width=1600',alt:'Original Bergamot & Lime open packaging'}} : configured.settings;
 const comparisonFixtures = catalogueProducts.filter(value=>[sourceProducts[6].id,sourceProducts[7].id,sourceProducts[8].id].includes(value.id)).map(value=>({settings:{product:value,image:value.id===sourceProducts[6].id?{src:'/fixture-duo.svg'}:value.featured_image,pack:'Fabricated pack label',fragrance:'Fabricated fragrance description',summary:'Local comparison fixture.',background:'#f3e4b7'}}));
 const fixtureBlocks = id === 'creators' ? [{settings:{approved:true,title:'Fabricated story for layout review',creator:'Local fixture attribution',poster:{src:'/assets/bpm-sites-turntable.jpg'},original_url:'/sites-blog.html',transcript:'<p>Fabricated transcript for layout and keyboard testing; no actual creator supplied.</p>',disclosure:'Fabricated disclosure for layout review.'}}] : id === 'compare' ? comparisonFixtures : id === 'scent' ? ['Bergamot','Lime','Cedarwood'].map(note=>({settings:{note}})) : blocks;
 const originalAppFixture = id === 'reviews' ? await readFile(join(output,'bpm-app-blocks.liquid'),'utf8') : null;
 if (id === 'reviews') await writeFile(join(output,'bpm-app-blocks.liquid'),'<div class="local-review-fixture"><p class="eyebrow">FABRICATED APP OUTPUT</p><h3>Review widget layout fixture.</h3><p>This local placeholder tests the wrapper. It is not Judge.me data and does not verify app compatibility.</p></div>');
 try { purchaseBody += await section(configured.type,fixtureOverrides,fixtureBlocks,{product:purchaseProduct}); } finally { if (originalAppFixture !== null) await writeFile(join(output,'bpm-app-blocks.liquid'),originalAppFixture); }
}
const purchaseBanner = '<div class="wrap"><p>Local product fixture. Gallery and plan-price display are interactive. Review output, creator attribution and media bindings are fabricated. Variant, quantity and cart submissions are disabled; no Shopify backend is connected.</p></div>';
const safePurchase = purchaseBody.replace(/(<button[^>]*type="submit")/g,'$1 disabled').replace(/<select id="Variant-/g,'<select disabled id="Variant-');
await writeFile(join(output,'sites-product.html'),await engine.parseAndRender(code,{...common,content_for_layout:purchaseBanner+safePurchase,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Product fixture'}));

for(const [suffix,handle] of [['bergamot-lime','bpm-natural-deodorant-bergamot-lime'],['unscented','bpm-natural-deodorant-unscented']]) {
 const template=JSON.parse(await readFile(join(theme,'templates/product.'+suffix+'.json'),'utf8'));
 const productFixture={...purchaseProduct,...pickerFixture('product',handle),selected_or_first_available_variant:purchaseVariant};
 let body='<p class="wrap fine">Local assigned-product template fixture. Native media, variant and backend resolution are mocked; claims require acceptance. Purchase submissions disabled.</p>';
 for(const key of template.order){const item=template.sections[key];if(item.disabled)continue;body+=await section(item.type,item.settings,(item.block_order||[]).map(id=>item.blocks[id]),{product:productFixture,preview_section_id:suffix+'-'+key,form:{}});}
 body=body.replace(/(<button[^>]*type="submit")/g,'$1 disabled').replace(/<select id="Variant-/g,'<select disabled id="Variant-');
 await writeFile(join(output,'sites-product-'+suffix+'.html'),await engine.parseAndRender(code,{...common,content_for_layout:body,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:suffix+' — local fixture',request:{...common.request,page_type:'product'},canonical_url:'http://127.0.0.1:8892/sites-product-'+suffix+'.html',page_image:productFixture.featured_image,product:productFixture,page_description:'Fabricated local metadata fixture; native Shopify SEO content remains unverified.'}));
}

const bundleProfiles=JSON.parse(await readFile(resolve(theme,'../docs/bundle-product-content-bindings.json'),'utf8')).profiles;
const bundleTemplate=JSON.parse(await readFile(join(theme,'templates/product.json'),'utf8'));
for(const profile of bundleProfiles) {
 const selected=pickerFixture('product',profile.handle);
 const bundleVariant={...purchaseVariant,price:selected.price,selling_plan_allocations:[]};
 const productFixture={...purchaseProduct,...selected,has_only_default_variant:true,variants:[bundleVariant],selected_or_first_available_variant:bundleVariant};
 let body='<p class="wrap fine">Local bundle binding fixture. Native resource and backend resolution mocked; source first artwork restored; native gallery/backend and claims remain unverified. Purchase submissions disabled.</p>';
 for(const key of bundleTemplate.order){const item=bundleTemplate.sections[key];if(item.disabled)continue;body+=await section(item.type,item.settings,(item.block_order||[]).map(id=>item.blocks[id]),{product:productFixture,preview_section_id:profile.handle+'-'+key,form:{}});}
 body=body.replace(/(<button[^>]*type="submit")/g,'$1 disabled').replace(/<select id="Variant-/g,'<select disabled id="Variant-');
 await writeFile(join(output,'sites-bundle-'+profile.handle+'.html'),await engine.parseAndRender(code,{...common,content_for_layout:body,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:profile.handle+' — local fixture',request:{...common.request,page_type:'product'},canonical_url:'http://127.0.0.1:8892/sites-bundle-'+profile.handle+'.html',page_image:productFixture.featured_image,product:productFixture,page_description:'Fabricated local metadata fixture; native Shopify SEO content remains unverified.'}));
}

for (const pageName of ['about','indigenous-owned','contact']) {
 const config=JSON.parse(await readFile(join(theme,`templates/page.${pageName}.json`),'utf8'));
 let body='<div class="wrap"><p>Local '+pageName+' layout fixture. Source claims and merchant bindings remain unverified. Contact submissions are disabled; no Shopify backend is connected.</p></div>';
 for (const id of config.order) {
  const item=config.sections[id]; if(item.disabled) continue;
  body+=await section(item.type,item.settings,(item.block_order||[]).map(key=>item.blocks[key]),{page:{title:pageName+' — fixture'},form:{}});
 }
 body=body.replace(/(<button[^>]*type="submit")/g,'$1 disabled');
 await writeFile(join(output,`sites-${pageName}.html`),await engine.parseAndRender(code,{...common,content_for_layout:body,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:pageName+' — local fixture'}));
}

const defaultPageFixture=JSON.parse(await readFile(join(theme,'templates/page.json'),'utf8'));
for (const fixture of [{name:'about-default',id:705670807924,title:'About Us',content:''},{name:'privacy-default',id:708561764724,title:'Your Privacy Choices',content:'<p>Fabricated native privacy body for isolation review.</p>'}]) {
 let body='<p class="wrap fine">Local default-page assignment fixture; native resource resolution is mocked.</p>';
 for(const key of defaultPageFixture.order){const item=defaultPageFixture.sections[key];if(item.disabled)continue;body+=await section(item.type,item.settings,(item.block_order||[]).map(id=>item.blocks[id]),{page:fixture,preview_section_id:fixture.name+'-'+key});}
 await writeFile(join(output,'sites-'+fixture.name+'.html'),await engine.parseAndRender(code,{...common,content_for_layout:body,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:fixture.title+' — fixture'}));
}

const fixturePolicies = {policies:[{title:'Refund policy — local fixture',url:'/sites-about.html',body:'<p>Fabricated native policy for layout review.</p>'},{title:'Shipping policy — local fixture',url:'/sites-contact.html',body:'<p>Fabricated native policy for layout review.</p>'}]};
const policyConfig=JSON.parse(await readFile(join(theme,'templates/page.policies.json'),'utf8'));
let policiesBody='<div class="wrap"><p>Local policy index fixture. Links and legal body are fabricated; no Shopify policy records changed.</p></div>';
for(const id of policyConfig.order){const item=policyConfig.sections[id];policiesBody+=await section(item.type,item.settings,[],{shop:{...common.shop,...fixturePolicies}});}
await writeFile(join(output,'sites-policies.html'),await engine.parseAndRender(code,{...common,content_for_layout:policiesBody,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Policy index fixture'}));
const countryChoices=[{iso_code:'CA',name:'Canada',currency:{iso_code:'CAD'}},{iso_code:'US',name:'United States',currency:{iso_code:'USD'}}];
const languageChoices=[{iso_code:'en',endonym_name:'English'},{iso_code:'fr',endonym_name:'Français'}];
const marketFixture={available_countries:countryChoices,country:countryChoices[0],available_languages:languageChoices,language:languageChoices[0]};
let marketFooter=await section('bpm-sites-footer',{menu:sitesMenu,show_localization:true,show_market:true},[],{localization:marketFixture});
marketFooter=marketFooter.replace(/(<button[^>]*type="submit")/g,'$1 disabled');
const notFoundBody=await section('bpm-sites-not-found',{},[],{routes:{...common.routes,search_url:'/sites-search.html'}});
await writeFile(join(output,'sites-404.html'),await engine.parseAndRender(code,{...common,content_for_layout:'<div class="wrap"><p>Local 404/market fixture. Market and search submissions are disabled; no Shopify backend is connected.</p></div>'+notFoundBody.replace(/(<button[^>]*type="submit")/g,'$1 disabled'),preview_header:sitesHeader,preview_footer:marketFooter,page_title:'404 fixture'}));
await writeFile(join(output,'sites-policy-body.html'),await engine.parseAndRender(code,{...common,content_for_layout:'<div class="shopify-policy__container"><div class="shopify-policy__title"><h1>Shipping policy — local fixture</h1></div><div class="shopify-policy__body"><p>Fabricated policy body for layout review. Actual legal content will remain in native Shopify policy records.</p><h2>Policy section</h2><p>Fabricated paragraph.</p></div></div>',preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Native policy body fixture'}));

const directoryBody=await section('bpm-sites-collections',{},[],{collections:[{title:'Single tracks — fixture',url:'/sites-collection.html',all_products_count:2,featured_image:{src:'/assets/bpm-sites-texture.jpg'}},{title:'Bundle rotation — fixture',url:'/sites-collection.html',all_products_count:7,featured_image:{src:'/assets/bpm-sites-story.jpg'}},{title:'Text-only collection — fixture',url:'/sites-collection.html',all_products_count:0}],paginate:{pages:1}});
await writeFile(join(output,'sites-collections.html'),await engine.parseAndRender(code,{...common,content_for_layout:'<p class="wrap fine">Local fabricated collection directory. This does not verify actual Shopify collection visibility or pagination.</p>'+directoryBody,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Collections directory fixture'}));

const utilityLayout=(await readFile(join(theme,'layout/bpm-utility.liquid'),'utf8')).replace(/{%\s*style\s*%}/g,'<style>').replace(/{%\s*endstyle\s*%}/g,'</style>');
const passwordBody=await section('bpm-sites-password',{},[],{shop:{...common.shop,password_message:'<p>Fabricated store message for local layout testing.</p>'},form:{}});
await writeFile(join(output,'sites-password.html'),await engine.parseAndRender(utilityLayout,{...common,page_title:'Store access — local fixture',content_for_layout:'<p class="wrap fine">Local password fixture. Submission disabled; no store password is used.</p>'+passwordBody.replace('<button class="button dark" type="submit">','<button class="button dark" type="submit" disabled>')}));
let giftBody=await engine.parseAndRender(clean(await readFile(join(theme,'templates/gift_card.liquid'),'utf8')),{...common,gift_card:{code:'TESTONLY00000000',balance:3500,initial_value:5000,enabled:true,expired:false,expires_on:'2027-01-01T12:00:00-05:00'}});
giftBody=giftBody.replace(/<script src="\/shopify-native\/vendor\/qrcode.js" defer><\/script>/,'');
await writeFile(join(output,'sites-gift-card.html'),await engine.parseAndRender(utilityLayout,{...common,page_title:'Gift card — local fixture',content_for_layout:'<p class="wrap fine">Fabricated gift card. Code has no value. Native QR, Wallet and checkout are not verified.</p>'+giftBody}));

let mappedHomeBody='<p class="wrap fine">Committed resource bindings emulated from recovered snapshots. Historical prices and media are fixtures; actual Shopify resolution is pending.</p>';
for(const id of homeTemplate.order){const config=homeTemplate.sections[id];mappedHomeBody+=await section(config.type,config.settings,(config.block_order||[]).map(key=>config.blocks[key]));}
await writeFile(join(output,'sites-home-bindings.html'),await engine.parseAndRender(code,{...common,content_for_layout:mappedHomeBody,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Bound resources — local fixture'}));
// Hypothetical source-fidelity configuration, not a native page-handle binding.
let sourceSecondaryBody='<p class="wrap fine">Source secondary-link layout fixture only. Destination is fabricated and the independently-verified claim remains unapproved. Committed native binding is unchanged.</p>';
for(const id of homeTemplate.order){const config=homeTemplate.sections[id];const settings=config.type==='bpm-sites-hero'?{...config.settings,secondary_page:{url:'/sites-indigenous-owned.html'},secondary_label:'Indigenous-owned. Independently verified.'}:config.settings;sourceSecondaryBody+=await section(config.type,settings,(config.block_order||[]).map(key=>config.blocks[key]));}
await writeFile(join(output,'sites-home-secondary-link.html'),await engine.parseAndRender(code,{...common,content_for_layout:sourceSecondaryBody,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Unapproved secondary link — local layout fixture'}));


const boundCollection=JSON.parse(await readFile(join(theme,'templates/collection.rotation.json'),'utf8')).sections.main;
const boundCollectionBody=await section(boundCollection.type,boundCollection.settings,boundCollection.block_order.map(key=>boundCollection.blocks[key]),{collection:fixtureCatalogue,routes:previewCatalogueRoutes,paginate:{pages:1}});
await writeFile(join(output,'sites-collection-bindings.html'),await engine.parseAndRender(code,{...common,content_for_layout:'<p class="wrap fine">Committed collection mappings with recovered source cartons. Products, prices, filtering and pagination remain local fixtures.</p>'+boundCollectionBody.replace(/(<button[^>]*type="submit")/g,'$1 disabled'),preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Source carton catalogue fixture'}));

const wholesaleTemplate=JSON.parse(await readFile(join(theme,'templates/page.wholesale.json'),'utf8'));
let wholesaleBody='<p class="wrap fine">Local wholesale migration fixture. Terms are preserved from the September 15, 2026 source sheet and require current owner acceptance.</p>';
for(const key of wholesaleTemplate.order){const config=wholesaleTemplate.sections[key];wholesaleBody+=await section(config.type,config.settings,(config.block_order||[]).map(id=>config.blocks[id]),{page:{title:'Wholesale'},preview_section_id:'wholesale-'+key});}
await writeFile(join(output,'sites-wholesale.html'),await engine.parseAndRender(code,{...common,content_for_layout:wholesaleBody,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:'Wholesale migration fixture'}));

for(const suffix of ['campaign-texture','campaign-300applications']){
 const template=JSON.parse(await readFile(join(theme,'templates/page.'+suffix+'.json'),'utf8'));
 let body='<p class="wrap fine">Local campaign migration fixture. Native media and operational policy are mocked; claims require acceptance.</p>';
 for(const key of template.order){const config=template.sections[key];body+=await section(config.type,config.settings,(config.block_order||[]).map(id=>config.blocks[id]),{page:{title:suffix},preview_section_id:suffix+'-'+key,shop:{...common.shop,shipping_policy:{url:'/sites-policies.html'}}});}
 await writeFile(join(output,'sites-'+suffix+'.html'),await engine.parseAndRender(code,{...common,content_for_layout:body,preview_header:sitesHeader,preview_footer:sitesFooter,page_title:suffix+' fixture'}));
}
const variantTemplate=JSON.parse(await readFile(join(theme,'templates/product.bergamot-lime.json'),'utf8')).sections.main;
const variantFixture={...purchaseProduct,...pickerFixture('product','bpm-natural-deodorant-bergamot-lime'),selected_variant:purchaseVariant};
const variantGallery=await section(variantTemplate.type,variantTemplate.settings,variantTemplate.block_order.map(id=>variantTemplate.blocks[id]),{product:variantFixture,form:{},preview_section_id:'variant-loading'});
await writeFile(join(output,'sites-product-native-variant-loading.html'),await engine.parseAndRender(code,{...common,product:variantFixture,request:{...common.request,page_type:'product'},page_title:'Explicit native variant — local loading fixture',canonical_url:'http://127.0.0.1:8892/sites-product-native-variant-loading.html',preview_header:sitesHeader,preview_footer:sitesFooter,content_for_layout:'<p class="wrap fine">Focused fabricated variant gallery loading fixture. No commerce backend. Native selected variant and image data are mocked.</p>'+variantGallery.replace(/(<button[^>]*type="submit")/g,'$1 disabled').replace(/<select id="Variant-/g,'<select disabled id="Variant-')}));
