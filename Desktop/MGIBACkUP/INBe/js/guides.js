// Render sample guides and enable filtering
(function(){
  const guides = [
    // Newcomers & Individuals
    { id:'lease-basics', title:'Lease basics in Belgium', topic:'housing', audiences:['newcomer','skilled','families','students'], summary:'Types of leases, deposits, indexation, inspections.', level:'starter' },
    { id:'commune-registration', title:'Commune registration steps', topic:'daily', audiences:['newcomer','skilled','asylum','students','families'], summary:'Documents, appointments, residence card timeline.', level:'starter' },
    { id:'mutuality-choose', title:'Choosing a mutuality (health fund)', topic:'health', audiences:['newcomer','skilled','asylum','students','families'], summary:'What mutuelles do, coverage, how to register.', level:'starter' },
    { id:'bank-telecom-setup', title:'Bank and telecom setup', topic:'daily', audiences:['newcomer','skilled','students'], summary:'Open a bank account, mobile and internet contracts.', level:'starter' },

    // Skilled Workers & Experts
    { id:'work-permit-overview', title:'Work and residence permits overview', topic:'work', audiences:['skilled'], summary:'Main permits, requirements, renewals, timelines.', level:'starter' },
    { id:'belgium-tax-basics', title:'Belgium tax basics for professionals', topic:'daily', audiences:['skilled'], summary:'Withholding tax, communal tax, deductions, deadlines.', level:'starter' },
    { id:'networking-belgium', title:'Networking in Belgium', topic:'daily', audiences:['skilled'], summary:'Meetups, hubs, co-working, associations, LinkedIn tips.', level:'starter' },

    // Asylum Seekers & Refugees
    { id:'legal-support-overview', title:'Legal support overview', topic:'daily', audiences:['asylum'], summary:'Key institutions, seeking counsel, documentation.', level:'starter' },
    { id:'language-pathways', title:'Language learning pathways', topic:'education', audiences:['asylum','newcomer','students'], summary:'Dutch/French classes, integration courses, resources.', level:'starter' },
    { id:'social-security-access', title:'Accessing social security', topic:'health', audiences:['asylum'], summary:'Registration flow, primary benefits, support channels.', level:'starter' },

    // International Students
    { id:'student-registration', title:'Student commune registration', topic:'daily', audiences:['students'], summary:'Where to register, documents, timelines, residence card.', level:'starter' },
    { id:'student-housing', title:'Affordable student housing', topic:'housing', audiences:['students'], summary:'Kots, dorms, contracts, inspection lists.', level:'starter' },
  { id:'transport-passes-brussels', title:'Transport passes in Brussels (STIB/MIVB)', topic:'daily', audiences:['students','newcomer','skilled','families'], regions:['brussels'], summary:'Monthly and annual passes, student discounts, where to buy.', level:'starter' },
  { id:'transport-passes-flanders', title:'Transport passes in Flanders (De Lijn)', topic:'daily', audiences:['students','newcomer','skilled','families'], regions:['flemish'], summary:'Subscription types, student discounts, regional coverage.', level:'starter' },
  { id:'transport-passes-wallonia', title:'Transport passes in Wallonia (TEC)', topic:'daily', audiences:['students','newcomer','skilled','families'], regions:['walloon'], summary:'TEC card options, fares, student offers, purchase points.', level:'starter' },

    // Families & Dependents
    { id:'childcare-options', title:'Childcare options', topic:'education', audiences:['families'], summary:'Crèches, after-school care, enrollment, subsidies.', level:'starter' },
    { id:'school-choices', title:'School choices (local & international)', topic:'education', audiences:['families'], summary:'Systems, admissions, language support, key timelines.', level:'starter' },
    { id:'family-allowances', title:'Family allowances overview', topic:'daily', audiences:['families'], summary:'Eligibility, application steps, payments, resources.', level:'starter' },
  ];

  const grid = document.getElementById('guides-grid');
  if (!grid) return;

  function tagLabel(topic){
    const map = { housing:'Housing', work:'Work & permits', health:'Healthcare', education:'Education', daily:'Daily life' };
    return map[topic] || topic;
  }

  function audienceLabel(a){
    const map = { newcomer:'Newcomers', skilled:'Skilled', asylum:'Asylum', students:'Students', families:'Families' };
    return map[a] || a;
  }

  function regionLabel(r){
    const map = { brussels:'Brussels', flemish:'Flanders', walloon:'Wallonia' };
    return map[r] || r;
  }

  function render(list){
    if(!list.length){
      grid.innerHTML = '<p style="grid-column:1/-1">No guides match your filters yet.</p>';
      return;
    }
    grid.innerHTML = list.map(g => {
      const audiences = (g.audiences||[]).map(a=>`<span class="tag audience-${a}">${audienceLabel(a)}</span>`).join('');
      const regions = (g.regions||[]).map(r=>`<span class="tag region-${r}">${regionLabel(r)}</span>`).join('');
      return `
      <article class="card guide-card" data-topic="${g.topic}">
        <div class="meta-line">${audiences}<span class="tag topic-${g.topic}">${tagLabel(g.topic)}</span>${regions}</div>
        <h3>${g.title}</h3>
        <p>${g.summary}</p>
        <a class="btn" href="guide.html?id=${g.id}&topic=${g.topic}">Open guide</a>
      </article>`;
    }).join('');
  }

  function applyFilters(topicValue, audienceValue, regionValue){
    const t = topicValue || 'all';
    const a = audienceValue || 'all';
    const r = regionValue || 'all';
    let filtered = guides;
    if (t !== 'all') filtered = filtered.filter(g=>g.topic===t);
    if (a !== 'all') filtered = filtered.filter(g=>Array.isArray(g.audiences) && g.audiences.includes(a));
    if (r !== 'all') filtered = filtered.filter(g=>!Array.isArray(g.regions) || g.regions.includes(r));
    render(filtered);
  }

  // Init from URL if present
  const url = new URL(window.location.href);
  const focus = url.searchParams.get('focus'); // topic
  const audience = url.searchParams.get('audience');
  const region = url.searchParams.get('region'); // brussels | flemish | walloon
  const topicSelect = document.getElementById('guide-filter');
  const audienceSelect = document.getElementById('audience-filter');
  const regionSelect = document.getElementById('region-filter');
  if (topicSelect && audienceSelect){
    if (focus && ['housing','work','health','education','daily'].includes(focus)){
      topicSelect.value = focus;
    }
    if (audience && ['newcomer','skilled','asylum','students','families'].includes(audience)){
      audienceSelect.value = audience;
    }
    if (regionSelect && region && ['brussels','flemish','walloon'].includes(region)){
      regionSelect.value = region;
    }
    const currentRegion = regionSelect ? regionSelect.value : (region || 'all');
    topicSelect.addEventListener('change', ()=>applyFilters(topicSelect.value, audienceSelect.value, currentRegion === 'all' ? (regionSelect?regionSelect.value:'all') : regionSelect.value));
    audienceSelect.addEventListener('change', ()=>applyFilters(topicSelect.value, audienceSelect.value, regionSelect?regionSelect.value:'all'));
    if(regionSelect){
      regionSelect.addEventListener('change', ()=>applyFilters(topicSelect.value, audienceSelect.value, regionSelect.value));
    }
    applyFilters(topicSelect.value, audienceSelect.value, currentRegion);
  }
})();
