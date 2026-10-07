import fs from 'node:fs';import path from 'node:path';import zlib from 'node:zlib';
const root=path.dirname(new URL(import.meta.url).pathname),assets={};
const types={'.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.vtt':'text/vtt; charset=utf-8'};
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){if(entry.name!=='framed')walk(file);}else assets['/'+path.relative(path.join(root,'public'),file)]={type:types[path.extname(file)],base64:fs.readFileSync(file).toString('base64')};}}walk(path.join(root,'public'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'src/media-manifest.json'))),remote={};for(const a of manifest.assets)remote['/product-media/'+path.basename(a.path)]=a.url;
const crops={};for(const c of JSON.parse(fs.readFileSync(path.join(root,'src/crop-settings.json')))){crops['/product-media/'+c.preview]={...c,url:manifest.assets.find(a=>path.basename(a.path)===c.source).url};}
const api=fs.readFileSync(path.join(root,'src/comments-api.mjs'),'utf8').replace('export const sections','const sections').replace('export async function commentsAPI','async function commentsAPI');
const worker=fs.readFileSync(path.join(root,'src/worker.mjs'),'utf8').replace("import { commentsAPI } from './comments-api.mjs';",'');
const output=`const ASSETS=${JSON.stringify(assets)};\nconst REMOTE=${JSON.stringify(remote)};\nconst CROPS=${JSON.stringify(crops)};\n${api}\n${worker}`;
fs.mkdirSync(path.join(root,'dist/server'),{recursive:true});fs.writeFileSync(path.join(root,'dist/server/index.js'),output);
console.log(JSON.stringify({assetCount:Object.keys(assets).length,workerBytes:Buffer.byteLength(output),gzipBytes:zlib.gzipSync(output).length}));
