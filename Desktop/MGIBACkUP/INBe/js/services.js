/* Static Essential Services listing (no map) */
(async function(){
  const container = document.getElementById('services-groups');
  if(!container) return;
  try{
    const res = await fetch('data/places.json');
    const data = await res.json();
    const grouped = Object.fromEntries(Object.keys(data.categories).map(k=>[k,[]]));
    data.places.forEach(p=>{ if(grouped[p.category]) grouped[p.category].push(p); });
    Object.entries(data.categories).forEach(([key, meta]) => {
      const places = grouped[key];
      const section = document.createElement('section');
      section.className = 'service-category';
      section.setAttribute('aria-labelledby',`cat-${key}`);
      section.innerHTML = `
        <h2 id="cat-${key}">${meta.icon || ''} ${meta.label}</h2>
        <p class="cat-meta">${places.length} location${places.length!==1?'s':''} listed</p>
        <ul class="place-items">${places.map(p=>`
          <li>
            <span class="name">${p.name}</span>
            <span class="addr">${p.address}</span>
          </li>`).join('') || '<li class="empty-note">No entries yet.</li>'}
        </ul>`;
      container.appendChild(section);
    });
  }catch(e){
    container.innerHTML = '<p class="empty-note">Failed to load services.</p>';
    console.error(e);
  }
})();
