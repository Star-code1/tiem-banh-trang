<script setup>
import {ref,watch,onUnmounted} from 'vue';import {apiRequest,configuredApi,normalizeApi} from '../services/api.js';import {validateSave} from '../../../shared/engine.js';import {money} from '../../../shared/data.js';
const props=defineProps({state:Object});const emit=defineEmits(['loaded','notice','export']);
function stored(k){try{return sessionStorage.getItem(k)||''}catch{return ''}}
const base=ref(configuredApi||stored('gocpho-api')),token=ref(stored('gocpho-token')),username=ref(''),password=ref(''),status=ref(''),busy=ref(false),revision=ref(0),auto=ref(false),referral=ref(null),friendCode=ref('');const syncing=ref(false);let syncTimer,queued=false,disposed=false;
async function req(path,method='GET',body){return apiRequest(normalizeApi(base.value),path,{method,body,token:token.value});}
async function run(fn){if(busy.value||syncing.value)return;busy.value=true;status.value='';try{await fn()}catch(e){if(e.status===409)auto.value=false;status.value=e.message;emit('notice',e.message)}finally{busy.value=false}}
async function auth(mode){await run(async()=>{base.value=normalizeApi(base.value);const d=await req('/auth/'+mode,'POST',{username:username.value,password:password.value});token.value=d.token;password.value='';revision.value=0;auto.value=false;try{sessionStorage.setItem('gocpho-token',d.token);sessionStorage.setItem('gocpho-api',base.value)}catch{}status.value='Đã đăng nhập. Tải bản lưu nếu tài khoản đã có tiến trình; hoặc lưu để bắt đầu đồng bộ.';});}
async function saveRemote(){const d=await req('/account/save','PUT',{saveData:JSON.parse(JSON.stringify(props.state)),revision:revision.value});revision.value=d.revision;auto.value=true;return d;}
async function saveClick(){await run(async()=>{await saveRemote();status.value='Đã lưu. Tự đồng bộ đang bật.'})}
async function loadRemote(){if(!window.confirm('Thay tiến trình trên thiết bị bằng bản máy chủ? Hãy xuất bản lưu trước nếu muốn giữ.'))return;await run(async()=>{const d=await req('/account/save');if(d.saveData){if(!validateSave(d.saveData))throw Error('Bản lưu không hợp lệ.');emit('loaded',d.saveData)}revision.value=d.revision;auto.value=true;status.value=d.saveData?'Đã khôi phục tiến trình.':'Tài khoản chưa có bản lưu; lần đồng bộ tới sẽ lưu game hiện tại.'})}
async function sync(){if(disposed||!auto.value||!token.value)return;if(syncing.value||busy.value){syncTimer=setTimeout(()=>{syncTimer=null;sync()},2500);return;}syncing.value=true;try{await saveRemote()}catch(e){auto.value=false;status.value='Đồng bộ dừng: '+e.message;emit('notice',status.value)}finally{syncing.value=false;if(queued){queued=false;syncTimer=setTimeout(sync,2500)}}}
watch(()=>props.state,()=>{if(auto.value&&!syncTimer)syncTimer=setTimeout(()=>{syncTimer=null;sync()},2500)},{deep:true});
watch(base,()=>{auto.value=false;revision.value=0;token.value='';referral.value=null;try{sessionStorage.removeItem('gocpho-token')}catch{}});
async function logout(){await run(async()=>{try{await req('/auth/logout','POST',{})}finally{token.value='';auto.value=false;referral.value=null;try{sessionStorage.removeItem('gocpho-token')}catch{}}})}
async function getReferral(){await run(async()=>referral.value=await req('/referral/me'))}
async function claim(){await run(async()=>{await req('/referral/claim','POST',{code:friendCode.value});referral.value=await req('/referral/me');status.value='Mã đã ghi nhận. Bạn có thể nhận quà đang chờ.'})}
async function take(){await run(async()=>{await saveRemote();const d=await req('/referral/rewards/take','POST',{revision:revision.value});revision.value=d.revision;if(d.saveData)emit('loaded',d.saveData);referral.value=await req('/referral/me');status.value='Đã đồng bộ phần thưởng vào bản lưu.'})}
onUnmounted(()=>{disposed=true;clearTimeout(syncTimer)});
</script>
<template>
 <p class="notice">Chơi ngay bằng bản lưu trên thiết bị. Kết nối tài khoản để lưu tiến trình lên MongoDB và tiếp tục trên máy khác.</p>
 <button class="secondary" @click="emit('export')">Xuất bản lưu thiết bị</button>
 <form @submit.prevent="auth('login')">
  <label>Địa chỉ BE<input v-model="base" type="url" placeholder="http://localhost:3000/api" required :disabled="busy"></label>
  <template v-if="!token"><label>Tài khoản<input v-model="username" autocomplete="username" minlength="3" maxlength="32" pattern="[a-zA-Z0-9_]+" required></label><label>Mật khẩu<input v-model="password" type="password" autocomplete="current-password" minlength="8" maxlength="128" required></label><div class="button-row"><button class="primary" :disabled="busy">Đăng nhập</button><button type="button" class="secondary" :disabled="busy||username.length<3||password.length<8" @click="auth('register')">Đăng ký</button></div></template>
 </form>
 <template v-if="token"><p class="notice">{{ auto?'Tự đồng bộ đang bật':'Chưa tự đồng bộ: chọn tải hoặc lưu trước.' }} · Phiên bản {{revision}}</p><div class="button-row"><button class="secondary" :disabled="busy||syncing" @click="loadRemote">Tải bản lưu</button><button class="primary" :disabled="busy||syncing" @click="saveClick">Lưu lên máy chủ</button><button class="secondary" :disabled="busy" @click="getReferral">Mã bạn bè</button><button class="text-btn" :disabled="busy" @click="logout">Đăng xuất</button></div></template>
 <section v-if="referral"><p>Mã của bạn: <b>{{referral.code}}</b> · Quà chờ: {{money(referral.pendingAmount)}}</p><form @submit.prevent="claim"><label>Mã bạn bè<input v-model="friendCode" maxlength="20" required></label><button class="secondary" :disabled="busy">Nhận mã</button></form><button class="primary" :disabled="busy||syncing||!referral.pendingAmount" @click="take">Nhận quà vào bản lưu</button></section>
 <p role="status" class="hint">{{busy?'Đang kết nối…':status}}</p>
</template>
