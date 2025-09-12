// Microsoft Entra ID (Azure AD) MSAL configuration
// Public values only (safe to commit)
const msalConfig = {
  auth: {
    clientId: '5a3dbeb5-adb1-4291-b91c-9e5d4169f7c4',
    authority: 'https://login.microsoftonline.com/210c0b48-cd6d-4b9f-8c17-54ba2524cced',
    redirectUri: window.location.origin + '/index.html'
  },
  cache: {
    cacheLocation: 'localStorage', // persist across tabs
    storeAuthStateInCookie: false   // set true only for old browsers / ITP issues
  }
};

// Scopes we need (Graph basic profile)
const loginRequest = { scopes: ['User.Read'] };
