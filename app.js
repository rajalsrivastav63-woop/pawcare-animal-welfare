(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const FB="data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='#e8dfcf'/><text x='50%' y='58%' font-size='90' text-anchor='middle'>🐾</text></svg>");
window.fb=e=>{e.onerror=null;e.src=FB};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const DB={get:(k,d)=>{try{return JSON.parse(localStorage.getItem('pc_'+k))??d}catch{return d}},
 set:(k,v)=>{try{localStorage.setItem('pc_'+k,JSON.stringify(v))}catch{toast('Storage full – use a smaller photo','bad')}}};
const img=(s,a)=>`<img src="${s?esc(s):FB}" alt="${esc(a)}" loading="lazy" onerror="fb(this)">`;
function toast(m,t){const d=document.createElement('div');d.className='toast '+(t||'');d.textContent=m;$('#toasts').append(d);setTimeout(()=>d.remove(),3200)}
const U=i=>`https://images.unsplash.com/photo-${i}?auto=format&fit=crop&w=600&q=70`;
const DOGS=[
{id:1,name:'Bruno',age:'2 yrs',group:'Young',breed:'Indian Pariah mix',loc:'Jaipur',photo:U('1587300003388-59208cc962cb'),desc:'Playful, vaccinated and great with kids.'},
{id:2,name:'Coco',age:'4 months',group:'Puppy',breed:'Labrador mix',loc:'Delhi',photo:U('1543466835-00a7907e9de1'),desc:'Curious puppy who loves cuddles.'},
{id:3,name:'Max',age:'5 yrs',group:'Adult',breed:'Golden Retriever',loc:'Mumbai',photo:U('1552053831-71594a27632d'),desc:'Calm, gentle and house-trained.'},
{id:4,name:'Luna',age:'1 yr',group:'Young',breed:'Beagle mix',loc:'Pune',photo:U('1583511655857-d19b40a7a54e'),desc:'Energetic explorer, needs daily walks.'},
{id:5,name:'Peanut',age:'3 months',group:'Puppy',breed:'Desi mix',loc:'Jaipur',photo:U('1548199973-03cce0bbc87b'),desc:'Tiny, sweet, and good with other pets.'},
{id:6,name:'Rocky',age:'6 yrs',group:'Adult',breed:'Pug mix',loc:'Bengaluru',photo:U('1517849845537-4d257902454a'),desc:'Lazy sofa companion with a big heart.'}];
const SEED={pets:[{id:'s1',name:'Bruno (sample)',age:3,breed:'Beagle',photo:null,records:[
 {id:'r1',type:'Vaccination',date:'2026-06-10',time:'',note:'Annual booster'},{id:'r2',type:'Feeding',date:'2026-11-01',time:'08:00',note:'1 cup dry food'}]}],
 strays:[{id:'x1',animal:'Dog',help:'Food',urgency:'Low',loc:'Near City Park gate (demo)',desc:'Friendly stray, looks hungry.',photo:null,status:'open',at:Date.now()-864e5},
 {id:'x2',animal:'Puppy',help:'Medical assistance',urgency:'High',loc:'Main Market lane (demo)',desc:'Limping puppy. Please contact a vet.',photo:null,status:'handling',at:Date.now()-36e5}]};
if(!localStorage.getItem('pc_init')){DB.set('pets',SEED.pets);DB.set('strays',SEED.strays);localStorage.setItem('pc_init','1')}
const BASE={helped:1240,food:386,vol:215,enq:94};
const stat=(n,l)=>`<div class="stat"><b>${n}</b>${l}</div>`;
function stats(){const c=k=>DB.get(k,[]).length;const h=`${stat(BASE.helped+DB.get('strays',[]).filter(s=>s.status==='resolved').length,'Animals helped')}${stat(BASE.food+DB.get('strays',[]).filter(s=>/Food|Water/.test(s.help)).length,'Food assistance requests')}${stat(BASE.vol+c('vols'),'Volunteer registrations')}${stat(BASE.enq+c('enq'),'Adoption enquiries')}`;$('#homeStats').innerHTML=$('#impactStats').innerHTML=h}
/* ---------- helpers ---------- */
function valid(f){let ok=true;$$('.err',f).forEach(e=>e.remove());$$('[required]',f).forEach(el=>{const v=el.value.trim();let m='';
 if(!v)m='This field is required';else if(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(v))m='Enter a valid email';else if(el.type==='number'&&(+v<0||+v>40))m='Enter a value between 0 and 40';
 if(m){ok=false;el.insertAdjacentHTML('afterend',`<small class="err">${m}</small>`)}});if(!ok)toast('Please fix the highlighted fields','bad');return ok}
function readImg(file){return new Promise((res,rej)=>{if(!file)return res(null);if(!file.type.startsWith('image/'))return rej('Please choose an image file');
 const r=new FileReader();r.onerror=()=>rej('Could not read file');r.onload=()=>{const i=new Image();i.onerror=()=>rej('Invalid image');i.onload=()=>{const s=Math.min(1,500/i.width),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.7))};i.src=r.result};r.readAsDataURL(file)})}
/* ---------- adoption ---------- */
const dogCard=d=>`<article class="card dog">${img(d.photo,d.name)}<div class="pad"><h3>${d.name} <span class="tag">${d.age}</span></h3><p class="mut">${d.breed} · 📍 ${d.loc}</p><p>${d.desc}</p><button class="btn sm" data-a="adopt" data-id="${d.id}">Adoption enquiry</button></div></article>`;
function adopt(){const q=$('#q').value.toLowerCase(),g=$('#ageF').value;const L=DOGS.filter(d=>(!g||d.group===g)&&(d.name+d.breed+d.loc+d.desc).toLowerCase().includes(q));
 $('#dogs').innerHTML=L.length?L.map(dogCard).join(''):'<div class="empty">No dogs match your search.</div>';$('#featured').innerHTML=DOGS.slice(0,3).map(dogCard).join('')}
/* ---------- pets ---------- */
let sel=null;const today=()=>new Date().toISOString().slice(0,10);
function pets(){const P=DB.get('pets',[]);$('#petList').innerHTML=P.length?P.map(p=>`<div class="card pet">${img(p.photo,p.name)}<div><b>${esc(p.name)}</b><br><span class="mut">${esc(p.age)} yrs · ${esc(p.breed)}</span></div><div class="row"><button class="btn sm" data-a="petSel" data-id="${p.id}">Care</button><button class="btn sm ghost" data-a="petEdit" data-id="${p.id}">Edit</button><button class="btn sm ghost" data-a="petDel" data-id="${p.id}">Delete</button></div></div>`).join(''):'<div class="empty">No pets yet. Add your first pet 🐕</div>';
 const p=P.find(x=>x.id===sel);$('#petDetail').hidden=!p;if(!p)return;$('#detailTitle').textContent='Care plan: '+p.name;
 const rec=r=>`<div class="card pad row between"><span><span class="tag">${esc(r.type)}</span> ${esc(r.date)} ${esc(r.time)} — ${esc(r.note)||'—'}</span><button class="btn sm ghost" data-a="recDel" data-id="${r.id}">✕</button></div>`;
 const R=[...p.records].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));const up=R.filter(r=>r.date>=today()),hi=R.filter(r=>r.date<today()).reverse();
 $('#upcoming').innerHTML=up.length?up.map(rec).join(''):'<div class="empty">No upcoming reminders.</div>';$('#history').innerHTML=hi.length?hi.map(rec).join(''):'<div class="empty">No history yet.</div>'}
/* ---------- strays ---------- */
function strays(){const f=$('#strayFilter').value,S=DB.get('strays',[]).filter(s=>!f||s.status===f).sort((a,b)=>b.at-a.at);
 $('#strayFeed').innerHTML=S.length?S.map(s=>`<div class="card rep">${s.photo?img(s.photo,s.animal):''}<div class="pad"><span class="badge ${s.urgency}">${s.urgency} urgency</span> <span class="tag">${esc(s.help)}</span> <span class="tag">${s.status==='handling'?'Being handled':s.status==='resolved'?'Resolved ✅':'Open'}</span>
 <h3>${esc(s.animal)} – ${esc(s.loc)}</h3><p>${esc(s.desc)}</p><p class="mut">${new Date(s.at).toLocaleString()}</p><div class="row">${s.status==='open'?`<button class="btn sm" data-a="sHandle" data-id="${s.id}">I'll handle this</button>`:''}${s.status!=='resolved'?`<button class="btn sm alt" data-a="sDone" data-id="${s.id}">Mark resolved</button>`:''}<button class="btn sm ghost" data-a="sDel" data-id="${s.id}">Delete</button></div></div></div>`).join(''):'<div class="empty">No reports found.</div>'}
const setS=(id,fn)=>{const S=DB.get('strays',[]);const s=S.find(x=>x.id===id);if(s)fn(s,S);DB.set('strays',S);strays();stats()};
/* ---------- actions ---------- */
const A={
 adopt(id){const d=DOGS.find(x=>x.id==id);$('#adoptTitle').textContent='Adopt '+d.name;$('#adoptForm').dog.value=d.name;$('#adoptDlg').showModal()},close(){$('#adoptDlg').close()},
 petSel(id){sel=id;pets();$('#petDetail').scrollIntoView({behavior:'smooth'})},
 petEdit(id){const p=DB.get('pets',[]).find(x=>x.id===id),f=$('#petForm');f.pid.value=id;f.name.value=p.name;f.age.value=p.age;f.breed.value=p.breed;$('#petFormTitle').textContent='Edit '+p.name;f.scrollIntoView({behavior:'smooth'})},
 petReset(){$('#petForm').reset();$('#petForm').pid.value='';$('#petFormTitle').textContent='Add a pet';$$('.err').forEach(e=>e.remove())},
 petDel(id){if(!confirm('Delete this pet profile and its records?'))return;DB.set('pets',DB.get('pets',[]).filter(p=>p.id!==id));if(sel===id)sel=null;pets();toast('Pet deleted')},
 recDel(id){const P=DB.get('pets',[]);const p=P.find(x=>x.id===sel);p.records=p.records.filter(r=>r.id!==id);DB.set('pets',P);pets()},
 sHandle(id){setS(id,s=>s.status='handling');toast('Thank you! Marked as being handled.')},sDone(id){setS(id,s=>s.status='resolved');toast('Marked as resolved 🎉')},
 sDel(id){if(confirm('Delete this report?')){DB.set('strays',DB.get('strays',[]).filter(s=>s.id!==id));strays();stats()}}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b)A[b.dataset.a]?.(b.dataset.id)});
const push=(k,o)=>{const L=DB.get(k,[]);L.push({id:uid(),at:Date.now(),...o});DB.set(k,L);stats()};
const F={
 async petForm(f){const d=Object.fromEntries(new FormData(f));let photo;try{photo=await readImg(f.photo.files[0])}catch(m){return toast(m,'bad')}
  const P=DB.get('pets',[]);if(d.pid){const p=P.find(x=>x.id===d.pid);Object.assign(p,{name:d.name.trim(),age:d.age,breed:d.breed.trim()});if(photo)p.photo=photo;toast('Pet updated')}
  else{const n={id:uid(),name:d.name.trim(),age:d.age,breed:d.breed.trim(),photo,records:[]};P.push(n);sel=n.id;toast('Pet added! Now add care records.')}
  DB.set('pets',P);A.petReset();pets()},
 recForm(f){const d=Object.fromEntries(new FormData(f)),P=DB.get('pets',[]),p=P.find(x=>x.id===sel);p.records.push({id:uid(),type:d.type,date:d.date,time:d.time,note:d.note.trim()});DB.set('pets',P);f.reset();pets();toast('Record saved')},
 async strayForm(f){const d=Object.fromEntries(new FormData(f));let photo;try{photo=await readImg(f.photo.files[0])}catch(m){return toast(m,'bad')}
  push('strays',{animal:d.animal,help:d.help,urgency:d.urgency,loc:d.loc.trim(),desc:d.desc.trim(),photo,status:'open'});f.reset();strays();toast('Report submitted. Thank you for caring! 🧡')},
 volForm(f){const d=Object.fromEntries(new FormData(f));push('vols',d);f.reset();toast(`Welcome aboard, ${d.name}! Registration saved locally.`)},
 donForm(f){const d=Object.fromEntries(new FormData(f));push('offers',d);f.reset();toast('Offer recorded (demo). No payment was taken.')},
 adoptForm(f){const d=Object.fromEntries(new FormData(f));push('enq',d);f.reset();$('#adoptDlg').close();toast(`Application for ${d.dog} saved (demo).`)}};
document.addEventListener('submit',e=>{const h=F[e.target.id];if(!h)return;e.preventDefault();if(valid(e.target))h(e.target)});
['#q','#ageF'].forEach(s=>$(s).addEventListener('input',adopt));$('#strayFilter').addEventListener('change',strays);
/* ---------- theme / nav / router ---------- */
const th=t=>{document.documentElement.dataset.theme=t;$('#theme').textContent=t==='dark'?'☀️':'🌙';DB.set('theme',t)};
th(DB.get('theme',matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
$('#theme').onclick=()=>th(document.documentElement.dataset.theme==='dark'?'light':'dark');
$('#menuBtn').onclick=()=>$('#menu').classList.toggle('open');
const pages=['home','dashboard','stray','volunteer','adopt','donate','impact'];
function route(){let p=location.hash.slice(1);if(!pages.includes(p))p='home';$$('.page').forEach(s=>s.hidden=s.id!==p);$$('#menu a').forEach(a=>a.classList.toggle('on',a.hash==='#'+p));$('#menu').classList.remove('open');scrollTo(0,0);document.title=(p==='home'?'':p[0].toUpperCase()+p.slice(1)+' · ')+'PAWCARE'}
addEventListener('hashchange',route);
$('#petList').innerHTML=$('#strayFeed').innerHTML='<div class="empty">Loading…</div>';
setTimeout(()=>{adopt();pets();strays();stats()},350);route();
})();
