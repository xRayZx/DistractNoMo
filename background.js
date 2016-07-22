const redirectListener = function (on, urls) {
	if (on) {
		let urlsToMatch = urls.map((url) => {
			return (
				'*://' + url + '/*'
			)
		})
		chrome.webRequest.onBeforeRequest.addListener( (urlsToMatch) => {
			redirectAction(urlsToMatch);
		})
	} else {
		chrome.webRequest.onBeforeRequest.removeListener(redirectAction);
	}
}

const redirectAction = function (request) {
	return {redirectUrl: 'https://www.google.com'}
}

chrome.storage.local.get(null, (storage) => {
	if (storage['on']) {
		chrome.webRequest.onBeforeRequest.addListener(redirectAction, {urls: ['*://*.facebook.com/*']}, ['blocking']);
	} else {
		chrome.webRequest.onBeforeRequest.removeListener(redirectAction);
	}
})

chrome.storage.onChanged.addListener((changes, area) => {
	if (changes.on.newValue) {
		chrome.webRequest.onBeforeRequest.addListener(redirectAction, {urls: ['*://*.facebook.com/*']}, ['blocking']);
	} else {
		chrome.webRequest.onBeforeRequest.removeListener(redirectAction);
	}
	// changes is an object. access new value using --- changes.rules.newValue
})
