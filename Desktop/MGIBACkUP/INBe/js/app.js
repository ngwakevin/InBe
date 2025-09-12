// InBeas global JS: mobile nav, year, simple onboarding
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav){
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Region dropdown selection handling
  // Region panel dropdown
  const regionWrapper = document.querySelector('.region-menu-wrapper');
  if(regionWrapper){
    const trigger = regionWrapper.querySelector('.region-trigger');
    const panel = regionWrapper.querySelector('.region-panel');
    const regionLinks = panel.querySelectorAll('a[data-region]');
    const updateActive = ()=>{
      const hash = window.location.hash.replace('#','');
      regionLinks.forEach(l=>{
        l.classList.toggle('active', hash && l.dataset.region === hash);
      });
    };
    updateActive();
    window.addEventListener('hashchange', updateActive);
    regionLinks.forEach(l=>{
      l.addEventListener('click', ()=>{
        panel.classList.remove('open');
        trigger.setAttribute('aria-expanded','false');
      });
    });
    trigger.addEventListener('click', (e)=>{
      e.preventDefault();
      const open = panel.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e)=>{
      if(!regionWrapper.contains(e.target)){
        panel.classList.remove('open');
        trigger.setAttribute('aria-expanded','false');
      }
    });
  }

  // onboarding form removed
})();
