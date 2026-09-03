const characterData=[
['루나','S급 · 얼음 여왕','얼음 그 자체를 다룰 수 있음, 공기 중 수분을 이용해 즉석으로 얼음을 만들 수도 있을 정도','상냥, 무덤덤, 계산적','아카데미 서열 1위, 소꿉친구','cyan','runa'],
['리셀','A급 · 유혈식','생명체의 체외에 있는 액체 상태의 피를 자유롭게 조종한다','도도, 차가움, 자존심','흡혈귀, 오필리아의 언니, 피가 굳는 것을 싫어함','crimson','risel'],['클레어','A급 · 은총','신앙만큼 신체와 정신을 치유하거나 신체를 강화','상냥, 배려, 헌신','성녀, 마조히스트','red','cleir'],['엘','█▒░ · 리와인드','접촉한 대상의 상태를 원하는 시간만큼 되돌린다','명랑, 활발, 장난기','얀데레, 나머지는 비밀이야♡','mint','ell'],['이리나','A급 · 중력장','범위 내의 중력을 자유롭게 조작한다','냉정, 호기심, 오만','아카데미 최연소 교수, 불감증','purple','irina'],['레이','A급 · 지배','접촉한 대상의 신체 부위 기능을 강제로 통제한다.','오만, 원칙주의, 냉혹','학생회장, 머리를 쓰는 것을 좋아함','silver','rei'],['로잘린','C급 · 점화','자연적으로 꺼지지 않는 불꽃을 생성한다','예민, 자존심, 질투','몰락 귀족 출신, 가보인 레이피어를 사용','amber','rosalin'],['세레스','B급 · 인벤토리','물체를 아공간에 보관하고 자유롭게 꺼낼 수 있다','능글맞음, 여유, 집요함','전용 메이드, 매우 쎔','gray','seres'],['아리아','B급 · 결속','대상의 상처와 고통을 완전히 자신에게 이전할 수 있다','활발, 헌신, 집착','마조히스트, 자신의 이능을 사용하는 것을 좋아함','pink','aria'],['오필리아','A급 · 각혈식','생명체의 체외에 있는 피를 결정처럼 굳혀 사용할 수 있다','명랑, 장난기, 잔혹함','흡혈귀, 리셀의 동생, 중증 시스콤','crimson','ophilia']];
const characters=characterData.map((d,i)=>({name:d[0],role:d[1],ability:d[2],personality:d[3],etc:d[4],tone:d[5],fallback:`assets/${d[6]}.svg`,id:String(i+1).padStart(2,'0')}));
const $=s=>document.querySelector(s),grid=$('#characterGrid'),modal=$('#profileModal'),viewer=$('#imageViewer');

const abilityData=[
  ['01','특징','FEATURES','보통 아카데미 입학 후 이능석을 사용하여 발현한다.\n드물게 자연 발현하거나, 태어날 때부터 발현된 경우도 존재한다.\n이능석을 사용하면 발현에 실패하지 않는다.\n이능석은 사용자의 재능과 의지에 따라 이능을 발현시킨다.\n이능석으로 이능의 등급과 능력을 확인할 수 있다.\n수련을 통해 강해질 수 있지만 발현된 형태에서 크게 벗어나지는 못한다.\n둘 이상의 계열이 결합된 복합 계열이 발현될 수 있다.'],
  ['02','등급','RANK','F — 정상적으로 발현되지 못한 실패작\nD — 거의 쓸모없는 이능\nC — 평범한 수준의 이능\nB — 평균 이상의 강력한 이능\nA — 압도적인 성능을 가진 강한 이능\nS — 상식을 초월한 최상위 이능'],
  ['03','계열','TYPE','원소 — 불, 얼음 등 자연적인 힘을 다루는 계열\n신체 — 회복, 신체 변형 등 신체 능력과 관련된 계열\n정신 — 염력, 독심술 등 정신적인 영향을 주는 계열\n특수 — 시간, 공간 등 기존 계열에 포함되지 않는 특이한 능력'],
];
const abilityGrid=$('#abilityGrid');
abilityGrid.innerHTML=abilityData.map(([id,title,en,desc])=>`<article class="ability-card">
  <span class="ability-number">${id}</span>
  <div class="ability-card-heading"><small>${en}</small><h2>${title}</h2></div>
  <p>${desc}</p>
</article>`).join('');

const image=(src,fallback,alt)=>`<img src="${src}" onerror="this.onerror=null;this.src='${fallback}'" alt="${alt}">`;
grid.innerHTML=characters.map((c,i)=>`<button class="character-card ${c.tone}" data-index="${i}"><span class="card-number">${c.id}</span><span class="portrait">${image(`my-images/${c.id}-profile.webp`,c.fallback,`${c.name} 프로필`)}</span><strong>${c.name}</strong><small>${c.role}</small><em>프로필 보기 →</em></button>`).join('');
function glitchRedact(text, extraClass=''){return `<span class="glitch-redact ${extraClass}" data-text="${text.replace(/"/g,'&quot;')}"><span class="glitch-original">${text}</span><span class="glitch-noise" aria-hidden="true">█▒░▓ ERROR ░▒█</span></span>`;}
function openProfile(i){const c=characters[i],p=`my-images/${c.id}-profile.webp`,labels=['부끄럼','삐짐','슬픔','화남','경멸','놀람','이능'];
const isEll=c.name==='엘';
$('#profileName').textContent=c.name;
const realNames={'리셀':'리셀 폰 카르슈타인','오필리아':'오필리아 폰 카르슈타인'};

if(realNames[c.name]){$('#profileRealName').textContent=realNames[c.name];$('#profileRealName').hidden=false;}else{$('#profileRealName').hidden=true;$('#profileRealName').textContent='';}
$('#profileRole').innerHTML=isEll?`${glitchRedact('S급')} · 리와인드`:c.role;
$('#profileAbility').innerHTML=isEll?glitchRedact(c.ability):c.ability;
$('#profilePersonality').textContent=c.personality;
if(isEll){const marker='나머지는 비밀이야'; const pos=c.etc.indexOf(marker); $('#profileEtc').innerHTML=pos>=0?`${c.etc.slice(0,pos+marker.length)}${glitchRedact(c.etc.slice(pos+marker.length),'glitch-tail')}`:c.etc;}else{$('#profileEtc').textContent=c.etc;}$('#detailImage').src=p;$('#detailImage').onerror=()=>{$('#detailImage').src=c.fallback};$('.profile-detail').className=`profile-detail ${c.tone}`;$('#galleryTitle').textContent=`${c.name}의 특수 이미지`;$('#galleryGrid').innerHTML=labels.map((label,index)=>{const n=index+1;return `<button class="gallery-image image-${n}" data-src="my-images/${c.id}-${n}.webp" data-fallback="${c.fallback}" data-caption="${c.name} · ${label}">${image(`my-images/${c.id}-${n}.webp`,c.fallback,`${c.name} ${label}`)}<span>${label}</span></button>`}).join('');modal.classList.add('open');modal.setAttribute('aria-hidden','false');}
function closeProfile(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}function closeViewer(){viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true')}
grid.onclick=e=>{const card=e.target.closest('.character-card');if(card)openProfile(card.dataset.index)};$('#galleryGrid').onclick=e=>{const b=e.target.closest('.gallery-image');if(!b)return;const img=$('#viewerImage');img.src=b.dataset.src;img.onerror=()=>{img.src=b.dataset.fallback};$('#viewerCaption').textContent=b.dataset.caption;viewer.classList.add('open');viewer.setAttribute('aria-hidden','false')};document.querySelectorAll('[data-close]').forEach(x=>x.onclick=closeProfile);document.querySelectorAll('[data-viewer-close]').forEach(x=>x.onclick=closeViewer);document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeViewer();closeProfile()}});
const landing=$('#landing'),main=$('#main'),nav=[...document.querySelectorAll('.nav-item')],panels=[...document.querySelectorAll('.panel')];function show(name){nav.forEach(x=>x.classList.toggle('active',x.dataset.section===name));panels.forEach(x=>x.classList.toggle('active',x.id===name))}landing.onclick=()=>{landing.classList.add('hide');setTimeout(()=>{main.classList.add('show');show('characters')},220)};nav.forEach(x=>x.onclick=()=>show(x.dataset.section));$('#back').onclick=()=>{closeProfile();main.classList.remove('show');setTimeout(()=>landing.classList.remove('hide'),300)};
