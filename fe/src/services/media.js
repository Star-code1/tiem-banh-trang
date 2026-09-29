import {reactive} from 'vue';import {configuredApi,apiRequest} from './api.js';
export const media=reactive({urls:{}});
export function asset(name){return media.urls[name]||`/assets/${name}`;}
export async function loadMedia(){if(!configuredApi)return;try{const data=await apiRequest(configuredApi,'/media/manifest');const urls={};for(const [name,url]of Object.entries(data.assets||{})){if(typeof url!=='string')continue;const u=new URL(url);if(u.protocol==='https:'&&u.hostname==='res.cloudinary.com')urls[name]=u.href;}media.urls=urls;}catch{/* Local files remain playable when the media API is unavailable. */}}
