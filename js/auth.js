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

    function render(){
      authContainer.innerHTML='';
      account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
      if(!account){
        const signIn = document.createElement('a');
        signIn.href='#';
        signIn.textContent='Sign In';
        signIn.addEventListener('click', (e)=>{e.preventDefault(); login();});
        authContainer.appendChild(signIn);
      } else {
        const greet = document.createElement('span');
        greet.textContent = 'Hi, ' + (account.name?.split(' ')[0] || 'User');
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
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
