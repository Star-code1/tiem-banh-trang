import {asset} from './media.js';
// Original procedural soundtrack and Foley. Audio starts only after user gesture.
export class Soundscape{
 constructor(){this.ctx=null;this.buffers={};this.volume=.55;this.enabled=true;this.music=true;this.step=0;}
 async unlock(){if(!this.ctx){this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.master=this.ctx.createGain();this.master.connect(this.ctx.destination);this.master.gain.value=this.volume;this.loop=setInterval(()=>this.melody(),420);}if(this.ctx.state==='suspended')await this.ctx.resume();}
 configure(s){this.enabled=s.sound;this.music=s.music;this.volume=s.volume;if(this.master)this.master.gain.value=s.volume;}
 async play(name){if(!this.enabled||!this.ctx||this.ctx.state!=='running')return;try{if(!this.buffers[name]){let r;try{r=await fetch(asset('audio/'+name+'.wav'));if(!r.ok)throw Error('media');}catch{r=await fetch('/assets/audio/'+name+'.wav');}if(!r.ok)return;this.buffers[name]=await this.ctx.decodeAudioData(await r.arrayBuffer());}let src=this.ctx.createBufferSource();src.buffer=this.buffers[name];src.connect(this.master);src.start();}catch{}}
 tone(freq,dur=.3,vol=.045,type='sine'){if(!this.ctx||this.ctx.state!=='running')return;let t=this.ctx.currentTime,o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(this.master);o.start();o.stop(t+dur);}
 melody(){if(!this.enabled||!this.music||document.hidden)return;let notes=[261.63,0,329.63,392,0,329.63,293.66,0,261.63,0,349.23,440,392,0,329.63,0];let n=notes[this.step%notes.length];if(n)this.tone(n,.6,.035,'triangle');if(this.step%4===0)this.tone([130.81,110,87.31,98][Math.floor(this.step/4)%4],1.4,.04);this.step++;}
 dispose(){clearInterval(this.loop);this.ctx?.close();}
 suspend(){this.ctx?.suspend();}resume(){if(this.ctx?.state==='suspended')this.ctx.resume();}
}
