/* Essential Services Map MVP */
// Loads places from data/places.json and renders Leaflet map with category filters & geolocation.

const state = {
  map: null,
  markers: [],
  categories: new Set(['commune','hospital','pharmacy','school','transport']),
  data: null
};

function qs(sel){return document.querySelector(sel);} // helper

async function loadData(){
  const res = await fetch('data/places.json');
  state.data = await res.json();
}

function initMap(){
  state.map = L.map('services-map',{scrollWheelZoom:true}).setView([50.8467,4.3525],7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(state.map);
}

function clearMarkers(){
  state.markers.forEach(m=> state.map.removeLayer(m));
  state.markers = [];
}

function renderList(filtered){
  const list = qs('#place-list');
  if(!list) return;
  list.innerHTML = '';
  filtered.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.name}</strong><br><span class="addr">${p.address}</span>`;
    li.addEventListener('click', ()=> {
      state.map.setView([p.lat,p.lng], 15);
    });
    list.appendChild(li);
  });
}

function renderMarkers(){
  if(!state.data) return;
  clearMarkers();
  const filtered = state.data.places.filter(p => state.categories.has(p.category));
  filtered.forEach(p => {
    const cat = state.data.categories[p.category];
    const marker = L.marker([p.lat, p.lng]);
    marker.addTo(state.map).bindPopup(`<strong>${p.name}</strong><br>${cat.label}<br><small>${p.address}</small>`);
    state.markers.push(marker);
  });
  renderList(filtered);
}

function buildCategoryControls(){
  const wrap = qs('#category-controls');
  if(!wrap || !state.data) return;
  wrap.innerHTML = '';
  Object.entries(state.data.categories).forEach(([key, meta]) => {
    const id = `cat-${key}`;
    const label = document.createElement('label');
    label.className = 'cat-pill';
    label.innerHTML = `<input type="checkbox" id="${id}" value="${key}" checked> <span>${meta.icon || ''} ${meta.label}</span>`;
    label.querySelector('input').addEventListener('change', (e)=>{
      if(e.target.checked) state.categories.add(key); else state.categories.delete(key);
      renderMarkers();
    });
    wrap.appendChild(label);
  });
}

function setupGeolocation(){
  const btn = qs('#geo-btn');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    if(!navigator.geolocation){
      btn.textContent = 'Geolocation not supported';
      btn.disabled = true;
      return;
    }
    btn.disabled = true; btn.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      state.map.setView([latitude, longitude], 13);
      L.circleMarker([latitude, longitude], {radius:8,color:'#22c55e',fillColor:'#22c55e',fillOpacity:0.8}).addTo(state.map).bindPopup('You are here');
      btn.textContent = 'Centered on you';
    }, err => {
      console.warn(err);
      btn.textContent = 'Location denied';
    }, {enableHighAccuracy:true, timeout:10000});
  });
}

async function boot(){
  if(!qs('#services-map')) return; // not on map page
  await loadData();
  initMap();
  buildCategoryControls();
  renderMarkers();
  setupGeolocation();
}

document.addEventListener('DOMContentLoaded', boot);
