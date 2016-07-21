chrome.webRequest.onBeforeRequest.addListener(
  function (info) {
    debugger
    return {redirectUrl: 'https://www.google.com'}
  },
  {
    urls: [
    "*://www.facebook.com/*"
    ]
  },
  ["blocking"]
);
