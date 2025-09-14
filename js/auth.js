/* Lightweight MSAL auth bootstrap
 * Injects Sign In / Sign Out into header nav.
 */
(function(){
  const MSAL_CDN = 'https://alcdn.msauth.net/browser/2.38.0/js/msal-browser.min.js';

  function loadScript(src){
    return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});
  }

  async function init(){
    if(!window.msalConfig){console.warn('[auth] msalConfig missing');return;}
    if(!window.msal){await loadScript(MSAL_CDN);}    
    const msalInstance = new msal.PublicClientApplication(msalConfig);

    // Handle redirect response if any
    try { await msalInstance.handleRedirectPromise(); } catch(e){ console.error('[auth] redirect error', e); }

    let account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
    if(account){ msalInstance.setActiveAccount(account); }

    const nav = document.querySelector('.site-nav');
    if(!nav) return;

    // Ensure placeholder container
    let authContainer = document.getElementById('auth-entry');
    if(!authContainer){
      authContainer = document.createElement('div');
      authContainer.id = 'auth-entry';
      authContainer.style.display='flex';
      authContainer.style.alignItems='center';
      nav.appendChild(authContainer);
    }

    function getStoredPlan(){
      return localStorage.getItem('inbe_user_plan');
    }
    function setStoredPlan(plan){
      if(plan) localStorage.setItem('inbe_user_plan', plan);
    }
    function render(){
      authContainer.innerHTML='';
      account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
      if(!account){
        const signIn = document.createElement('a');
        signIn.href='#';
  signIn.textContent='Sign Up / In';
        signIn.addEventListener('click', (e)=>{e.preventDefault(); login();});
        authContainer.appendChild(signIn);
      } else {
        const greet = document.createElement('span');
        const planLabel = getStoredPlan();
        greet.textContent = 'Hi, ' + (account.name?.split(' ')[0] || 'User') + (planLabel? ' · '+planLabel:'');
        greet.style.fontWeight='600';
        greet.style.marginRight='10px';
        const signOut = document.createElement('a');
        signOut.href='#';
        signOut.textContent='Sign Out';
        signOut.addEventListener('click',(e)=>{e.preventDefault(); logout();});
        authContainer.appendChild(greet);
        authContainer.appendChild(signOut);
      }
    }

    async function login(){
      try {
        await msalInstance.loginPopup(loginRequest);
        render();
      } catch(e){ console.error('[auth] login failed', e); }
    }

    // Public helper for plan-based login (called from pricing page)
    window.inbeAuth = window.inbeAuth || {};
  window.inbeAuth.loginWithPlan = async function(plan){
      try {
        console.log('[auth] plan button clicked ->', plan);
        localStorage.setItem('inbe_pending_plan', plan);
    // Use the configured authority (user flow) explicitly
    await msalInstance.loginPopup({ ...loginRequest, authority: msalConfig.auth.authority });
        const pending = localStorage.getItem('inbe_pending_plan');
        if(pending){ setStoredPlan(pending); localStorage.removeItem('inbe_pending_plan'); }
        render();
      }catch(e){
        console.error('[auth] plan login failed', e);
        // Quick user feedback so it doesn't look like "nothing happened"
        alert('Sign up / sign in could not start. Open the browser console for details (popup blocked or config issue).');
      }
    };

    // If login already present and a pendingPlan was set pre-login (edge case)
    (function syncPending(){
      if(msalInstance.getActiveAccount()){
        const pending = localStorage.getItem('inbe_pending_plan');
        if(pending){ setStoredPlan(pending); localStorage.removeItem('inbe_pending_plan'); }
      }
    })();

    function logout(){
      const account = msalInstance.getActiveAccount();
      msalInstance.logoutPopup({ account });
    }

    // Optionally fetch Graph basic profile silently (not required just for name)
    async function ensureProfile(){
      if(!msalInstance.getActiveAccount()) return;
      try{
        const result = await msalInstance.acquireTokenSilent(loginRequest);
        // We could call Graph here if needed.
        return result;
      }catch(e){
        if(e instanceof msal.InteractionRequiredAuthError){
          try{ await msalInstance.acquireTokenPopup(loginRequest);}catch(_){}
        }
      }
    }

    render();
    ensureProfile();

    // Fallback global delegation for plan buttons (in case pricing page script not executed)
    document.addEventListener('click', (evt)=>{
      const btn = evt.target.closest('[data-plan-select]');
      if(!btn) return;
      const plan = btn.getAttribute('data-plan-select');
      if(window.inbeAuth && typeof window.inbeAuth.loginWithPlan==='function'){
        window.inbeAuth.loginWithPlan(plan);
      } else {
        try{ localStorage.setItem('inbe_pending_plan', plan); }catch(e){}
        login();
      }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
