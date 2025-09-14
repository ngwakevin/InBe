// Microsoft Entra ID (Azure AD) MSAL configuration
// Public values only (safe to commit)
// Using External Identities user flow (sign up + sign in)
// Updated to new app & user flow
// Flow name: B2X_1_sign_in ; tenantName: ngwakevinoutlook
const msalConfig = {
  auth: {
  clientId: '396fcec7-5ed7-4084-b53b-9541272e0857',
  authority: 'https://ngwakevinoutlook.b2clogin.com/ngwakevinoutlook.onmicrosoft.com/B2X_1_sign_in',
    knownAuthorities: ['ngwakevinoutlook.b2clogin.com'],
    redirectUri: window.location.origin + '/index.html'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

// Ensure availability via window for scripts that referenced window.msalConfig
if(typeof window !== 'undefined'){ window.msalConfig = msalConfig; }

// Baseline B2C scopes (Graph not required for basic sign-in). Add API scopes later.
const loginRequest = { scopes: ['openid','profile','offline_access'] };
