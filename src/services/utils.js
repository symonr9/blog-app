export const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  
//standalone mode is app on home screen
export const isInStandaloneMode = () =>
    'standalone' in window.navigator && window.navigator.standalone;
