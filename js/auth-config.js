// Microsoft Entra ID (Azure AD) MSAL configuration
// Public values only (safe to commit)
// Using External Identities user flow (sign up + sign in)
// Flow name: B2X_1_signup_signin1 ; tenantName: ngwakevinoutlook
const msalConfig = {
  auth: {
    clientId: '5a3dbeb5-adb1-4291-b91c-9e5d4169f7c4',
    authority: 'https://ngwakevinoutlook.b2clogin.com/ngwakevinoutlook.onmicrosoft.com/B2X_1_signup_signin1',
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

// Scopes we need (Graph basic profile)
const loginRequest = { scopes: ['User.Read'] };
