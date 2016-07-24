const redirectAction = function (request) {
	chrome.storage.local.set({'urlAttempted': request.url});
	return {redirectUrl: chrome.extension.getURL("distraction.html")}
}

const listenFromStorage = function () {
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
	})
};

listenFromStorage();

chrome.storage.onChanged.addListener((changes, area) => {
	listenFromStorage();
});
