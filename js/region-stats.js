// Animated population counter logic
(()=>{
  const counters=[...document.querySelectorAll('.pop-counter[data-target]')];
  if(!counters.length) return;
  const abbr=n=> n>=1_000_000 ? (n/1_000_000).toFixed(1).replace(/\.0$/,'')+'M' : n>=1_000 ? (n/1_000).toFixed(1).replace(/\.0$/,'')+'K' : n.toString();
  function animate(el){
    const target=parseInt(el.dataset.target,10); if(!target) return; const start=performance.now(); const dur=1600; const parent=el.closest('.region-pop'); if(parent) parent.classList.add('animating');
    function frame(now){
      const p=Math.min(1,(now-start)/dur); const eased=1-Math.pow(1-p,3); const current=Math.floor(target*eased);
      el.textContent=el.dataset.abbr==='true'?abbr(current):current.toLocaleString();
      if(p<1) requestAnimationFrame(frame); else { if(parent) parent.classList.remove('animating'); el.textContent=el.dataset.abbr==='true'?abbr(target):target.toLocaleString(); }
    }
    requestAnimationFrame(frame);
  }
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animate(e.target);io.unobserve(e.target);}})},{threshold:.35});
  counters.forEach(c=>io.observe(c));
})();