const redirectAction = function (request) {
	return {redirectUrl: 'https://www.google.com'}
}

const listenFromStorage = function () {
	chrome.storage.local.get(null, (storage) => {
		debugger
		if (storage['rules'].length === 0 || !storage['on']) {
			chrome.webRequest.onBeforeRequest.removeListener(redirectAction);
		} else {
			urls = storage['rules'].map((url) => {
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
