const redirectAction = function (distrationURLs) {
	chrome.webRequest.onBeforeRequest.addListener(
		(info) => {
			return {redirectUrl: 'https://www.google.com'}
		},
		{
			urls: distrationURLs
		},
		["blocking"]
	);
}

const redirectListener = function (on, urls) {
	if (on) {
		let urlsToMatch = urls.map((url) => {
			return (
				'*://' + url + '/*'
			)
		})
		chrome.webRequest.onBeforeRequest.addListener(redirectAction.bind(_, urlsToMatch))
	} else {
		chrome.webRequest.onBeforeRequest.removeListener(redirectAction);
	}
}
