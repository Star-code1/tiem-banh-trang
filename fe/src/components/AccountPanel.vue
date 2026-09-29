<script setup>
import {ref,watch,onUnmounted} from 'vue';
import {apiRequest,configuredApi,normalizeApi} from '../services/api.js';
import {validateSave} from '../../../shared/engine.js';
import {money} from '../../../shared/data.js';

const props=defineProps({state:Object});
const emit=defineEmits(['loaded','notice']);
function stored(k){try{return sessionStorage.getItem(k)||''}catch{return ''}}

const base=ref(configuredApi||'');
const token=ref(stored('gocpho-token'));
const username=ref(stored('gocpho-user'));
const inputUser=ref('');
const password=ref('');
const status=ref('');
const busy=ref(false);
const revision=ref(0);
const auto=ref(false);
const referral=ref(null);
const friendCode=ref('');
const syncing=ref(false);
let syncTimer,queued=false,disposed=false;

async function req(path,method='GET',body){
  const apiUrl=normalizeApi(base.value||configuredApi);
  return apiRequest(apiUrl,path,{method,body,token:token.value});
}

async function run(fn){
  if(busy.value||syncing.value)return;
  busy.value=true;
  status.value='';
  try{await fn();}
  catch(e){
    if(e.status===409)auto.value=false;
    status.value=e.message;
    emit('notice',e.message);
  }finally{busy.value=false;}
}

async function auth(mode){
  await run(async()=>{
    const d=await req('/auth/'+mode,'POST',{username:inputUser.value,password:password.value});
    token.value=d.token;
    username.value=inputUser.value;
    password.value='';
    revision.value=0;
    auto.value=false;
    try{
      sessionStorage.setItem('gocpho-token',d.token);
      sessionStorage.setItem('gocpho-user',inputUser.value);
    }catch{}
    status.value=mode==='register'?'Đăng ký thành công! Nhấn "Lưu lên đám mây" để bắt đầu đồng bộ.':'Đã đăng nhập thành công!';
  });
}

async function saveRemote(){
  const d=await req('/account/save','PUT',{saveData:JSON.parse(JSON.stringify(props.state)),revision:revision.value});
  revision.value=d.revision;
  auto.value=true;
  return d;
}

async function saveClick(){
  await run(async()=>{
    await saveRemote();
    status.value='Đã lưu tiến trình lên đám mây. Tự động đồng bộ đang bật.';
  });
}

async function loadRemote(){
  if(!window.confirm('Tải bản lưu từ đám mây về thiết bị này?'))return;
  await run(async()=>{
    const d=await req('/account/save');
    if(d.saveData){
      if(!validateSave(d.saveData))throw Error('Bản lưu đám mây không hợp lệ.');
      emit('loaded',d.saveData);
    }
    revision.value=d.revision;
    auto.value=true;
    status.value=d.saveData?'Đã tải và khôi phục tiến trình từ đám mây.':'Tài khoản chưa có bản lưu trên máy chủ.';
  });
}

async function sync(){
  if(disposed||!auto.value||!token.value)return;
  if(syncing.value||busy.value){
    syncTimer=setTimeout(()=>{syncTimer=null;sync();},2500);
    return;
  }
  syncing.value=true;
  try{await saveRemote();}
  catch(e){
    auto.value=false;
    status.value='Đồng bộ dừng: '+e.message;
    emit('notice',status.value);
  }finally{
    syncing.value=false;
    if(queued){
      queued=false;
      syncTimer=setTimeout(sync,2500);
    }
  }
}

watch(()=>props.state,()=>{
  if(auto.value&&!syncTimer)syncTimer=setTimeout(()=>{syncTimer=null;sync();},2500);
},{deep:true});

async function logout(){
  await run(async()=>{
    try{await req('/auth/logout','POST',{});}
    finally{
      token.value='';
      username.value='';
      auto.value=false;
      referral.value=null;
      try{
        sessionStorage.removeItem('gocpho-token');
        sessionStorage.removeItem('gocpho-user');
      }catch{}
      status.value='Đã đăng xuất tài khoản.';
    }
  });
}

async function getReferral(){
  await run(async()=>{
    referral.value=await req('/referral/me');
  });
}

async function claim(){
  await run(async()=>{
    await req('/referral/claim','POST',{code:friendCode.value});
    referral.value=await req('/referral/me');
    status.value='Mã đã ghi nhận. Bạn có thể nhận quà đang chờ.';
  });
}

async function take(){
  await run(async()=>{
    await saveRemote();
    const d=await req('/referral/rewards/take','POST',{revision:revision.value});
    revision.value=d.revision;
    if(d.saveData)emit('loaded',d.saveData);
    referral.value=await req('/referral/me');
    status.value='Đã nhận quà và cập nhật vào game!';
  });
}

onUnmounted(()=>{disposed=true;clearTimeout(syncTimer);});
</script>
<template>
  <div class="account-modal-content">
    <p class="notice">Liên kết tài khoản để lưu tiến trình game lên đám mây và tiếp tục chơi trên mọi thiết bị.</p>

    <!-- Khi chưa đăng nhập -->
    <template v-if="!token">
      <form @submit.prevent="auth('login')">
        <label>Tên tài khoản
          <input v-model="inputUser" autocomplete="username" minlength="3" maxlength="32" placeholder="Nhập tên đăng nhập..." pattern="[a-zA-Z0-9_]+" required :disabled="busy">
        </label>
        <label>Mật khẩu
          <input v-model="password" type="password" autocomplete="current-password" minlength="8" maxlength="128" placeholder="Tối thiểu 8 ký tự..." required :disabled="busy">
        </label>
        <div class="button-row">
          <button class="primary" :disabled="busy">Đăng nhập</button>
          <button type="button" class="secondary" :disabled="busy||inputUser.length<3||password.length<8" @click="auth('register')">Đăng ký mới</button>
        </div>
      </form>
    </template>

    <!-- Khi đã đăng nhập -->
    <template v-else>
      <div class="account-card">
        <div class="account-user-info">
          <span>👤</span>
          <div>
            <strong>{{ username || 'Chủ tiệm' }}</strong>
            <small>{{ auto ? 'Đang tự động đồng bộ' : 'Chưa bật tự đồng bộ' }} · Phiên bản #{{ revision }}</small>
          </div>
        </div>
        <div class="button-row">
          <button class="primary" :disabled="busy||syncing" @click="saveClick">Lưu lên đám mây</button>
          <button class="secondary" :disabled="busy||syncing" @click="loadRemote">Tải bản lưu</button>
          <button class="secondary" :disabled="busy" @click="getReferral">Mã bạn bè</button>
          <button class="text-btn danger" :disabled="busy" @click="logout">Đăng xuất</button>
        </div>
      </div>
    </template>

    <!-- Mã giới thiệu bạn bè -->
    <section v-if="referral" class="referral-box">
      <p>Mã của bạn: <b>{{ referral.code }}</b> · Quà đang chờ: <b>{{ money(referral.pendingAmount) }}</b></p>
      <form @submit.prevent="claim">
        <label>Nhập mã bạn bè
          <input v-model="friendCode" maxlength="20" placeholder="Nhập mã giới thiệu..." required :disabled="busy">
        </label>
        <button class="secondary" :disabled="busy">Nhận mã</button>
      </form>
      <button v-if="referral.pendingAmount" class="primary wide" :disabled="busy||syncing" @click="take">Nhận quà {{ money(referral.pendingAmount) }} vào game</button>
    </section>

    <p v-if="status || busy" role="status" class="hint">{{ busy ? 'Đang xử lý kết nối…' : status }}</p>
  </div>
</template>
