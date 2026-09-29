import {reactive,ref,computed,watch,onMounted,onUnmounted,toRaw} from 'vue';
import {items,recipes,customers,upgrades,recipe} from '../../../shared/data.js';
import {load,save,fresh,level,count,purchase,nextDay,consume,award,availableRecipes,validateSave} from '../../../shared/engine.js';
import {emptyGrill,advanceGrill,grillQuality,migrate,storyReward,storyMilestones} from '../../../shared/mechanics.js';
import {Soundscape} from '../services/audio.js';
export function useGame(){
 const s=reactive(migrate(load())),dialog=ref(''),toast=ref(''),filter=ref('all'),meter=ref(0),particles=ref([]),lastResult=ref(null);
 const emptyRuntime=()=>({queue:[],active:null,selected:[],phase:'select',hits:[],cut:0,seq:0,grill:emptyGrill()});s.runtime??=emptyRuntime();
 const r=computed(()=>s.runtime),sound=new Soundscape();let timer,raf,lastFrame=0,beat=0,toastTimer,saveTimer,particleTimer,lastSaved=0,replacing=false;
 const current=computed(()=>r.value.queue.find(q=>q.id===r.value.active)),dish=computed(()=>current.value?recipe(current.value.recipe):null),shopLevel=computed(()=>level(s));
 const ingredientList=computed(()=>items.filter(i=>filter.value==='all'?(dish.value?dish.value.ingredients.includes(i.id)||['beef','herb','chili','egg'].includes(i.id):['paper','mango','beef','egg','shrimp','herb','chili','tamarind'].includes(i.id)):i.type===filter.value));
 const quality=computed(()=>r.value.hits.length?Math.round(r.value.hits.reduce((a,b)=>a+b,0)/r.value.hits.length):0);
 function notify(message){toast.value=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.value='',3800);}
 function persist(){if(!save(toRaw(s)))notify('Không lưu được trên thiết bị. Hãy xuất bản lưu.');}
 function burst(){if(s.reduced)return;particles.value=Array.from({length:12},(_,i)=>({id:i,x:(Math.random()-.5)*220,y:-70-Math.random()*160}));clearTimeout(particleTimer);particleTimer=setTimeout(()=>particles.value=[],1000);}
 function resetDish(){Object.assign(r.value,{selected:[],phase:'select',hits:[],cut:0,grill:emptyGrill()});beat=0;}
 function newCustomer(){if(r.value.queue.length>=3)return;const list=availableRecipes(s),rr=list[Math.floor(Math.random()*list.length)],idx=r.value.seq++%4,c=customers[idx],patience=c.patience+s.upgrades.assistant*30;r.value.queue.push({id:r.value.seq,recipe:rr.id,customer:idx,patience,left:patience});sound.play('arrival');}
 if(s.started&&!r.value.queue.length){newCustomer();newCustomer();}
 async function unlock(){sound.configure(s);await sound.unlock().catch(()=>{});}
 function play(name){sound.play(name);}
 function selectOrder(id){if(r.value.phase!=='select'){notify('Hoàn thành hoặc làm lại món đang chế biến trước nhé.');return;}r.value.active=id;resetDish();play('hello');}
 function ingredient(id){if(!current.value||r.value.phase!=='select')return;const ids=r.value.selected;if(ids.includes(id))r.value.selected=ids.filter(x=>x!==id);else if(count(s,id)>0&&ids.length<8){ids.push(id);play(items.find(i=>i.id===id)?.type==='sauce'?'pour':'sprinkle');burst();}}
 function prepare(){if(!current.value||r.value.phase!=='select'||!r.value.selected.length)return;if(r.value.selected.some(id=>count(s,id)<1)){notify('Thiếu nguyên liệu, ghé kho nhé.');return;}r.value.selected.forEach(id=>consume(s,id));r.value.phase=dish.value.method==='mix'?'cut':'cook';r.value.hits=[];r.value.grill=emptyGrill();beat=0;play(dish.value.method==='grill'?'grill':'roll');persist();}
 function cut(){if(r.value.phase!=='cut')return;r.value.cut++;play('cut');if(r.value.cut>=Math.max(1,3-s.upgrades.tools)){r.value.phase='cook';beat=0;}}
 function hit(){if(r.value.phase!=='cook'||!current.value)return;if(dish.value.method==='grill'){r.value.hits=[grillQuality(r.value.grill)];r.value.phase='ready';play(quality.value?'grill':'wrong');return;}const q=meter.value>=.38&&meter.value<=.65?3:meter.value>=.23&&meter.value<=.8?2:1;r.value.hits.push(q);play(dish.value.method==='roll'?'roll':'mix');notify(q===3?'Đúng nhịp! Khéo tay quá ✦':'Mình thử canh vùng xanh nhé!');if(r.value.hits.length>=Math.max(1,3-s.upgrades.tools))r.value.phase='ready';beat=0;}
 function serve(){if(r.value.phase!=='ready'||!current.value)return;const c=current.value,old=level(s),result=award(s,c,r.value.selected,quality.value,c.left/c.patience);lastResult.value=result;if(result.stars){s.friendships[c.customer]++;play('coin');burst();if(storyMilestones.includes(s.friendships[c.customer]))notify('✉ '+customers[c.customer].name+' gửi thư! Mở Thư khách quen nhé.');else notify(customers[c.customer].thanks+' +'+result.total.toLocaleString('vi-VN')+'đ');}else{play('wrong');notify('Món chưa đạt. Khách chưa thanh toán.');}r.value.queue=r.value.queue.filter(q=>q.id!==r.value.active);r.value.active=null;resetDish();newCustomer();persist();if(level(s)>old){dialog.value='level';play('upgrade');}}
 function discard(){resetDish();dialog.value='';}
 function buy(id){if(purchase(s,id)){play('coin');persist();}else notify('Chưa đủ tiền nhập hàng.');}
 function upgrade(id){const u=upgrades.find(x=>x.id===id);if(!u)return;const price=u.cost*(s.upgrades[id]+1);if(s.upgrades[id]>=u.max||s.cash<price)return;s.cash-=price;s.upgrades[id]++;play('upgrade');burst();persist();}
 function end(){if(r.value.phase!=='select'){notify('Phục vụ hoặc bỏ món đang làm trước khi kết ngày.');return;}dialog.value='end';}
 function next(){const n=nextDay(s);s.runtime=emptyRuntime();newCustomer();newCustomer();dialog.value='';notify(`Chào ngày ${s.day}! Đã dọn ${n} phần hết hạn.`);if(s.day%3===0)play('rain');persist();}
 function start(){s.started=true;if(!r.value.queue.length){newCustomer();newCustomer();}persist();}
 function quest(){const id='day'+s.day;if(s.daily.served>=3&&!s.claimed.includes(id)){s.claimed.push(id);s.cash+=15000;play('coin');burst();}}
 function lottery(){if(s.lotteryDay===s.day)return;s.lotteryDay=s.day;const gift=[10000,15000,20000,25000][Math.floor(Math.random()*4)];s.cash+=gift;notify('Hộp quà có '+gift.toLocaleString('vi-VN')+'đ!');play('upgrade');}
 function gamble(id){if(s.cash<5000){notify('Cần 5.000đ xu game để chơi.');return null;}s.cash-=5000;const dice=Array.from({length:3},()=>Math.floor(Math.random()*6)),n=dice.filter(i=>i===id).length;if(n)s.cash+=(n+1)*5000;play('dice');return {dice,n};}
 function rescue(){if(s.cash<5000&&s.rescueDay!==s.day){s.cash+=50000;s.rescueDay=s.day;notify('Có vốn rồi! Mở tiệm lại nhé.');}}
 function claimStory(c,ch){const amount=storyReward(s,c,ch);if(amount){play('coin');notify('Nhận '+amount.toLocaleString('vi-VN')+'đ từ khách quen.');}}
 function exportSave(){const url=URL.createObjectURL(new Blob([JSON.stringify(s,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=`goc-pho-ngay-${s.day}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function replaceState(data){if(!validateSave(data))throw Error('Bản lưu không hợp lệ.');replacing=true;Object.assign(s,migrate(JSON.parse(JSON.stringify(data))));replacing=false;s.runtime??=emptyRuntime();if(s.started&&!s.runtime.queue.length){newCustomer();newCustomer();}beat=0;persist();}
 function reset(){Object.assign(s,migrate(fresh()));s.runtime=emptyRuntime();dialog.value='';persist();}
 watch(()=>[s.sound,s.music,s.volume],()=>sound.configure(s),{immediate:true});watch(()=>s.relax,()=>{if(!replacing)s.seconds=0},{flush:'sync'});watch(()=>s.reduced,v=>document.body.classList.toggle('reduced',v),{immediate:true});
 // Throttle, rather than debounce: thermal updates occur every animation frame.
 watch(s,()=>{if(!saveTimer)saveTimer=setTimeout(()=>{saveTimer=null;persist();},300)},{deep:true});
 function frame(now){const dt=Math.min(.1,Math.max(0,(now-lastFrame)/1000));lastFrame=now;if(r.value.phase==='cook'&&!dialog.value&&!document.hidden){if(dish.value?.method==='grill'){if(advanceGrill(r.value.grill,dt)){r.value.hits=[0];r.value.phase='ready';play('wrong');notify('Bánh cháy rồi! Mình làm lại nhé.');}}else{beat+=dt;meter.value=(Math.sin(beat/.65)+1)/2;}if(now-lastSaved>1000){persist();lastSaved=now;}}raf=requestAnimationFrame(frame);}
 function visibility(){persist();if(document.hidden)sound.suspend();else sound.resume();lastFrame=performance.now();}
 function keys(e){if(dialog.value||['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement.tagName)||e.repeat)return;if(e.code==='Space'){e.preventDefault();unlock();if(r.value.phase==='select')prepare();else if(r.value.phase==='cut')cut();else if(r.value.phase==='cook')hit();else serve();}else if(e.code==='Enter')serve();else if(/^[1-8]$/.test(e.key)){const i=ingredientList.value[Number(e.key)-1];if(i)ingredient(i.id);}}
 onMounted(()=>{lastFrame=performance.now();raf=requestAnimationFrame(frame);timer=setInterval(()=>{if(!s.started||dialog.value||document.hidden)return;s.seconds++;if(!s.relax){r.value.queue.forEach(q=>q.left--);const gone=r.value.queue.filter(q=>q.left<=0);if(gone.length){if(gone.some(q=>q.id===r.value.active)){r.value.active=null;resetDish();}r.value.queue=r.value.queue.filter(q=>q.left>0);s.combo=0;play('wrong');notify('Khách đã rời đi. Mình thử nhanh hơn nhé!');newCustomer();}if(s.seconds>=240&&r.value.phase==='select')end();}if(s.seconds%18===0&&r.value.queue.length<3)newCustomer();},1000);document.addEventListener('visibilitychange',visibility);document.addEventListener('keydown',keys);window.addEventListener('pagehide',persist);});
 onUnmounted(()=>{persist();clearInterval(timer);cancelAnimationFrame(raf);clearTimeout(saveTimer);clearTimeout(toastTimer);clearTimeout(particleTimer);sound.dispose();document.removeEventListener('visibilitychange',visibility);document.removeEventListener('keydown',keys);window.removeEventListener('pagehide',persist);});
 return {s,r,current,dish,shopLevel,ingredientList,quality,dialog,toast,filter,meter,particles,notify,unlock,play,burst,start,selectOrder,ingredient,prepare,cut,hit,serve,discard,buy,upgrade,end,next,quest,lottery,gamble,rescue,claimStory,exportSave,replaceState,reset,persist};
}
