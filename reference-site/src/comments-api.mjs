const products=new Set(["bergamot", "unscented", "duo", "citrus-repeat", "silent-repeat", "3-4-time", "silent-on-repeat-family-pack-4-tube-unscented-deodorant-bundle", "citrus-on-repeat-family-pack-4-tube-bergamot-lime-deodorant-bundle", "four-on-the-floor-mixed-scent-4-tube-deodorant-bundle", "home", "shop", "about", "indigenous", "breakdown", "contact", "policies", "bag", "review", "article-0", "article-1", "article-2", "article-3", "article-4", "article-5", "article-6", "article-7", "policy-refund", "policy-shipping", "policy-privacy", "policy-terms", "policy-subscription", "policy-legal", "policy-contact-information"]);
export const sections=["purchase", "benefits", "how-to", "scent-story", "formula", "value", "brand", "compare", "feedback", "faq", "closing", "source-details", "pricing", "opening", "essentials", "tracks", "bundles", "ownership", "journal", "newsletter", "catalogue", "founder", "principles", "values", "mark", "giving", "article", "contact", "policies", "bag", "review", "creator-stories"];
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function commentsAPI(request,env){
 const url=new URL(request.url);
 const identity=request.headers.get('oai-authenticated-user-email');
 if(!identity)return json({error:'Sign in to the review site to leave or read comments.'},401);
 if(!env.DB)return json({error:'Shared comments are unavailable. Please try again later.'},503);
 if(request.method!=='GET' && request.headers.get('Origin')!==url.origin)return json({error:'Request origin does not match.'},403);
 if(!['GET','POST','PATCH'].includes(request.method))return json({error:'Method not supported.'},405);
 let body;
 if(request.method!=='GET'){
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'JSON required.'},415);
  if(Number(request.headers.get('Content-Length')||0)>8192)return json({error:'Comment is too long.'},413);
  const raw=await request.text();if(raw.length>8192)return json({error:'Comment is too long.'},413);
  try{body=JSON.parse(raw)}catch{return json({error:'Invalid comment.'},400)}
  if(!body||typeof body!=='object'||Array.isArray(body))return json({error:'Invalid comment.'},400);
  if(request.method==='POST'&&(!products.has(body.product)||!sections.includes(body.section)||typeof body.text!=='string'||!body.text.trim()||body.text.trim().length>2000||typeof body.name!=='string'||!body.name.trim()||body.name.trim().length>60))return json({error:'Enter your name and a comment of up to 2,000 characters.'},400);
  if(request.method==='POST'&&body.pin!=null&&(typeof body.pin!=='object'||Array.isArray(body.pin)||typeof body.pin.selector!=='string'||body.pin.selector.length>500||!body.pin.selector||!Number.isFinite(body.pin.x)||!Number.isFinite(body.pin.y)||body.pin.x<0||body.pin.x>1||body.pin.y<0||body.pin.y>1))return json({error:'Choose a valid spot on the page.'},400);
  if(request.method==='PATCH'&&(!/^[a-f0-9-]{36}$/i.test(body.id||'')||!['open','addressed'].includes(body.status)))return json({error:'Invalid update.'},400);
 }
 try{
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS review_comments (id TEXT PRIMARY KEY, product TEXT NOT NULL, section TEXT NOT NULL, name TEXT NOT NULL, text TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL)').run();
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS review_pins (comment_id TEXT PRIMARY KEY, anchor TEXT NOT NULL)').run();
  if(request.method==='POST'){
   const c={id:crypto.randomUUID(),product:body.product,section:body.section,name:body.name.trim(),text:body.text.trim(),status:'open',created_at:new Date().toISOString()};
   await env.DB.prepare('INSERT INTO review_comments (id,product,section,name,text,status,created_at) VALUES (?,?,?,?,?,?,?)').bind(c.id,c.product,c.section,c.name,c.text,c.status,c.created_at).run();if(body.pin){c.pin={selector:body.pin.selector,x:body.pin.x,y:body.pin.y};await env.DB.prepare('INSERT INTO review_pins (comment_id,anchor) VALUES (?,?)').bind(c.id,JSON.stringify(c.pin)).run()}return json({comment:c},201);
  }
  if(request.method==='PATCH'){
   const result=await env.DB.prepare('UPDATE review_comments SET status=? WHERE id=?').bind(body.status,body.id).run();
   if(!result.meta?.changes)return json({error:'Comment no longer exists.'},404);
   return json({saved:true});
  }
  const result=await env.DB.prepare('SELECT c.id,c.product,c.section,c.name,c.text,c.status,c.created_at,p.anchor FROM review_comments c LEFT JOIN review_pins p ON p.comment_id=c.id ORDER BY c.created_at DESC LIMIT 500').all();return json({comments:result.results.map(({anchor,...c})=>({...c,...(anchor?{pin:JSON.parse(anchor)}:{})})),limit:500});
 }catch{return json({error:'Comments could not be saved or loaded. Your draft is still here; try again.'},503)}
}
