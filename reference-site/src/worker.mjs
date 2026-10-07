import { commentsAPI } from './comments-api.mjs';
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(url.pathname==='/api/comments')return commentsAPI(request,env);
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not supported',{status:405});
 let path=url.pathname;if(path==='/'){url.pathname='/index.html';return Response.redirect(url.toString(),302);}
 if(CROPS[path]){const c=CROPS[path];const upstream=await fetch(c.url);if(!upstream.ok)return new Response('Image temporarily unavailable',{status:502});const bytes=new Uint8Array(await upstream.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));const [sw,sh]=c.source_dimensions,[x,y,w,h]=c.crop_xywh;const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}"><image x="0" y="0" width="${sw}" height="${sh}" href="data:image/png;base64,${btoa(binary)}"/></svg>`;return new Response(request.method==='HEAD'?null:svg,{headers:{'Content-Type':'image/svg+xml','Cache-Control':'private, max-age=86400','X-Content-Type-Options':'nosniff'}});}
 const item=ASSETS[path];
 if(item){const bytes=Uint8Array.from(atob(item.base64),c=>c.charCodeAt(0));return new Response(request.method==='HEAD'?null:bytes,{headers:{'Content-Type':item.type,'Cache-Control':item.type.startsWith('font/')?'private, max-age=86400':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow'}})}
 if(REMOTE[path])return Response.redirect(REMOTE[path],302);
 return new Response('Page not found',{status:404});
}};
