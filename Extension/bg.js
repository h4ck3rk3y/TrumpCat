function getCurrentTabUrl(tabId, changeInfo, tab) {

	var message = {link: tab.url};
	chrome.tabs.sendMessage(tabId, message, function(response) {
		console.log("acknowledged" + response.message);
	});

};

chrome.tabs.onUpdated.addListener(getCurrentTabUrl);
