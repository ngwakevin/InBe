/* Preview Plan Gating (Layer 1)
 * Client-only demo for dev branch.
 * Reads session.json (simulated) and masks features above current plan level.
 * Plan order (ascending): starter(0), plus(1), pro(2), org(3)
 */
(function() {
  const PLAN_ORDER = ["starter","plus","pro","org"]; // ascending
  const LEVEL = Object.fromEntries(PLAN_ORDER.map((p,i)=>[p,i]));
  const SESSION_URL = 'session.json';
  const ATTR = 'data-required-plan';
  const DEV_ONLY = true; // safeguard

  function isDevPreview() {
    // Activate only if current location contains 'dev' branch indicator OR ?preview=1
    return /dev/i.test(window.location.hostname) || /[?&]preview=1/.test(window.location.search);
  }

  async function loadSession() {
    try {
      const res = await fetch(SESSION_URL, {cache:'no-store'});
      if(!res.ok) throw new Error(res.status + ' ' + res.statusText);
      return await res.json();
    } catch(e) {
      console.warn('[gating] session load failed, defaulting to starter', e);
      return { plan: 'starter', planLevel: 0 };
    }
  }

  function lockElement(el, requiredPlan, userLevel) {
    if (el.classList.contains('plan-locked')) return;
    el.classList.add('plan-locked');
    const overlay = document.createElement('div');
    overlay.className = 'lock-overlay';
    overlay.innerHTML = `🔒 <span>Requires ${requiredPlan.charAt(0).toUpperCase()+requiredPlan.slice(1)} plan</span>`;
    el.appendChild(overlay);
    // Add subtle blur + aria info
    el.setAttribute('aria-disabled','true');
    el.setAttribute('data-locked','true');
    el.tabIndex = -1;
    // Optional: click overlay to show upgrade modal placeholder
    overlay.addEventListener('click', () => {
      alert(`This feature needs the ${requiredPlan} plan. (Preview gating demo)`);
    });
  }

  function process(session) {
    const userPlan = session.plan || 'starter';
    const userLevel = LEVEL[userPlan] ?? 0;
    document.documentElement.setAttribute('data-user-plan', userPlan);

    const gated = document.querySelectorAll('['+ATTR+']');
    gated.forEach(el => {
      const required = el.getAttribute(ATTR).trim().toLowerCase();
      const reqLevel = LEVEL[required];
      if (reqLevel == null) return; // unknown label
      if (reqLevel > userLevel) {
        lockElement(el, required, userLevel);
      }
    });
  }

  function ready(fn){
    if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }

  if (DEV_ONLY && !isDevPreview()) {
    console.info('[gating] Skipped (not dev preview context)');
    return;
  }

  ready(async () => {
    const session = await loadSession();
    process(session);
  });
})();
