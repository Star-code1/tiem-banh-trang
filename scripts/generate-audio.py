"""Original, deterministic synthesized game Foley. Python standard library only."""
import math,random,wave,struct
from pathlib import Path
random.seed(29)
OUT=Path(__file__).resolve().parents[1]/'fe/public/assets/audio';OUT.mkdir(parents=True,exist_ok=True)
RATE=22050
lengths={'click':.09,'cut':.22,'sprinkle':.4,'pour':.5,'mix':.6,'grill':1.2,'roll':.45,'arrival':.65,'hello':.5,'thanks':.65,'coin':.55,'wrong':.4,'upgrade':1.0,'cat':.6,'dice':.65,'rain':2.0}
for name,d in lengths.items():
 samples=[];prev=0
 for i in range(int(RATE*d)):
  t=i/RATE;p=t/d;n=random.uniform(-1,1);env=math.sin(math.pi*p)**.7;v=0
  if name=='click':v=math.sin(2*math.pi*(1000-650*p)*t)*math.exp(-p*9)*.4
  elif name=='cut':v=(n-prev)*.18*math.exp(-((p-.1)/.07)**2)+(n-prev)*.16*math.exp(-((p-.55)/.10)**2)
  elif name=='sprinkle':v=n*.25*(math.sin(t*95)**12)*env
  elif name=='pour':v=(n*.16+math.sin(2*math.pi*(260+60*math.sin(t*42))*t)*.12)*env
  elif name=='mix':v=n*.2*(.25+.75*math.sin(t*23)**2)*env+math.sin(t*2200)*.03*env
  elif name=='grill':v=n*.11*env+(n*.25 if random.random()<.006 else 0)*env
  elif name=='roll':v=n*.12*env*(.3+.7*math.sin(t*22)**2)
  elif name in ('hello','thanks'):v=(math.sin(2*math.pi*(340+110*math.sin(t*12))*t)+.3*math.sin(2*math.pi*740*t))*.12*env*(.4+.6*math.sin(t*15)**2)
  elif name=='cat':v=(math.sin(2*math.pi*(500+230*math.sin(p*math.pi))*t)+.3*math.sin(2*math.pi*1100*t))*.13*env
  elif name=='wrong':v=math.sin(2*math.pi*(210-95*p)*t)*.18*env
  elif name=='dice':v=n*.35*math.sin(t*43)**16*env
  elif name=='rain':v=n*.075*env
  else:
   notes={'arrival':[659,880],'coin':[1046,1318,1568],'upgrade':[523,659,784,1046]}[name];step=min(len(notes)-1,int(p*len(notes)));local=(p*len(notes))%1
   v=(math.sin(2*math.pi*notes[step]*t)+.25*math.sin(2*math.pi*notes[step]*2*t))*.25*math.exp(-local*5)*env
  prev=n;samples.append(max(-1,min(1,v)))
 with wave.open(str(OUT/(name+'.wav')),'wb') as f:
  f.setnchannels(1);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(b''.join(struct.pack('<h',int(v*32767)) for v in samples))
print('Generated',len(lengths),'original WAV effects')
