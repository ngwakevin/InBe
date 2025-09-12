// Builds improved circular service ecosystem with two rings (core + upcoming)
(function(){
  const eco=document.getElementById('service-eco');
  if(!eco) return;
  const circle=eco.querySelector('.eco-circle');
  const host=eco.querySelector('.eco-items');
  const svg=eco.querySelector('.eco-lines');

  const data=[
    {key:'onboarding', label:'Personalized Onboarding', url:'checklist.html', ring:'core'},
    {key:'housing', label:'Housing Hub', url:'housing.html', ring:'core'},
    {key:'essential', label:'Essential Services Explorer', url:'map.html', ring:'core'},
    {key:'guides', label:'Region Guides', url:'guides.html', ring:'core'},
    {key:'articles', label:'Knowledge Articles', ring:'upcoming'},
    {key:'coaching', label:'Relocation Coaching', ring:'upcoming'}
  ];

  // Sort so core first (top arc) then upcoming (lower arc)
  const core=data.filter(d=>d.ring==='core');
  const upcoming=data.filter(d=>d.ring==='upcoming');

  function build(){
    host.innerHTML='';
    [...core, ...upcoming].forEach(d=>{
      const el = d.url ? document.createElement('a') : document.createElement('span');
      el.className='eco-item'+(d.ring==='upcoming'?' upcoming':'');
      el.dataset.key=d.key;
      el.dataset.ring=d.ring;
      el.textContent=d.label;
      if(d.url) el.href=d.url;
      host.appendChild(el);
    });
  }
  build();

  function position(){
    const items=[...host.querySelectorAll('.eco-item')];
    const coreItems=items.filter(i=>i.dataset.ring==='core');
    const upItems=items.filter(i=>i.dataset.ring==='upcoming');
    // Angles: core along upper 210deg arc, upcoming along lower-right 150deg arc
    placeArc(coreItems, -130, 80, 0.46);  // startAngle, sweep, spread
    placeArc(upItems, 40, 140, 0.58);
  }

  function placeArc(nodes,startDeg,sweepDeg,spread){
    if(!nodes.length) return;
    nodes.forEach((el,i)=>{
      const angle=startDeg + (nodes.length===1?0:(i/(nodes.length-1))*sweepDeg);
      el.style.setProperty('--angle', angle+'deg');
      el.style.setProperty('--spread', spread.toString());
    });
  }

  function draw(){
    if(!svg) return;
    svg.innerHTML='';
    const rect=circle.getBoundingClientRect();
    svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
    svg.setAttribute('width',rect.width);
    svg.setAttribute('height',rect.height);
    const cx=rect.width/2, cy=rect.height/2;
    const items=[...host.querySelectorAll('.eco-item')];
    items.forEach((el,i)=>{
      const r=el.getBoundingClientRect();
      let ex=r.left + r.width/2 - rect.left;
      let ey=r.top + r.height/2 - rect.top;
      const dx=ex-cx, dy=ey-cy;
      const spread=parseFloat(getComputedStyle(el).getPropertyValue('--spread')||'0.5');
      const shrink=spread*0.9;
      ex=cx+dx*shrink; ey=cy+dy*shrink;
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      const mx=(cx+ex)/2, my=(cy+ey)/2;
      path.setAttribute('d',`M ${cx} ${cy} Q ${mx} ${my} ${ex} ${ey}`);
      path.setAttribute('class','eco-connector');
      path.dataset.key=el.dataset.key;
      svg.appendChild(path);
    });
  }

  function refresh(){position();draw();}
  refresh();

  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){eco.classList.add('animate');io.disconnect();}})},{threshold:.3});
  io.observe(circle);

  window.addEventListener('resize',()=>{refresh();});
  window.addEventListener('orientationchange',refresh);

  // Hover highlight
  circle.addEventListener('pointerover',e=>{
    const target=e.target.closest('.eco-item');
    svg.querySelectorAll('.eco-connector').forEach(p=>p.classList.toggle('active', target && p.dataset.key===target.dataset.key));
  });
  circle.addEventListener('pointerout',()=>{svg.querySelectorAll('.eco-connector').forEach(p=>p.classList.remove('active'));});
})();
