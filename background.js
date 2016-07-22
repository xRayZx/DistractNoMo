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

const listenFromStorage = function () {
	chrome.storage.local.get(null, (storage) => {
		urls = storage['rules'].map((url) => {
			let urlMatcher = url;
			if (url.includes('www.')) {
				urlMatcher = url.slice(3);
			} else {
				urlMatcher = '.' + url;
			}
			return '*://*' + urlMatcher + '/*';
		});

		if (storage['on']) {
			chrome.webRequest.onBeforeRequest.addListener(redirectAction, {urls: urls}, ['blocking']);
		} else {
			chrome.webRequest.onBeforeRequest.removeListener(redirectAction);
		}
	})
};

listenFromStorage();

chrome.storage.onChanged.addListener((changes, area) => {
	listenFromStorage();
});
