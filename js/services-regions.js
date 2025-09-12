/* Region Services Explorer: builds primary region cards with service category sub-cards and optional full list toggle */
(async function(){
  const container = document.getElementById('region-services');
  if(!container) return;
  const fullListWrap = document.getElementById('services-full-list');
  const listWrapper = document.getElementById('services-list-wrapper');
  const listRegionLabel = document.getElementById('list-region-label');

  let raw;
  try{
    const res = await fetch('data/places.json');
    if(!res.ok) throw new Error('Bad status');
    raw = await res.json();
  }catch(e){
    // Fallback inline dataset (subset) so page still works offline or on file://
    raw = {
      categories:{
        commune:{label:'Commune Offices',icon:'🏛'},
        hospital:{label:'Hospitals',icon:'🩺'},
        pharmacy:{label:'Pharmacies',icon:'💊'},
        school:{label:'Schools',icon:'🎓'},
        transport:{label:'Transport',icon:'🚉'}
      },
      places:[
        {id:'commune_brussels',name:'Brussels City Hall',category:'commune',address:'Grand Place 1, 1000 Bruxelles'},
        {id:'hospital_stluc',name:'Cliniques Saint-Luc',category:'hospital',address:'Avenue Hippocrate 10, 1200 Bruxelles'},
        {id:'pharmacy_grandplace',name:'Pharmacy Grand Place',category:'pharmacy',address:'Rue au Beurre 46, 1000 Bruxelles'},
        {id:'school_ulsb',name:'Université libre de Bruxelles',category:'school',address:'Avenue Franklin Roosevelt 50, 1050 Bruxelles'},
        {id:'transport_central',name:'Bruxelles-Central Station',category:'transport',address:"Carrefour de l'Europe, 1000 Bruxelles"}
      ]
    };
  }

  // Map region key to meta and categories subset
  const regions = [
    { key:'flemish', title:'Flemish Region', icon:'assets/icon-region-flemish.svg', desc:'Dutch administration, De Lijn transport, network of hospitals & language courses.', focus:['commune','hospital','pharmacy','school','transport'] },
    { key:'brussels', title:'Brussels-Capital', icon:'assets/icon-region-brussels.svg', desc:'Bilingual commune desks, STIB/MIVB transport, major hospital cluster.', focus:['commune','hospital','pharmacy','school','transport'] },
    { key:'walloon', title:'Walloon Region', icon:'assets/icon-region-walloon.svg', desc:'French-language administration, TEC transport, growing healthcare network.', focus:['commune','hospital','pharmacy','school','transport'] }
  ];

  // Build a region column: main region card + vertical list of subcards (service names only)
  function buildRegionCard(region){
    const el = document.createElement('article');
    el.className = 'region-hierarchy';
    el.dataset.region = region.key;
    el.innerHTML = `
      <div class="region-main" aria-label="${region.title}">
        <h3><span class="region-main__icon"><img src="${region.icon}" alt="" width="52" height="52"></span><span class="region-main__label">${region.title}</span></h3>
      </div>
      <div class="region-children" role="list" aria-label="Core services in ${region.title}">
        ${region.focus.map(cat => {
          const meta = raw.categories[cat];
          return `<a role="listitem" class="region-child" data-region="${region.key}" data-cat="${cat}" href="#" aria-label="${meta.label} in ${region.title}"><span class="svc-icon">${meta.icon||''}</span><span class="svc-label">${meta.label}</span></a>`; }).join('')}
      </div>`;
    el.addEventListener('click', e => {
      const link = e.target.closest('a.region-child');
      if(!link) return;
      e.preventDefault();
      const {region:key, cat} = link.dataset;
      showFullList(key, cat);
    });
    return el;
  }

  function showFullList(regionKey, cat){
    const regionMeta = regions.find(r=>r.key===regionKey);
    const catMeta = raw.categories[cat];
    if(!regionMeta||!catMeta) return;
    listRegionLabel.style.display='inline-block';
    listRegionLabel.textContent = regionMeta.title + ' – ' + catMeta.label;
    listWrapper.innerHTML = '';
    // Group places (only ones with category cat for now; could filter lat bounds later)
    const catPlaces = raw.places.filter(p=>p.category===cat);
    const section = document.createElement('div');
    section.className='service-category';
    section.innerHTML = `<h4>${catMeta.icon||''} ${catMeta.label}</h4><ul class="place-items">${catPlaces.map(p=>`<li><span class="name">${p.name}</span><span class="addr">${p.address}</span></li>`).join('')}</ul>`;
    listWrapper.appendChild(section);
  fullListWrap.hidden = false;
    fullListWrap.scrollIntoView({behavior:'smooth'});
  }

  // Build all regions
  const frag = document.createDocumentFragment();
  regions.forEach(r=>frag.appendChild(buildRegionCard(r)));
  container.innerHTML='';
  container.appendChild(frag);

  // Toggle removed per request; list only appears when a service is selected.
})();
