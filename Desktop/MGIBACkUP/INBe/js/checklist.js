// Dynamic rendering for onboarding checklist hierarchical cards
// Data model for extensibility
const ONBOARDING_CARDS = [
  {
    id: 'commune',
    level: 'sub',
    title: 'Commune Registration',
    desc: 'Book appointment, register address & obtain residency certificate.',
    icon: 'assets/icon-onboarding.svg',
    href: '#commune',
    status: 'active',
    tags: ['identity','address']
  },
  {
    id: 'health',
    level: 'sub',
    title: 'Health Insurance',
    desc: 'Select a mutuality, enroll, receive SIS/ISI+ card & stickers.',
    icon: 'assets/icon-onboarding.svg',
    href: '#health',
    status: 'active',
    tags: ['health']
  },
  {
    id: 'bank',
    level: 'sub',
    title: 'Bank Account',
    desc: 'Compare providers, open account, activate cards & digital access.',
    icon: 'assets/icon-onboarding.svg',
    href: '#bank',
    status: 'active',
    tags: ['finance']
  },
  {
    id: 'utilities',
    level: 'sub',
    title: 'Utilities Setup',
    desc: 'Electricity, gas & internet essentials after address confirmation.',
    icon: 'assets/icon-onboarding.svg',
    href: '#utilities',
    status: 'soon',
    tags: ['home']
  }
];

function renderOnboardingCards(){
  const container = document.getElementById('onboarding-subcards');
  if(!container) return;
  const frag = document.createDocumentFragment();
  ONBOARDING_CARDS.forEach(card => {
    const a = document.createElement('a');
    a.className = 'card--sub';
    a.setAttribute('role','listitem');
    a.href = card.href;
    a.setAttribute('data-id', card.id);
    if(card.status === 'soon'){ a.dataset.status = 'soon'; }
    // Icon
    const img = document.createElement('img');
    img.className = 'card__icon';
    img.src = card.icon;
    img.alt = card.title.split(' ')[0];
    // Badge if soon or new
    if(card.status === 'soon'){
      const badge = document.createElement('span');
      badge.className = 'card-badge';
      badge.textContent = 'SOON';
      a.appendChild(badge);
    } else if(card.status === 'new') {
      const badge = document.createElement('span');
      badge.className = 'card-badge';
      badge.textContent = 'NEW';
      a.appendChild(badge);
    }
    const h4 = document.createElement('h4');
    h4.className = 'card__title';
    h4.textContent = card.title;
    const p = document.createElement('p');
    p.className = 'card__desc';
    p.textContent = card.desc;
    const cta = document.createElement('span');
    cta.className = 'card__cta';
    cta.textContent = card.status === 'soon' ? 'Coming soon' : 'Open steps';

    a.appendChild(img);
    a.appendChild(h4);
    a.appendChild(p);
    a.appendChild(cta);
    frag.appendChild(a);
  });
  container.innerHTML = '';
  container.appendChild(frag);
}

document.addEventListener('DOMContentLoaded', renderOnboardingCards);
