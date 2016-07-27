# Focus Cat
Manage your distractions and stay productive

[live - Chrome Web Store](https://chrome.google.com/webstore/detail/focus-cat/bjejgjoblboddchpklahjbkmgfeilodi)

## Overview
Focus Cat is a Chrome extension built with React.js, HTML, and CSS3 to provide a deeper user interaction. It utilizes the `chrome.storage` API to maintain state throughout each browsing session and the `chrome.webRequest` API to carry out the distraction blocking functionality.

![image]
[image]: ./doc/screenshot.png

### Implementation
Upon initial install, Focus Cat initializes your Chrome storage with a few default distraction URLs by checking the local storage for any existing Focus Cat states. Focus Cat is turned on, and immediately starts keeping you in check.

```javascript
componentWillMount () {
  chrome.storage.local.get(null, (storage) => {
    if (typeof storage['urls'] === 'undefined') {
      chrome.storage.local.set({'urls': [
                                         'facebook.com', 'reddit.com',
                                         'imgur.com', '9gag.com', 'twitter.com'
                                        ]});
    } else if (typeof storage['on'] === 'undefined') {
      chrome.storage.local.set({'on': true});
    }
  });
}
```

Focus Cat ensures it works with both URLs entered with and without the `www.`. Each user inputed URL is checked and modified if necessary to ensure functionality regardless of user input.

```javascript
chrome.storage.local.get(null, (storage) => {
  if (storage['urls'].length === 0 || !storage['on']) {
    chrome.webRequest.onBeforeRequest.removeListener(redirectAction);
  } else {
    urls = storage['urls'].map((url) => {
      let urlMatcher = url;
      if (url.includes('www.')) {
        urlMatcher = url.slice(3);
      } else {
        urlMatcher = '.' + url;
      }
      return '*://*' + urlMatcher + '/*';
    });
    chrome.webRequest.onBeforeRequest.addListener(redirectAction, {urls: urls}, ['blocking']);
}
```

Disabling Focus Cat requires the user to enter an random AlphaNumeric string to unlock. Each unlock attempt triggers a new CSS3 element on the page to discourage the user from proceeding to their distraction. One of these elements are tears falling down Focus Cat's face.

```css
.left-tear {
  position: absolute;
  height: 50px;
  -webkit-animation: leftcry 4s infinite;
  animation-timing-function: linear;
}
@-webkit-keyframes leftcry {
  0% {
    bottom: 240px;
    left: 404px;
    height: 20px;
    transform: rotate(34deg);
  }
  30% {
    bottom: 195px;
    left: 362px;
    height: 50px;
  }
  100% {
    bottom: 98px;
    left: 350px;
  }
}
```


### Future Plans
* Keep track of duration that Focus Cat was on
* Provide stats of usage
